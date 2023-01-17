import { createContext, useContext, ReactNode, useState } from "react"
import ShoppingCart from '../components/ShoppingCart'

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
    
}



type ShoppingCartContext ={
    openCart: ()=> void
    closeCart: ()=> void
    getItemQuantity: (id:number) => number
    increaseCartQuantity: (id:number) => void
    decreaseCartQuantity: (id:number) => void
    removefromCart: (id:number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart(){

    return useContext(ShoppingCartContext)
}



export function ShoppingCartProvider( { children }: ShoppingCartProviderProps){

    const [cartItems,setCartItems] = useState<CartItem[]>([])
    const [isOpen, setOpen] = useState(false)
    

    const openCart = () => setOpen(true)
    const closeCart = ()=> setOpen(false)

    const cartQuantity = cartItems.reduce(
        (quantity,item) => item.quantity * quantity,0
    )

    function getItemQuantity(id:number){
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number){
        setCartItems(prevItems => {
            if(prevItems.find(item=> item.id === id) == null){
                return [...prevItems, {id,quantity:1}]
            }
            else{
                return prevItems.map(item => {
                    if (item.id === id){
                        return {...item, quantity: item.quantity + 1}
                    }
                    else{
                        return item
                    }
                })
            }
            
        })

    }

    function decreaseCartQuantity(id:number){

        setCartItems(prevItems => {
            if(prevItems.find(item=> item.id === id)?.quantity === 1){
                return prevItems.filter(item => item.id !== id)
            }
            else{
                return prevItems.map(item => {
                    if (item.id === id){
                        return {...item, quantity: item.quantity - 1}
                    }
                    else{
                        return item
                    }
                })
            }
                
        })


    }

    function removefromCart(id:number){
        setCartItems(prevItems => {
            return prevItems.filter(item => item.id !== id)
        })
    }
    

    return (
        <ShoppingCartContext.Provider value={{getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removefromCart, cartQuantity , cartItems ,openCart , closeCart}}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )

    
}