import React, { useContext } from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, Fade, Typography } from '@material-ui/core';
import { useStyles } from '../styles';
import Logo from '../components/Logo';
import { Store } from '../Store';
import { setOrderType } from '../Actions';
import { useNavigate } from 'react-router-dom';

export default function ChooseScreen() {
  const navigate = useNavigate();
  const styles = useStyles();
  const { dispatch } = useContext(Store);

  const chooseHandler = (orderType) => {
    setOrderType(dispatch, orderType);
    navigate('/order');
  };

  return (
    <Fade in={true}>
      <Box className={`${styles.root} ${styles.navy}`}>
        <Box className={`${styles.main} ${styles.center}`}>
          <Logo large></Logo>
          <Typography variant="h3" component="h3" className={styles.center} gutterBottom>
            Where will you be eating today?
          </Typography>
          <Box className={styles.cards}>
            <Card className={`${styles.card} ${styles.space}`}>
              <CardActionArea onClick={() => chooseHandler('Eat in')}>
                <CardMedia component="img" alt="Eat in" image="/images/eatin.png" className={styles.media} />
                <CardContent>
                  <Typography gutterBottom variant="h4" color="textPrimary" component="p">
                    Eat in
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card className={`${styles.card} ${styles.space}`}>
              <CardActionArea onClick={() => chooseHandler('Take out')}>
                <CardMedia component="img" alt="Take out" image="/images/takeout.png" className={styles.media} />
                <CardContent>
                  <Typography gutterBottom variant="h4" color="textPrimary" component="p">
                    Take out
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
}
