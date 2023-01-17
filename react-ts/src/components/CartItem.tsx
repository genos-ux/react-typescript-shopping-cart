import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from '../data/items.json'
import {Stack} from 'react-bootstrap'

type CartItemProps ={
    id: number
    quantity: number

}


const CartItem = ({id,quantity}: CartItemProps) => {
    const {removefromCart} = useShoppingCart()
    const item = storeItems.find(i => i.id === id)

    if(item == null) return null

    return (
        <Stack direction="horizontal" gap={2}>
            <img
              src={item.imgUrl}
              style={{
                  width: "125px",
                  height: "75px",
                  objectFit: "cover"
              }}
            
            />
        </Stack>
    )
    
}
 
export default CartItem;