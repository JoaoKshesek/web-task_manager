import * as React from "react";
import { Button, Container, Content, Label } from "./breadcrumbs.styles";
import { Icon } from '@/components'

interface Breadcrumb {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

export function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  function render() {
    const elements: JSX.Element[] = [];

    breadcrumbs.forEach((item, index) => {
      const isLast = index === breadcrumbs.length - 1;

      if (item.href) {
        elements.push(
          <Button key={`breadcrumb-${index}`} href={item.href}>
            {item.label}
          </Button>
        );
      } else {
        elements.push(
          <Label key={`breadcrumb-${index}`}>{item.label}</Label>
        );
      }

      if (!isLast) {
        elements.push(
          <Icon key={`chevron-${index}`} icon='mdi:chevron-right' fontSize={20}/>
        );
      }
    });

    return elements;
  }

  return (
    <Container>
      <Content>{render()}</Content>
    </Container>
  );
}
