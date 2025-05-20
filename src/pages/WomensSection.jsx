import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Beauty',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=300&fit=crop',
    path: '/products/womens/beauty'
  },
  {
    id: 2,
    name: 'Clothes',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop',
    path: '/products/womens/clothes'
  },
  {
    id: 3,
    name: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
    path: '/products/womens/jewelry'
  },
  {
    id: 4,
    name: 'Footwear',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=300&fit=crop',
    path: '/products/womens/footwear'
  }
];

const WomensSection = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Women's Collection
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Explore our exclusive collection for women
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
        {categories.map((category) => (
          <Grid item key={category.id} xs={6} sm={3}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: '50%',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                width: { xs: 150, sm: 200 },
                height: { xs: 150, sm: 200 },
                margin: 'auto',
                position: 'relative'
              }}
              onClick={() => navigate(category.path)}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                  }
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  position: 'absolute',
                  bottom: '50%',
                  left: '50%',
                  transform: 'translate(-50%, 50%)',
                  color: 'white',
                  textAlign: 'center',
                  width: '100%',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                {category.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WomensSection;