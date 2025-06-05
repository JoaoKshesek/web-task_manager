import React, { Suspense } from "react";
import { TaskUpdateContainer } from "@/containers";
import { Loader } from "@/components";

interface PageProps {
  params: {
    taskId: string;
  };
}

const PageTaskUpdate = async ({ params }: PageProps) => {
  const { taskId } = params;

  return (
    <Suspense fallback={<Loader />}>
      <TaskUpdateContainer taskId={Number(taskId)} />
    </Suspense>
  );
};

export default PageTaskUpdate;
