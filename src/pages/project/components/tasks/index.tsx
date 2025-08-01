import type { Task } from "../../../../models/userStory";
import AddTask from "./addTask";
import TaskView from "./task";

interface TasksProps {
  tasks: Task[];
  onAdd: (blocker: Task) => void;
  onUpdate: (index: number, blocker: Task) => void;
  onComplete: (index: number) => void;
  onDelete: (index: number) => void;
}

const Tasks = ({ tasks, onAdd, onUpdate, onComplete, onDelete }: TasksProps) => {
  return (
    <>
      {tasks.map((task, index) => (
        <TaskView
          key={task.description}
          index={index}
          task={task}
          onUpdate={onUpdate}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
      <AddTask onAdd={onAdd} />
    </>
  );
};

export default Tasks;
