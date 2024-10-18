import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

const TaskBoard = () => {
  const initialTask = {
    id: crypto.randomUUID(),
    title: "Learn arabic",
    description: "Sibaway is the best arabic learning institute",
    tags: ["Reading", "Writing", "Speaking", "listening"],
    priority: "High",
    isFavorite: false,
  };
  const [tasks, setTasks] = useState([initialTask]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  function handleSaveEditTask(newTask, onAdd) {
    if (onAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks?.map((t) => {
          if (t.id === newTask.id) {
            return newTask;
          } else {
            return t;
          }
        })
      );
    }
    setShowAddTaskModal(!showAddTaskModal);
  }
  function handleEditTask(editTask) {
    setEditTask(editTask);
    setShowAddTaskModal(!showAddTaskModal);
  }
  function handleClose() {
    setShowAddTaskModal(!showAddTaskModal);
  }
  return (
    <section className="mb-20" id="tasks">
      {showAddTaskModal && (
        <AddTaskModal
          onSave={handleSaveEditTask}
          editTask={editTask}
          onCloseClick={handleClose}
        />
      )}
      <div className="container">
        {/* <!-- Search Box --> */}
        <div className="p-2 flex justify-end">
          <SearchTask />
        </div>
        {/* <!-- Search Box Ends --> */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions onAddClick={() => setShowAddTaskModal(true)} />
          <TaskList tasks={tasks} onEdit={handleEditTask} />
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
