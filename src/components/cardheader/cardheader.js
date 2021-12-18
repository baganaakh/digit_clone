import React, {useState, useEffect, useRef} from 'react'
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  useMediaQuery,
  Button
} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Slider from 'react-slick'
import {useTheme} from '@material-ui/core/styles'
import Rating from '@material-ui/lab/Rating'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import UploadService from 'utils/fileUpload'

const CardMediaHeader = ({items, slideImages, isProduct, reviews, itemName, isCrud, getCoverFn}) => {
  const assetAPIURL = 'https://api.digit.mn'
  const theme = useTheme()
  const [selectedCoverImage, setSelectedCoverImage] = useState([])
  const [selectedProfileImage, setSelectedProfileImage] = useState([])
  const inputFile = useRef(null)
  const inputFile1 = useRef(null)
  const [image, setImage] = useState('')
  const [imageProfile, setImageProfile] = useState('')

  useEffect(() => {
    if (selectedCoverImage && selectedCoverImage.length) {

    } else {
      setSelectedCoverImage(items && items.coverPhoto ? items.coverPhoto.url : [])
    }

    if (selectedProfileImage && selectedProfileImage.length) {

    } else {
      setSelectedProfileImage(items && items.profilePhoto ? items.profilePhoto.url : [])
    }


  }, [items])

  const isXs = useMediaQuery(theme.breakpoints.up('xs'), {
    defaultMatches: true,
  })
  const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  })
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  })
  const isLg = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  })


  let slidesToShow = 1
  let slidesToShow1 = 1
  if (isXs) {
    slidesToShow = 1
  }
  if (isSm) {
    slidesToShow = 1
  }
  if (isMd) {
    slidesToShow = 1
  }
  if (isLg) {
    slidesToShow = 1
  }

  const sliderOpts = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  }

  const handleChange = e => {
    if (e.target.files.length) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmission = () => {
    inputFile.current.click()
  }

  const handleSubmission1 = () => {
    inputFile1.current.click()
  }

  const handleUpload = () => {
    console.debug('handleUpload duudagdlaa', image)
    // upload(image, 'coverPhoto', getProfileFn, getCoverFn)

    UploadService.upload(image, (event) => {
    })
      .then((response) => {
        return response.data
      })
      .then((files) => {
        console.debug(' file ' + JSON.stringify(files))

        let newFile = []
        //newFile = this.state.fileInfos
        newFile.push(files)
        if (newFile && newFile.length) {
          newFile.map(item => (
            getCoverFn(item, 'coverPhoto'),
              setSelectedCoverImage(item[0].url)
          ))
        }
      })
      .catch((error) => {
        console.debug('songogdson file huulahad aldaa garlaa', error)
      })
  }


  const handleProfileChange = e => {
    if (e.target.files.length) {
      setImageProfile(e.target.files[0])
    }
  }
  const handleProfileUpload = () => {
    console.log('handleProfileUpload duudagdlaa')
    // upload(image, 'coverPhoto', getProfileFn, getCoverFn)

    UploadService.upload(imageProfile, (event) => {
    })
      .then((response) => {
        return response.data
      })
      .then((files) => {
        console.log(' file ' + JSON.stringify(files))

        let newFile = []
        //newFile = this.state.fileInfos
        newFile.push(files)
        if (newFile && newFile.length) {
          newFile.map(item => (
            getCoverFn(item, 'profilePhoto'),
              setSelectedProfileImage(item[0].url)
          ))
        }
      })
      .catch((error) => {
        console.log('songogdson file huulahad aldaa garlaa', error)
      })
  }

  return (
    isProduct === 'false' && slideImages && slideImages.length ?
      (
        <Slider {...sliderOpts}>
          {slideImages.map((item, i) => (
            <Box key={i} marginBottom={2}>
              <Box
                width={'100%'}
                height={'100%'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Box
                  component={Card}
                  width={'100%'}
                  height={'100%'}
                  display={'flex'}
                  flexDirection={'column'}
                >
                  <CardMedia
                    image={assetAPIURL + item}
                    align={'left'}
                    sx={{
                      height: 400,
                      backgroundSize: '100% 100% ',
                    }}
                  >
                    <CardMedia
                      image={items.logo ? assetAPIURL + items.logo.url : ''}
                      sx={{
                        height: 200,
                        width: 200,
                        marginLeft: '3%',
                        marginTop: '300px',
                        backgroundSize: '100% 100% ',
                        borderRadius: '50%',
                        backgroundColor: '#e5e5e5',
                        border: '5px solid white',
                        borderColor: '#fff'
                      }}
                    />
                  </CardMedia>
                  <Box component={CardActions} justifyContent={'space-between'}>
                    <Box
                      component={CardContent}
                      display={'flex'}
                      flexDirection={'column'}
                      width={'80%'}
                    >
                      <Box
                        component={Typography}
                        variant={'h6'}
                        gutterBottom
                        fontWeight={700}
                        align={'left'}
                        marginLeft={30}
                      >
                        {items.name} {' '}
                        <CheckCircleIcon style={{color: '#2F64F9'}}/>
                        <Typography
                          variant={'body2'}
                          align={'justify'}
                          color="textSecondary"
                        >
                          {items.slogan}
                        </Typography>
                        {
                          items.direction ?
                            <>
                              <Typography variant="caption" textAlign="justify">
                                Үйл ажиллагааны чиглэл:
                              </Typography>&nbsp;
                              <Typography variant="caption" fontWeight="700" textAlign="justify">
                                {/* {items.directions && items.directions.length > 1 ? (
                                                                items.directions.map( (t, i) => (
                                                                    i === items.directions.length - 1 ? t.name : t.name + ", "
                                                                ))
                                                            ) : items.directions && items.directions[0] && items.directions[0].name} */}
                                {items.direction ? items.direction.name : ''}
                              </Typography>
                            </> : ''
                        }
                      </Box>
                    </Box>
                    <Box marginRight={2} display="flex" flexDirection="column" width={'20%'}>
                      <Button variant="contained">
                        {itemName}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Slider>
      ) :
      (
        <Box marginBottom={2}>
          <Box
            width={'100%'}
            height={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Box
              component={Card}
              width={'100%'}
              height={'100%'}
              display={'flex'}
              flexDirection={'column'}
            >
              <CardMedia
                //image={items && items.coverPhoto ? assetAPIURL + items.coverPhoto.url : BackgroundImg}
                image={selectedCoverImage !== undefined && selectedCoverImage !== null && selectedCoverImage !== '' ? assetAPIURL + selectedCoverImage : ''}
                align={'left'}
                sx={{
                  height: 400,
                  backgroundSize: '100% 100% ',
                }}
              >
                {
                  isCrud === 'true' ? (
                    <Box padding={1} display="flex" justifyContent="end">
                      <input
                        type="file"
                        id="file"
                        ref={inputFile}
                        style={{display: 'none'}}
                        onChange={handleChange}
                      />
                      <IconButton
                        id="chooseFile"
                        style={{backgroundColor: '#cecccc'}}
                        onClick={handleSubmission}
                      >
                        <CameraAltIcon/>
                      </IconButton>&nbsp;
                      <IconButton
                        id="uploadFile"
                        style={{backgroundColor: '#cecccc'}}
                        onClick={handleUpload}
                      >
                        <FileUploadIcon/>
                      </IconButton>
                    </Box>
                  ) : ''
                }
                <CardMedia
                  // image={items && items.profilePhoto ? assetAPIURL + items.profilePhoto.url : items && items.company && items.company.logo ? assetAPIURL + items.company.logo.url : "" }
                  image={selectedProfileImage !== undefined && selectedProfileImage !== null && selectedProfileImage !== '' ? assetAPIURL + selectedProfileImage : ''}
                  sx={{
                    height: 200,
                    width: 200,
                    marginLeft: '3%',
                    marginTop: isCrud === 'true' ? '260px' : '300px',
                    backgroundSize: '100% 100% ',
                    borderRadius: '10%',
                    border: '5px solid white',
                    borderColor: '#fff'
                  }}
                >
                  {
                    isCrud === 'true' ? (
                      <Box padding={1} display="flex" justifyContent="end">
                        <input
                          type="file"
                          id="file1"
                          ref={inputFile1}
                          style={{display: 'none'}}
                          onChange={handleProfileChange}
                        />
                        <IconButton
                          id="chooseFile1"
                          style={{backgroundColor: '#cecccc'}}
                          onClick={handleSubmission1}
                        >
                          <CameraAltIcon/>
                        </IconButton>&nbsp;
                        <IconButton
                          id="uploadFile1"
                          style={{backgroundColor: '#cecccc'}}
                          onClick={handleProfileUpload}
                        >
                          <FileUploadIcon/>
                        </IconButton>
                      </Box>
                    ) : ''
                  }
                </CardMedia>
              </CardMedia>
              <Box component={CardActions} justifyContent={'space-between'}>
                <Box
                  component={CardContent}
                  display={'flex'}
                  flexDirection={'column'}
                  width={'100%'}
                >
                  <Box>
                    <Typography
                      variant={'h5'}
                      fontWeight={700}
                      gutterBottom
                      align={'left'}
                      marginLeft={30}
                    >
                      {items && items.name} {' '}
                    </Typography>
                    <Typography
                      variant={'body2'}
                      align={'justify'}
                      color="textSecondary"
                      gutterBottom
                      marginLeft={30}
                      marginRight={10}
                    >
                      {items && items.slogan}
                    </Typography>
                    <Box
                      marginLeft={30}
                      //marginTop={2}
                      marginRight={10}
                      display="flex"
                      flexDirection="row"
                    >

                    </Box>
                    <Box flexDirection="row" justifyContent={'center'} marginLeft={30} alignItems={'center'}>
                      <IconButton
                        size="small"
                        sx={{
                          color: '#fff',
                        }}
                      >
                        <Rating size="small" value={reviews ? reviews.length : 0}/>
                      </IconButton>&nbsp;
                      <Typography variant={'caption'}>({reviews ? reviews.length : 0})</Typography>&nbsp;&nbsp;
                      <Typography variant={'caption'}>
                        Байгууллага:&nbsp;
                      </Typography>
                      <Typography variant={'caption'} fontWeight={'bold'}>
                        {items && items.company ? items.company.name : ''} {' '}
                      </Typography>
                    </Box>
                    <Box
                      marginLeft={30}
                      marginRight={10}
                      display="flex"
                      flexDirection="row"
                      alignItems={'center'}
                    >
                      {
                        items && items.productTypes && items.productTypes.length ?
                          <>
                            <Typography variant="caption" textAlign="justify">
                              {items.channel && items.channel.name ? items.channel.name + ':' : 'Суваг:'}
                            </Typography>&nbsp;
                            <Typography variant="caption" fontWeight="700" textAlign="justify">
                              {items.productTypes && items.productTypes.length > 1 ? (
                                items.productTypes.map((t, i) => (
                                  i === items.productTypes.length - 1 ? t.name : t.name + ', '
                                ))
                              ) : items.productTypes && items.productTypes[0] && items.productTypes[0].name}
                            </Typography>
                          </> : ''
                      }
                    </Box>
                  </Box>
                </Box>
                {
                  itemName !== '' && itemName !== null && itemName !== undefined ?
                    <Box marginRight={2} display="flex" flexDirection="column" width={'25%'}>
                      <Button variant="contained">
                        Demo үзэх хүсэлт илгээх
                      </Button>
                      <br/>
                      <Button
                        variant="outlined"
                        style={{borderColor: '#e4e2e2', color: '#000'}}
                      >
                        Үнэлгээ хийх
                      </Button>
                    </Box> : ''
                }
              </Box>
            </Box>
          </Box>
        </Box>

      )
  )

}

export default CardMediaHeader