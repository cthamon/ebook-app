import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Center, Spinner, Flex, Heading, Button, Text, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

import { FormInput, FormProfile } from '../components';
import { useProfile } from '../services/query';

const EditUser = () => {
    const navigate = useNavigate();
    const { mutate, isLoading, error, isSuccess } = useProfile();
    const { auth } = useSelector(state => state);
    const [input, setInput] = useState({
        email: auth?.user.email,
        writerName: auth?.user.writerName,
        description: auth?.user.description,
        firstName: auth?.user.firstName,
        lastName: auth?.user.lastName,
        address: auth?.user.address,
        phoneNumber: auth?.user.phoneNumber
    });
    const [file, setFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({ ...prev, [name]: value }));
    };

    let profileImage = auth?.user.profileImg;
    if (file) {
        profileImage = URL.createObjectURL(file);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { writerName, description, firstName, lastName, address, phoneNumber } = input;
        const formData = new FormData();
        formData.append('writerName', writerName);
        formData.append('description', description);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('address', address);
        formData.append('phoneNumber', phoneNumber);
        formData.append('profileImg', file ? file : null);
        mutate(formData);
    };

    if (isLoading) return <Center w="100vw" h="100vh"><Spinner /></Center>;
    if (isSuccess) navigate(0);

    return (
        <main>
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
                        w="90%"
                        mx="auto"
                    >
                        <Heading>Update Profile</Heading>
                        <IconButton
                            colorScheme="red"
                            icon={<CloseIcon />}
                            onClick={() => navigate("/")}
                        />
                    </Flex>

                    <form onSubmit={handleSubmit}>
                        <Flex
                            w={["300px", "100%", "100%", "800px"]}
                            direction={["column", "row", "row", "row"]}
                            align={["center", "flex-end", "flex-end", "flex-end"]}
                        >
                            <Flex
                                direction="column"
                                align="center"
                                w={["100%", "100%", "50%", "50%"]}
                            >
                                <FormProfile
                                    file={file}
                                    profileImage={profileImage}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <FormInput
                                    formLabel="Email"
                                    w="80%"
                                    isDisabled
                                    isInvalid={input.email === ""}
                                    errorMessage="Email"
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={input.email}
                                    onChange={handleInputChange}
                                />
                                <FormInput
                                    formLabel="Writer"
                                    w="80%"
                                    isInvalid={input.writerName === ""}
                                    errorMessage="Writer name"
                                    name="writerName"
                                    type="text"
                                    placeholder="Writer name"
                                    value={input.writerName}
                                    onChange={handleInputChange}
                                />
                            </Flex>
                            <Flex
                                direction="column"
                                align="center"
                                w={["100%", "100%", "50%", "50%"]}
                                justify="flex-end"
                            >
                                <FormInput
                                    formLabel="First Name"
                                    w="80%"
                                    isInvalid={input.firstName === ""}
                                    errorMessage="First name"
                                    name="firstName"
                                    type="text"
                                    placeholder="First name"
                                    value={input.firstName}
                                    onChange={handleInputChange}
                                />
                                <FormInput
                                    formLabel="Last Name"
                                    w="80%"
                                    isInvalid={input.lastName === ""}
                                    errorMessage="Last name"
                                    name="lastName"
                                    type="text"
                                    placeholder="Last name"
                                    value={input.lastName}
                                    onChange={handleInputChange}
                                />
                                <FormInput
                                    formLabel="Description"
                                    w="80%"
                                    isInvalid={input.description === ""}
                                    errorMessage="Description"
                                    name="description"
                                    type="text"
                                    placeholder="Tell us about yourself"
                                    value={input.description}
                                    onChange={handleInputChange}
                                />
                                <FormInput
                                    formLabel="Address"
                                    w="80%"
                                    isInvalid={input.address === ""}
                                    errorMessage="Address"
                                    name="address"
                                    type="text"
                                    placeholder="Address"
                                    value={input.address}
                                    onChange={handleInputChange}
                                />
                                <FormInput
                                    formLabel="Phone number"
                                    w="80%"
                                    isInvalid={input.phoneNumber === ""}
                                    errorMessage="Phone number"
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="0915195591"
                                    value={input.phoneNumber}
                                    onChange={handleInputChange}
                                />
                            </Flex>
                        </Flex>
                        <Flex
                            justify="center"
                            align="center"
                        >
                            <Button w={["80%", "90%", "90%", "90%"]} variant="primary" type="submit">
                                Update
                            </Button>
                            {error &&
                                error.response.data.map((err, i) => (
                                    <Text key={i} color="danger">
                                        {err.message}
                                    </Text>))
                            }
                        </Flex>
                    </form>

                </Flex>
            </Center>
        </main>
    );
};

export default EditUser;