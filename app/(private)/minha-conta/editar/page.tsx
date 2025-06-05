import React, { Suspense } from "react";
import { AccountUpdateContainer } from "@/containers";
import { Loader } from "@/components";

const PageAccountUpdate = () => {
  return (
    <Suspense fallback={<Loader />}>
      <AccountUpdateContainer />
    </Suspense>
  );
};

export default PageAccountUpdate;
