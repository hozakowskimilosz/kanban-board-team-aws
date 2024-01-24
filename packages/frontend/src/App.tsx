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
import { DragDropContext } from "react-beautiful-dnd";
import { fetchAllTasks } from "./api/endpoints";
import { useEffect, useState } from "react";
import { TaskInterface } from "./types";
import onDragEnd from "./utils/onDragEnd";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const value = useColorModeValue(colors.lightGray, colors.darkGray);

  const [columns] = useState(columnsFromConfig);
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const fetchedTasks = await fetchAllTasks();
      setTasks(fetchedTasks);
    };
    getTasks();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const ctrlPressed = event.ctrlKey || event.metaKey; // metaKey is for Mac
      const kPressed = event.key.toLocaleLowerCase() === "z";
      const yPressed = event.key.toLocaleLowerCase() === "y";

      if (ctrlPressed && kPressed) {
        console.log("kliklnieto klawiszami ctrl z");
      }

      if (ctrlPressed && yPressed) {
        console.log("kliknieto ctrl + y");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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

      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, tasks, setTasks)}
      >
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
