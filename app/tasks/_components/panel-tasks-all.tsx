import CustomTabPanel from "./custom-tab-panel";
import { Status, Task } from "@prisma/client";
import TaskSummary from "./task-summary";
import TaskChart from "./task-chart";

interface PanelTasksAllProps {
  value: number;
  index: number;
  tasks: {
    newTasks: Task[];
    inProgressTasks: Task[];
    completedTasks: Task[];
    lowPriorityTasks: Task[];
    mediumPriorityTasks: Task[];
    highPriorityTasks: Task[];
  };
}

const PanelTasksAll = ({ value, index, tasks }: PanelTasksAllProps) => {
  const noTasks =
    tasks.newTasks.length == 0 &&
    tasks.inProgressTasks.length == 0 &&
    tasks.completedTasks.length == 0;

  return (
    <CustomTabPanel value={value} index={index}>
      <main className="flex flex-col gap-2">
        {noTasks && (
          <h2 className="text-center text-lg text-gray-500 p-3">
            There are no tasks. Click the &quot;CREATE&quot; button to create a
            task.
          </h2>
        )}
        {tasks.newTasks.length != 0 && (
          <TaskSummary
            expanded={true}
            tasks={tasks.newTasks}
            heading=""
            status={Status.NEW}
          />
        )}
        {tasks.inProgressTasks.length != 0 && (
          <TaskSummary
            expanded={true}
            tasks={tasks.inProgressTasks}
            heading=""
            status={Status.IN_PROGRESS}
          />
        )}
        {tasks.completedTasks.length != 0 && (
          <TaskSummary
            tasks={tasks.completedTasks}
            heading=""
            status={Status.COMPLETED}
          />
        )}
      </main>
    </CustomTabPanel>
  );
};

export default PanelTasksAll;
