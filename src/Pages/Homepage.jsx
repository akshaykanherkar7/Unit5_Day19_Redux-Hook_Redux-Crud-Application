import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Flex, Text } from "@chakra-ui/react";
import { getTasks } from "../Redux/AppReducer/app.action";
import TaskCard from "../Components/TaskCard";
import { useSearchParams } from "react-router-dom";
import { userDetail } from "../Redux/AuthReducer/auth.action";

const Homepage = () => {
  const [searchParams] = useSearchParams();
  const { tasks } = useSelector((state) => state.appReducer);
  console.log("tasks:", tasks);
  const dispatch = useDispatch();
  const getTaskHandler = useCallback(() => {
    dispatch(getTasks());
  }, []);
  useEffect(() => {
    if (tasks.length === 0) {
      getTaskHandler();
    }
  }, [getTaskHandler, tasks.length]);

  // useEffect(() => {
  //   dispatch(userDetail("masai-school")).then((res) => {
  //     console.log("res:", res);
  //   });
  // }, []);

  const filterByParamTags = (task) => {
    const paramsTags = searchParams.getAll("tags");

    if (paramsTags.includes("All") || paramsTags.length === 0) {
      return task;
    }

    const data = task.tags.filter((tag) => {
      if (paramsTags.includes(tag)) {
        return true;
      }
      return false;
    });
    if (data.length) {
      return task;
    }
    return false;
  };

  return (
    <Box border="1px solid green" width="100%">
      <Flex justifyContent="space-around">
        {/* todo */}
        <Box border="1px solid black" width="250px" height="95vh">
          <Box>
            <Text textAlign="center">TODO</Text>
          </Box>
          {tasks.length > 0 &&
            tasks
              .filter((item) => item.task_status === "todo")
              .filter(filterByParamTags)
              .map((item) => {
                return (
                  <TaskCard key={item.id} {...item} colorScheme={"green"} />
                );
              })}
        </Box>
        {/* inprogress */}
        <Box border="1px solid black" width="250px" height="95vh">
          <Box>
            <Text textAlign="center">IN-PROGRESS</Text>
          </Box>
          {tasks.length > 0 &&
            tasks
              .filter((item) => item.task_status === "in-progress")
              .filter(filterByParamTags)
              .map((item) => {
                return (
                  <TaskCard key={item.id} {...item} colorScheme="yellow" />
                );
              })}
        </Box>
        {/* done */}
        <Box border="1px solid black" width="250px" height="95vh">
          <Box>
            <Text textAlign="center">DONE</Text>
          </Box>
          {tasks.length > 0 &&
            tasks
              .filter((item) => item.task_status === "done")
              .filter(filterByParamTags)
              .map((item) => {
                return <TaskCard key={item.id} {...item} colorScheme="blue" />;
              })}
        </Box>
      </Flex>
    </Box>
  );
};

export default Homepage;
