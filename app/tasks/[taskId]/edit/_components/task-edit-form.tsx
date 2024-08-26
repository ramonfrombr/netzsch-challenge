import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Priority, Status } from "@prisma/client";
import StatusBadge from "@/components/status-badge";
import PriorityBadgeForm from "@/components/priority-badge-form";
import formSchema from "@/lib/formSchema";
import Link from "next/link";
import { useState } from "react";

interface TaskEditFormProps {
  task: {
    id: string;
    name: string;
    description: string;
    status: Status;
    priority: Priority;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
  };
}

const TaskEditForm = ({ task }: TaskEditFormProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  type FormData = z.infer<typeof formSchema>;

  const initialData = {
    name: task.name,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueDate: dayjs(task.dueDate),
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/tasks/${task.id}`, values);
      router.push(`/tasks/${task.id}`);
      toast.success("Task updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="mb-5">
        <Link href={`/tasks/${task.id}`}>
          <Button variant="contained">Cancel</Button>
        </Link>
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"pt-br"}>
        <form
          className="flex flex-col bg-white p-5 border shadow"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="h4" gutterBottom>
            Edit Task
          </Typography>
          <TextField
            label="Task name"
            fullWidth
            margin="normal"
            defaultValue={initialData.name}
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Task description"
            fullWidth
            multiline
            margin="normal"
            defaultValue={initialData.description}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          <div className="grid grid-cols-2 gap-2">
            <FormControl fullWidth margin="normal" error={!!errors.status}>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                {...register("status")}
                defaultValue={initialData.status}
                sx={{ my: 1 }}
              >
                {Object.values(Status).map((status) => (
                  <MenuItem key={status} value={status}>
                    <StatusBadge status={status} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" error={!!errors.priority}>
              <InputLabel>Priority</InputLabel>
              <Select
                label="Priority"
                {...register("priority")}
                defaultValue={initialData.priority}
                sx={{ my: 1 }}
              >
                {Object.values(Priority).map((priority) => (
                  <MenuItem key={priority} value={priority}>
                    <PriorityBadgeForm priority={priority} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <Controller
            control={control}
            name="dueDate"
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <DatePicker
                  label="Due date"
                  value={field.value}
                  inputRef={field.ref}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                  open={open}
                  onClose={() => setOpen(false)}
                  slotProps={{
                    textField: {
                      onClick: () => setOpen(true),
                    },
                    openPickerButton: {
                      onClick: () => setOpen(true),
                    },
                  }}
                />
              );
            }}
          />

          <Button
            className="mt-5"
            type="submit"
            variant="contained"
            color="primary"
          >
            UPDATE
          </Button>
        </form>
      </LocalizationProvider>
    </div>
  );
};

export default TaskEditForm;
