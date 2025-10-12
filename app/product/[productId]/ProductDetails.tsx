"use client"
import {Rating} from "@mui/material";
import { useState, useCallback ,useEffect } from "react";
import SetColor from "@/app/components/products/SetColor"
import SetQuatity from "@/app/components/products/SetQuantity"
import Button from "@/app/components/Button"
import ProductImage from "@/app/components/products/ProductImage"
import { useRouter } from "next/navigation";
import {useCart} from "@/hooks/useCart";
import {MdCheckCircle} from "react-icons/md";




interface ProductDetailsProps{
    product:any;
}
export type CartProduct={
    id:product.,
    name:product.,
    description:product.,
    category:product.,
    brand:product.,
    selectedImg:selectedImgType,
    quantity:number,
    price:number
}
export type selectedImgType ={
    color:product.,
    colorCode:product.,
    image:product.

}
const Horizontal =() =>{
    return <hr className="w-[30%] my-2" />;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({product}) =>{

    // const {cartTotalQty} = useCart();
    const {handleAddProductToCart, cartProducts} = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);

    const [cartProduct, setCartProduct]= useState<CartProductType>({
    id:product.id,
    name:product.name,
    description:product.description,
    category:product.category,
    brand:product.brand,
    selectedImg:{...product.images[0]},
    quantity:1,
    price:product.price,
  });
  const router = useRouter()
  console.log(cartProducts);
//   console.log(cartTotalQty);
//   console.log(cartProduct);

useEffect(() =>{
    setIsProductInCart(false)
    if(cartProducts){
        const existingIndex = cartProducts.findIndex((item) => item.id ===product.id);
        if(existingIndex > -1){
            setIsProductInCart(true);
        }
    }
}, [cartProducts]);

        const productRating = product.reviews.reduce((acc:number, item:any) => item.rating + acc, 0)/ product.reviews.length;

        const handleColorSelect = useCallback((value:selectedImgType) => {
            setCartProduct((prev) => {
                return { ...prev, selectedImg:value}
            })
            
        }, [cartProduct.selectedImg]);

        const handleQtyIncrease = useCallback(() => {
               if(cartProduct.quantity ===99){
                    return;
                }
            setCartProduct((prev) => {
                return { ...prev, quantity:prev.quantity + 1}
            });
            
        }, [cartProduct]);


           const handleQtyDecrease = useCallback(() => {
            setCartProduct((prev) => {
                if(cartProduct.quantity ===1){
                    return;
                }
                return { ...prev, quantity: prev.quantity -1};
            });
            
        }, [cartProduct]);
    return <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
            <ProductImage 
            cartProduct={cartProduct} 
            product={product} 
            handleColorSelect={handleColorSelect} />
        </div>
        <div className="flex flex-col gap-1 text-slate-500 text-sm">
            <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
            <div className="flex items-center gap-2"> 
                <Rating value={productRating} readOnly />
                <div>
                    {product.reviews.length} reviews
                </div>
            </div>
             <Horizontal />
            <div className="text-justify">{product.description}</div>
            <Horizontal />
            <div>
                <span className="font-semibold">CATEGORY:</span>
                {product.category}
            </div>
            <div>
                <span className="font-semibold">BRAND:</span>
                {product.brand}
            </div>
            <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
                {product.inStock ? "In stock" : "Out of stock"}
            </div>
            <Horizontal />
            {isProductInCart ? <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
                <MdCheckCircle className="text-teal-400" size={20} />
                <span>Product added to cart</span>
            </p>
            <div className="max-w-[300px]">
                <Button label="View Cart" outline onClick={() =>router.push('/cart') } />
            </div>
            </> : <>
            <SetColor cartProduct={cartProduct}
             images={product.images} 
             handleColorSelect={handleColorSelect} />
            <Horizontal />
             <SetQuatity 
             cartProduct={cartProduct} 
             handleQtyIncrease={handleQtyIncrease}
             handleQtyDecrease={handleQtyDecrease}  />
            <Horizontal />
             <div className="max-w-[300px]">
                
                <Button label="ADD To Cart"  onClick={() =>handleAddProductToCart(cartProduct)} />
             </div>

            </>}
            

        </div>
    </div>
};
export default ProductDetails; 