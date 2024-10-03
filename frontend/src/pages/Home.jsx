import React, { useEffect } from "react";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
//
const Home = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log(products);
  console.log("Type of products:", typeof products);
  console.log("Type of products:", typeof products.data);

  return (
    <Container maxW={"container.xl"} py={8}>
      <VStack spacing={8}>
        <Text
          fontSize={{ base: "24", sm: "32" }}
          fontWeight={"bold"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.200, blue.300)"}
          bgClip={"text"}
          paddingBottom={18}
        >
          Current Images
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w={"full"}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text textAlign="center">
            no products found{"  "}
            <Link to={"/create"}>
              <Text
                color="blue.500"
                as="span"
                _hover={{ textDecoration: "underline" }}
              >
                create one
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default Home;
