import { Box, Button, ButtonGroup, Divider, Drawer, IconButton, List, ListItem, Typography } from '@mui/material';
import React, { useState } from 'react'
import { styled } from '@mui/system';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import UrlsMng from "../../features/urlData/components/UrlsMng";


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  margin: '5px 0'
}));

const DrawerContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  width: '150px',
  border: 'none',
  margin: '10px 0',
  borderBottom: '2px solid black'
}))

const StyledBox = styled(ButtonGroup)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '20px 5px',
  marginTop: '0',
  alignSelf: 'center'
}))


export default function StyledDrawer(props) {
  const { onDrawer, handleCloseDrawer, drawerWidth } = props;

  return (
    //Drawer
    <Drawer
      anchor='left'
      open={onDrawer}
      variant='persistent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <DrawerHeader>
        <IconButton
          onClick={handleCloseDrawer}
          sx={{
            width:"100%"
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />

      <DrawerContent>
        <Box
        sx={{
          display: 'block',
          justifyContent: 'center',
          alignContent: 'between'
        }}>
          <UrlsMng />
        </Box>
      </DrawerContent>

    </Drawer>
  )
}
