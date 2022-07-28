import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Box,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { userIsNotLogout } from "../../features/modal/modalSlice";

export const ConfirmLogout = () => {
  const cancelRef = useRef<HTMLButtonElement>(null);
    const dispatch = useAppDispatch();
    const { logOutScreen } = useAppSelector(state => state.modal);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    }

    const handlCloseDialog = () => {
        dispatch(userIsNotLogout());
    }

  return (
    <Box>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={handlCloseDialog}
        isOpen={logOutScreen}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Account Logout?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to logout from your account?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={handlCloseDialog}>No</Button>
            <Button colorScheme='red' ml={3} onClick={handleLogout}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};
