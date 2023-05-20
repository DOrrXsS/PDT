import { Card, CardMedia, Divider, Skeleton } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react'
import PostCard from './PostCard';



export default function Posts(props) {
    const { posts, status: BlogStatus, error: BlogError } = props;

    let whatToDiaplay;

    //control what to display according to posts loading status
    switch (BlogStatus) {
        case 'idle':
            whatToDiaplay = <Skeleton variant='rectangle' width={400} height={200} />;
            break;

        case 'loading':
            whatToDiaplay = <Skeleton variant='rectangle' width={400} height={200} />;
            break;

        case 'failed':
            whatToDiaplay = <Box sx={{
                width: 400,
                height: 200,
                mx: 'auto'
            }}>oops!failed to load data</Box>
            break;

        case 'success':
            whatToDiaplay =
                <Stack
                    sx={{
                        padding: 2,

                    }}
                    divider={<Divider />}
                >
                    {
                        posts.map((post, index) => (
                            <PostCard {...post} key={index} />
                        ))
                    }
                </Stack>
            break;
        default:
            whatToDiaplay = <Box>code is wrong!</Box>

    }

    return (
        <React.Fragment>
            {whatToDiaplay}
        </React.Fragment>
    )
}
