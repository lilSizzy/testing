import {Routes, Route,Navigate} from 'react-router-dom';
import { useContext } from 'react';

import { UserContext } from './context/user.context';

import Navigation from './routes/navigation/navigation.component';
import Home from "./routes/home/home.component";
import Authentication from './routes/authentication/authentication.component.jsx';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';


const App = () => {
  const { currentUser } = useContext(UserContext);
  return (    
    <Routes>
      <Route path='/' element={<Navigation/>}> 
      <Route index element={<Home/>}/>
      <Route path='shop/*' element={<Shop/>} />
      <Route path='/checkout' element={<Checkout />} />
      <Route 
       path='auth'
       element={ currentUser ? <Navigate to="/" replace/> : <Authentication/>}/>
      </Route>   
    </Routes>
  );
};

export default App;
