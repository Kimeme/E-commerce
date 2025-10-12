
import {createContext, useContext, useState,useCallback} from "react";
import {CartProductType} from "@/app/product/[productId]/ProductDetails";

type CartContextType= {
    cartTotalQty:number;
    cartProducts:CartProductType[] | null;
    handleAddProductToCart: (product:CartProductType) =>void

};

export const CartContext= createContext<CartContextType | null>(null);

interface Props{
    [propName:string]:any;
}
export const CartContextProvider = (props:Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(10);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

      const handleAddProductToCart=useCallback((product:CartProductType)=> {
        setCartProducts((prev) =>{
        let updatedCart;
        if(prev){
            updatedCart= [...prev, product];
        }else{
            updatedCart=[product];

        }
        localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
        return updatedCart;
    });
      }, []);

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart
    }

    return <CartContext.Provider value={value} {...props} />;
    return <CartContext.Provider value={value} {...props} />;

}

export const useCart = () =>{
    const context = useContext(CartContext);
    if(context===null){
        throw new Error("useCart must be used within a CartContextProvider")
    }
    return context;
}