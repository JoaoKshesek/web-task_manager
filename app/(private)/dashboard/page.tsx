import React, { FunctionComponent, Suspense } from "react";
import { DashboardContainer } from "@/containers";
import { Loader } from "@/components";

const PageDashboard: FunctionComponent = () => {
  return (
    <Suspense fallback={<Loader />}>
      <DashboardContainer />
    </Suspense>
  );
};

export default PageDashboard;
