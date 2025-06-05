import * as React from 'react'

import { Container, Description, Loading } from './loading-container.styles'

interface Props {
  description: string
}

export function LoadingContainer({ description }: Props) {
  return (
    <Container>
      <Loading />
      <Description>{description}</Description>
    </Container>
  )
}
