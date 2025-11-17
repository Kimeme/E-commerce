'use client'
import {FeildValue, UseFormRegister} from "react-hook-form" 

interface CustomCheckBoxProps{
    id:string;
    label:string;
    disabled?:boolean
    register:UseFormRegister<FieldValues>
    
}
const CustomCheckBox:React.FC<>=({id, label, disabled, register}) =>{
    return(
        <div className="w-full flex flex-row gap-2 items-center">
            <input type="checkbox"         outoComplete="off" 
            id={id} 
            disabled={disabled} {...register(id, {required})} placeholder="" 
            className="cursor-pointer" />
            <label htmlFor={id} className="font-medium cursor-pointer">{label}</label>
        </div>
    )

}

export default CustomCheckBox;