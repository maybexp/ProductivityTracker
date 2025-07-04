import {use, useEffect, useState} from "react";

function TimeTracker() {
    const [counter, setCounter] = useState(0)
    const [counterInterval, setCounterInterval] = useState()

    const [btnState, setBtnState] = useState("Start");
    const [tasks, setTasks] = useState(()=> {
        const getLocalStorage = localStorage.getItem("tasks");
        return getLocalStorage ? JSON.parse(getLocalStorage) : [{ name: "Test", timer: 0 }]
    })



    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));

    }, [tasks]);





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

    const [tempCounterInterval, setTempCounterInterval] = useState(0)
    function handleTableTimer(e, cell){
        const updatedTable = tasks.map((t)=> {
            if (t.name === cell.name){
                console.log(e.target.value)
                const v = e.target.value
                if (v == "start") {
                    console.log("WDDK")

                    clearInterval(tempCounterInterval)
                    let myValue = cell.timer+1;
                    setTempCounterInterval(setInterval(() => myValue, 1000))
                    //e.target.valueOf("Stop")

                    return {...t, timer:myValue}
                }

            }
            return t

        });

        setTasks(updatedTable);


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
                            <button onClick={(e)=>handleTableTimer(e, t)} className="submitTaskBtn" value="start">▶️</button>
                        </td>
                    </tr>)}


                    </tbody>

                </table>
            </div>
        </>
    )
}

export default TimeTracker;