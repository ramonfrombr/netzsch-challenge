import { db } from "@/lib/db";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { redirect } from "next/navigation";
import StatusBadge from "@/components/status-badge";
import { Button, Typography } from "@mui/material";
import DeleteTaskButton from "../_components/delete-task-button";
import ButtonBackToTasks from "../_components/button-back-to-tasks";
import EditTaskInModalButton from "../_components/edit-task-in-modal-button";
import PriorityBadgeForm from "@/components/priority-badge-form";
import Link from "next/link";

const TaskIdPage = async ({ params }: { params: { taskId: string } }) => {
  const task = await db.task.findUnique({
    where: {
      id: params.taskId,
    },
  });

  if (!task) {
    redirect("/tasks");
  }
  return (
    <div>
      <ButtonBackToTasks />

      <div className="mb-5 flex gap-2 flex-col items-end sm:flex-row sm:justify-end">
        <Link href={`/tasks/${task.id}/edit`}>
          <Button variant="contained" color="primary">
            Edit in page
          </Button>
        </Link>
        <EditTaskInModalButton task={task} />
        <DeleteTaskButton taskId={params.taskId} />
      </div>
      <TableContainer className="border shadow" component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableBody className="[&_td]:border-0 [&_th]:border-0 [&_th]:font-semibold [&_th]:align-top [&_th]:w-[120px]">
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Task Name:
              </TableCell>
              <TableCell align="left">
                <Typography>{task!.name}</Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Due date:
              </TableCell>
              <TableCell align="left">
                {task.dueDate.toLocaleDateString("pt-br")}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Status:
              </TableCell>
              <TableCell align="left">
                <StatusBadge status={task.status} />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Priority:
              </TableCell>
              <TableCell align="left">
                <PriorityBadgeForm priority={task.priority} />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Description:
              </TableCell>
              <TableCell align="left">
                {task?.description ? (
                  task?.description
                ) : (
                  <span className="italic text-gray-500">No description</span>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TaskIdPage;
