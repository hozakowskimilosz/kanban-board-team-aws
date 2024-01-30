import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  Input,
  LightMode,
  useDisclosure,
} from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import { useState } from "react";
import config from "../config";

export default function LoginPanel() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function handleSubmit() {
    if (!mail || !password) return;

    try {
      await Auth.signIn(mail, password);
      alert("Logged in");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(String(error));
      }
    }

    onClose();
  }

  return (
    <Box display="flex" alignItems="center" gap="1rem">
      <LightMode>
        <Button colorScheme="teal" onClick={onOpen}>
          Account
        </Button>
      </LightMode>

      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <FormControl display="flex" alignItems="center" gap="1rem">
              <Box display="flex" alignItems="center">
                <Input
                  type="mail"
                  id="mail"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  placeholder="Mail"
                />
              </Box>

              <Box display="flex" alignItems="center">
                <Input
                  type="text"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Box>

              <LightMode>
                <Button colorScheme="teal" size="md" onClick={handleSubmit}>
                  Login
                </Button>
              </LightMode>
            </FormControl>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
