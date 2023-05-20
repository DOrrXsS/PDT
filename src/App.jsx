
import { Box, Container } from '@mui/material';
import Navigation from './components/Navigation/Navigation';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { fetchUrlData, selectUrls, selectUrlsDataType } from './features/urlData/urlDataSlice';


import { fetchPosts, selectBlog, selectBlogStatus, selectPostsInfo } from './features/blog/blogSlice';


/**
 * @function: pre-load data of urls and posts, forwarding witch to Outlets
 */
function App() {
  const dispatch = useDispatch();

  const urls = useSelector(selectUrls);
  const { urlsData, status: urlsStatus, error: urlsError } = urls;
  const urlsDataType = useSelector(selectUrlsDataType);

  const blog = useSelector(selectBlog);
  const { posts:postsInfo, status:blogStatus, error: blogError } = blog;

  //load data when page loading
  useEffect(() => {
    if (urlsStatus == 'idle') {
      dispatch(fetchUrlData());
    }
  }, [urlsStatus, dispatch]);

  useEffect(() => {
    if (blogStatus == 'idle') {
      dispatch(fetchPosts());
    }
  }, [blogStatus, dispatch]);


  return (
    <Container maxWidth='md'>
      <Box sx={{
        my: 10
      }}>
        <Navigation context={{urls, blog}}/>
      </Box>
      <Box>
        <Outlet context={{urls, blog}}/>
      </Box>
    </Container>
  )
}

export default App
