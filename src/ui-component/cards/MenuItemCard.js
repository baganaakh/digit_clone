import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Card, Grid, ListItemIcon, Menu, MenuItem, CardMedia, Typography } from '@material-ui/core';

// assets
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import PinDropTwoToneIcon from '@material-ui/icons/PinDropTwoTone';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import GroupTwoToneIcon from '@material-ui/icons/GroupTwoTone';

const menuImage = require.context('./../../assets/images/menu', true);

// style constant
const useStyles = makeStyles((theme) => ({
    followerBlock: {
        padding: '16px',
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[100],
        '&:hover': {
            border: '1px solid' + theme.palette.primary.main
        }
    },
    primaryLight: {
        color: theme.palette.primary[200],
        cursor: 'pointer'
    },
    btnBlock: {
        width: '100%'
    }
}));

//-----------------------|| SOCIAL PROFILE - FOLLOWER CARD ||-----------------------//

const MenuItemCard = ({ menuPic, description, tag, name, onActive }) => {
    const classes = useStyles();
    let avatarProfile = menuPic && menuImage(`./${menuPic}.svg`).default;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card className={classes.followerBlock}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid
                            item
                            // xs
                            // zeroMinWidth
                            onClick={() => {
                                onActive && onActive();
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <CardMedia component="img" image={avatarProfile} title="Card 1" />
                        </Grid>
                        <Grid item xs zeroMinWidth
                            onClick={() => {
                                onActive && onActive();
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                            >
                                {name}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                sx={{ mt: 0.25, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                            >
                                {description}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <MoreHorizOutlinedIcon
                                fontSize="small"
                                className={classes.primaryLight}
                                aria-controls="menu-followers-card"
                                aria-haspopup="true"
                                onClick={handleClick}
                            />
                            <Menu
                                id="menu-followers-card"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                variant="selectedMenu"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <AddCircleOutlineOutlinedIcon fontSize="small" />
                                    </ListItemIcon>
                                    шинээр нэмэх
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <MoreHorizOutlinedIcon fontSize="small" />
                                    </ListItemIcon>
                                    цааш
                                </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Grid item xs={12}>
                    
                    <Button 
                        variant="text" 
                        color="primary" 
                        className={classes.btnBlock} 
                        //startIcon={<PersonAddTwoToneIcon />}
                    >
                        цааш
                    </Button>
                    
                </Grid> */}
            </Grid>
        </Card>
    );
};

MenuItemCard.propTypes = {
    menuPic: PropTypes.string,
    description: PropTypes.string,
    tag: PropTypes.string,
    name: PropTypes.string,
    onActive: PropTypes.func
};

export default MenuItemCard;
