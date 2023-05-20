import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { CardMedia } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';


const ReadMore = (props) => {
    const navigate = useNavigate();
    return (
        <Button onClick={()=> navigate(props.href) } >
            {React.cloneElement(props.children)}
        </Button>
    )
}

export default function PostCard({ slug, frontmatter }) {
    const { date, cover_img, title } = frontmatter;

    return (
        <Card
            sx={{
                display: 'flex',
                padding: 3,
                my: 2
            }}
        >
            <Box
                sx={{
                    flexGrow: 1
                }}
            >
                <CardContent>
                    <Typography  variant='h5'>
                        {title}
                    </Typography>
                    <Typography  variant='caption'>
                        {date}
                    </Typography>
                </CardContent>
                <CardActions>
                    <ReadMore href={`/blog/${slug}`} >
                        <>Read</>    
                     </ReadMore>
                </CardActions>
            </Box>

            <CardMedia
                component="img"
                sx={{ width: 200 }}
                image={`/src/assets/imgs/pics/${cover_img}`}
                
            />
        </Card>
    )
}
