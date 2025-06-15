import {useState} from "react";

function TimeTracker() {
    const [counter, setCounter] = useState(0)
    const [counterInterval, setCounterInterval] = useState()

    const [btnState, setBtnState] = useState("Start");

    const [tasks, setTasks] = useState([{name: "Test", timer: 0}])
    const [inputTask, setInputTask] = useState()

    function startTimer() {
        if (btnState === "Start") {
            clearInterval(counterInterval)
            setCounterInterval(setInterval(() => setCounter(oldCounter => oldCounter + 1), 1000))
            setBtnState("Stop")
        } else {
            clearInterval(counterInterval)
            setBtnState("Start")
        }

    }

    function resetTimer() {
        clearInterval(counterInterval)
        setCounter(0)
    }

    function handleInputChange(e) {
        setInputTask(e.target.value)
    }


    function handleTableTimer(cell){
        const updatedTable = tasks.map((t)=> {
            if (t.name === cell.name){
                return {...t, timer:cell.timer+1}
            }
            return t

        });

        setTasks(updatedTable)

    }


    return (
        <>
            <p></p>
            <div className="timer">
                <button onClick={startTimer}>{btnState}</button>
                <button onClick={resetTimer}>Reset</button>

                <p>{counter}</p>
            </div>

            <div className="tasks">
                <input type="text" placeholder="Add tasks" onChange={handleInputChange} autoComplete="off"
                       id="taskInput"
                       onKeyPress={(event) => {
                           if (event.key === "Enter") {
                               setTasks(prev => [...prev, {name:inputTask, timer:0}])
                               setInputTask("")
                           }
                       }}/>

                <button onClick={()=>{

                    setTasks((prev) => [...prev, {name:inputTask, timer:0}])

                    setInputTask("")
                }}>Add task</button>
                <table>
                    <thead>
                    <tr>
                        <th>Tasks</th>
                        <th>Timespent</th>
                        <th>Start timer</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((t, index) => <tr key={index}>

                        <td>{t.name}</td>
                        <td>{t.timer}</td>
                        <td>
                            <button onClick={()=>handleTableTimer(t)}>▶️</button>
                        </td>
                    </tr>)}


                    </tbody>

                </table>
            </div>
        </>
    )
}

export default TimeTracker;