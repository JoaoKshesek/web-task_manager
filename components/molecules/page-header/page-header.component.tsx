import * as React from "react";
import { Breadcrumbs, BreadcrumbsProps } from "@/components/atoms/breadcrumbs/breadcrumbs.component";
import { Header, Title } from "./page-header.styles";

interface Props {
  title: string;
  breadcrumbs?: BreadcrumbsProps["breadcrumbs"];
}

export function PageHeader({ title, breadcrumbs }: Props) {
  return (
    <Header>
      {title && <Title>{title}</Title>}
      {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
    </Header>
  );
}
