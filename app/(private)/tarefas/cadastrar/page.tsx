import React, { FunctionComponent, Suspense } from "react";
import { TaskCreateContainer } from "@/containers";
import { Loader } from "@/components";

const PageTaskCreate: FunctionComponent = () => {
  return (
    <Suspense fallback={<Loader />}>
      <TaskCreateContainer />
    </Suspense>
  );
};

export default PageTaskCreate;
