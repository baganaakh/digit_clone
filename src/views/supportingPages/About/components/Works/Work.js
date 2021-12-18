import React from 'react'
import {useTheme} from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {Box, Divider, Grid, Typography} from '@material-ui/core'
import WorkImage from 'svg/work.jpg'
import TodoImage from 'svg/todo.jpg'
import lineImage from 'svg/vertical.jpg'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

export function replaceNewLine(str, id) {
  const newStr = str.replaceAll('\n', ' <br/> ')
  const array = newStr.split('<br/> ')
  return array.map((item, i) => {
    //return item === '' ? <><br/><br/></> : item
    return <> {id ? <><CheckCircleIcon color={'primary'}/>{' ' + item} </> : item} <br/><br/></>
  })
}

const Work = ({items}) => {
  const theme = useTheme()

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  })

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5.5}>
          {
            <Box marginLeft={'10%'}>
              <br/>
              <br/>
              <br/>
              <Typography
                variant="h6"
                color="black"
                sx={{
                  fontWeight: 700,
                }}
              >
                Дижит платформын зорилго
              </Typography>
              <Divider style={{width: '51%', background: 'orange'}}/>
              <Divider style={{width: '51%', background: 'orange'}}/>
              <Divider style={{width: '51%', background: 'orange'}}/>
              <br/>
              <Box width={'100%'}>
                <Typography variant="body2" fontWeight="500" align="justify">
                  {items && items[0] && items[0].platform && replaceNewLine(items[0].platform)}
                </Typography>
              </Box>
              <br/>
              <Box component={Typography} align="center"><img width={300} src={WorkImage}/> </Box>
            </Box>
          }

        </Grid>
        <Grid item xs={12} sm={1}>
          <Box marginTop={'80%'}>
            <img height={'80%'} src={lineImage}/>
          </Box>
        </Grid>
        <Grid item xs={12} sm={5.5}>
          <Box>
            <br/>
            <br/>
            <br/>
            <br/>
            <img width={'60%'} src={TodoImage}/>
            <br/>
            <br/>
            <br/>
            {
              <Box>
                <br/>
                <br/>
                <br/>
                <Typography
                  variant="h6"
                  color="black"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Редакцын бодлого
                </Typography>
                <Divider style={{width: '30%', background: 'orange'}}/>
                <Divider style={{width: '30%', background: 'orange'}}/>
                <Divider style={{width: '30%', background: 'orange'}}/>
                <br/>
                <Box width={'90%'}>
                  <Typography variant="body2" fontWeight="500" align="justify">
                    {items && items[0] && items[0].editor && replaceNewLine(items[0].editor)}
                  </Typography>
                </Box>
                <br/>
                <br/>
              </Box>
            }
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Work
