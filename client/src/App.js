import {  Routes, Route, } from 'react-router-dom';
import { Navbar } from './Component/Navbar/navbar';
import { Shop_Context } from './Component/ShopContent/shop-context';
import { HomePage } from './Pages/User/Home';
import { Cart } from './Pages/User/Cart/cart';
import Signin from './Auth/Signin';
import Signup from './Auth/Signup';
import Profile from './Pages/User/profile';

function App() {


  


    return( 
      <div className="App">

         <Shop_Context>
          
        <Navbar /> 
       
       
       <Routes>
       <Route path='/signin' element={<Signin/>} />
       <Route path='/signup' element={<Signup/>} />
       <Route path='/profile' element={<Profile/>} />
       <Route path='/cart' element={<Cart/>}/>
       <Route path='/' element={<HomePage />} />
       
       </Routes>
       

       </Shop_Context>

      </div>
    
    )
}
export default App;
