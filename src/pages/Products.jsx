import { useEffect, useState } from "react";
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/products"
            );
            console.log("Products fetched:", response.data);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Container sx={{ py: 4 }}>
            <Typography
                variant="h3"
                component="h1"
                align="center"
                gutterBottom
                sx={{ mb: 4 }}
            >
                Featured Products
            </Typography>
            <Grid container spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                transition: "transform 0.3s ease-in-out",
                                "&:hover": {
                                    transform: "scale(1.02)",
                                    boxShadow: 3,
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="250"
                                image={product.image_url}
                                alt={product.name}
                                sx={{ objectFit: "cover" }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    {product.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    paragraph
                                >
                                    {product.description}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    color="primary"
                                    gutterBottom
                                >
                                    ${product.price}
                                </Typography>
                                <Button
                                    onClick={() =>
                                        navigate(`/product/${product.id}`)
                                    }
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
