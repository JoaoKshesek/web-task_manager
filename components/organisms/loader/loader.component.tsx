"use client";

import * as React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Content, Section } from "./loader.styles";

export const Loader: React.FunctionComponent = () => {
  return (
    <Section>
      <Content>
        <DotLottieReact src="/assets/loading.lottie" loop autoplay />
      </Content>
    </Section>
  );
};
