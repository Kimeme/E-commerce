'use client'

import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import {useState} from "react"
const AddProductForm=() =>{
    const [isLoading, setIsLoading] = useState(false);
    return (
    <>
    <Heading title="Add a Product" center />
    <Input id="name"
    label="Name"
    disabled={isLoading}
    register={register}
    errors= {errors}
    required
     />
    </>);
}
export default AddProductForm;