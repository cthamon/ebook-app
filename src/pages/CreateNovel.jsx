import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Center, Spinner, Flex, Heading, Button, Text, Textarea, Box, FormErrorMessage, FormControl, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import { FormInput, FormCover } from "../components";
import { useCreateNovel } from "../services/query";

const Create = () => {
    const navigate = useNavigate();
    const { mutate, isLoading, error, isSuccess } = useCreateNovel();
    const [input, setInput] = useState({ title: "", description: "", novelTypes: "", price: "" });

    const [file, setFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({ ...prev, [name]: value }));
    };

    let coverImage;
    if (file) {
        coverImage = URL.createObjectURL(file);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, description, novelTypes, price } = input;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append(`novelTypes`, JSON.stringify(novelTypes.split(",")).replace(/"\s/g, '"'));
        formData.append('price', price);
        formData.append('coverImg', file ? file : null);
        mutate(formData);
    };

    if (isLoading) return <Center w="100vw" h="100vh"><Spinner /></Center>;
    if (isSuccess) navigate("/manage");

    return (
        <Center
            h={["auto", "auto", "80vh", "80vh"]}
            px={[6, 6, 12, 12]}
            py={12}
        >
            <Flex
                direction="column"
                px={[6, 6, 12, 12]}
                py={12}
                rounded={6}
                border="1px solid"
                borderColor="secondary"
                boxShadow="lg"
            >
                <Flex
                    justify="space-between"
                    align="center"
                    mb={6}
                >
                    <Heading>Create Novel</Heading>
                    <IconButton
                        colorScheme="red"
                        icon={<CloseIcon />}
                        onClick={() => navigate("/manage")}
                    />
                </Flex>
                <form onSubmit={handleSubmit}>
                    <Flex
                        justify="space-between"
                        align="flex-start"
                    >
                        <Box>
                            <FormCover
                                image={coverImage}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </Box>
                        <Flex
                            w="300px"
                            direction="column"
                        >
                            <FormInput
                                w="100%"
                                isInvalid={input.title === ""}
                                errorMessage="Title"
                                name="title"
                                type="text"
                                placeholder="Title"
                                value={input.title}
                                onChange={handleInputChange}
                            />
                            <FormControl isInvalid={input.description === ""}>
                                {
                                    input.description === "" && <FormErrorMessage
                                        m={0}
                                        p={0}
                                        color="primary"
                                        fontWeight="semibold"
                                    >
                                        Description / Introduction
                                    </FormErrorMessage>
                                }
                                <Textarea
                                    _invalid={{ border: "none" }}
                                    mb={3}
                                    variant="filled"
                                    name="description"
                                    placeholder="Description / Introduction"
                                    value={input.description}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormInput
                                w="100%"
                                isInvalid={input.novelTypes === ""}
                                errorMessage="Type / Genre"
                                name="novelTypes"
                                type="text"
                                placeholder="Type 1, Type 2, Type 3"
                                value={input.novelTypes}
                                onChange={handleInputChange}
                            />
                            <FormInput
                                w="100%"
                                isInvalid={input.price === ""}
                                errorMessage="Price"
                                name="price"
                                type="price"
                                placeholder="Price"
                                value={input.price}
                                onChange={handleInputChange}
                            />
                        </Flex>
                    </Flex>
                    <Button
                        w="100%"
                        variant="primary"
                        type="submit"
                    >
                        Create
                    </Button>
                    {error &&
                        error.response.data.map((err, i) => (
                            <Text key={i} color="danger">
                                {err.message}
                            </Text>))
                    }
                </form>
            </Flex>
        </Center>
    );
};

export default Create;