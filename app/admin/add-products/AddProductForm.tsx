'use client'
import Button from "@/app/components/Button"
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import firebase from '@/libs/firebase'
import TextArea from "@/app/components/inputs/TextArea";
import {categories} from "@/utils/Categories"
import {colors} from "@/utils/colors"
import {useState, useCallback, useEffect} from "react"
import {FieldValues, useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import {getStorage} from "firebase/storage";
 
export type ImageType = {
    color:string;
    colorCode:string;
    image:File | null
};
export type UploadedImageType = {
    color:string;
    colorCode:string;
    image:string;
};

const AddProductForm=() =>{
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<ImageType[] | null>();
    const [isProductCreated, setIsProductCreated] = useState(false);



    const {register, handleSubmit, setValue, watch, reset, formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name:'',
            descripion:'',
             brand:'',
            category:'',
            inStock:false,
            images:[],
            price:''
        }
    })

    useEffect(() =>{
        setCustomValue('images', images)
    }, [images]);

    useEffect(() =>{
        if(isProductCreated){
            reset();
            setImages(null);
            setIsProductCreated(false);
        }
    }, [isProductCreated]);
        const onSubmit: SubmitHandler<FieldValues> = async (data) => {
            console.log("Product Data", data)
            //upload imges to fb
            //save product to mongodb
            setIsLoading(true);
            let uploadedImages: UploadedImageType[]=[]
            if(!data.category){
                setIsLoading(false)
                return toast.error("Category is not selected")

            }
            if(!data.images || data.images.length ==0){
                setIsLoading(false)
                return toast.error("No selected image")
            }
            const handleImageUploads = async() =>{
                toast.error("Creating product, please wait..");
                try{
                    for(const item of data.images){
                        if(item.image){
                            const fileName= new Data().getTime() + '-' + item.image.name;
                            const storage= getStorage(firebaseApp);
                            const storageRef = ref(storage, `products/${fileName}`);
                            const uploadTask= uploadBytesResumable(storageRef, item.image);

                            await new Promise<void>((resolve, reject) =>{
                                'state_change',
                                (snapshot) =>{
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                            switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                            }
                                },
                                (error) => {
                                  console.log("Error uploading image", error)
                                  reject(error)
                               },
                               () => {
                                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                    uploadedImages.push({
                                        ...item,
                                        image:downloadURL
                                    });
                                console.log('File available at', downloadURL);
                                resolve();
                                }).catch((error) =>{
                                    console.log("Error getting the download URL", error)
                                    reject(error);
                                })
                            }

                            })
                        }
                    }

                }catch(error){
                    setIsLoading(false);
                    console.log("Error handling image uploads");
                    return toast.error("Error handling image uploads");

                }
            };
        };
     


     const category= watch("category");
     const setCustomValue = (id:string, value:any) =>{
        setValue(id, value,{
            shouldValidate:true,
            shouldDirty:true,
            shouldTouch:true,
             
        })
     }

     const addImageToState= useCallback((value:ImageType) =>{
        setImages((prev) =>{
            if(!prev){
                return [value]
            }
            return[...prev, value];
        })

     }, []);

     const removeImageFromState = useCallback(() => {
           setImages((prev) =>{
            if(prev){
                const filteredImages = prev.filter(
                    (item) => item.color !== value.color
                );
                return filteredImages;
            }
            return fprev;
            
        })

     }, []);

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
    <Input id="price"
    label="Price"
    disabled={isLoading}
    register={register}
    errors= {errors}
    required
     />
    <Input id="brand"
    label="Brand"
    disabled={isLoading}
    register={register}
    errors= {errors}
    required
     />
    <TextArea id="description"
    label="Description"
    disabled={isLoading}
    register={register}
    errors= {errors}
    required
     />
     <CustomCheckBox id="inStock" register={register} label="This Product is in stock" />
     <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a Category</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h[50vh] overflow-y-auto">
            {categories.map((item) =>{
                if(item.label=="All"){
                    return null;
                }
                return (<div key={item.label} className="col-span">
                    <CategoryInput onClick={(category) =>setConstantValue('category', categroy)}
                    selected={categroy==item.label} label={item.label} icon={item.icon} />

                </div>
                )
            })}

        </div>


     </div>
     <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
         <div className="font-bold">Select the available product colors and upload their images.</div>
         <div className="text-sm">
            You must upload an image for each of the color selected otherwise your color selection will be ignored.
         </div>
     </div>
     <div className="grid grid-cols-2 gap-3">
        {colors.map((item,index) =>{
            return (
                <SelectColor
                key={index}
                item={item}
                addImageToState={addImageToState}
                removeImageFromState={removeImageFromState}
                isProductCreated={false}
                 />
            );
        })}
     </div>
     </div>
     <Button label={isLoading? 'Loading...' : 'Add Product'} onClick={handleSubmit(onSubmit)} />

    </>);
}
export default AddProductForm;