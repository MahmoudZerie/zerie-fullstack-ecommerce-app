import { createSlice } from "@reduxjs/toolkit";
import { addItemToShoppingCart } from "../../utils";
import { createStandaloneToast } from "@chakra-ui/react";
const { toast } = createStandaloneToast();
const initialState={
	cartProducts:[]
}
const cartSlice=createSlice({
	name:"cart",
	initialState,
	reducers:{
		addToCart:(state,action)=>{
			state.cartProducts=addItemToShoppingCart(action.payload,state.cartProducts);
		},
		removeFromCart:(state,action)=>{
			state.cartProducts=state.cartProducts.filter(item=>item.id!==action.payload);
		},
		  clearCart:(state)=>{
			state.cartProducts=[]
			toast({
				title:"your cart is empty now",
				status:"success",
				duration:2000,
				isClosable:true
			})
		  }

	}
})
export const {addToCart,removeFromCart,clearCart}=cartSlice.actions;
export default cartSlice.reducer;
export const selectCart=({cart})=>cart;