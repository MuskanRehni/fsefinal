import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStartShopping = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      navigate('/products');
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container 
        sx={{ 
          textAlign: 'center',
          py: 8,
          animation: 'fadeIn 1.5s ease-in'
        }}
      >
        <Typography 
          variant="h1" 
          component="h1" 
          gutterBottom
          sx={{
            color: 'white',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            mb: 4,
            animation: 'slideDown 1s ease-out'
          }}
        >
          Welcome to ShopEase
        </Typography>
        <Typography 
          variant="h4" 
          paragraph
          sx={{
            color: 'white',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            mb: 6,
            animation: 'slideUp 1s ease-out'
          }}
        >
          Your one-stop shop for all your needs
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          onClick={handleStartShopping}
          sx={{
            px: 6,
            py: 2,
            fontSize: '1.2rem',
            backgroundColor: '#ff4081',
            '&:hover': {
              backgroundColor: '#f50057',
              transform: 'scale(1.05)',
              transition: 'all 0.3s ease'
            },
            animation: 'fadeIn 2s ease-in'
          }}
        >
          Start Shopping
        </Button>
      </Container>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideDown {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default Home;