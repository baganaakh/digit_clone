import React, {useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { CardMedia, Divider } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea'
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import apiService from 'api/apiService'

const Team = () => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const assetAPIURL = 'https://api.digit.mn'

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let res = await apiService.find('users','_sort=sequence:asc&homepage=true');
        console.debug(' users ' + JSON.stringify(res.length))
        if (res.length > 0)
            setUsers(res)
        setLoading(false)
    }
    catch(e) {
      console.debug('API content getting error: ' + e)
      setLoading(false)
    }
  }

  return (
    <Box >
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: '700',
          }}
          gutterBottom
          color={'textSecondary'}
          align={'center'}
          justifyContent={'center'}
          >
          Манай хамт олон          
        </Typography>
        <Divider style={{width: "12%", background: "orange", marginLeft: "44%"}} />
        <Divider style={{width: "12%", background: "orange", marginLeft: "44%"}} />
        <Divider style={{width: "12%", background: "orange", marginLeft: "44%"}} />
      </Box>
      <Grid container spacing={2}>
        {users.map((item, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Box component={CardActionArea}>
              <Box
                component={Card}
                borderRadius={3}
                boxShadow={3}
                alignItems={'center'}
                justifyContent={'center'}
                height={400}
                sx={{
                  textDecoration: 'none',
                  transition: 'all .2s ease-in-out',
                  '&:hover': {
                    transform: `translateY(-${theme.spacing(1 / 2)})`,
                  },
                }}
              >
                
                <CardContent align={'center'} >
                  {/* <Box
                    component={Avatar}
                    src={item.profile ? assetAPIURL + item.profile.url : "" }                    
                    height={240}
                    width={180}
                    style={{backgroundSize: '100% 100%'}}
                  /> */}
                  <CardMedia                  
                    image={item.profile ? assetAPIURL + item.profile.url : "" }                                                                 
                    sx={{
                      height: 220,
                      width: 220,
                      backgroundSize: '100% 100% ',
                      borderRadius: '50%',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  />
                  <Box marginTop={4}>
                    {/* <ListItemText primary={item.lastname + item.firstname} secondary={item.position} /> */}
                    <Typography fontWeight={'700'} variant={'h5'} color={'black'}>
                      {item.lastname + item.firstname}
                    </Typography>
                    <Typography variant={'subtitle2'} color={'textSecondary'}>
                      {item.position}
                    </Typography>
                  </Box>
                </CardContent>
                </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Team;
