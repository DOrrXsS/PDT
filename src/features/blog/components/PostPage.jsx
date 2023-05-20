import matter from 'gray-matter';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { marked } from 'marked';
import { Box, Container, padding, styled } from '@mui/system';
import { Typography } from '@mui/material';

const StyledImg = styled('img', {})(({
  width: '100%',
  padding: '2px'
}))


export default function PostPage() {
  const frontmatter = useLoaderData();
  return (
    <Container>
      <Box>
        <Box>
          <StyledImg src={`/src/assets/imgs/pics/${frontmatter.data.cover_img}`} />
          <Typography variant='h4'>
            {frontmatter.data.title}
          </Typography>
          <Typography variant='caption'>
            {frontmatter.data.date.getDay()}
          </Typography>
        </Box>
        <div className='postContent' dangerouslySetInnerHTML={{ __html: marked(frontmatter.content) }} />
      </Box>
    </Container>
  )
}


export async function loader({ request, params }) {
  const slug = params.slug;
  console.log(slug);
  if (!slug) {
    throw new Error('oops! look where you have braved in');
  }
  let frontmatter = await new Promise((resolve, reject) => {
    fetch(`/src/assets/markdown/${slug.concat('.md')}`).then(res => {
      return res.text();
    }).then(postRaw => {
      resolve(matter(postRaw));
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  });
  return frontmatter;
}