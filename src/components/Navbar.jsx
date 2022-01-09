import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Flex, useColorMode, IconButton, Button, Box, Badge, Input, Center, Image } from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { MdOutlineShoppingBag } from 'react-icons/md';

import MenuProfile from './menus/MenuProfile';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { auth, cart } = useSelector(state => state);
    const { colorMode, toggleColorMode } = useColorMode();

    const [url, setUrl] = useState("");
    const [menu, setMenu] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        setUrl(location.pathname);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [location]);

    return (
        <Flex
            w="100%"
            h="80px"
            top="0"
            pos={scrollPosition > 80 ? "fixed" : ""}
            zIndex={10}
            bg={colorMode === "light" ? "#fff" : "gray.700"}
            boxShadow={scrollPosition > 80 ? "md" : ""}
        >
            <Flex
                justify="space-between"
                align="center"
                width={["90%", "90%", "80%", "80%"]}
                mx="auto"
            >
                <Flex
                    align="center"
                    display={["none", "none", "flex", "flex"]}
                >
                    <Input my={5} mx={1} w="200px" placeholder="Search" />
                    <Button variant="ghost" my={5} mx={1}>
                        Genres
                    </Button>
                </Flex>
                <Box>
                    <Image
                        cursor="pointer"
                        src="/logo100.png"
                        h="50px"
                        onClick={() => navigate("/")}
                    />
                </Box>
                <Flex
                    display={["none", "none", "flex", "flex"]}
                    align="center"
                >
                    <IconButton
                        variant="ghost"
                        icon={<MdOutlineShoppingBag />}
                        mx={1}
                    />
                    <Badge
                        display={cart.length > 0 ? "block" : "none"}
                        variant="solid"
                        pos="relative"
                        ml={"-12.61px"}
                        bottom="8px"
                        right="8px"
                        colorScheme="red"
                        fontSize="8px"
                        zIndex={10}
                    >
                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </Badge>
                    {auth.user ?
                        <MenuProfile auth={auth} /> :
                        <Button
                            variant="ghost"
                            my={5}
                            mx={1}
                            onClick={() => { url === "/signin" ? navigate("/signup") : navigate("/signin"); }}
                        >
                            {url === "/signin" ? "Sign up" : "Sign in"}
                        </Button>
                    }
                    <IconButton
                        icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
                        variant="ghost"
                        aria-label="Color mode switcher"
                        onClick={toggleColorMode}
                        mx={1}
                    />
                </Flex>
                <IconButton
                    aria-label="Open menu"
                    size="lg"
                    mr={2}
                    icon={<HamburgerIcon />}
                    display={["flex", "flex", "none", "none"]}
                    onClick={() => setMenu(!menu)}
                />
            </Flex>

            <Flex
                w="100vw"
                h="100vh"
                bg={colorMode === "light" ? "gray.100" : "gray.700"}
                display={menu ? "flex" : "none"}
                pos="fixed"
                zIndex={10}
            >
                <IconButton
                    aria-label="Close menu"
                    variant="ghost"
                    icon={<CloseIcon />}
                    display={["flex", "flex", "none", "none"]}
                    onClick={() => setMenu(!menu)}
                    pos="fixed"
                    right="0"
                />
                <Center w="100%">
                    <Flex
                        flexDir="column"
                        mx="auto"
                    >
                        <Button my={5}>
                            Search
                        </Button>
                        <Button my={5}>
                            Genres
                        </Button>
                        <Button my={5}>
                            Cart
                        </Button>
                        <Button my={5}>
                            Developing
                        </Button>
                        <IconButton
                            icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
                            variant="ghost"
                            aria-label="Color mode switcher"
                            onClick={toggleColorMode}
                            my={5}
                        />
                    </Flex>
                </Center>
            </Flex>
        </Flex>
    );
};

export default Navbar;