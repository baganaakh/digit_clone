import React from 'react'
import {useTheme} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import trustedCompany from './trustedCompany.jpg'
import {Avatar} from '@material-ui/core'

const Partners = () => {
  const theme = useTheme()
  return (
    <Box display="flex" flexDirection={'row'}
         bgcolor={'white'}
    >
      <Box marginTop={2} marginRight={4} width={'20%'} >
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'black'}
          align={'center'}
        >
          Бидэнд итгэсэн:
        </Typography>
      </Box>
      <Box
        component="img"
        width={'70%'}
        src={trustedCompany}
        alt="..."
        // sx={{
        //   filter:
        //     theme.palette.mode === 'dark'
        //       ? 'brightness(0) invert(0.7)'
        //       : 'none',
        // }}
      />
    </Box>
  )
}

export default Partners
