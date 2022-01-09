import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints, mode, whiten, darken } from '@chakra-ui/theme-tools';

const theme = extendTheme({
    components: {
        Button: {
            variants: {
                primary: (props) => ({
                    bg: "primary",
                    color: "#fff",
                    _hover: {
                        bg: mode(darken("primary", 5), whiten("primary", 5))(props),
                        boxShadow: "md"
                    }
                }),
                "primary-outlined": (props) => ({
                    bg: "transparent",
                    border: "1px solid",
                    borderColor: "primary",
                    color: "primary",
                    _hover: {
                        boxShadow: "md",
                    }
                }),
                secondary: (props) => ({
                    bg: "secondary",
                    color: "#fff",
                    _hover: {
                        bg: mode(darken("secondary", 5), whiten("secondary", 5))(props),
                        boxShadow: "md"
                    }
                }),
                "secondary-outlined": (props) => ({
                    bg: "transparent",
                    border: "1px solid",
                    borderColor: "secondary",
                    color: "secondary",
                    _hover: {
                        boxShadow: "md",
                    }
                }),
            }
        },
        Text: {
            variants: {
                primary: {
                    fontWeight: "semibold",
                }
            }
        },
    },
    styles: {
        global: {},
    },
    colors: {
        primary: "#0CA25F",
        secondary: "#4A5568",
        highlight: "#009EE7",
        warning: "#D69E2E",
        danger: "#E53E3E"
    },
    breakpoints: createBreakpoints({
        sm: "40em",
        md: "52em",
        lg: "64em",
        xl: "80em"
    })
});

export default theme;