import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Table, Thead, Tbody, Tr, Th, Td, TableCaption,
    Flex, Box, Center, Spinner, Image, Text, Button, useDisclosure
} from '@chakra-ui/react';

import { useMyNovels } from '../services/query';
import { Delete } from '../components';

const Manage = () => {
    const navigate = useNavigate();
    const { data: novels, isLoading } = useMyNovels();

    const cancelRef = useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [novelId, setNovelId] = useState("");

    if (isLoading) return <Center w="100vw" h="100vh"><Spinner /></Center>;

    return (
        <Flex
            w={["90%", "90%", "80%", "80%"]}
            mx="auto"
        >
            <Table
                variant='simple'
                size="lg"
            >
                <TableCaption>Manage your novels</TableCaption>
                <Thead>
                    <Tr>
                        <Th></Th>
                        <Th><Text>Title</Text></Th>
                        <Th><Text align="center">Price</Text></Th>
                        <Th><Text align="center">Approved</Text></Th>
                        <Th><Text align="center">Last update</Text></Th>
                        <Th>
                            <Flex
                                direction="column"
                            >
                                <Button
                                    variant="primary-outlined"
                                    onClick={() => navigate("/createnovel")}
                                    size="sm"
                                >
                                    + CREATE
                                </Button>
                            </Flex>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {novels.data.map((novel) => (
                        <Tr key={novel.id}>
                            <Td>
                                <Flex
                                    justify="center"
                                >
                                    <Image
                                        src={novel.coverImg}
                                        maxW="80px"
                                    />
                                </Flex>
                            </Td>
                            <Th>
                                <Box>{novel.title}</Box>
                                <Box>{novel.novelType.map(
                                    (type) => (
                                        <Button key={type.novelTypeId} size="xs" mr={1} my={1} variant="secondary-outlined">{type.name}</Button>
                                    ))}
                                </Box>
                                <Text
                                    textTransform="none"
                                    fontSize="sm"
                                    fontWeight="400"
                                    maxW="400px"
                                    mt={2}
                                >
                                    {novel.description.length > 150 ? novel.description.slice(0, 150) + "..." : novel.description}
                                </Text>
                            </Th>
                            <Td><Text align="center">THB {novel.price}</Text></Td>
                            <Td>{novel.status ? <Text align="center">Approved</Text> : <Text align="center">Pending</Text>}</Td>
                            <Td>
                                <Text align="center">{novel.updatedAt.split("T")[0]}</Text>
                                <Text align="center">{novel.updatedAt.split("T")[1].split(".")[0]}</Text>
                            </Td>
                            <Td>
                                <Flex
                                    direction="column"
                                >
                                    <Button my={1} variant="primary" size="sm" onClick={() => { setNovelId(novel.id); navigate(`/detail/${novel.id}`); }}>DETAIL</Button>
                                    <Button my={1} size="sm" onClick={() => { setNovelId(novel.id); navigate(`/editnovel/${novel.id}`); }}>EDIT</Button>
                                    <Button my={1} variant="secondary" onClick={() => { setNovelId(novel.id); onOpen(); }} size="sm">DELETE</Button>
                                </Flex>
                            </Td>
                        </Tr>
                    ))}
                    <Delete cancelRef={cancelRef} isOpen={isOpen} onClose={onClose} novelId={novelId} />
                </Tbody>
            </Table>
        </Flex >
    );
};

export default Manage;