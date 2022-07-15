import React from "react";
import { Box, Text, Flex, Button, Stack } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { isAuth } = useSelector((state) => state.authReducer);
  return (
    <Box border="1px solid red" width="250px" height="100vh">
      <Stack direction="column">
        <Box height="15vh" border="1px solid red">
          {/* user profile */}
        </Box>
        <Box height="70vh" border="1px solid blue">
          <Flex direction="column">
            <Box border="1px solid blue">
              <Flex padding="0 10px">
                <Text>All</Text>
                <Text marginLeft={"auto"}>4</Text>
              </Flex>
            </Box>
            <Box border="1px solid blue">
              <Flex padding="0 10px">
                <Text>All</Text>
                <Text marginLeft={"auto"}>4</Text>
              </Flex>
            </Box>
            <Box border="1px solid blue">
              <Flex padding="0 10px">
                <Text>All</Text>
                <Text marginLeft={"auto"}>4</Text>
              </Flex>
            </Box>
            <Box border="1px solid blue">
              <Flex padding="0 10px">
                <Text>All</Text>
                <Text marginLeft={"auto"}>4</Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box height="10vh" border="1px solid red">
          <Button width="100%">{isAuth && "LOGOUT"}</Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Sidebar;
