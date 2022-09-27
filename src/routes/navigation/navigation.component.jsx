import { Fragment} from 'react';
import {Outlet} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CardDropDown from '../../components/card-dropdown/card-dropdown.component';

import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.seletor';

import { ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import { signOutStart } from '../../store/user/user.action';
import {
  NavigationContainer,
  LogoContainer,
  Navlink,
  NavLinksContainer
} from './navigation.style.jsx';

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  
  const signOutUser = () => dispatch(signOutStart());

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
            <CrwnLogo className='logo'/>
        </LogoContainer>
        <NavLinksContainer>
            <Navlink to ='/shop'>
                SHOP
            </Navlink>
            {
              currentUser ? (
              <Navlink as='span' onClick={signOutUser}>
                  SIGN OUT 
              </Navlink>
              ) : (
            <Navlink to ='/auth'>
                Sign In
            </Navlink>
            )}
            <CartIcon />
        </NavLinksContainer>
        { isCartOpen && <CardDropDown/>}
      </NavigationContainer>
      <Outlet/>
    </Fragment>
  );
};

export default Navigation;