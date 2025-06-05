import React, { Suspense } from "react";
import { TaskDetailsContainer } from "@/containers";
import { Loader } from "@/components";

interface PageProps {
  params: {
    taskId: string;
  };
}

const PageTaskDetails = ({ params }: PageProps) => {
  const { taskId } = params;

  return (
    <Suspense fallback={<Loader />}>
      <TaskDetailsContainer taskId={Number(taskId)} />
    </Suspense>
  );
};

export default PageTaskDetails;
