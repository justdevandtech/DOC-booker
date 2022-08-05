import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Textarea,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closeContactDOCModal } from "../../../features/modal/modalSlice";

export const SendChat = () => {
    const dispatch = useAppDispatch()
    const { constactDOCModal } = useAppSelector(state => state.modal);
    const handleCloseModal = () => {
        dispatch(closeContactDOCModal());
    }
  return (
    <>
      <Modal isOpen={constactDOCModal} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contact Doctor</ModalHeader>
          <ModalCloseButton />
          <hr />
          <ModalBody>
            <Box>
              <Textarea resize={'none'} placeholder='Send a direct message to doctor' />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={handleCloseModal}>
              Close
            </Button>
            <Button colorScheme='blue'>Send DM</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
