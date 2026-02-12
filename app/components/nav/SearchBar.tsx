 'use client'

import { useRouter } from "next/navigation"
import queryString from "query-string"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
  
 const SearchBar = () =>{
    const router = useRouter()
    const {register, handleSubmit, reset, formState:{errors} } = useForm<FieldValues>({
        defaultValues:{
            searchTerm:''
        } 
    })
  
    const  onSubmit: SubmitHandler<FieldValues> = async(data) =>{
        if(!data.searchTerm) return router.push('/')
            const url = queryString.stringifyUrl({
        url:'/',
        query:{
            searchTerm:data.searchTerm
        }
    },{skipNull:true})
    console.log(url)
    router.push(url)
    reset();
    }

    return(<div className="flex item-center">
        <input {...register('searchTerm')} autoComplete="off"
        type="text"
        placeholder="Explore E~Shop"
        className="p-2 border-gray-300 rounded-l-md focus:outline-none focus:border-[0.5px] focus:border-slate-500 w-80"  />
        <button className="bg-slate-700 hover:opacity-80 text-white p-2 rounded-r-md ">Search</button>
    </div>)
 }
 export default SearchBar;