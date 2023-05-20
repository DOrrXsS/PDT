import { Box, Button, Collapse, Grid } from '@mui/material'
import WebIcon from '@mui/icons-material/Web';

import React, { useEffect, useState } from 'react';
import UrlButton from './UrlButton';


export default function Bookmarks(props) {      //dataType={urlsDataType[index]} urlsData={urlsData[urlsDataType[index]]}
    const { urlsData, tab, index } = props;
    const [display, setDisplay] = useState(false);

    //for collapse animation
    useEffect(() => {
        if(tab == index) {
            setDisplay(true);
            return;
        }
        setDisplay(false)
    }, [tab])

    return (
        <div
            hidden={tab !== index}
        >
            <Grid container
                sx={{
                    border: 1,
                    p: 2,
                    mb: 3
                }}
            >
                {urlsData.map((data, index) => {
                    return (
                        <Collapse in={display} key={index}>
                            <Grid item >
                                <UrlButton {...data} />
                            </Grid>
                        </Collapse>
                    )
                })}
            </Grid>
        </div>
    )
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
