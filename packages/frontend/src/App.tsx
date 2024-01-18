import "./App.css";
import {
  Flex,
  Heading,
  Text,
  Button,
  useColorMode,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import columnsFromConfig from "../config/columns";
import colors from "../config/colors";
import Column from "./components/Column";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { fetchAllTasks } from "./api/endpoints";
import { useEffect, useState } from "react";
import { TaskInterface } from "./types";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const value = useColorModeValue(colors.lightGray, colors.darkGray);
  const [columns, setColumns] = useState(columnsFromConfig);

  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const fetchedTasks = await fetchAllTasks();
      setTasks(fetchedTasks);
    };
    getTasks();
  }, []);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return;

    const start = columns.find(
      (column) => column.id === Number(source.droppableId)
    );
    const end = columns.find(
      (column) => column.id === Number(destination.droppableId)
    );

    console.log(start);
    console.log(end);

    if (!start || !end) return;

    if (start === end) {
      const newList = Array.from(start.tasks);
      const [removed] = newList.splice(source.index, 1);
      newList.splice(destination.index, 0, removed);

      setColumns((state) => ({
        ...state,
        [start.id]: { ...start, list: newList },
      }));
    } else {
      const startList = Array.from(start.tasks);
      const [removed] = startList.splice(source.index, 1);
      const endList = Array.from(end.tasks);
      endList.splice(destination.index, 0, removed);

      setColumns((state) => ({
        ...state,
        [start.id]: { ...start, list: startList },
        [end.id]: { ...end, list: endList },
      }));
    }
  };

  return (
    <>
      <Flex justify="space-between" align="center">
        <Heading display="flex" gap="1rem" size={["md", "lg", "xl"]}>
          <Text>Kanban Board</Text>
          <Text className="colored-header">AWS</Text>
        </Heading>

        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? "🌘" : "🌞"}
        </Button>
      </Flex>

      <DragDropContext onDragEnd={onDragEnd}>
        <SimpleGrid
          columns={{ lg: 5, md: 3, sm: 1 }}
          spacing="1rem"
          className="grid"
        >
          {columns.map((col) => {
            const tasksForColumn = tasks?.filter(
              (task) => task.columnId === col.id
            );
            return (
              <Column
                key={col.id}
                column={col}
                tasks={tasks}
                setTasks={setTasks}
                tasksForColumn={tasksForColumn}
                bgColor={value}
              />
            );
          })}
        </SimpleGrid>
      </DragDropContext>
    </>
  );
}

export default App;
