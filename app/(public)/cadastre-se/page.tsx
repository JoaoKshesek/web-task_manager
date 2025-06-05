import React, { FunctionComponent, Suspense } from "react";
import { Loader, PageWrapper } from "@/components";

import { SignUpContainer } from "@/containers";

const PageSignUp: FunctionComponent = async () => {
  return (
    <Suspense fallback={<Loader />}>
      <PageWrapper>
        <SignUpContainer />
      </PageWrapper>
    </Suspense>
  );
};

export default PageSignUp;
