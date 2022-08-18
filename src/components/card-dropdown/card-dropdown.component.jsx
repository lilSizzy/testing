import {CartDropdownContainer,
        EmptyMessage,       
} from './card-dropdown.styles.jsx';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom' ;

import { CartContext } from '../../context/cart-context';

import Button from '../button/button.component';

import CartItem from '../cart-item/cart-item.component';
 
const CardDropDown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();
    
    const gotocheckoutPage = () => {
        navigate('/checkout');
    };
    return (
        <CartDropdownContainer>
            <cartItems>
                {
                    cartItems.length ? (cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    ))) : (
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )
                }
            </cartItems>
        <Button onClick={gotocheckoutPage}>CHECKOUT</Button>
        </CartDropdownContainer>
    )
}
 
export default CardDropDown;
