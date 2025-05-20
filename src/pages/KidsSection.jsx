import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Clothes',
    image: 'data:image/jpeg;base64,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',
    path: '/products/children/clothes'
  },
  {
    id: 2,
    name: 'Toys',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=300&fit=crop',
    path: '/products/children/toys'
  },
  {
    id: 3,
    name: 'Footwear',
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=300&h=300&fit=crop',
    path: '/products/children/footwear'
  }
];

const KidsSection = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Kids' Collection
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Explore our fun and comfortable collection for kids
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

export default KidsSection;