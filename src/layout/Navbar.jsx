'use client'

import {
	Box,
	Flex,
	Avatar,
	Text,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useDisclosure,
	useColorModeValue,
	Stack,
	useColorMode,
	Center,
	HStack,
} from '@chakra-ui/react'
import { MdSunny } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import { Link as RouterLink } from "react-router-dom"
import CookieService from '../services/CookieService';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../app/features/cartSlice';
import { onOpenCartDrawerAction } from '../app/features/globalSlice';
const Links = ['Dashboard', 'Products', 'Team']

const NavLink = ({ children }) => {

	return (
		<Box
			as={RouterLink}
			to={children.toLowerCase()}
			px={2}
			py={1}
			rounded={'md'}
			_hover={{
				textDecoration: 'none',
				bg: useColorModeValue('gray.200', 'gray.700'),
			}}
		>
			{children}
		</Box>
	)
}

export default function Navbar() {
	const dispatch=useDispatch();
	const onOpenDrawer=()=>{
		dispatch(onOpenCartDrawerAction());
	}
	const {cartProducts}=useSelector(selectCart);
	const token = CookieService.get("jwt");
	const logoutHandler = () => {
		CookieService.remove("jwt");
		window.location.reload();
	}
	const { colorMode, toggleColorMode } = useColorMode()
	// const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
				<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
					<RouterLink to="/">My App</RouterLink>

					<HStack spacing={8} alignItems={'center'}>
						<HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
							{Links.map((link) => (
								<NavLink key={link}>{link}</NavLink>
							))}
						</HStack>
					</HStack>

					<Flex  >
						<Stack direction={'row'} spacing={7} h={16} alignItems={'center'} justifyContent={'space-between'}>
							<Button onClick={toggleColorMode}>
								{colorMode === 'light' ? <IoMoon /> : <MdSunny />}
							</Button>
							<Button
							onClick={onOpenDrawer}
							>cart({cartProducts.length})</Button>
							{token ? <Menu>
								<MenuButton
									as={Button}
									rounded={'full'}
									variant={'link'}
									cursor={'pointer'}
									minW={0}>
									<Avatar
										size={'sm'}
										src={'https://avatars.dicebear.com/api/male/username.svg'}
									/>
								</MenuButton>
								<MenuList alignItems={'center'}>
									<br />
									<Center>
										<Avatar
											size={'2xl'}
											src={'https://avatars.dicebear.com/api/male/username.svg'}
										/>
									</Center>
									<br />
									<Center>
										<p>Username</p>
									</Center>
									<br />
									<MenuDivider />
									<MenuItem>Your Servers</MenuItem>
									<MenuItem>Account Settings</MenuItem>
									<MenuItem onClick={logoutHandler}>Logout</MenuItem>
								</MenuList>
							</Menu> : <RouterLink to="/login" >Login</RouterLink>}


						</Stack>
					</Flex>
				</Flex>
			</Box>
		</>
	)
}