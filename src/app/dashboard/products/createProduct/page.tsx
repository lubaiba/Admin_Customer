"use client";
import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Link,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { addNewProduct} from "../product-slice";
export default function CreateProductPage() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const createProduct = async (e: any) => {
    e.preventDefault();
      try {
        const newProduct = {
          name,
          price: { raw: price },
          description,
        };
        dispatch(addNewProduct(newProduct));
      router.push("/dashboard/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Create a new product
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          typography: "body1",
          "& > :not(style) ~ :not(style)": {
            ml: 2,
          },
        }}
      >
        <Link href="/dashboard" color="primary" underline="hover">
          Dashboard
        </Link>
        <Link href="/dashboard/products" underline="hover">
          Products
        </Link>
        <Link href="/" color="primary" underline="always">
          New Product
        </Link>
      </Box>
      <TextField
        label="Product Name"
        fullWidth
        value={name}
        onChange={($e) => setName($e.target.value)}
        margin="normal"
      />
      <TextField
        label="Price"
        fullWidth
        type="number"
        value={price}
        onChange={($e) => setPrice(parseFloat($e.target.value))}
        margin="normal"
        required
      />
      <TextField
        label="Description"
        name="description"
        value={description}
        onChange={($e) => setDescription($e.target.value)}
        fullWidth
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={createProduct}
      >
        Create
      </Button>
    </Container>
  );
}
