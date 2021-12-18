import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import { useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import apiService from 'api/apiService'

const Numbers = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [viewPortEntered, setViewPortEntered] = useState(false);
  const [numProducts, setNumProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const setViewPortVisibility = (isVisible) => {
    if (viewPortEntered) {
      return;
    }

    setViewPortEntered(isVisible);
  };

  useEffect(() => {
    getData();
}, []);

const getData = async () => {
  try {
      let tmpImage = []
      let res = null;

      res = await apiService.find('num-products');
        console.debug(' numProducts ' + JSON.stringify(res.length))
        if (res.length > 0)
            setNumProducts(res)

      setLoading(false)
  }
  catch(e) {
      console.debug('API content getting error')
      setLoading(false)
  }
}
const statData=[
  {"id":1,"name":"Company","descr":"508","title":"Дижитал бизнесүүд","published_at":"2021-10-16T08:42:56.000Z","created_at":"2021-10-16T00:42:56.000Z","updated_at":"2021-12-16T04:18:17.000Z"},{"id":2,"name":"System","descr":"232","title":"Систем","published_at":"2021-10-16T08:42:56.000Z","created_at":"2021-10-16T00:42:56.000Z","updated_at":"2021-12-16T04:18:33.000Z"},{"id":3,"name":"Application","descr":"198","title":"Аппликейшн","published_at":"2021-10-16T08:42:56.000Z","created_at":"2021-10-16T00:42:56.000Z","updated_at":"2021-12-16T04:18:25.000Z"},{"id":4,"name":"Платформ","descr":"191","title":"Платформ","published_at":"2021-10-16T08:42:56.000Z","created_at":"2021-10-16T00:42:56.000Z","updated_at":"2021-12-16T04:18:43.000Z"}]
console.log("-> numProducts", numProducts);
  return (
    <Box paddingX={2}>
      <Box
      component={Card}
      width={'100%'}
      height={'100%'}
      borderTop={`4px solid ${theme.palette.primary.main}`}
    >
      <Grid container spacing={2} data-aos={'fade-up'}>
        {numProducts.map((item, i) => (
          <Box
            component={Grid}
            key={i}
            item
            xs={12}
            md={3}
            borderLeft={
              (i === 3 || i === 1) && isMd ? `1px solid ${theme.palette.divider}` : 0
            }
            borderRight={
              i === 1 && isMd ? `1px solid ${theme.palette.divider}` : 0
            }
            borderTop={
              i === 1 && !isMd ? `1px solid ${theme.palette.divider}` : 0
            }
            borderBottom={
              i === 1 && !isMd ? `1px solid ${theme.palette.divider}` : 0
            }
          >
            <CardContent>
              <Typography align="center" variant="h4" gutterBottom>
                <Box fontWeight={600}>
                  <VisibilitySensor
                    onChange={(isVisible) => setViewPortVisibility(isVisible)}
                    delayedCall
                  >
                    <CountUp
                      redraw={false}
                      end={viewPortEntered ? item.descr : 0}
                      start={0}
                      suffix={"+"}
                    />
                  </VisibilitySensor>
                </Box>
              </Typography>
              <Typography align="center" color="text.secondary" component="p">
                {item.title}
              </Typography>
            </CardContent>
          </Box>
        ))}
      </Grid>
    </Box>
    </Box>
  );
};

export default Numbers;
