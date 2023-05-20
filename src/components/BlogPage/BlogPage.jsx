import { Container } from '@mui/system';
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Posts from '../../features/blog/components/Posts';

export default function BlogPage() {
  const { blog } = useOutletContext();

  return (
    <Container>
      <Posts {...blog} />
    </Container>
  )
}
