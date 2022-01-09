import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IconButton, Image, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody, PopoverFooter, Text, Menu, MenuItem } from '@chakra-ui/react';

import axios from '../../services/axios';
import { signOut } from '../../store/slices/authSlice';

const MenuProfile = ({ auth }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <Popover
            trigger={"hover"}
            placement={"bottom-end"}
        >
            <PopoverTrigger>
                <IconButton
                    my={5}
                    mx={1}
                    aria-label="Profile"
                    variant="ghost"
                >
                    <Image
                        src={auth.user?.profileImg || "/profile.png"}
                        rounded="full"
                        w="35px"
                        h="35px"
                        cursor="pointer"
                    />
                </IconButton>
            </PopoverTrigger>
            <PopoverContent w="250px">
                <PopoverArrow />
                <PopoverHeader px={6} py={4} cursor="pointer">
                    <Text variant="primary" color="primary" fontSize="lg"> {auth.user?.writerName}</Text>
                    <Text fontSize="md">{auth.user?.email}</Text>
                </PopoverHeader>
                <PopoverBody>
                    <Menu>
                        <MenuItem onClick={() => navigate("/manage")}>My Novel</MenuItem>
                        <MenuItem>Following</MenuItem>
                        <MenuItem>Read History</MenuItem>
                        <MenuItem>Order History</MenuItem>
                        <MenuItem onClick={() => navigate("/profile")}>Edit Profile</MenuItem>
                    </Menu>
                </PopoverBody>
                <PopoverFooter>
                    <Menu>
                        <MenuItem
                            onClick={() => {
                                dispatch(signOut());
                                axios.delete(`/api/user/signout`, { withCredentials: true });
                            }}
                        >
                            Sign out
                        </MenuItem>
                    </Menu>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
};

export default MenuProfile;