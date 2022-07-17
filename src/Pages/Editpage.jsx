import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addSubTasks,
  deleteSubTasks,
  getTasks,
  updateTasks,
} from "../Redux/AppReducer/app.action";
import { useDispatch, useSelector } from "react-redux";
import { DeleteIcon } from "@chakra-ui/icons";

const Editpage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { tasks } = useSelector((state) => state.appReducer);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskTags, setTaskTags] = useState([]);
  const [subTasks, setSubTasks] = useState([]);
  const [checkBox, setCheckBox] = useState([]);
  const [currentSubTasks, setCurrentSubTasks] = useState();

  const addSubTask = (e) => {
    e.preventDefault();
    if (currentSubTasks) {
      const newSubTasks = [
        ...subTasks,
        { subTaskTitle: currentSubTasks, status: false },
      ];

      dispatch(
        addSubTasks(id, {
          subTasks: newSubTasks,
        })
      )
        .then(() => {
          dispatch(getTasks());
        })
        .then(() => {
          setCurrentSubTasks("");
        });
    }
  };

  const updateHandler = (type, value) => {
    if (type === "textAndDescription") {
      dispatch(
        updateTasks(id, {
          title: taskTitle,
          description: taskDescription,
        })
      ).then(() => dispatch(getTasks()));
    } else if (type === "taskStatus") {
      dispatch(
        updateTasks(id, {
          task_status: value,
        })
      ).then(() => {
        dispatch(getTasks());
      });
    } else if (type === "taskTags") {
      dispatch(
        updateTasks(id, {
          tags: value,
        })
      ).then(() => {
        dispatch(getTasks());
      });
    }
  };

  const updateSubTaskStatus = (checkBoxValues) => {
    let newData = subTasks.map((item) => {
      if (checkBoxValues.includes(item.subTaskTitle)) {
        return {
          ...item,
          status: true,
        };
      }
      return { ...item, status: false };
    });
    dispatch(addSubTasks(id, { subTasks: newData })).then(() => {
      dispatch(getTasks());
    });
  };

  const handleDelete = (title) => {
    let newData = subTasks.filter((item) => item.subTaskTitle !== title);
    console.log(newData);
    dispatch(deleteSubTasks(id, { subTasks: newData })).then(() => {
      dispatch(getTasks());
    });
  };

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(getTasks());
    }
  }, [dispatch, tasks.length]);

  useEffect(() => {
    if (tasks) {
      const currentTask = tasks.find((item) => item.id === Number(id));

      if (currentTask) {
        setTaskTitle(currentTask.title);
        setTaskDescription(currentTask.description);
        setTaskStatus(currentTask.task_status);
        setTaskTags(currentTask.tags);
        setSubTasks(currentTask.subTasks);
        let data = currentTask.subTasks
          .filter((item) => {
            return item.status && item.subTaskTitle;
          })
          .map((item) => item.subTaskTitle);
        setCheckBox(data);
      }
    }
  }, [id, tasks]);

  return (
    <Box border="1px solid green" width="100%">
      <Flex justifyContent="space-around" mt="3vh">
        {/* Task,Title,Des  */}
        <Box width="200px" height="90vh">
          <Box>
            <Stack>
              <Input
                value={taskTitle}
                placeholder="title"
                onChange={(e) => setTaskTitle(e.target.value)}
              ></Input>
              <Editable value={taskDescription}>
                <EditablePreview />
                <EditableTextarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </Editable>
              <Button
                onClick={() => {
                  updateHandler("textAndDescription");
                }}
              >
                Update
              </Button>
            </Stack>
          </Box>
          <Box>
            <RadioGroup
              value={taskStatus}
              onChange={(value) => {
                setTaskStatus(value);
                updateHandler("taskStatus", value);
              }}
            >
              <Stack direction="column">
                <Radio value="todo">Todo</Radio>
                <Radio value="in-progress">In-Progress</Radio>
                <Radio value="done">Done</Radio>
              </Stack>
            </RadioGroup>
          </Box>

          <Box>
            <Text>Tags</Text>
            <CheckboxGroup
              colorScheme={"green"}
              onChange={(value) => {
                setTaskTags(value);
                updateHandler("taskTags", value);
              }}
              value={taskTags}
            >
              <Stack spacing={[1, 5]} direction="column">
                <Checkbox value="Official">Official</Checkbox>
                <Checkbox value="Personal">Personal</Checkbox>
                <Checkbox value="Others">Others</Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>
        </Box>
        {/* sub task   */}
        <Box border="1px solid blue" width="350px" height="90vh">
          <form onSubmit={addSubTask}>
            <Flex>
              <Input
                placeholder="add new subtask"
                value={currentSubTasks}
                onChange={(e) => setCurrentSubTasks(e.target.value)}
              />
              <Button ml="0.5rem" type="submit">
                Add
              </Button>
            </Flex>
          </form>
          <Flex direction="column" p="1rem" gap="1rem">
            <CheckboxGroup
              value={checkBox}
              onChange={(value) => {
                setCheckBox(value);
                updateSubTaskStatus(value);
              }}
            >
              {subTasks.length &&
                subTasks.map((item, index) => (
                  <Flex key={index} justifyContent="space-between">
                    <Checkbox key={index} size="md" value={item.subTaskTitle}>
                      {item.subTaskTitle}
                    </Checkbox>
                    <DeleteIcon
                      cursor={"pointer"}
                      onClick={() => handleDelete(item.subTaskTitle)}
                    />
                  </Flex>
                ))}
            </CheckboxGroup>
          </Flex>
        </Box>
        {/* create new   */}
        <Box border="1px solid black" width="250px" height="90vh"></Box>
      </Flex>
    </Box>
  );
};

export default Editpage;
