import { FormControl, FormLabel, Box, Image, Input, Text } from "@chakra-ui/react";

const FromCover = ({ image, onChange }) => {

    return (
        <FormControl>
            <FormLabel
                cursor="pointer"
            >
                <Box
                    w="250px"
                    h="350px"
                    bg="gray.100"
                    rounded="lg"
                >
                    <Image
                        w="250px"
                        h="350px"
                        rounded="lg"
                        src={image}
                    />
                </Box>
                <Text
                    position="absolute"
                    align="center"
                    w="130px"
                    bottom="160px"
                    left="60px"
                    color="gray.500"
                    cursor="pointer"
                >
                    {image ? "" : "Click to upload cover image"}
                </Text>
            </FormLabel>
            <Input
                display='none'
                type='file'
                onChange={onChange}
            />
        </FormControl >
    );
};

export default FromCover;
