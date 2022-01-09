import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Center, Spinner, Flex, Heading, Button, Box, Text, Link } from '@chakra-ui/react';

import { FormInput } from '../components';
import { useLogin } from '../services/query';

const Signin = () => {
    const navigate = useNavigate();
    const { mutate, isLoading, error, isSuccess } = useLogin();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (isLoading) return <Center w="100vw" h="100vh"><Spinner /></Center>;
    if (isSuccess) navigate(0);

    return (
        <main>
            <Center
                h="80vh"
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
                    w="400px"
                >
                    <Heading mb={6}>Sign in</Heading>
                    <form onSubmit={(e) => { e.preventDefault(); mutate({ email, password }); }}>
                        <FormInput
                            isInvalid={email === ""}
                            errorMessage="Email"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FormInput
                            isInvalid={password === ""}
                            errorMessage="Password"
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button variant="primary" type="submit" w="100%">Sign in</Button>
                        <Box w="100%" textAlign="center" my={1}>
                            <Text>No account ? <Link fontWeight="semibold">
                                <Text as="u" onClick={() => navigate("/signup")}>Click Here!</Text>
                            </Link>
                            </Text>
                            {error &&
                                error.response.data.map((err, i) => (
                                    <Text key={i} color="danger">
                                        {err.message}
                                    </Text>))
                            }
                        </Box>
                    </form>
                </Flex>
            </Center>
        </main>
    );
};

export default Signin;