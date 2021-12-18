import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Card, Grid, ListItemIcon, Menu, MenuItem, CardMedia, Typography } from '@material-ui/core';

// assets
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

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

//-----------------------|| FORMS - CARD ||-----------------------//

const FormItemCard = ({ name, onActive, onEdit, onDelete }) => {
    const classes = useStyles();
//    let avatarProfile = menuPic && menuImage(`./${menuPic}.svg`).default;

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
                            {/* <CardMedia component="img" image={avatarProfile} title="Card 1" /> */}
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
                                sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap', display: 'block' }}
                            >
                                {name}
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
                                <MenuItem onClick={() => {
                                        onEdit && onEdit();
                                    }}>
                                    <ListItemIcon>
                                        <EditIcon fontSize="small" />
                                    </ListItemIcon>
                                    засварлах
                                </MenuItem>
                                <MenuItem onClick={() => {
                                        onDelete && onDelete();
                                    }}>
                                    <ListItemIcon>
                                        <DeleteForeverIcon fontSize="small" />
                                    </ListItemIcon>
                                    устгах
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

FormItemCard.propTypes = {
    name: PropTypes.string,
    onActive: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
};

export default FormItemCard;
