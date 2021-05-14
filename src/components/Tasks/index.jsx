import "./Tasks.scss";
import editSvg from "../../assets/img/edit.svg";
import axios from "axios";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";
import { Link } from "react-router-dom";

const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  onCompleteTask,
  onRemoveTask,
  onEditTask,
  withoutEmpty,
}) => {
  const editTitle = () => {
    const newTitle = window.prompt("Название списка", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch("https://to-do-react-deploy.herokuapp.com/lists/" + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert("Не удалось обновить название списка");
        });
    }
  };

  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }} className="tasks__title">
          {list.name}
          <img onClick={editTitle} src={editSvg} alt="Edit icon" />
        </h2>
      </Link>

      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {list.tasks &&
          list.tasks.map((task) => (
            <Task
              key={task.id}
              list={list}
              onComplete={onCompleteTask}
              onEdit={onEditTask}
              onRemove={onRemoveTask}
              {...task}
            />
          ))}
        <AddTaskForm list={list} key={list.id} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
