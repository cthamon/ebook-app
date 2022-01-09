import { useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {
    Center, Spinner, Flex, Button, Box, Text, Image, Divider, IconButton, Link, useDisclosure,
    AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter
} from '@chakra-ui/react';
import { CloseIcon } from "@chakra-ui/icons";

import { useEpisodes, useOneNovel, useDeleteEpisode } from "../services/query";

const NovelDetail = () => {
    const navigate = useNavigate();
    const { novelId } = useParams();

    const cancelRef = useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const useQueryMultiple = () => {
        const res1 = useOneNovel(novelId);
        const res2 = useEpisodes(novelId);
        const res3 = useDeleteEpisode();
        return [res1, res2, res3];
    };
    const [{ data, isLoading }, { data: data2, isLoading2 }, { mutate }] = useQueryMultiple();

    const [fullDesc, setFullDesc] = useState(false);
    const [episodeId, setEpisodeId] = useState(0);

    if (isLoading || isLoading2) return <Center w="100vw" h="100vh"><Spinner /></Center>;
    const [novel] = data.data;
    const episodes = data2?.data;

    return (
        <Box
            w={["90%", "90%", "80%", "80%"]}
            mx="auto"
            h="150vh"
        >
            <Flex>
                <Flex
                    justify="space-between"
                    mt={5}
                    mx="auto"
                >
                    <Box
                        minW="210px"
                        h="350px"
                        bg="gray.100"
                        rounded="lg"
                        mr={10}
                    >
                        <Image
                            h="350px"
                            rounded="lg"
                            src={novel.coverImg}
                        />
                    </Box>
                    <Box>
                        <Flex
                            mb={3}
                            justify="space-between"
                        >
                            <Text fontWeight='bold' fontSize='2xl'>{novel.title}</Text>
                            <IconButton
                                colorScheme="red"
                                icon={<CloseIcon />}
                                onClick={() => navigate("/manage")}
                            />
                        </Flex>
                        <Flex mb={3}>
                            <Box mr={10}>
                                <Text fontWeight='bold' fontSize='lg'>Type</Text>
                                {novel.novelType.map(
                                    (type, i) => (
                                        <Button key={i} size="xs" mr={1} my={1} variant="secondary-outlined">{type}</Button>
                                    ))
                                }
                            </Box>
                            <Box>
                                <Text fontWeight='bold' fontSize='lg'>Price</Text>
                                <Text>{novel.price}</Text>
                            </Box>
                        </Flex>
                        <Box mb={3}>
                            <Text fontWeight='bold' fontSize='lg'>Description</Text>
                            <Text>
                                {novel.description.length > 500 ? !fullDesc ?
                                    <span> {novel.description.slice(0, 500)} ...
                                        <Link color="blue.500" onClick={() => setFullDesc(!fullDesc)}> Show more</Link>
                                    </span> : <span> {novel.description}
                                        <Link color="blue.500" onClick={() => setFullDesc(!fullDesc)}> Show less</Link>
                                    </span> : novel.description}
                            </Text>
                        </Box>
                        <Box>
                            <Text fontWeight='bold' fontSize='lg'>Last Update</Text>
                            <Text>{`Date: ${novel.updatedAt.split("T")[0].split("-")[2]}/${novel.updatedAt.split("T")[0].split("-")[1]}/${novel.updatedAt.split("T")[0].split("-")[0]} at ${+novel.updatedAt.split("T")[1].split(".")[0].split(":")[0] + 7 > 24 ? +novel.updatedAt.split("T")[1].split(".")[0].split(":")[0] + 7 - 24 + ":" + novel.updatedAt.split("T")[1].split(".")[0].split(":")[1] : +novel.updatedAt.split("T")[1].split(".")[0].split(":")[0] + 7 + ":" + novel.updatedAt.split("T")[1].split(".")[0].split(":")[1]}`}</Text>
                        </Box>
                    </Box>
                </Flex>
            </Flex>
            <Divider my={5} />
            <Box>
                <Button variant="primary-outlined" onClick={() => navigate(`/createepisode/${novelId}`)}>+ New Episode</Button>
                {episodes?.map((episode) => (
                    <Flex
                        key={episode.id}
                        justify="space-between"
                        align="center"
                        my={3}
                    >
                        <Box my={1}>
                            <Text fontWeight="600">Episode {episode.episodeNumber} : {episode.episodeTitle}</Text>
                            <Text fontWeight="400" fontSize="sm">{`${episode.updatedAt.split("T")[0].split("-")[2]}/${episode.updatedAt.split("T")[0].split("-")[1]}/${episode.updatedAt.split("T")[0].split("-")[0]}`}</Text>
                        </Box>
                        <Flex>
                            <Button minW="85px" mr={1} onClick={() => navigate(`/editepisode/${novelId}/${episode.episodeNumber}`)}>EDIT</Button>
                            <Button variant="secondary" onClick={() => { onOpen(); setEpisodeId(episode.id); }}>DELETE</Button>
                        </Flex>
                    </Flex>
                ))}
            </Box>
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
                            onClick={() => { mutate(episodeId); onClose(); }}
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Box>
    );
};

export default NovelDetail;