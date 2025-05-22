import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { useCart } from "../context/CartContext";
import axios from "axios";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();

    const fetchProduct = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/products/${id}`
            );

            if (response.status !== 200) {
                throw new Error("Failed to fetch product");
            }

            console.log("Product fetched:", response.data);
            const data = response.data;
            setProduct(data);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    useEffect(() => {
        const fetchProductData = async () => {
            await fetchProduct();
        };
        fetchProductData();
    }, [id]);

    if (!product) {
        return (
            <Container sx={{ py: 4 }}>
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    <Box sx={{ flex: "0 0 400px" }}>
                        <img
                            src={product.image_url}
                            alt={product.name}
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "8px",
                            }}
                        />
                    </Box>
                    <Box sx={{ flex: "1 1 400px" }}>
                        <Typography variant="h4" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="h5" color="primary" gutterBottom>
                            ${product.price}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {product.description}
                        </Typography>
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
