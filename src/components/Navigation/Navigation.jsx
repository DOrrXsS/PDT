import InboxIcon from '@mui/icons-material/MoveToInbox';

import { AppBar, Button, createTheme, ThemeProvider, Toolbar } from '@mui/material'
import { deepOrange, grey } from '@mui/material/colors'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StyledDrawer from './StyledDrawer';
import { styled } from '@mui/system';

//define global varients here
const drawerWidth = 200;

//configure theme applies to AppBar
const themes = createTheme({
    palette: {
        primary: {
            main: deepOrange[700]
        },
        secondary: {
            main: grey[900]
        }
    }
});


//use styled button with funtion of useNavigate for Route
const StyledNavLink = (props) => {
    const { href, ...others } = props;
    const navigate = useNavigate();
    return (
        <Button
            sx={{
                color: 'primary.main'
            }}
            onClick={() => {
                navigate(href);
            }}
        >
            {others.children}
        </Button>
    )
}

const StyledAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop != 'onDrawer',
})(({ theme, onDrawer }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(onDrawer && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    backgroundColor: 'white'
}))

export default function Navigation() {
    //state here and pass them down to child components
    const [ onDrawer, setDrawer ] = useState(false);
    const [ onUrlMng, setUrlMng ] = useState(false);

    const handleOpenDrawer = () => {
        setDrawer(true);
    }

    const handleCloseDrawer = () => {
        setDrawer(false);
    }

    return (
        <ThemeProvider theme={themes}>
            <StyledAppBar onDrawer={onDrawer}>
                <Toolbar>
                    <Button
                        onClick={handleOpenDrawer}
                        sx={{ ...(onDrawer && { display: 'none' }) }}
                    >
                        <InboxIcon />
                    </Button>

                    <StyledNavLink href='/home'>Homepage</StyledNavLink>
                    <StyledNavLink href='/blog'>Blogs</StyledNavLink>
                    <StyledNavLink href='/function'>Functions</StyledNavLink>

                    <StyledDrawer onDrawer={onDrawer} handleCloseDrawer={handleCloseDrawer} drawerWidth={drawerWidth} />
                </Toolbar>
            </StyledAppBar>
        </ThemeProvider>
    )
}
