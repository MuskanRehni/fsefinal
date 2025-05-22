import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  TextField,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [updatingItems, setUpdatingItems] = useState(new Set());

  const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
  );

  const handleQuantityUpdate = async (itemId, newQuantity) => {
      if (newQuantity < 1) return;

      setUpdatingItems((prev) => new Set(prev).add(itemId));

      try {
          // API call to backend - using cart item ID in URL path
          const response = await axios.put(
              `http://localhost:3000/api/cart/${itemId}`,
              {
                  quantity: newQuantity,
              },
              {
                  headers: {
                      "x-auth-token": localStorage.getItem("token"),
                  },
              }
          );

          console.log("API response:", response);

          if (response.status !== 200) {
              throw new Error("Failed to update quantity");
          }

          const result = response.data;

          console.log("Quantity updated successfully:", result);

          // Update local state after successful API call
          updateQuantity(itemId, newQuantity);
      } catch (error) {
          console.error("Error updating quantity:", error);
          // You might want to show a toast/snackbar here
          alert("Failed to update quantity. Please try again.");
      } finally {
          setUpdatingItems((prev) => {
              const newSet = new Set(prev);
              newSet.delete(itemId);
              return newSet;
          });
      }
  };

  const handleInputChange = (itemId, value) => {
      const newQuantity = parseInt(value);
      if (!isNaN(newQuantity) && newQuantity > 0) {
          handleQuantityUpdate(itemId, newQuantity);
      }
  };

  const incrementQuantity = (itemId, currentQuantity) => {
      handleQuantityUpdate(itemId, currentQuantity + 1);
  };

  const decrementQuantity = (itemId, currentQuantity) => {
      if (currentQuantity > 1) {
          handleQuantityUpdate(itemId, currentQuantity - 1);
      }
  };

  return (
      <Container sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom>
              Shopping Cart
          </Typography>
          {cart.length === 0 ? (
              <Typography>Your cart is empty</Typography>
          ) : (
              <>
                  <List>
                      {cart.map((item) => {
                          const isUpdating = updatingItems.has(item.id);

                          return (
                              <ListItem key={item.id}>
                                  <ListItemText
                                      primary={item.name}
                                      secondary={`$${item.price}`}
                                  />
                                  <Box
                                      sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 2,
                                      }}
                                  >
                                      {/* Quantity Controls */}
                                      <Box
                                          sx={{
                                              display: "flex",
                                              alignItems: "center",
                                              border: "1px solid #ccc",
                                              borderRadius: 1,
                                              overflow: "hidden",
                                          }}
                                      >
                                          <IconButton
                                              onClick={() =>
                                                  decrementQuantity(
                                                      item.id,
                                                      item.quantity
                                                  )
                                              }
                                              disabled={
                                                  item.quantity <= 1 ||
                                                  isUpdating
                                              }
                                              size="small"
                                              sx={{
                                                  borderRadius: 0,
                                                  minWidth: 32,
                                                  height: 32,
                                              }}
                                          >
                                              {isUpdating ? (
                                                  <CircularProgress
                                                      size={16}
                                                  />
                                              ) : (
                                                  <Remove fontSize="small" />
                                              )}
                                          </IconButton>

                                          <TextField
                                              type="number"
                                              value={item.quantity}
                                              onChange={(e) =>
                                                  handleInputChange(
                                                      item.id,
                                                      e.target.value
                                                  )
                                              }
                                              inputProps={{
                                                  min: 1,
                                                  style: {
                                                      textAlign: "center",
                                                  },
                                              }}
                                              disabled={isUpdating}
                                              sx={{
                                                  width: 80,
                                                  "& .MuiOutlinedInput-root":
                                                      {
                                                          "& fieldset": {
                                                              border: "none",
                                                          },
                                                          height: 32,
                                                      },
                                                  "& .MuiInputBase-input": {
                                                      padding: "8px 4px",
                                                  },
                                              }}
                                          />

                                          <IconButton
                                              onClick={() =>
                                                  incrementQuantity(
                                                      item.id,
                                                      item.quantity
                                                  )
                                              }
                                              disabled={isUpdating}
                                              size="small"
                                              sx={{
                                                  borderRadius: 0,
                                                  minWidth: 32,
                                                  height: 32,
                                              }}
                                          >
                                              {isUpdating ? (
                                                  <CircularProgress
                                                      size={16}
                                                  />
                                              ) : (
                                                  <Add fontSize="small" />
                                              )}
                                          </IconButton>
                                      </Box>

                                      <Button
                                          onClick={() =>
                                              removeFromCart(item.id)
                                          }
                                          variant="outlined"
                                          color="error"
                                          disabled={isUpdating}
                                      >
                                          Remove
                                      </Button>
                                  </Box>
                              </ListItem>
                          );
                      })}
                  </List>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6">
                      Total: ${total.toFixed(2)}
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                      Checkout
                  </Button>
              </>
          )}
      </Container>
  );
};

export default Cart;
