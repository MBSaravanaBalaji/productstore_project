import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Box, HStack, IconButton, Image, Text, Heading, Input, Button, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useProductStore } from "@/store/product";
import { use } from "react";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const { deleteProduct,updateProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);

    if (success) {
      console.log(message); // Log the success message
    } else {
      console.error("Failed to delete the product"); // Log the error
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const handleUpdateProduct = async (pid, updatedProduct) => {
    await updateProduct(pid, updatedProduct);
    closeModal(); // Close the modal after updating
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          {/* Edit Button */}
          <IconButton
            aria-label="Edit Product"
            bg="lightblue"
            _hover={{ bg: "blue.300" }}
            size="sm"
            onClick={() => setIsModalOpen(true)}
          >
            <FaEdit size="20px" color="black" />
          </IconButton>

          {/* Delete Button */}
          <IconButton
            aria-label="Delete Product"
            bg="lightcoral"
            _hover={{ bg: "red.400" }}
            size="sm"
            onClick={() => handleDeleteProduct(product._id)}
          >
            <MdDelete size="20px" color="black" />
          </IconButton>
        </HStack>
      </Box>

      {/* Custom Modal */}
      {isModalOpen &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={closeModal}
          >
            <div
              style={{
                background: "#5d5d5d",
                padding: "20px",
                borderRadius: "10px",
                width: "400px",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()} // Prevent modal click from closing it
            >
              <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Update Product</h2>
              <VStack spacing={4}>
                <Input
                  placeholder="Product Name"
                  name="name"
                  value={updatedProduct.name}
                  onChange={(e) =>
                    setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                  }
                />
                <Input
                  placeholder="Price"
                  name="price"
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct({ ...updatedProduct, price: e.target.value })
                  }
                />
                <Input
                  placeholder="Image URL"
                  name="image"
                  value={updatedProduct.image}
                  onChange={(e) =>
                    setUpdatedProduct({ ...updatedProduct, image: e.target.value })
                  }
                />
              </VStack>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  bg="blue.500"
                  color="white"
                  _hover={{ bg: "blue.600" }}
                  onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                >
                  Update
                </Button>
                <Button
                  bg="blue.500"
                  color="white"
                  _hover={{ bg: "blue.600" }}
                  onClick={closeModal}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </Box>
  );
};

export default ProductCard;