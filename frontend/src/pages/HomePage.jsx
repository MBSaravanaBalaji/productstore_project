import { Container, Text, VStack } from "@chakra-ui/react"; // Retaining Chakra UI for layout
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useProductStore } from "../store/product";
import ProductCard from "./ProductCard";

const HomePage = () => {
	const { fetchProducts, products } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	console.log("products", products);

	return (
		<Container maxW="container.xl" py={12}>
			<VStack spacing={8}>
				<Text
					fontSize="30px"
					fontWeight="bold"
					bgGradient="linear(to-r, cyan.400, blue.500)"
					bgClip="text"
					textAlign="center"
				>
					Current Products 🚀
				</Text>

				<Grid container spacing={3} sx={{ width: "100%" }}>
					{products.map((product) => (
						<Grid
							item
							xs={12} // Full-width on small screens
							sm={6} // Half-width on medium screens
							md={4} // One-third width on large screens
							key={product._id}
						>
							<ProductCard product={product} />
						</Grid>
					))}
				</Grid>

				{products.length === 0 && (
					<Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
						No products found 😢{" "}
						<Link to="/create">
							<Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
								Create a product
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
	);
};

export default HomePage;