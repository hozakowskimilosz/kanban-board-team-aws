import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  Select,
  LightMode,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import columns from "../../config/columns";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { TaskInterface, ColumnInterface } from "../types";
import callEndpoint from "../utils/callEndpoint";

interface ModalAddTaskProps {
  isOpen: boolean;
  onClose: () => void;
  curColumn: ColumnInterface;
  tasks: TaskInterface[];
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
  tasksForColumn: TaskInterface[];
}

export default function ModalAddTask({
  isOpen,
  onClose,
  curColumn,
  tasks,
  setTasks,
  tasksForColumn,
}: ModalAddTaskProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColumnId, setSelectedColumnId] = useState(curColumn.id);
  const [isNameEmpty, setIsNameEmpty] = useState(false);

  const toast = useToast();

  function handleAddTask() {
    if (!name) {
      setIsNameEmpty(true);
      return;
    }

    const newTask = {
      id: uuidv4(),
      name: name,
      description: description,
      columnId: selectedColumnId,
      order: tasksForColumn.length,
    };

    const sessionStorageData = sessionStorage.getItem("actions");

    callEndpoint("add", "button", newTask)
      .then(() => {
        setTasks([...tasks, newTask]),
          toast({ title: "Added a task", status: "success", isClosable: true }),
          sessionStorage.setItem(
            "actions",
            JSON.stringify([...sessionStorageData, "add"])
          );
      })
      .catch((err) => console.error(err));

    setName("");
    setDescription("");
    setSelectedColumnId(curColumn.id);
    setIsNameEmpty(false);
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsNameEmpty(false);
        onClose();
      }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add new task</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" gap="0.75rem">
          <FormControl isInvalid={isNameEmpty}>
            <Input
              variant="filled"
              placeholder="task name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <Textarea
            variant="filled"
            placeholder="task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Select
            variant="filled"
            value={selectedColumnId}
            onChange={(e) => setSelectedColumnId(Number(e.target.value))}
          >
            {columns.map((col) => (
              <option key={col.id} value={col.id}>
                {col.description}
              </option>
            ))}
          </Select>
        </ModalBody>

        <ModalFooter>
          <LightMode>
            <Button colorScheme="teal" onClick={handleAddTask}>
              Add
            </Button>
          </LightMode>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
