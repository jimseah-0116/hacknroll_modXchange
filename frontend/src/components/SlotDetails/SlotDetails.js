import './SlotDetails.css';

const SlotDetails = ({ slot }) => {
    return (
            <div className="slotDetails">
                <h2>{slot.module}</h2>
                <p><strong>Type: </strong>{slot.lessonType}</p>
                <div className="have-want-container">
                    <div className="have">
                        <h3>Have</h3>
                        <p><strong>Class: </strong>{slot.classNo}</p>
                        <p><strong>Day: </strong>{slot.day}</p>
                        <p><strong>Start: </strong>{slot.startTime}</p>
                        <p><strong>End: </strong>{slot.endTime}</p>
                        <p><strong>Weeks: </strong>{slot.weeks}</p>
                    </div>
                    <div className="want">
                        <h3>Want</h3>
                        <p><strong>Class: </strong>{slot.classNoWanted}</p>
                        <p><strong>Day: </strong>{slot.dayWanted}</p>
                        <p><strong>Start: </strong>{slot.startTimeWanted}</p>
                        <p><strong>End: </strong>{slot.endTimeWanted}</p>
                        <p><strong>Weeks: </strong>{slot.weeksWanted}</p>
                    </div>
                </div>
                <p><strong>Posted by: @</strong>{slot.tele} </p>
            </div>
    )
}

export default SlotDetails;