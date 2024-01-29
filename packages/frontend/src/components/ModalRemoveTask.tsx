import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { TaskInterface } from "../types";
import callEndpoint from "../utils/callEndpoint";

interface ModalRemoveTaskProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskInterface;
  tasks: TaskInterface[];
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
}

export default function ModalRemoveTask({
  isOpen,
  onClose,
  task,
  tasks,
  setTasks,
}: ModalRemoveTaskProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();

  function handleRemoveTask() {
    callEndpoint(tasks, "delete", "button", undefined, task.id)
      .then((e) => {
        setTasks(e);
        toast({
          title: "Removed a task",
          status: "warning",
          isClosable: true,
        });
      })
      .catch((err) => console.error(err));

    onClose();
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Task
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleRemoveTask} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
