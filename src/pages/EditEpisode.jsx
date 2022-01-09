import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Flex, Textarea, Input, Button, Center, Spinner } from '@chakra-ui/react';

import { useEpisode, useUpdateEpisode } from "../services/query";

const EditEpisode = () => {
    const navigate = useNavigate();
    const { novelId, episodeNumber } = useParams();

    const useQueryMultiple = () => {
        const res1 = useEpisode(novelId, episodeNumber);
        const res2 = useUpdateEpisode(novelId, episodeNumber);
        return [res1, res2];
    };

    const [{ data: data1, isLoading: isLoading1 }, { mutate, isLoading: isLoading2, isSuccess: isSuccess2 }] = useQueryMultiple();

    const [episodeTitle, setEpisodeTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = () => {
        const paragraphs = content.split(/\r?\n/);
        mutate({ episodeTitle, paragraphs });
    };

    useEffect(() => {
        setEpisodeTitle(data1?.data.episodeTitle);
        let content = "";
        if (data1?.data.paragraphs) {
            for (let paragraph of data1?.data.paragraphs) {
                content = content + paragraph + "\n";
            }
        }
        setContent(content);
    }, [data1]);

    if (isLoading1 || isLoading2) return <Center w="100vw" h="100vh"><Spinner /></Center>;
    if (isSuccess2) navigate(`/detail/${novelId}`);

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

export default EditEpisode;