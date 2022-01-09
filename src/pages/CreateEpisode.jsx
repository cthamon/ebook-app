import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Flex, Textarea, Input, Button, Center, Spinner } from '@chakra-ui/react';

import { useCreateEpisode } from "../services/query";

const CreateEpisode = () => {
    const navigate = useNavigate();
    const { novelId } = useParams();

    const { mutate, isLoading, isSuccess } = useCreateEpisode(novelId);

    const [episodeTitle, setEpisodeTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = () => {
        const paragraphs = content.split(/\r?\n/);
        mutate({ episodeTitle, paragraphs });
    };

    if (isLoading) return <Center w="100vw" h="100vh"><Spinner /></Center>;
    if (isSuccess) navigate(`/detail/${novelId}`);

    return (
        <Flex
            direction='column'
            align='center'
            w="80%"
            mx="auto"
        >
            <Flex
                w='100%'
                justify='space-between'
                align='center'
            >
                <Flex
                    w='80%'
                >
                    <Input
                        variant="filled"
                        type='text'
                        placeholder="Episode Title"
                        fontSize='2xl'
                        border='none'
                        rounded='none'
                        borderBottom='1px solid #A0AEC0'
                        value={episodeTitle}
                        onChange={(e) => setEpisodeTitle(e.target.value)}
                        _focus={{ outline: 'none' }}
                    />
                </Flex>
                <Box
                    align="right"
                    w='20%'
                >
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        mr={1}
                    >
                        Save
                    </Button>
                    <Button
                        colorScheme="red"
                        onClick={() => navigate(`/detail/${novelId}`)}
                    >
                        Back
                    </Button>
                </Box>
            </Flex>
            <Textarea
                mt={5}
                variant="filled"
                type='text'
                placeholder="Episode's content"
                fontSize='xl'
                minH='80vh'
                resize='none'
                borderBottom='0.5px solid #A0AEC0'
                value={content}
                _focus={{ outline: 'none' }}
                onChange={(e) => setContent(e.target.value)}
            />
        </Flex>
    );
};

export default CreateEpisode;