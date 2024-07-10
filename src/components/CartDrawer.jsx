import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Text } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onCloseCartDrawerAction, selectGlobal } from '../app/features/globalSlice';
import CartDrawerItem from './CartDrawerItem';
import { clearCart, selectCart } from '../app/features/cartSlice';

const CartDrawer = () => {
  const { isOpenCartDrawer } = useSelector(selectGlobal);
  const { cartProducts } = useSelector(selectCart);
  const dispatch = useDispatch();
  const btnRef = useRef();

  const onCloseDrawer = () => {
    dispatch(onCloseCartDrawerAction());
  };

  return (
    <Drawer
      isOpen={isOpenCartDrawer}
      placement='right'
      onClose={onCloseDrawer}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Product Cart</DrawerHeader>

        <DrawerBody>
          {cartProducts.length ? (
            cartProducts.map(item => (<CartDrawerItem key={item.id} {...item} />))) : (
            <Text>Tour cart is empty </Text>
          )
          }
        </DrawerBody>

        <DrawerFooter>
          <Button colorScheme='red' variant='outline' mr={3}
          onClick={()=>dispatch(clearCart())}
          >
            Clear All
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
