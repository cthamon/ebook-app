import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Center, Spinner, Flex, Heading, Button, Textarea, Box, FormControl, IconButton, FormLabel } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import { FormInput, FormCover } from "../components";
import { useEditNovel, useOneNovel } from "../services/query";

const Create = () => {
    const navigate = useNavigate();
    const { novelId } = useParams();

    const useQueryMultiple = () => {
        const res1 = useOneNovel(novelId);
        const res2 = useEditNovel(novelId);
        return [res1, res2];
    };
    const [{ data, isLoading }, { mutate }] = useQueryMultiple();

    const [input, setInput] = useState({ title: "", description: "", novelTypes: "", price: "" });
    const [file, setFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({ ...prev, [name]: value }));
    };

    let coverImage = data?.data[0].coverImg;
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
        navigate("/manage");
    };

    useEffect(() => {
        setInput({
            title: data?.data[0].title,
            description: data?.data[0].description,
            novelTypes: data?.data[0].novelType.toString(),
            price: data?.data[0].price
        });
    }, [data]);

    if (isLoading) return <Center w="100vw" h="100vh"><Spinner /></Center>;

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
                    <Heading>Edit Novel</Heading>
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
                                formLabel="Title"
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
                                <FormLabel color="primary">Description / Introduction</FormLabel>
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
                                formLabel="Type / Genre"
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
                                formLabel="Price"
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
                        Edit
                    </Button>
                </form>
            </Flex>
        </Center>
    );
};

export default Create;