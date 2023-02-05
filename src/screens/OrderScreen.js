import React, { useEffect, useContext, useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useStyles } from '../styles';
import { listCategories, listProducts } from '../Actions';
import { Store } from '../Store';
import Logo from '../components/Logo';

export default function OrderScreen() {
  const [categoryName, setCategoryName] = useState('');
  const { state, dispatch } = useContext(Store);
  const { categories, loading, error } = state.categoryList;
  const { products, loading: loadingProducts, error: errorProducts } = state.productList;

  const styles = useStyles();

  useEffect(() => {
    if (!categories) {
      listCategories(dispatch);
    } else {
      listProducts(dispatch, categoryName);
    }
  }, [dispatch, categories, categoryName]);

  const categoryClickHandler = (name) => {
    setCategoryName(name);
  };

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
                  <ListItem button onClick={() => categoryClickHandler('')}>
                    <Logo></Logo>
                  </ListItem>
                  {categories.map((category) => {
                    return (
                      <ListItem button key={category.name} onClick={() => categoryClickHandler(category.name)}>
                        <Avatar src={category.image} alt={category.name} />
                      </ListItem>
                    );
                  })}
                </>
              )}
            </List>
          </Grid>
          <Grid item md={10}>
            <Typography gutterBottom className={styles.title} variant="h2" component="h2">
              {categoryName || 'Main Menu'}
            </Typography>
            <Grid container spacing={1}>
              {loadingProducts ? (
                <CircularProgress />
              ) : errorProducts ? (
                <Alert severity="error">{errorProducts}</Alert>
              ) : (
                products.map((product) => (
                  <Grid key={product.name} item md={6}>
                    <Card className={styles.card}>
                      <CardActionArea>
                        <CardMedia component="img" alt={product.name} image={product.image} className={styles.media} />
                      </CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="body2" color="textPrimary" component="p">
                          {product.name}
                        </Typography>
                        <Box className={styles.cardFooter}>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {product.calorie} Cal
                          </Typography>
                          <Typography variant="body2" color="textPrimary" component="p">
                            ${product.price}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
