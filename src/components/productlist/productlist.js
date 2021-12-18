import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { Avatar, Box, CardHeader, CardMedia, CardContent, CardActionArea, TablePagination, TableContainer,Table,TableBody,TableRow,TableCell, TableHead, Accordion, AccordionSummary, AccordionDetails, colors, Typography, IconButton, Chip} from "@material-ui/core";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { _unescape } from 'utils/helperFunction';
import Rating from '@material-ui/lab/Rating';
import ShowMoreText from "react-show-more-text";
import moment from 'moment';
import { FaCalendarCheck, FaTrash, FaCalendarAlt } from 'react-icons/fa';
import { withRouter, useHistory } from 'react-router-dom';
import { Product, Products } from 'views/supportingPages';
import AdminPageCrud from 'pages/admin/render/pageRender.crud'

const ProductList = ({ items, entity, entityName, isPagination, rating, handleOpen }) => {
    const pages = [10, 20, 50, 100]
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage]=useState(pages[page]);
    const [isLoading, setLoading] = useState(true);
    const history = useHistory()
    let res = null

    const assetAPIURL = 'https://api.digit.mn'

    // useEffect(() => {       
    //     setLoading(true)
    //     getData();
    // }, []);

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);        
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value),10);
        setPage(0);
    }
    const recordsAfterPaging = (records) => {  
        return records.slice(page*rowsPerPage,(page+1)*rowsPerPage);
    } 

    function changeOverColor(e) {
        e.target.style.color = '#015ab4';
    }

    function changePrimaryColor(e) {
    e.target.style.color = '#000';
    }

    return (
        <Box width={'100%'}>
            {
                items && items.length ?
                <>
                    <Table border={1} style={{borderTop: 0, borderLeft: 0, borderBottom: 0, borderRight: 0}}>
                        <TableBody>
                        {
                            recordsAfterPaging(items).map((item, i) => (
                                <Box border={1} borderColor={'#cecccc'} marginBottom={2}>
                                    <TableRow  key={i}>         
                                        <TableCell  style={{ borderBottom: 0, borderTop: 0, borderLeft: 0, padding: 0 }} width={'500px'}>
                                            <Box justifyContent="center">
                                                <CardHeader
                                                    avatar={
                                                        <Box
                                                            component={Avatar}
                                                            variant="rounded"
                                                            width={80}
                                                            height={80}
                                                            border={1}
                                                            borderColor={'#cecccc'}
                                                            src={item.profilePhoto && item.profilePhoto.url ? assetAPIURL + item.profilePhoto.url : "" }
                                                        />
                                                    }
                                                    title={
                                                        <Box
                                                            display="flex"
                                                            flexDirection="row"                                                                 
                                                        >
                                                            <Typography                    
                                                                variant={'body2'}
                                                                align={'center'}
                                                                fontWeight={700}  
                                                            >
                                                                {item.name}
                                                            </Typography>
                                                        </Box>
                                                    }
                                                    subheader={
                                                        <Box>
                                                            <IconButton>
                                                                <Rating size="small" value={rating && rating.length} />
                                                                <Typography variant={'caption'}>
                                                                    ({rating && rating.length ? rating.length : 0})
                                                                </Typography>                                                                
                                                            </IconButton>
                                                            <Typography variant="caption" textAlign="justify">
                                                                {item.channel && item.channel.name ? item.channel.name + ":" : entityName + ":"}
                                                            </Typography>&nbsp;
                                                            <Typography variant="caption" fontWeight="700" textAlign="justify">
                                                            {
                                                                entity === 'com-services' ?
                                                                    item.serviceTypes && item.serviceTypes.length > 1 ? (
                                                                    item.serviceTypes.map( (t, i) => (
                                                                        i === item.serviceTypes.length - 1 ? t.name : t.name + ", "
                                                                    ))
                                                                    ) : item.serviceTypes && item.serviceTypes[0] && item.serviceTypes[0].name
                                                                :   item.productTypes && item.productTypes.length > 1 ? (
                                                                        item.productTypes.map( (t, i) => (
                                                                            i === item.productTypes.length - 1 ? t.name : t.name + ", "
                                                                        ))
                                                                    ) : item.productTypes[0].name
                                                            }
                                                            </Typography> 
                                                        </Box>
                                                    }
                                                />  
                                            </Box>
                                        </TableCell>
                                        <TableCell  style={{ borderBottom: 0, borderTop: 0, borderLeft: 0, padding: 0 }} width={'100px'}>
                                            <Box display="flex" padding={1} alignItems={"center"} justifyContent={"center"} >
                                                <Chip
                                                    label={item.active ? 'идэвхтэй' : 'идэвхгүй'}
                                                    style={{backgroundColor: "#c7e7c0", color: "#68c553", justifyContent: "center"}}
                                                    
                                                /> 
                                            </Box>
                                        </TableCell>
                                        <TableCell  style={{ borderBottom: 0, borderTop: 0, borderLeft: 0, padding: 0  }}  width={'220px'}>
                                            <Box display="flex" alignItems={"center"} justifyContent={"center"} flexDirection="column" >
                                                <Typography variant="caption" textAlign="center" fontWeight={700}>
                                                    Мэдээлэл засагдсан огноо
                                                </Typography>
                                                <Box display="flex" alignContent="center" justifyContent="center" flexDirection="row">
                                                    <FaCalendarAlt size="18" />&nbsp;&nbsp;
                                                    <Typography
                                                        variant={'caption'}
                                                        fontWeight={500}
                                                    >
                                                        {moment(item.updatedAt).format("YYYY-MM-DD") }
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell  style={{ borderBottom: 0, borderTop: 0, borderLeft: 0, padding: 0 }}  width={'150px'}>
                                            <Box display="flex" padding={1} alignItems={"center"} justifyContent={"center"} flexDirection="column" >
                                                <Chip
                                                    label={entityName} 
                                                    variant="outlined"                                                   
                                                    style={{backgroundColor: "#c8d5f9", color: "#3463f4", borderColor: "#3463f4"}}
                                                /> 
                                            </Box>
                                        </TableCell>
                                        <TableCell  style={{ borderBottom: 0, borderTop: 0, borderLeft: 0, padding: 0 }}  width={'225px'}>
                                            <Box display="flex" alignItems={"center"} justifyContent={"center"} >
                                                <Typography
                                                    variant={'caption'}
                                                    align={'center'}
                                                >
                                                    {
                                                        item.industries && item.industries.length > 1 ? (
                                                            item.industries.map( (t, i) => (
                                                                i === item.industries.length - 1 ? t.name : t.name + ", "
                                                            ))
                                                        ) : item.industries && item.industries[0] && item.industries[0].name
                                                    }
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell  style={{ borderBottom: 0, borderTop: 0, borderLeft: 0, padding: 0 }}  width={'225px'}>
                                            <Box display="flex" alignItems={"center"} justifyContent={"center"} >
                                                <Typography
                                                    variant={'caption'}
                                                    align={'center'}
                                                >
                                                    {
                                                        item.functions && item.functions.length > 1 ? (
                                                            item.industries.map( (t, i) => (
                                                                i === item.functions.length - 1 ? t.name : t.name + ", "
                                                            ))
                                                        ) : item.functions && item.functions[0] && item.functions[0].name
                                                    }
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell  style={{ borderBottom: 0, borderTop: 0, borderLeft: 0, padding: 0 } }  width={'100px'}>
                                            <Box display="flex" padding={1} alignItems={"center"} justifyContent={"center"} >
                                                <Typography
                                                    variant={'caption'}
                                                    gutterBottom
                                                    align={'center'}
                                                >
                                                    {
                                                        item.user && item.user.name ? item.user.name  : "Батбаатар"
                                                    }
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell  style={{ borderBottom: 0, borderTop: 0, borderLeft: 0, borderRight: 0,  padding: 0 }}  width={'25px'}>
                                            <Box alignItems="center" justifyContent="center">
                                                <IconButton>
                                                    <FaCalendarCheck style={{color: "#fea686"}} size={15} onClick={() =>{ 
                                                        history.push(`/products/${entity}/${item.id}`)
                                                        
                                                    }} />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                        <TableCell  style={{ borderBottom: 0, borderTop: 0, borderLeft: 0, borderRight: 0,  padding: 0 }}  width={'25px'}>
                                            <Box alignItems="center" justifyContent="center">
                                                <IconButton>
                                                    <FaTrash size={15} />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>  
                                </Box>
                            ))
                        }    
                        </TableBody>
                    </Table>
                    {
                        isPagination === 'true' ?
                        <TablePagination
                            component="div"
                            variant="outlined" 
                            shape="rounded"
                            page={page}
                            rowsPerPageOptions={pages}
                            rowsPerPage={rowsPerPage}
                            count={items.length}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage={<Typography variant="body2">Илэрц: </Typography>}
                        /> : ""
                    }
                </> : ""
            }
            
        </Box>
    )
}

export default ProductList