import {
  Heading,
  Box,
  Image,
  HStack,
  Text,
  useColorModeValue,
  useToast,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Input,
  VStack,
} from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
  //consts
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("white", "#2d2d3d");
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();

  ////// deleting
  const handleDelete = async (producId) => {
    const { success, message } = await deleteProduct(producId);
    if (success) {
      toast({
        title: success ? "success" : "error",
        description: success ? "Successfully deleted" : "Sometihng went wrong",
        status: success ? "success" : "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };
  ////updating
  const handleProductUpdate = async (productId, updatedProduct) => {
    const { success, message } = await updateProduct(productId, updatedProduct);
    if (success) {
      toast({
        title: success ? "success" : "error",
        description: success ? "Successfully updated" : "Sometihng went wrong",
        status: success ? "success" : "error",
        duration: 6000,
        isClosable: true,
      });
    }

    onClose();
  };
  /////
  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size="md" mb={2}>
          {product.name}
        </Heading>
        <Text mb={4} fontWeight={"bold"}>
          ${product.price}
        </Text>

        <HStack spacing={3} flexDirection={"row-reverse"}>
          <Button>
            <MdDeleteOutline
              onClick={() => {
                handleDelete(product._id);
              }}
            />
          </Button>
          <Button>
            <RiEdit2Line onClick={onOpen} />
          </Button>
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update the Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={1}>
              <Input
                placeholder="Title"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="image"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleProductUpdate(product._id, updatedProduct)}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
