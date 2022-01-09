import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react';

import { useDeleteNovel } from '../services/query';

const Delete = ({ novelId, isOpen, onClose, cancelRef }) => {
    const { mutate } = useDeleteNovel();

    return (
        <AlertDialog
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
        >
            <AlertDialogOverlay bg="rgba(0, 0, 0, 0.1)" />
            <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Novel
                </AlertDialogHeader>
                <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose} colorScheme="gray">
                        Cancel
                    </Button>
                    <Button
                        colorScheme="red"
                        ml={3}
                        onClick={() => { mutate(novelId); onClose(); }}
                    >
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >
    );
};

export default Delete;
