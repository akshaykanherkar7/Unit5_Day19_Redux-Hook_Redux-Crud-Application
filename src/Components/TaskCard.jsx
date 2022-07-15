import React from "react";
import { Box, Stack, Text, Badge, Heading } from "@chakra-ui/react";

const TaskCard = ({
  title,
  description,
  tags,
  subtasks,
  colorScheme = "green",
}) => {
  return (
    <Box>
      <Text>{title}</Text>
      <Box>
        <Stack>
          {tags.length &&
            tags.map((item, index) => {
              return (
                <Badge key={index} colorScheme={colorScheme}>
                  Default
                </Badge>
              );
            })}
        </Stack>
      </Box>
      <Text>{description}</Text>
      <Stack>
        <Heading size="sm">SubTasks</Heading>
        {subtasks.length > 0 &&
          subtasks?.map((item, index) => {
            return (
              <Box key={index}>
                <Text>{item.subTaskTitle}</Text>
              </Box>
            );
          })}
      </Stack>
    </Box>
  );
};

export default TaskCard;
