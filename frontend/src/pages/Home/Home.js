import { useEffect, useState } from "react";
import SlotDetails from "../../components/SlotDetails/SlotDetails"
import './Home.css';
const Home = () => {
    const [slots, setSlots] = useState(null);
    //get all slots from database
    useEffect(() => {
        const fetchSlots = async () => {
            const response = await fetch('/api/slots')
            const json = await response.json();

            if (response.ok) {
                setSlots(json);
            }
        }

        fetchSlots();
    }, []);
    //display individual slot details
    return (
        <div className="home">
            <div className="slots">
                {slots && slots.map((slot) => (
                    <SlotDetails key={slot._id} slot={slot}/>
                ))}
            </div>
        </div>
    )
}

export default Home;