import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack, Text, useToast } from "@chakra-ui/react";
import { FaCertificate } from "react-icons/fa";

const Index = () => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [certificate, setCertificate] = useState(null);
  const toast = useToast();

  const handleNameChange = (event) => setName(event.target.value);
  const handleMobileNumberChange = (event) => setMobileNumber(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !mobileNumber) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const downloadCertificate = () => {
    if (name && mobileNumber) {
      const certificateText = `Congratulations ${name}, your mobile number ${mobileNumber} has been registered.`;
      const element = document.createElement("a");
      const file = new Blob([certificateText], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = `${name}_certificate.txt`;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields and register before generating a certificate",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" placeholder="Enter your name" value={name} onChange={handleNameChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="mobileNumber">Mobile Number</FormLabel>
          <Input id="mobileNumber" placeholder="Enter your mobile number" value={mobileNumber} onChange={handleMobileNumberChange} />
        </FormControl>

        <Button colorScheme="teal" type="submit">
          Register
        </Button>
        <Button leftIcon={<FaCertificate />} colorScheme="blue" onClick={downloadCertificate}>
          Generate Certificate
        </Button>
      </VStack>
      {certificate && (
        <Box mt={6} p={6} border="1px" borderColor="gray.200" textAlign="center">
          <Text fontSize="xl" fontWeight="bold">
            Certificate of Registration
          </Text>
          <Text mt={3}>{certificate}</Text>
        </Box>
      )}
    </Box>
  );
};

export default Index;
