import React, { useEffect, useState, } from 'react'
import { Divider, Grid, List, ListItem, Skeleton, Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Bookmarks from './Bookmarks';
import { BorderAll } from '@mui/icons-material';
import { key } from 'localforage';

export default function BookmarkTable(props) {
    const { urlsData, status: urlsStatus, error: urlsError } = props;

    //decide witch tab to display
    const [tab, setTab] = useState(0);

    const handleChange = (e, newTab) => {
        setTab(newTab);
    }

    //map {'typeName1': {}, 'typeName2': {}} to ['typeName1', 'typeName2']
    const urlsDataType = (() => {
        let entriesMap = Object.entries(urlsData);
        return entriesMap.map((obj) => obj[0]);
    })();

    let whatToDiaplay;

    //control what to display according to urlsData loading status
    switch (urlsStatus) {
        case 'idle':
            whatToDiaplay = <Skeleton variant='rectangle' width='100%' height={200} />;
            break;

        case 'loading':
            whatToDiaplay = <Skeleton variant='rectangle' width='100%' height={200} />;
            break;

        case 'failed':
            whatToDiaplay = <Box sx={{
                width: '100%',
                height: 200,
                mx: 'auto'
            }}>oops!failed to load data</Box>
            break;

        case 'success':
            whatToDiaplay =
                <Box
                >
                    <Tabs
                        variant="scrollable"
                        value={tab}
                        onChange={handleChange}
                        sx={{ borderRight: 1, borderColor: 'divider', m:'2' }}
                    >
                        {urlsDataType.map((type, index) => (
                            <Tab label={type} key={index} />
                        ))}
                    </Tabs>
                    {urlsDataType.map((type, index) => (
                        <Bookmarks tab={tab} index={index} urlsData={urlsData[type]}  key={index} />
                    ))}
                </Box>
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
