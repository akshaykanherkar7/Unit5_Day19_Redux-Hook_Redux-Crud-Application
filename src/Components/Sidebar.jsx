import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Button, Stack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Sidebar = () => {
  const { isAuth } = useSelector((state) => state.authReducer);
  const { tasks } = useSelector((state) => state.appReducer);
  const personalTasks = tasks.filter((item) => item.tags.includes("Personal"));
  const OfficialTasks = tasks.filter((item) => item.tags.includes("Official"));
  const OthersTasks = tasks.filter((item) => item.tags.includes("Others"));

  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedTags, setSelectedTags] = useState(
    searchParams.getAll("tags") || []
  );

  const handleTagChange = (tag) => {
    let newSelectedTags = [...selectedTags];
    if (selectedTags.includes(tag)) {
      newSelectedTags.splice(newSelectedTags.indexOf(tag), 1);
    } else {
      newSelectedTags.push(tag);
    }
    setSelectedTags(newSelectedTags);
  };

  useEffect(() => {
    if (selectedTags) {
      setSearchParams({ tags: selectedTags });
    }
  }, [selectedTags, searchParams]);

  return (
    <Box border="1px solid red" width="250px" height="100vh">
      <Stack direction="column">
        <Box height="15vh" border="1px solid red">
          {/* user profile */}
        </Box>
        <Box height="70vh" border="1px solid blue" p="10px">
          <Flex direction="column" gap="5px">
            <Box
              border="1px solid blue"
              padding="5px "
              backgroundColor={
                selectedTags.includes("All") ? "blue.400" : "blue.100"
              }
              onClick={() => handleTagChange("All")}
              cursor={"pointer"}
            >
              <Flex padding="0 10px">
                <Text>All</Text>
                <Text marginLeft={"auto"}>{tasks.length}</Text>
              </Flex>
            </Box>
            <Box
              border="1px solid blue"
              padding="5px "
              backgroundColor={
                selectedTags.includes("Personal") ? "green.400" : "green.100"
              }
              onClick={() => handleTagChange("Personal")}
              cursor={"pointer"}
            >
              <Flex padding="0 10px">
                <Text>Personal</Text>
                <Text marginLeft={"auto"}>{personalTasks.length}</Text>
              </Flex>
            </Box>
            <Box
              border="1px solid blue"
              padding="5px "
              backgroundColor={
                selectedTags.includes("Official") ? "purple.400" : "purple.100"
              }
              onClick={() => handleTagChange("Official")}
              cursor={"pointer"}
            >
              <Flex padding="0 10px">
                <Text>Official</Text>
                <Text marginLeft={"auto"}>{OfficialTasks.length}</Text>
              </Flex>
            </Box>
            <Box
              border="1px solid blue"
              padding="5px "
              backgroundColor={
                selectedTags.includes("Others") ? "orange.400" : "orange.100"
              }
              onClick={() => handleTagChange("Others")}
              cursor={"pointer"}
            >
              <Flex padding="0 10px">
                <Text>Others</Text>
                <Text marginLeft={"auto"}>{OthersTasks.length}</Text>
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
