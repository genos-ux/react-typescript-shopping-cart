
import {Navbar , Container, Button , Nav as Naver} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';

function Nav() {

    const { openCart, cartQuantity} = useShoppingCart()
  return (
    

    <Navbar className='bg-white shadow-sm mb-3' sticky="top">
        <Container>
            <Naver className="me-auto">
                <Naver.Link to="/" as={NavLink}>Home</Naver.Link>
                <Naver.Link to="/about" as={NavLink}>About</Naver.Link>
                <Naver.Link to="/store" as={NavLink}>Store</Naver.Link>
            </Naver>
            

            <Button
             onClick ={openCart}
             style={{width: "3rem", height: "3rem",position:"relative"}}
             variant="outline-primary"
             className='rounded-circle'
            >
                
                <img src="https://img.icons8.com/emoji/48/null/shopping-cart-emoji.png" style={{width:"1.5rem"}} />

                <div className='rounded-circle bg-danger d-flex justify-content-center align-items-center' style=
                {{color:"white",width:"1.1rem",height:"1.1rem",position:"absolute",bottom:0,right:0
                ,transform: "translate(255,255)"}}>
                    {cartQuantity}
                </div>
            </Button>

            
        </Container>
    </Navbar>
  );
}

export default Nav;