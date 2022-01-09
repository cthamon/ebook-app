import { useDispatch } from 'react-redux';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';

import { addToCart } from '../../store/slices/cartSlice';

const Novel = ({ novel }) => {
    const dispatch = useDispatch();

    return (
        <Box
            w={["280px", "280px", "190px", "190px"]}
            m="10px"
            border="1px solid"
            borderColor="secondary"
            borderRadius="7px"
            _hover={{
                borderColor: "primary",
                boxShadow: "md"
            }}
        >
            <Box
                h={["320px", "320px", "270px", "270px"]}
                backgroundImage={`url(${novel.coverImg})`}
                backgroundSize="cover"
                backgroundPosition="center"
                borderRadius="7px 7px 0 0"
            />
            <Box
                p="5px"
            >
                <Text
                    mt="5px"
                    variant="primary"
                    h="48px"
                >
                    {novel.title}
                </Text>
                <Text
                    color="secondary"
                >
                    by {novel.writer.name}
                </Text>
                <Flex
                    justify="space-between"
                    align="center"
                >
                    <Text>
                        Rating
                    </Text>
                    <Button
                        variant="primary"
                        onClick={() => dispatch(addToCart({ ...novel, quantity: 1 }))}
                    >
                        {novel.price > 0 ? "B " + novel.price : <ViewIcon />}
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
};

export default Novel;