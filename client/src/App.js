import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';
import Todo from './Component/Todo/Todo';

function App() {
  const data = [
    {
      state: 'To Do', items: []
    },
    {
      state: 'In Progress', items: []
    },
    {
      state: 'Done', items: []
    }
  ];
  // run for the first time
  // useEffect(() => {
  //   data.forEach(element => {
  //     fetch(`http://localhost:5000/addTask`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(element)
  //     })
  //       .then(res => console.log("task added to db", res));
  //   })
  // }, [])

  const { register, handleSubmit } = useForm();
  const [taskList, setTaskList] = useState(data);
  const [task, setTask] = useState([]);
  const [count, setCount] = useState(0);

  const [newAdded, setNewAdded] = useState(false);

  const onSubmit = (task) => {
    setNewAdded(true);
    setCount(count + 1);
    const newTask =
      { id: count, name: task.name };
    taskList.forEach(element => {
      if (element.state === 'To Do') {
        element.items.push(newTask);
        setTaskList(taskList);
      }
      setTask(element.items);

      console.log('added in tasklist:', taskList)
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" className="new-todo" required placeholder='Write your task ...' {...register("name")} />
        <button type='submit' id='add-btn'>Add</button>
      </form>
      <div>
        <Todo item={taskList} />
      </div>
    </div>
  );
}

export default App;
