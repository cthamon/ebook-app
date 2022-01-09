import { FormControl, FormLabel, Flex, Box, Image, Input } from "@chakra-ui/react";

const FormProfile = ({ profileImage, onChange }) => {
    return (
        <FormControl
            mb={3}
        >
            <Flex
                justify='center'
                align='center'
                w='100%'
            >
                <FormLabel
                    display='inline-block'
                    cursor='pointer'
                    borderRadius='full'
                    bg='secondary.100'
                    p={1}
                >
                    <Box
                        w='135px'
                        h='135px'
                        borderRadius='full'
                        bg='#fff'
                        _hover={{ bg: 'secondary.100' }}
                    >
                        <Image
                            borderRadius='full'
                            boxSize='135px'
                            src={profileImage ? profileImage : "/profile.png"}
                            alt="Profile Picture"
                        />
                    </Box>
                </FormLabel>
            </Flex>
            <Input
                display='none'
                type='file'
                onChange={onChange}
            />
        </FormControl>
    );
};

export default FormProfile;
