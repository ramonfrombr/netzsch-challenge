"use client";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import TaskEditForm from "./_components/task-edit-form";
import { ClipLoader } from "react-spinners";

const TaskIdEditPage = ({ params }: { params: { taskId: string } }) => {
  const [task, setTask] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await fetch(`/api/tasks/${params.taskId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setTask(data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center pt-10">
        <ClipLoader />
      </div>
    );
  }

  if (error) {
    redirect("/tasks");
  }

  if (!task) {
    redirect("/tasks");
  }

  return <TaskEditForm task={task} />;
};

export default TaskIdEditPage;
