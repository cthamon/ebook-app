import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Center, Spinner, Flex, Heading, Button, Text } from '@chakra-ui/react';

import { FormInput, FormProfile } from '../components';
import { useRegister } from '../services/query';

const Signup = () => {
    const navigate = useNavigate();
    const { mutate, isLoading, error, isSuccess } = useRegister();
    const [input, setInput] = useState({ email: "", writerName: "", password: "", confirmPassword: "", description: "", firstName: "", lastName: "", address: "", phoneNumber: "" });
    const [file, setFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({ ...prev, [name]: value }));
    };

    let profileImage;
    if (file) {
        profileImage = URL.createObjectURL(file);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, writerName, password, confirmPassword, description, firstName, lastName, address, phoneNumber } = input;
        const formData = new FormData();
        formData.append('email', email);
        formData.append('writerName', writerName);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
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
                    <Heading mb={6}>Sign up</Heading>

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
                                    w="80%"
                                    isInvalid={input.email === ""}
                                    errorMessage="Email"
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={input.email}
                                    onChange={handleInputChange}
                                />
                                <FormInput
                                    w="80%"
                                    isInvalid={input.writerName === ""}
                                    errorMessage="Writer name"
                                    name="writerName"
                                    type="text"
                                    placeholder="Writer name"
                                    value={input.writerName}
                                    onChange={handleInputChange}
                                />
                                <FormInput
                                    w="80%"
                                    isInvalid={input.password === ""}
                                    errorMessage="Password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={input.password}
                                    onChange={handleInputChange}
                                />
                                <FormInput
                                    w="80%"
                                    isInvalid={input.confirmPassword === ""}
                                    errorMessage="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm password"
                                    value={input.confirmPassword}
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
                                Sign up
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

export default Signup;