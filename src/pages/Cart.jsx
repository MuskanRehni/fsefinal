import { Container, Typography, List, ListItem, ListItemText, Button, Divider } from '@mui/material';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          <List>
            {cart.map((item) => (
              <ListItem key={item.id}>
                <ListItemText 
                  primary={item.name} 
                  secondary={`$${item.price}`} 
                />
                <Button 
                  onClick={() => removeFromCart(item.id)}
                  variant="outlined" 
                  color="error"
                >
                  Remove
                </Button>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Checkout
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;