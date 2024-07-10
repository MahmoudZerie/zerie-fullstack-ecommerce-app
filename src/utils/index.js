import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();
export const addItemToShoppingCart = (cartItem = {}, shoppingCartItems = []) => {
	const existItem = shoppingCartItems.find(item => item.id === cartItem.id);
	if (existItem) {
		toast({
			title: "Add to your card",
			description: "This item already exists, the quantity will be increased",
			status: "success",
			duration: 2000,
			isClosable: true
		})
		return shoppingCartItems.map(item => item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item)
	}
	toast({
		title: "Add to your card",
		status: "success",
		duration: 2000,
		isClosable: true
	})
	return [...shoppingCartItems,{...cartItem,quantity:1}];
}