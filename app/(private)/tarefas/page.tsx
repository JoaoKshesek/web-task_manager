import React, { FunctionComponent, Suspense } from "react";
import { TaskListContainer } from "@/containers";
import { Loader } from "@/components";

const PageTaskList: FunctionComponent = () => {
  return (
    <Suspense fallback={<Loader />}>
      <TaskListContainer />
    </Suspense>
  );
};

export default PageTaskList;
