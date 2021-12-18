import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Box, CardMedia, IconButton, Typography} from "@material-ui/core";
import {_unescape} from 'utils/helperFunction';
import Rating from '@material-ui/lab/Rating';
import ShowMoreText from "react-show-more-text";
import Card from "@material-ui/core/Card";
import {AppsOutage} from "@mui/icons-material";
import apiService from "../../api/apiService";
import {Favorite, FavoriteBorder} from "@material-ui/icons";

const CardMediaList = ({items, entity, user}) => {
    const [rating, setRating] = useState([]);
    // const pages = [10, 20, 50, 100]
    // const [page, setPage] = useState(0);
    // const [rowsPerPage, setRowsPerPage]=useState(pages[page]);
    // const [isLoading, setLoading] = useState(true);
    // let res = null

    const assetAPIURL = 'https://api.digit.mn'
    const [favorite, setFavorite] = useState([])

    useEffect(() => {
        getFavorites()
        // setLoading(true)
        // getData();
    }, []);

    const getFavorites = async () => {
        if (user) {
            const res = await apiService.find('useds', 'user=' + user.id)
            setFavorite(res.map(f => {
                switch (entity) {
                    case 'com-apps': return {[entity]: f.com_app !== null ? f.com_app: null}
                    case 'com-services': return {[entity]: f.com_service !== null ? f.com_service: null}
                    case 'com-systems': return {[entity]: f.com_system !== null ? f.com_system: null}
                    case 'com-platforms': return {[entity]: f.com_platform !== null ? f.com_platform : null}
                    default: return {}
                }
            }).filter(f => f[entity] !== null))
        }
    }


    // const getData = async () => {
    //     try {
    //         let res = null
    //         window.scrollTo(0, 0);
    //         res = menuData
    //         if (Array.isArray(res)) {
    //             let rating_com = res.filter(el => ratingType in el)
    //             setRating(rating_com)
    //         }
    //         setLoading(false)
    //     }
    //     catch(e) {
    //         console.debug('API content getting error', e)
    //         setLoading(false)
    //     }
    // }

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // }
    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value),10);
    //     setPage(0);
    // }
    // const recordsAfterPaging = (records) => {
    //     return records.slice(page*rowsPerPage,(page+1)*rowsPerPage);
    // }

    function changeOverColor(e) {
        e.target.style.color = '#015ab4';
    }

    function changePrimaryColor(e) {
        e.target.style.color = '#000';
    }

    const getTypeLabel = (item) => {
        if (entity === 'companies') {
            return <Typography variant="caption" textAlign="justify">
                Байгууллага:&nbsp;
                <strong>{item.companyType ? item.companyType.name : "Төрөл тохируулаагүй"}</strong>
            </Typography>
        } else if (entity === 'com-services') {
            return <Typography variant="caption" textAlign="justify">
                Үйлчилгээ:&nbsp;
                <strong>{item.serviceTypes.length > 0 ? item.serviceTypes[0].name : "Төрөл тохируулаагүй"}</strong>
            </Typography>
        } else {
            return <Typography variant="caption" textAlign="justify">
                {item.channel.name}:&nbsp;
                <strong>{item.productTypes.length > 0 ? item.productTypes[0].name : "Төрөл тохируулаагүй"}</strong>
            </Typography>
        }
    }

    const handleInsert = async (newValue) => {
        try {
            let property = 'com_app'
            switch (entity) {
                case  'com-services': property = 'com_service'; break;
                case  'com-apps': property = 'com_app'; break;
                case  'com-systems': property = 'com_system'; break;
                case  'com-platforms': property = 'com_platform'; break;
            }
            let res = await apiService.find('useds', `user=${user.id}&${property}=${newValue}`)
            if (!res.length) {
                res = await apiService.insert('useds', {user: user.id, [property]: newValue})
                if (res)
                    getFavorites()
            }

        } catch (e) {
            console.debug('error ', e)
        }
    };

    return (
        <Box width={'100%'}>
            {
                items && items.length ?
                    <>
                        {
                            items.map((item, i) => (
                                <Card key={i + 'row'} sx={{marginBottom: 2, padding: 2, borderRadius: 4}}>
                                    <Box key={i} display={'inline-flex'}  width={'100%'}>
                                        <Box style={{borderBottom: "none"}} marginRight={2}>
                                            <Box display={'flex'} justifyContent="center">
                                                <CardMedia
                                                    image={entity === 'com-services' ? item.coverPhoto ? assetAPIURL + item.coverPhoto.url : '' : item.profilePhoto ? assetAPIURL + item.profilePhoto.url : ''}
                                                    sx={{
                                                        height: 150,
                                                        width: 150,
                                                        backgroundSize: '100% 100% ',
                                                        borderRadius: '10%',
                                                        boxShadow: '0 4px 8px silver'
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                        <Box style={{borderBottom: "none"}} flex={1} >
                                            <Box display="flex" flexDirection="row" justifyContent="space-between"
                                                 minHeight={48}>
                                                <Typography component={Link} color={'#000'} variant="h6"
                                                            style={{textDecoration: "none"}}
                                                            to={`/product/${entity}/${item.id}`}
                                                            onMouseOver={changeOverColor}
                                                            onMouseLeave={changePrimaryColor} fontWeight="bold">
                                                    {item.name}
                                                </Typography>
                                                <Box display={'inline-flex'} alignItems={'flex-start'} height={48}>
                                                    <Box display={"inline-flex"} alignItems={"center"} height={32}>
                                                        <Rating size="small"
                                                                value={item.score ? item.score : 0}/>
                                                    </Box>
                                                    <Box display={"inline-flex"} alignItems={"center"} marginLeft={1}
                                                         height={32}>
                                                        <Typography fontWeight={800} fontSize={"20px"}>
                                                            {item.score ? item.score : 0}
                                                        </Typography>
                                                        <Typography fontWeight={800} color={'gray'} fontSize={"16px"}>
                                                            /10
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Typography variant="caption" color="text.secondary" component="p"
                                                            textAlign="justify" paddingBottom={1}>
                                                    <ShowMoreText
                                                        lines={3}
                                                        more="Дэлгэрэнгүй"
                                                        less="Хураангуй"
                                                        anchorClass=""
                                                        expanded={false}
                                                    >
                                                        {_unescape(item.description)}
                                                    </ShowMoreText>
                                                </Typography>
                                            </Box>
                                            <Box display={'inline-flex'} justifyContent={'space-between'}
                                                 width={'100%'}>
                                                {getTypeLabel(item)}
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        color: "#fff",
                                                    }}
                                                    onClick={() => handleInsert(item.id)}
                                                >
                                                    {
                                                        entity !== 'companies' ?
                                                            favorite.findIndex(s => s[entity] && s[entity].id === item.id) !== -1 ?
                                                                <Favorite style={{fill: "red"}}/> :
                                                                <FavoriteBorder style={{fill: "red"}}/>
                                                            :
                                                            <></>
                                                    }
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Card>
                            ))
                        }
                    </> :
                    <Box display={'flex'} alignItems={'center'} flexDirection={'column'} justifyContent={"center"}
                         width={"100%"} height={'300px'}>
                        <AppsOutage sx={{fontSize: '36px'}}/>
                        <Typography fontWeight={'bold'}>Илэрцээр мэдээлэл олдсонгүй</Typography>
                    </Box>
            }

        </Box>
    )
}

export default CardMediaList