import React from 'react';
import { Box, Card, CardActionArea, Typography } from '@material-ui/core';
import { TouchApp } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { useStyles } from '../styles';

export default function HomeScreen() {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <Card>
      <CardActionArea onClick={() => navigate('/choose')}>
        <Box className={`${styles.root} ${styles.red}`}>
          <Box className={`${styles.main} ${styles.center}`}>
            <Typography component="h6" variant="h6">
              Fast & Easy
            </Typography>
            <Typography component="h1" variant="h1">
              Order <br /> & Pay <br /> here
            </Typography>
            <TouchApp fontSize="large"></TouchApp>
          </Box>
          <Box className={`${styles.center} ${styles.green}`}>
            <Logo large></Logo>
            <Typography component="h5" variant="h5">
              Touch to start
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
