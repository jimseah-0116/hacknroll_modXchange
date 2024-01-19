import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'
const ExchangeForm = () => {
    const [modules, setModules] = useState(null);
    const [module, setModule] = useState('');
    const [slots, setSlots] = useState(null);
    const [slot, setSlot] = useState(null);
    const [slotWanted, setSlotWanted] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        //fetch list of modules from nusmods api
        const fetchModules = async () => {
            //hardcoded acd year for now
            const response = await fetch('https://api.nusmods.com/v2/2023-2024/moduleList.json');
            const json = await response.json();
            //hardocded to sem 2 for now
            const arr = json.filter((mod) => mod.semesters.includes(2))
                            .map((module) => ({value: module.moduleCode, label: module.moduleCode}));
            if (response.ok) {
                setModules(arr);
            }
        }
        //get available slots for specific module
        const fetchSlots = async () => {
            //hardcoded acad year for now
            const response = await fetch(`https://api.nusmods.com/v2/2023-2024/modules/${module}.json`);
            const json = await response.json();
            //hardcoded to sem2
            const index = json.semesterData.length === 1 ? 0 : 1;
            const arr = json.semesterData[index].timetable
                .filter((slot) => slot.lessonType === "Tutorial")
                .map((slot) => ({value: slot, label: `${slot.classNo} (${slot.day}, ${slot.startTime} to ${slot.endTime})`}));
            if (response.ok) {
                setSlots(arr);
            }
        }
        if (!modules) {
            fetchModules();
        }
        if (module !== '') {
            fetchSlots();
        }
    }, [module]);

    //post new slot exchange to backend, add to database and redirect to homepage
    const handleSubmit = async (e) => {
        e.preventDefault();
        const exchange = {module, lessonType: "Tutorial", venue: slot.venue, tele: "usertele",
                          classNo: slot.classNo, day: slot.day, startTime: slot.startTime, endTime: slot.endTime, weeks: slot.weeks,
                          classNoWanted: slotWanted.classNo, dayWanted: slotWanted.day, startTimeWanted: slotWanted.startTime, 
                          endTimeWanted: slotWanted.endTime, weeksWanted: slotWanted.weeks, venueWanted: slotWanted.venue};
        
        const response = await fetch('/api/slots/', {
            method: 'POST',
            body: JSON.stringify(exchange),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        } 
        if (response.ok) {
            setError(null);
            setModule('');
            setSlots(null);
            setSlot(null);
            setSlotWanted(null);
            navigate('/');
        }
    }
    
    return (
        <form className='exchange' onSubmit={handleSubmit}>
            <h3>Select a module</h3>
            {modules && <Select options={modules} onChange={(mod) => setModule(mod.value)}/>}
            {(module !== '') && 
            <div>
                <h3>Slot you have</h3>
                <Select options={slots} onChange={(s) => setSlot(s.value)}/>
            </div>
            }

            {(module !== '') && 
            <div>
                <h3>Slot you want</h3>
                <Select options={slots} onChange={(s) => setSlotWanted(s.value)}/>
            </div>
            }
            {(slot && slotWanted) &&
                <button >Submit exchange</button>
            }
            {error}
        </form>
    )
}

export default ExchangeForm;