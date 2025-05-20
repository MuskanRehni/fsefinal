import { useEffect, useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: 'iPhone 14 Pro',
        price: 999.99,
        image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=500&q=80',
        description: 'Latest iPhone with dynamic island and pro camera system'
      },
      {
        id: 2,
        name: 'MacBook Pro M2',
        price: 1499.99,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
        description: 'Powerful MacBook with M2 chip for professional use'
      },
      {
        id: 3,
        name: 'Sony WH-1000XM4',
        price: 349.99,
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80',
        description: 'Premium noise-cancelling headphones'
      },
      {
        id: 4,
        name: 'Samsung 4K Smart TV',
        price: 799.99,
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80',
        description: 'Ultra HD Smart TV with stunning picture quality'
      },
      {
        id: 5,
        name: 'iPad Air',
        price: 599.99,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80',
        description: 'Versatile tablet for work and entertainment'
      },
      {
        id: 6,
        name: 'Nintendo Switch OLED',
        price: 349.99,
        image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500&q=80',
        description: 'Popular gaming console with OLED display'
      },
      {
        id: 7,
        name: 'DJI Mini 3 Pro',
        price: 759.99,
        image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&q=80',
        description: 'Compact drone with professional camera capabilities'
      },
      {
        id: 8,
        name: 'Apple Watch Series 8',
        price: 399.99,
        image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&q=80',
        description: 'Advanced smartwatch with health monitoring'
      },
      {
        id: 9,
        name: 'Canon EOS R6',
        price: 2499.99,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80',
        description: 'Professional mirrorless camera for photographers'
      },
      {
        id: 10,
        name: 'Bose SoundBar 700',
        price: 799.99,
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80',
        description: 'Premium soundbar for home theater experience'
      },
      {
        id: 11,
        name: 'Xbox Series X',
        price: 499.99,
        image: 'data:image/jpeg;base64,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',
        description: 'Next-gen gaming console with 4K capabilities'
      },
      {
        id: 12,
        name: 'GoPro Hero 11',
        price: 399.99,
        image: 'https://images.unsplash.com/photo-1522273400909-fd1a8f77637e?w=500&q=80',
        description: 'Advanced action camera for adventure enthusiasts'
      }
    ]);
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ mb: 4 }}>
        Featured Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: 3
                }
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  ${product.price}
                </Typography>
                <Button 
                  onClick={() => navigate(`/product/${product.id}`)}
                  variant="outlined" 
                  sx={{ mt: 1, mr: 1 }}
                >
                  View Details
                </Button>
                <Button 
                  onClick={() => addToCart(product)}
                  variant="contained" 
                  sx={{ mt: 1 }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;