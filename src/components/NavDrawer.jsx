import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	VStack,
	Box,
	useColorModeValue
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Links = ['Dashboard', 'Products', 'Team'];

const NavLink = ({ children, onClose }) => { 
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
			w="100%"
			textAlign="center"
			onClick={onClose} 
		>
			{children}
		</Box>
	)
}

const NavDrawer = ({ isOpen, onClose }) => {
	return (
		<Drawer
			isOpen={isOpen}
			placement='right'
			onClose={onClose}
		>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>Menu</DrawerHeader>

				<DrawerBody>
					<VStack as={'nav'} spacing={4}>
						{Links.map((link) => (
							<NavLink key={link} onClose={onClose}>{link}</NavLink> // Pass onClose to NavLink
						))}
					</VStack>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
}

export default NavDrawer;
