import { Fragment,useContext } from 'react';
import {Outlet} from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CardDropDown from '../../components/card-dropdown/card-dropdown.component';

import { UserContext } from '../../context/user.context';
import { CartContext } from '../../context/cart-context';

import { ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import { signOutUser } from '../../useful/fireBase/filebase.useful';

import {NavigationContainer,LogoContainer,Navlink,NavLinksContainer} from './navigation.style.jsx';

const Navigation = () => {
  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext)
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
            <CrwnLogo/>
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