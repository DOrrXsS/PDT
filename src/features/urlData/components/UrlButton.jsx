import { Button } from '@mui/material'
import React from 'react'

export default function UrlButton(props) {
    const { title, url } = props;
    return (
        <Button
            color="primary"
            size="small"
            variant="filled"
            sx={{
                margin: 1
            }}
            onClick={() => {
                window.open(url)
            }}
        >
            {title}
        </Button>
    )
}
