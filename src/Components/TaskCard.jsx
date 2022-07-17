import React, { useState } from "react";
import {
  Box,
  Stack,
  Text,
  Badge,
  Heading,
  CheckboxGroup,
  Flex,
  Checkbox,
} from "@chakra-ui/react";

import { EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const TaskCard = ({
  id,
  title,
  description,
  tags,
  subTasks,
  colorScheme = "green",
}) => {
  const [checkbox, setCheckbox] = useState();
  return (
    <Box border="1px solid  red" width={"230px"} padding="10px" margin="auto">
      <Flex justifyContent={"space-between"}>
        <Text>{title}</Text>
        <Link to={`/task/${id}`}>
          <EditIcon></EditIcon>
        </Link>
      </Flex>
      <Box>
        <Stack direction={"row"}>
          {tags.length &&
            tags.map((item, index) => {
              return (
                <Badge key={index} colorScheme={colorScheme}>
                  {item}
                </Badge>
              );
            })}
        </Stack>
      </Box>
      <Text>{description}</Text>
      <Box>
        <Heading size="sm">SubTasks</Heading>
        <CheckboxGroup value={checkbox}>
          {subTasks.length &&
            subTasks.map((item, index) => {
              return (
                <Checkbox key={index} size="md" value={item.subTaskTitle}>
                  {item.subTaskTitle}
                </Checkbox>
              );
            })}
        </CheckboxGroup>
      </Box>
    </Box>
  );
};

export default TaskCard;
