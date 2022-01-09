import { Box, Flex, RadioGroup, Radio, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import './animation.css';

function Banner() {
    const [moveleft, setMoveLeft] = useState(0);
    const [moveright, setMoveRight] = useState(0);
    const [quickmoveleft, setQuickMoveLeft] = useState(0);
    const [quickmoveright, setQuickMoveRight] = useState(0);
    const [radioNumber, setRadioNumber] = useState(0);

    const bannerImages = [
        "https://marketplace.canva.com/EADaoovPsZQ/4/0/1600w/canva-white-minimalist-and-simple-landscape-photo-facebook-cover-iqa_FDA2gWA.jpg",
        "https://marketplace.canva.com/EAECO1g-ErQ/3/0/1600w/canva-blue-landscape-photo-travel-quotes-facebook-cover-1lzG0FO1qdM.jpg",
        "https://marketplace.canva.com/EAEqgXuSyqo/1/0/1600w/canva-yellow-and-orange-books-modern-and-bold-seasonal-promotions-thanksgiving-landscape-banner-lMKEZUe9iuQ.jpg",
        "https://marketplace.canva.com/EAEe4EmOD6I/1/0/1600w/canva-blue-and-red-books-clean-graphic-sales-and-promos-business-and-retail-back-to-school-banner-22CLGRw3SIU.jpg",
        "https://marketplace.canva.com/EAEm6HOwwFo/1/0/1600w/canva-colorful-book-fair-landscape-banner--XDeskclhUw.jpg",
    ];

    const imageNumber = (radioNumber, number, maxNumber) => {
        if (+radioNumber + +number >= +maxNumber) {
            return +radioNumber + +number - +maxNumber;
        } return +radioNumber + +number;
    };

    const ChevronLeftChecker = (radioNumber, maxNumber) => {
        if (+radioNumber - 1 < 0) {
            return setTimeout(() => setRadioNumber(maxNumber - 1), 400);
        } return setTimeout(() => setRadioNumber(+radioNumber - 1), 400);
    };

    const ChevronRightChecker = (radioNumber, maxNumber) => {
        if (+radioNumber + 1 >= +maxNumber) {
            return setTimeout(() => setRadioNumber(0), 400);
        } return setTimeout(() => setRadioNumber(+radioNumber + 1), 400);
    };

    const radioAnimation = (prev, next) => {
        if (next - prev === 1) {
            setTimeout(() => setRadioNumber(next), 400);
            return setMoveLeft(1);
        } else if (prev - next === 1) {
            setTimeout(() => setRadioNumber(next), 400);
            return setMoveRight(1);
        } else if (next - prev > 1) {
            setTimeout(() => setRadioNumber(next), 75);
            return setQuickMoveLeft(1);
        } else if (prev - next > 1) {
            setTimeout(() => setRadioNumber(next), 75);
            return setQuickMoveRight(1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (+radioNumber + 1 >= +bannerImages.length) {
                setTimeout(() => setRadioNumber(0), 400);
                setMoveLeft(1);
            } else {
                setTimeout(() => setRadioNumber(radioNumber + 1), 400);
                setMoveLeft(1);
            }
        }, 1500);
        return () => clearInterval(interval);
    }, [radioNumber, bannerImages.length]);

    return (
        <Box my="20px">
            <Flex
                justify="center"
                align="center"
                overflow="hidden"
            >
                <Flex
                    w="40px"
                    h="40px"
                    justify="center"
                    align="center"
                    position="absolute"
                    left="3"
                    onClick={() => { ChevronLeftChecker(radioNumber, bannerImages.length); setMoveRight(1); }}
                    zIndex="1"
                >
                    <IconButton
                        icon={<ChevronLeftIcon />}
                        rounded="full"
                        bg="rgb(255,255,255,0.5)"
                        _hover={{ bg: "rgb(255,255,255,0.8)" }}
                    />
                </Flex>
                <Flex
                    w="40px"
                    h="40px"
                    justify="center"
                    align="center"
                    position="absolute"
                    right="3"
                    onClick={() => { ChevronRightChecker(radioNumber, bannerImages.length); setMoveLeft(1); }}
                    zIndex="1"
                >
                    <IconButton
                        icon={<ChevronRightIcon />}
                        rounded="full"
                        bg="rgb(255,255,255,0.5)"
                        _hover={{ bg: "rgb(255,255,255,0.8)" }}
                    />
                </Flex>
                {bannerImages.map((item, i) => (
                    <Box
                        className="banner"
                        moveleft={moveleft}
                        moveright={moveright}
                        quickmoveleft={quickmoveleft}
                        quickmoveright={quickmoveright}
                        onAnimationEnd={() => { setMoveLeft(0); setMoveRight(0); setQuickMoveLeft(0); setQuickMoveRight(0); }}
                        key={i}
                        minW={["380px", "380px", "682px", "682px"]}
                        h={["174px", "174px", "312px", "312px"]}
                        mx={["1px", "4px", "5px", "5px"]}
                        userSelect="none"
                        position="relative"
                        rounded="xl"
                        backgroundPosition="center"
                        backgroundSize="100%"
                        backgroundImage={bannerImages[imageNumber(radioNumber, i, bannerImages.length)]}
                    >
                    </Box>
                ))}
            </Flex>
            <RadioGroup
                align="center"
                value={radioNumber}
            >
                {bannerImages.map((item, i) => {
                    return (
                        <Radio
                            key={i}
                            value={i}
                            size="sm"
                            m="10px 5px 0 0"
                            cursor="pointer"
                            colorScheme="green"
                            _focus={{ shadow: "none" }}
                            onClick={() => radioAnimation(radioNumber, i)}
                        >
                        </Radio>
                    );
                })}
            </RadioGroup>
        </Box>
    );
};

export default Banner;