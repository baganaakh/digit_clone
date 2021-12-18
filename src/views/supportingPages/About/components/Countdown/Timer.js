import React, {Component} from 'react'
// import moment from 'moment';
import './Timer.css'
import {Grid,Box, Typography} from '@mui/material'

class CountDown extends Component {
  constructor(props) {
    super(props)
    this.count = this.count.bind(this)
    this.state = {
      days: 0,
      minutes: 0,
      hours: 0,
      secounds: 0,
      time_up: ''
    }
    this.x = null
    this.deadline = null
  }

  count() {
    var now = new Date().getTime()
    var t = this.deadline - now
    var dd = Math.floor(t / (1000 * 60 * 60 * 24))
    var hh = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var mm = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
    var ss = Math.floor((t % (1000 * 60)) / 1000)

    var days = dd < 10 ? '0' + dd : dd
    var hours = hh < 10 ? '0' + hh : hh
    var minutes = mm < 10 ? '0' + mm : mm
    var seconds = ss < 10 ? '0' + ss : ss

    this.setState({days, minutes, hours, seconds})

    if (t < 0) {
      clearInterval(this.x)
      this.setState({
        days: 0,
        minutes: 0,
        hours: 0,
        seconds: 0,
        time_up: 'TIME IS UP'
      })
    }
  }

  componentDidMount() {
    this.deadline = new Date('Jan 20, 2022 09:00:00').getTime()
    this.x = setInterval(this.count, 1000)
  }

  render() {
    const {days, seconds, hours, minutes} = this.state
    return (
      <Grid
        // display="flex"
        // flexDirection={'column'}
        style={{position: 'relative', justifyContent: 'center', alignItems: 'center'}}
        id="countdown"
        container spacing={2}
      >
        <Grid xs={2} className='box'>
          <Typography
            variant="h6"
          >
            {days}
          </Typography>
          <Typography
            variant="h6"
          >
            Өдөр
          </Typography>
        </Grid>
        <Grid xs={2} className='box'>
          <Typography
            variant="h6"
          >
            {hours}
          </Typography>
          <Typography
            variant="h6"
          >
            Цаг
          </Typography>
        </Grid>
        <Grid xs={2} className='box'>
          <Typography
            variant="h6"
          >
            {minutes}
          </Typography>
          <Typography
            variant="h6"
          >
            Минут
          </Typography>
        </Grid>
        <Grid xs={2} className='box'>
          <Typography
            variant="h6"
          >
            {seconds}
          </Typography>
          <Typography
            variant="h6"
          >
            Секунд
          </Typography>
        </Grid>
      </Grid>
    )
  }
}

export default CountDown
