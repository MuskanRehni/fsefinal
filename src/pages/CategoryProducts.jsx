import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useCart } from '../context/CartContext';

const CategoryProducts = () => {
  const { section, category } = useParams();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productData = {
      womens: {
        beauty: [
          {
            id: 'wb1',
            name: 'Luxury Skincare Set',
            price: 129.99,
            image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80',
            description: 'Complete skincare routine set'
          },
          {
            id: 'wb2',
            name: 'Premium Makeup Kit',
            price: 89.99,
            image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&q=80',
            description: 'Professional makeup collection'
          },
          {
            id: 'wb3',
            name: 'Hair Care Bundle',
            price: 69.99,
            image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&q=80',
            description: 'Complete hair care system'
          },
          {
            id: 'wb4',
            name: 'Organic Face Mask Set',
            price: 45.99,
            image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=500&q=80',
            description: 'Natural and organic face masks for glowing skin'
          },
          {
            id: 'wb5',
            name: 'Luxury Perfume Collection',
            price: 159.99,
            image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80',
            description: 'Set of premium designer fragrances'
          }
        ],
        clothes: [
          {
            id: 'wc1',
            name: 'Summer Floral Dress',
            price: 79.99,
            image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80',
            description: 'Light and breezy summer dress'
          },
          {
            id: 'wc2',
            name: 'Business Blazer',
            price: 129.99,
            image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
            description: 'Professional office wear'
          },
          {
            id: 'wc3',
            name: 'Casual Jeans Set',
            price: 89.99,
            image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80',
            description: 'Comfortable everyday wear'
          },
          {
            id: 'wc4',
            name: 'Winter Coat',
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&q=80',
            description: 'Warm and stylish winter coat'
          },
          {
            id: 'wc5',
            name: 'Yoga Set',
            price: 79.99,
            image: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=500&q=80',
            description: 'Comfortable yoga and workout set'
          }
        ],
        jewelry: [
          {
            id: 'wj1',
            name: 'Pearl Necklace Set',
            price: 299.99,
            image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80',
            description: 'Elegant pearl necklace and earring set'
          },
          {
            id: 'wj2',
            name: 'Diamond Ring',
            price: 999.99,
            image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80',
            description: 'Stunning diamond engagement ring'
          },
          {
            id: 'wj3',
            name: 'Gold Bracelet',
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&q=80',
            description: 'Classic gold chain bracelet'
          }
        ],
        footwear: [
          {
            id: 'wf1',
            name: 'Designer Heels',
            price: 159.99,
            image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80',
            description: 'Classic designer heels'
          },
          {
            id: 'wf2',
            name: 'Casual Sneakers',
            price: 89.99,
            image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80',
            description: 'Comfortable everyday sneakers'
          },
          {
            id: 'wf3',
            name: 'Summer Sandals',
            price: 69.99,
            image: 'https://images.unsplash.com/photo-1612825173281-9a193378527e?w=500&q=80',
            description: 'Stylish summer sandals'
          },
          {
            id: 'wf4',
            name: 'Winter Boots',
            price: 129.99,
            image: 'https://images.unsplash.com/photo-1542840410-3092f99611a3?w=500&q=80',
            description: 'Waterproof winter boots'
          },
          {
            id: 'wf5',
            name: 'Ballet Flats',
            price: 59.99,
            image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80',
            description: 'Classic comfortable ballet flats'
          }
        ]
      },
      mens: {
        clothes: [
          {
            id: 'mc1',
            name: 'Classic Suit',
            price: 399.99,
            image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=500&q=80',
            description: 'Professional business suit'
          },
          {
            id: 'mc2',
            name: 'Casual Shirt Set',
            price: 89.99,
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80',
            description: 'Comfortable casual shirts'
          },
          {
            id: 'mc3',
            name: 'Winter Jacket',
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80',
            description: 'Warm winter jacket'
          },
          {
            id: 'mc4',
            name: 'Denim Collection',
            price: 159.99,
            image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80',
            description: 'Premium denim jeans collection'
          },
          {
            id: 'mc5',
            name: 'Sports Jersey',
            price: 89.99,
            image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500&q=80',
            description: 'Official team sports jersey'
          }
        ],
        jewelry: [
          {
            id: 'mj1',
            name: 'Luxury Watch',
            price: 599.99,
            image: 'https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=500&q=80',
            description: 'Premium stainless steel watch'
          },
          {
            id: 'mj2',
            name: 'Silver Chain',
            price: 149.99,
            image: 'https://images.unsplash.com/photo-1568745376755-8a487b450aa3?w=500&q=80',
            description: 'Sterling silver necklace'
          },
          {
            id: 'mj3',
            name: 'Cufflink Set',
            price: 89.99,
            image: 'https://images.unsplash.com/photo-1627293509201-cd0c780043e6?w=500&q=80',
            description: 'Elegant cufflink collection'
          }
        ],
        footwear: [
          {
            id: 'mf1',
            name: 'Leather Boots',
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&q=80',
            description: 'Genuine leather boots'
          },
          {
            id: 'mf2',
            name: 'Business Shoes',
            price: 159.99,
            image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500&q=80',
            description: 'Professional office shoes'
          },
          {
            id: 'mf3',
            name: 'Sports Sneakers',
            price: 129.99,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
            description: 'Athletic performance sneakers'
          }
        ]
      },
      children: {
        clothes: [
          {
            id: 'cc1',
            name: 'Kids Play Set',
            price: 49.99,
            image: 'https://images.unsplash.com/photo-1522771930-78848d163452?w=500&q=80',
            description: 'Comfortable play set for kids'
          },
          {
            id: 'cc2',
            name: 'School Uniform',
            price: 59.99,
            image: 'https://images.unsplash.com/photo-1621452773781-0c13ccb84ee1?w=500&q=80',
            description: 'Complete school uniform set'
          },
          {
            id: 'cc3',
            name: 'Party Dress',
            price: 69.99,
            image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80',
            description: 'Adorable party wear'
          }
        ],
        footwear: [
          {
            id: 'cf1',
            name: 'Kids Sneakers',
            price: 39.99,
            image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500&q=80',
            description: 'Colorful and comfortable sneakers'
          },
          {
            id: 'cf2',
            name: 'School Shoes',
            price: 44.99,
            image: 'https://images.unsplash.com/photo-1571141578354-82f9a4a54573?w=500&q=80',
            description: 'Durable school footwear'
          },
          {
            id: 'cf3',
            name: 'Sports Shoes',
            price: 49.99,
            image: 'https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?w=500&q=80',
            description: 'Athletic shoes for kids'
          }
        ],
        toys: [
          {
            id: 'ct1',
            name: 'Educational Toy Set',
            price: 29.99,
            image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&q=80',
            description: 'Learning toys for development'
          },
          {
            id: 'ct2',
            name: 'Building Blocks',
            price: 34.99,
            image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&q=80',
            description: 'Creative building set'
          },
          {
            id: 'ct3',
            name: 'Art Supply Kit',
            price: 24.99,
            image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&q=80',
            description: 'Complete art supplies set'
          }
        ]
      }
    };

    setProducts(productData[section]?.[category] || []);
  }, [section, category]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        {`${section.charAt(0).toUpperCase() + section.slice(1)}'s ${category.charAt(0).toUpperCase() + category.slice(1)}`}
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                maxWidth: 345, // Add fixed maximum width
                margin: 'auto', // Center the card
                '& .MuiCardMedia-root': {
                  width: '100%',
                  height: 280, // Fixed height for all images
                  objectFit: 'cover',
                  objectPosition: 'center'
                }
              }}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{
                  aspectRatio: '1/1', // Force 1:1 aspect ratio
                  backgroundColor: '#f5f5f5' // Light gray background for image loading
                }}
              />
              <CardContent sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                height: '200px' // Fixed height for content
              }}>
                <div>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h2"
                    sx={{
                      fontSize: '1.2rem',
                      height: '60px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{
                      height: '60px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {product.description}
                  </Typography>
                </div>
                <div>
                  <Typography 
                    variant="h6" 
                    color="primary" 
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    ${product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => addToCart(product)}
                    sx={{ 
                      width: '100%',
                      mt: 1
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoryProducts;