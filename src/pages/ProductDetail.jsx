import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    // Product data matching with Products page
    const productData = {
      '1': {
        id: 1,
        name: 'iPhone 14 Pro',
        price: 999.99,
        image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=500&q=80',
        description: 'Latest iPhone with dynamic island and pro camera system',
        specs: ['6.7" Super Retina XDR display', '48MP Main Camera', 'A16 Bionic chip', '256GB Storage']
      },
      '2': {
        id: 2,
        name: 'MacBook Pro M2',
        price: 1499.99,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
        description: 'Powerful MacBook with M2 chip for professional use',
        specs: ['14" Liquid Retina XDR display', 'M2 Pro chip', '16GB RAM', '512GB SSD']
      },
      '3': {
        id: 3,
        name: 'Sony WH-1000XM4',
        price: 349.99,
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80',
        description: 'Premium noise-cancelling headphones',
        specs: ['Industry-leading noise canceling', '30-hour battery life', 'Touch controls', 'Multipoint pairing']
      },
      '4': {
        id: 4,
        name: 'Samsung 4K Smart TV',
        price: 799.99,
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80',
        description: 'Ultra HD Smart TV with stunning picture quality',
        specs: ['65" 4K QLED Display', 'Smart Hub', 'Quantum Processor', 'Object Tracking Sound']
      },
      '5': {
        id: 5,
        name: 'iPad Air',
        price: 599.99,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80',
        description: 'Versatile tablet for work and entertainment',
        specs: ['10.9" Liquid Retina display', 'M1 chip', '256GB Storage', 'Touch ID']
      }
      // ... Add more products as needed
    };

    setProduct(productData[id] || {
      id: parseInt(id),
      name: 'Product Not Found',
      price: 0,
      image: 'https://via.placeholder.com/400',
      description: 'Product details not available',
      specs: ['No specifications available']
    });
  }, [id]);

  if (!product) {
    return <Container sx={{ py: 4 }}><Typography>Loading...</Typography></Container>;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <Box sx={{ flex: '0 0 400px' }}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </Box>
          <Box sx={{ flex: '1 1 400px' }}>
            <Typography variant="h4" gutterBottom>{product.name}</Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Typography variant="h6" gutterBottom>Specifications:</Typography>
            <ul>
              {product.specs.map((spec, index) => (
                <Typography component="li" key={index}>{spec}</Typography>
              ))}
            </ul>
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => addToCart(product)}
              sx={{ mt: 3 }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductDetail;