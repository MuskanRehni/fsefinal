import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Clothes',
    image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=300&h=300&fit=crop',
    path: '/products/mens/clothes'
  },
  {
    id: 2,
    name: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=300&h=300&fit=crop',
    path: '/products/mens/jewelry'
  },
  {
    id: 3,
    name: 'Footwear',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&h=300&fit=crop',
    path: '/products/mens/footwear'
  }
];

const MensSection = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Men's Collection
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Explore our exclusive collection for men
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
        {categories.map((category) => (
          <Grid item key={category.id} xs={6} sm={4}>
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

export default MensSection;