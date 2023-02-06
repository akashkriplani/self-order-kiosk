import React, { useEffect, useContext, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogTitle,
  Grid,
  List,
  ListItem,
  TextField,
  Typography
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Add, Remove } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useStyles } from '../styles';
import { listCategories, listProducts, addToOrder, removeFromOrder, clearOrder } from '../Actions';
import { Store } from '../Store';
import Logo from '../components/Logo';

export default function OrderScreen() {
  const [categoryName, setCategoryName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({});

  const { state, dispatch } = useContext(Store);
  const { categories, loading, error } = state.categoryList;
  const { products, loading: loadingProducts, error: errorProducts } = state.productList;
  const { orderItems, itemsCount, totalPrice, taxPrice, orderType } = state.order;

  const navigate = useNavigate();
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

  const closeHandler = () => {
    setIsOpen(false);
  };

  const productClickHandler = (p) => {
    setProduct(p);
    setIsOpen(true);
  };

  const addToOrderHandler = () => {
    addToOrder(dispatch, { ...product, quantity });
    setIsOpen(false);
  };

  const cancelOrRemoveFromOrder = () => {
    removeFromOrder(dispatch, product);
    setIsOpen(false);
  };

  const previewOrderHandler = () => {
    navigate('/review');
  };

  return (
    <Box className={styles.root}>
      <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={closeHandler}>
        <DialogTitle className={styles.center}>Add {product.name}</DialogTitle>
        <Box className={`${styles.row} ${styles.center}`}>
          <Button
            variant="contained"
            color="primary"
            disabled={quantity === 1}
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          >
            <Remove />
          </Button>
          <TextField
            inputProps={{ className: styles.largeInput }}
            InputProps={{
              bar: 'true',
              inputProps: {
                className: styles.largeInput
              }
            }}
            className={styles.largeNumber}
            type="number"
            variant="filled"
            min={1}
            value={quantity}
          />
          <Button variant="contained" color="primary" onClick={() => setQuantity(quantity + 1)}>
            <Add />
          </Button>
        </Box>
        <Box className={`${styles.row} ${styles.around}`}>
          <Button
            onClick={cancelOrRemoveFromOrder}
            variant="contained"
            color="primary"
            size="large"
            className={styles.largeButton}
          >
            {orderItems.find((x) => x.name === product.name) ? 'Remove from Order' : 'Cancel'}
          </Button>
          <Button
            onClick={addToOrderHandler}
            variant="contained"
            color="primary"
            size="large"
            className={styles.largeButton}
          >
            Add to Order
          </Button>
        </Box>
      </Dialog>
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
                    <Card className={styles.card} onClick={() => productClickHandler(product)}>
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
      <Box>
        <Box className={`${styles.bordered} ${styles.space}`}>
          My Order - {orderType} | Tax: ${taxPrice} | Total: ${totalPrice} | Items: {itemsCount}
        </Box>
        <Box className={`${styles.row} ${styles.around}`}>
          <Button
            onClick={() => {
              clearOrder(dispatch);
              navigate('/');
            }}
            variant="contained"
            color="primary"
            className={styles.largeButton}
          >
            Cancel Order
          </Button>
          <Button
            onClick={previewOrderHandler}
            variant="contained"
            color="primary"
            disabled={orderItems.length === 0}
            className={styles.largeButton}
          >
            Done
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
