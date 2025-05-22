import { AppBar, Toolbar, Typography, Button, Badge, Menu, MenuItem, Avatar, IconButton } from '@mui/material';
import { ShoppingCart, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const profileOpen = Boolean(profileAnchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleCategoryClick = (category) => {
    navigate(`/products/${category}`);
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
      <Typography 
          variant="h4" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            cursor: 'pointer',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            letterSpacing: '1px',
            '&:hover': {
              transform: 'scale(1.05)',
              transition: 'transform 0.3s ease'
            }
          }} 
          onClick={() => navigate('/')}
        >
          ShopEase
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
        <Button 
          color="inherit" 
          onClick={handleClick}
          aria-controls={open ? 'items-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          Items
        </Button>
        <Menu
          id="items-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'items-button',
          }}
        >
          <MenuItem onClick={() => handleCategoryClick('mens')} sx={{ minWidth: 150 }}>Men's Section</MenuItem>
          <MenuItem onClick={() => handleCategoryClick('womens')} sx={{ minWidth: 150 }}>Women's Section</MenuItem>
          <MenuItem onClick={() => handleCategoryClick('children')} sx={{ minWidth: 150 }}>Children's Section</MenuItem>
        </Menu>
        <Button color="inherit" onClick={() => navigate('/products')}>Products</Button>
        <Button color="inherit" onClick={() => navigate('/cart')}>
          <Badge badgeContent={cart.length} color="error">
            <ShoppingCart />
          </Badge>
        </Button>

        {user ? (
          <>
            <IconButton
              onClick={handleProfileClick}
              color="inherit"
              sx={{ ml: 2 }}
            >
              <Avatar sx={{ bgcolor: '#1976d2', width: 32, height: 32 }}>
                {user.name ? user.name[0].toUpperCase() : <AccountCircle />}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={profileAnchorEl}
              open={profileOpen}
              onClose={handleProfileClose}
              onClick={handleProfileClose}
            >
              <MenuItem sx={{ minWidth: 150 }}>
                <Typography variant="body1">
                  {user.name || 'User'}
                </Typography>
              </MenuItem>
              <MenuItem sx={{ minWidth: 150 }}>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;