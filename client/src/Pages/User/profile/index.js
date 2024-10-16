import React from "react";
import { useAuth } from "../../../Component/AuthContext";
import { Text, Button, Alert, AlertIcon, Box, VStack, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Profile() {
  const { user, logout, loggedIn } = useAuth();

  const handleLogout = async () => {
    logout();
  };

  return (
    <VStack 
      justify="center" 
      align="center" 
      h="100vh" 
      spacing={6} 
      px={4} 
      background="gray.50"
    >
      {loggedIn === false ? (
        <Stack align="center" spacing={6}>
          <Alert status="warning" maxW="400px" borderRadius="md">
            <AlertIcon />
            You are not logged in. Please log in and try again.
          </Alert>
          <Stack direction="row" spacing={4}>
            <Link to="/signin">
              <Button colorScheme="whatsapp" size="lg" shadow="md" _hover={{ bg: "green.600" }}>
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="facebook" size="lg" shadow="md" _hover={{ bg: "blue.600" }}>
                Register
              </Button>
            </Link>
          </Stack>
        </Stack>
      ) : (
        <Box maxW="500px" bg="white" p={8} borderRadius="md" shadow="lg" textAlign="center">
          <Text fontSize="3xl" fontWeight="bold" color="teal.500">
            Profile
          </Text>
          <Box mt={6} p={4} border="1px" borderColor="gray.200" borderRadius="md" textAlign="left">
            <Text fontSize="xl" color="gray.700">
              <strong>Email:</strong> {user.email}
            </Text>
            <Text fontSize="xl" color="gray.700" mt={3}>
              <strong>Role:</strong> {user.role}
            </Text>
          </Box>
          <Button 
            colorScheme="pink" 
            mt={8} 
            size="lg" 
            onClick={handleLogout} 
            _hover={{ bg: "pink.400" }}
          >
            Logout
          </Button>
        </Box>
      )}
    </VStack>
  );
}

export default Profile;
