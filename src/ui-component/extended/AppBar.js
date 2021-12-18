import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { useTheme } from '@material-ui/core';
import {
    AppBar as MuiAppBar,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Toolbar,
    Typography,
    useScrollTrigger
} from '@material-ui/core';

// project imports
import Logo from './../../ui-component/Logo';

// assets
import { IconBook, IconCreditCard, IconDashboard, IconHome2 } from '@tabler/icons';
import MenuIcon from '@material-ui/icons/Menu';

// elevation scroll
function ElevationScroll(props) {
    const { children, window } = props;
    const theme = useTheme();
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined
    });

    return React.cloneElement(children, {
        elevation: trigger ? 2 : 0,
        style: {
            backgroundColor: theme.palette.background.default,
            borderBottom: trigger ? 'none' : '1px solid',
            borderColor: trigger ? '' : theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.grey[200],
            color: theme.palette.text.dark
        }
    });
}

//-----------------------|| MINIMAL LAYOUT APP BAR ||-----------------------//

const AppBar = ({ ...others }) => {
    const [drawerToggle, setDrawerToggle] = React.useState(false);
    const drawerToggler = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerToggle(open);
    };

    return (
        <ElevationScroll {...others}>
            <MuiAppBar>
                <Container>
                    <Toolbar>
                        <Typography component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                            <Logo />
                        </Typography>
                        <Stack direction="row" sx={{ display: { xs: 'none', sm: 'block' } }} spacing={2}>
                            <Button color="inherit" component={RouterLink} to="/">
                                Нүүр
                            </Button>
                            <Button color="inherit" variant="outlined" component={RouterLink} to="/login">
                                Нэвтрэх
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/create-account"
                                disableElevation
                                variant="outlined"
                                color="secondary"
                            >
                                Бүртгүүлэх
                            </Button>
                        </Stack>
                        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                            <IconButton color="inherit" onClick={drawerToggler(true)}>
                                <MenuIcon />
                            </IconButton>
                            <Drawer anchor="top" open={drawerToggle} onClose={drawerToggler(false)}>
                                <div
                                    sx={{
                                        width: 'auto'
                                    }}
                                    role="presentation"
                                    onClick={drawerToggler(false)}
                                    onKeyDown={drawerToggler(false)}
                                >
                                    <List>
                                        <ListItem button component={RouterLink} to="/">
                                            <ListItemIcon>
                                                <IconHome2 />
                                            </ListItemIcon>
                                            <ListItemText primary="Home" />
                                        </ListItem>
                                        <ListItem button component={RouterLink} to="/login" >
                                            <ListItemIcon>
                                                <IconDashboard />
                                            </ListItemIcon>
                                            <ListItemText primary="Dashboard" />
                                        </ListItem>
                                        
                                        
                                    </List>
                                </div>
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </MuiAppBar>
        </ElevationScroll>
    );
};

export default AppBar;
