import { FormControl, FormErrorMessage, Input, FormHelperText, FormLabel } from "@chakra-ui/react";

const FormInput = ({ w, name, type, placeholder, onChange, isInvalid, errorMessage, value, helperText, isDisabled, color, formLabel }) => {
    return (
        <FormControl
            isInvalid={isInvalid}
            w={w}
        >
            {
                isInvalid && <FormErrorMessage
                    m={0}
                    p={0}
                    color="primary"
                    fontWeight="semibold"
                >
                    {errorMessage}
                </FormErrorMessage>
            }
            {
                formLabel && <FormLabel color="primary">{formLabel}</FormLabel>
            }
            <Input
                _invalid={{ border: "none" }}
                name={name}
                type={type}
                placeholder={placeholder}
                variant="filled"
                mb={3}
                onChange={onChange}
                value={value}
                color={color}
                isDisabled={isDisabled}
            />
            {helperText && <FormHelperText mt={-2}>{helperText}</FormHelperText>}
        </FormControl >
    );
};

export default FormInput;
