import React, { useEffect, useContext } from 'react';
import { Avatar, Box, CircularProgress, Grid, List, ListItem } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useStyles } from '../styles';
import { listCategories } from '../Actions';
import { Store } from '../Store';
import Logo from '../components/Logo';

export default function OrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { categories, loading, error } = state.categoryList;

  const styles = useStyles();

  useEffect(() => {
    listCategories(dispatch);
  }, [dispatch]);

  return (
    <Box className={styles.root}>
      <Box className={styles.main}>
        <Grid container>
          <Grid item md={2}>
            <List>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <>
                  <ListItem button>
                    <Logo></Logo>
                  </ListItem>
                  {categories.map((category) => {
                    return (
                      <ListItem button key={category.name}>
                        <Avatar src={category.image} alt={category.name} />
                      </ListItem>
                    );
                  })}
                </>
              )}
              {}
            </List>
          </Grid>
          <Grid item md={10}>
            Order list
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
