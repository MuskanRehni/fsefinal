// import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
// import { ShoppingCart } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from '../context/CartContext';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { cart } = useCart();

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
//           ShopEase
//         </Typography>
//         <Button color="inherit" onClick={() => navigate('/products')}>Products</Button>
//         <Button color="inherit" onClick={() => navigate('/cart')}>
//           <Badge badgeContent={cart.length} color="error">
//             <ShoppingCart />
//           </Badge>
//         </Button>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;
import { AppBar, Toolbar, Typography, Button, Badge, Menu, MenuItem } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (category) => {
    navigate(`/products/${category}`);
    handleClose();
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;