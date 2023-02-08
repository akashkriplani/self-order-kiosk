import React, { useContext, useEffect } from 'react';
import { Box, CircularProgress, Grid, List, ListItem, Paper, Typography } from '@material-ui/core';
import { useStyles } from '../styles';
import { Store } from '../Store';
import { Alert } from '@material-ui/lab';
import { listQueue } from '../Actions';

export default function QueueScreen() {
  const { state, dispatch } = useContext(Store);
  const { loading, error, queue } = state.queueList;

  const styles = useStyles();

  useEffect(() => {
    listQueue(dispatch);
  }, [dispatch]);

  return (
    <Box className={styles.root}>
      <Box className={styles.main}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Paper>
                <Typography variant="h2">In Progress</Typography>
                <List>
                  {queue.inProgressOrders.map((order) => (
                    <ListItem key={order.number}>
                      <Typography variant="h2">{order.number}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item md={6}>
              <Paper>
                <Typography variant="h2">Now Serving</Typography>
                <List>
                  {queue.servingOrders.map((order) => (
                    <ListItem key={order.number}>
                      <Typography variant="h2">{order.number}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}
