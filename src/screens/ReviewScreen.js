import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { addToOrder, removeFromOrder } from '../Actions';
import { useStyles } from '../styles';
import { Store } from '../Store';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';

export default function ReviewScreen() {
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({});

  const { state, dispatch } = useContext(Store);
  const { orderItems, itemsCount, totalPrice, taxPrice, orderType } = state.order;

  const navigate = useNavigate();
  const styles = useStyles();

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

  const proceedToCheckoutHandler = () => {
    navigate('/select-payment');
  };

  return (
    <Box className={styles.root}>
      <Box className={`${styles.main} ${styles.navy} ${styles.center}`}>
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
        <Box className={`${styles.center} ${styles.column}`}>
          <Logo large></Logo>
          <Typography gutterBottom className={styles.title} variant="h3" component="h3">
            Review my {orderType} order
          </Typography>
        </Box>
        <Grid container>
          {orderItems.map((orderItem) => (
            <Grid item md={12} key={orderItem.name}>
              <Card className={styles.card} onClick={() => productClickHandler(orderItem)}>
                <CardActionArea>
                  <CardContent>
                    <Box className={`${styles.row} ${styles.between}`}>
                      <Typography gutterBottom variant="body2" color="textPrimary" component="p">
                        {orderItem.name}
                      </Typography>
                      <Button variant="contained">Edit</Button>
                    </Box>
                    <Box className={`${styles.row} ${styles.between}`}>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {orderItem.calorie} Cal
                      </Typography>
                      <Typography variant="body2" color="textPrimary" component="p">
                        {orderItem.quantity} x ${orderItem.price}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box>
        <Box>
          <Box className={`${styles.bordered} ${styles.space}`}>
            My Order - {orderType === 'takeout' ? 'Take out' : 'Eat in'} | Tax: ${taxPrice} | Total: ${totalPrice} |
            Items: {itemsCount}
          </Box>
          <Box className={`${styles.row} ${styles.around}`}>
            <Button
              onClick={() => navigate('/order')}
              variant="contained"
              color="primary"
              className={styles.largeButton}
            >
              Back
            </Button>
            <Button
              onClick={proceedToCheckoutHandler}
              variant="contained"
              color="secondary"
              disabled={orderItems.length === 0}
              className={styles.largeButton}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
