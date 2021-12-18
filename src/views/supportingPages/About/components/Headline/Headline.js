/* eslint-disable react/no-unescaped-entities */
import React, {useState} from 'react'
import {useTheme} from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {FaWindowClose} from 'react-icons/fa'
import CardMedia from '@material-ui/core/CardMedia'
import Card from '@material-ui/core/Card'
import apiService from '../../../../../api/apiService'
import {Alert, Collapse} from '@mui/material'
import slidePic from './slidePic.png'

const Headline = () => {
  const theme = useTheme()
  const [mail, setMail] = useState('')
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(false)

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  })


  const handleSend = () => {
    if (mail === '') return
    apiService.noAuthInsert('article-subscriptions', {mail: mail}).then(
      (e) => {
        if (e.statusCode === 400) {
          setOpen(true)
          setError(true)
        } else {
          setOpen(true)
          setError(false)
        }
      })
  }
  return (
    <Box style={{position: 'relative', justifyContent: 'center', alignItems: 'center'}}>
      <Box paddingX={2}>
        <Box
          component={Card}
          width={'100%'}
          height={'100%'}
          borderRadius={3}
        >
          <CardMedia
            image={slidePic}
            sx={{
              height: 480,
              backgroundSize: '100% 100%',
            }}
          >
            <Box paddingLeft={15} paddingTop={10} data-aos={isMd ? 'fade-right' : 'fade-up'}>
              <Box marginBottom={2}>
                <Typography
                  variant="h4"
                  color="white"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Дижит платформ 2022 оны 1-р сарын 20нд нээлтээ хийнэ.
                </Typography>
              </Box>
              <Box marginBottom={3}>
                {
                  <Typography
                    variant="h8"
                    component="p"
                    color="whitesmoke"
                    align="justify"
                    sx={{fontWeight: 400}}
                  >
                    Дижитал шийдэл, үйлчилгээний зах Дижит платформ.
                  </Typography>
                }
              </Box>
              <Box
                display="flex"
                flexDirection={'column'}
                justifyContent={'center'}
                component={'form'}
                noValidate
                autoComplete="off"
                sx={{
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    bgcolor: 'background.paper',
                  },
                }}
                width={570}
                paddingTop={15}
                fullWidth
              >
                <Box
                  display="flex"
                  flexDirection={'row'}
                >
                  <TextField
                    label={
                      <Typography
                        color={'primary'}
                        component={'span'}
                        variant={'inherit'}
                      >
                        Мэдээлэл тогтмол авахыг хүсвэл мэйлээ үлдээнэ үү
                      </Typography>}
                    variant="standard"
                    name="mail"
                    fullWidth
                    onChange={(e) => setMail(e.target.value)}
                    sx={{input: {color: 'white'}}}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleSend}
                  >
                    Илгээх
                  </Button>
                </Box>
                <Collapse in={open}>
                  <Alert
                    severity={error ? 'warning' : 'success'}
                    action={<Button onClick={() => setOpen(false)}><FaWindowClose/></Button>}
                  >
                    {error ? 'Зөв имэйл хаяг оруулна уу' : 'Амжилттай илгээгдлээ'}
                  </Alert>
                </Collapse>
              </Box>
            </Box>
          </CardMedia>
        </Box>
      </Box>
    </Box>

  )
}

export default Headline
