import { useDispatch, useSelector } from 'react-redux';

import { SelectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector.js';
import { setIsCartOpen } from '../../store/cart/cart.action.js';
import {ShoppingIcon,
        CartIconContainer,
        ItemCount } 
    from './cart-icon.styles.jsx';

const CartIcon = () => {
    const dispatch = useDispatch();
    const cartCount = useSelector(SelectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);
    
    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

 return (
    <CartIconContainer onClick={toggleIsCartOpen}>
        <ShoppingIcon className='shopping-icon' />
        <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
 )
}

export default CartIcon;

