import React from "react";
import {
  Container,
  Flex,
  Text,
  VStack,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { useProductStore } from "../store/product";
import { useNavigate, Link } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const { createProduct } = useProductStore();

  const handleAddProduct = async (isSuccess) => {
    const { success, message } = await createProduct(newProduct);

    if (success) {
      toast({
        title: success ? "success" : "error",
        description: success ? "Successfully added" : "Sometihng went wrong",
        status: success ? "success" : "error",
        duration: 6000,
        isClosable: true,
      });
    }
    setNewProduct({
      name: "",
      price: "",
      image: "",
    });
  };

  return (
    <Container maxW={"container.sm"}>
      <Flex h={28} alignItems="center" justifyContent="center">
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textAlign={"center"}
        >
          Create a product
        </Text>
      </Flex>
      <VStack spacing={8}>
        <Input
          placeholder="Title"
          name="name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <Input
          placeholder="Price"
          name="price"
          type="number"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <Input
          placeholder="image"
          name="image"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
        />
        <Button maxW={60} onClick={handleAddProduct}>
          create it
        </Button>
        <Link to={"/"}>
          <IoIosArrowRoundBack size={20} />
        </Link>
      </VStack>
    </Container>
  );
};

export default Create;
