import { Center, Flex, Spinner } from '@chakra-ui/react';

import Novel from './Novel';

import { useNovels } from '../../services/query';

const Novels = () => {
    const { data: novels, isLoading } = useNovels();

    if (isLoading) return <Center w="100vw" h="100vh"><Spinner /></Center>;

    return (
        <Flex
            justify="center"
            align="center"
            flexDir={["column", "column", "row", "row"]}
            flexWrap="wrap"
            w={["90%", "90%", "80%", "80%"]}
            mx="auto"
        >
            {novels.data.map((novel) => (
                <Novel key={novel.id} novel={novel} />
            ))}
        </Flex>
    );
};

export default Novels;
