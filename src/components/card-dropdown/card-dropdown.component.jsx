import {
    CartDropdownContainer,
    EmptyMessage,
    CartItems,       
} from './card-dropdown.styles.jsx';

import { useNavigate } from 'react-router-dom' ;

import { selectCartItems } from '../../store/cart/cart.selector.js';

import Button from '../button/button.component';

import CartItem from '../cart-item/cart-item.component';
import { useSelector } from 'react-redux';
 
const CardDropDown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    
    const gotocheckoutPage = () => {
        navigate('/checkout');
    };
    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    ))) : (
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )}
            </CartItems>
            <Button onClick={gotocheckoutPage}>CHECKOUT</Button>
        </CartDropdownContainer>
    )
}
 
export default CardDropDown;
