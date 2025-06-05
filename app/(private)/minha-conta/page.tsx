import React, { FunctionComponent, Suspense } from "react";
import { Loader } from "@/components";
import { AccountDetailsContainer } from "@/containers";

const PageAccount: FunctionComponent = () => {
  return (
    <Suspense fallback={<Loader />}>
      <AccountDetailsContainer />
    </Suspense>
  );
};

export default PageAccount;
