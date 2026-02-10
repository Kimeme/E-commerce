'use client';

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColors";
import TextArea from "@/app/components/inputs/TextArea";

import { categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImageType = { 
  color: string;
  colorCode: string;
  image: string; // Cloudinary URL
  public_id?: string | null; // optional because sometimes you might not have it
};

const AddProductForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[]>([]);
  const [isProductCreated, setIsProductCreated] = useState(false);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      description: '',
      brand: '',
      category: '',
      inStock: false,
      images: [],
      price: ''
    }
  });

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
  };

  // Add image to state (avoid duplicates)
  const addImageToState = useCallback((value: ImageType) => {
    setImages(prev => {
      if (prev.find(img => img.color === value.color)) return prev;
      return [...prev, value];
    });
  }, []);

  // Remove image from state
  const removeImageFromState = useCallback((value: ImageType) => {
    setImages(prev => prev.filter(img => img.color !== value.color));
  }, []);

  // Sync images with react-hook-form
  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  // Reset form after product creation
  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages([]);
      setIsProductCreated(false);
    }
  }, [isProductCreated, reset]);

  // Upload images to Cloudinary
  const handleImageUploads = async (dataImages: ImageType[]) => {
  const uploadedImages: UploadedImageType[] = [];

  for (const item of dataImages) {
    if (!item.image) continue; // skip if no file

    const formData = new FormData();
    formData.append("file", item.image);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok || !result.url) {
        console.error("Cloudinary upload failed", result);
        throw new Error(result.message || "Upload failed");
      }

      uploadedImages.push({
        ...item,
        image: result.url,
      });
    } catch (err) {
      console.error("Error uploading image:", err);
      throw new Error("Error uploading images to Cloudinary");
    }
  }

  return uploadedImages;
};


  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.category) return toast.error("Category is not selected");
    if (!data.images || data.images.length === 0) return toast.error("No selected image");

    setIsLoading(true);

    try {
      const uploadedImages = await handleImageUploads(data.images);
      const productData = { ...data, images: uploadedImages };

      await axios.post('/api/product', productData);

      toast.success("Product created successfully");
      setIsProductCreated(true);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while saving the product or uploading images");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Heading title="Add a Product" center />

      <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
      <Input id="price" label="Price" disabled={isLoading} register={register} errors={errors} type="number" required />
      <Input id="brand" label="Brand" disabled={isLoading} register={register} errors={errors} required />
      <TextArea id="description" label="Description" disabled={isLoading} register={register} errors={errors} required />
      <CustomCheckBox id="inStock" register={register} label="This Product is in stock" />

      {/* Category Selection */}
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a Category</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => {
            if (item.label === "All") return null;
            return (
              <div key={item.label}>
                <CategoryInput
                  onClick={() => setCustomValue("category", item.label)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Color & Image Selection */}
      <div className="w-full flex flex-col flex-wrap gap-4 mt-4">
        <div>
          <div className="font-bold">Select product colors and upload images</div>
          <div className="text-sm text-gray-500">
            You must upload an image for each selected color; otherwise, the selection will be ignored.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((item, index) => (
            <SelectColor
              key={index}
              item={item}
              addImageToState={addImageToState}
              removeImageFromState={removeImageFromState}
              isProductCreated={isProductCreated}
            />
          ))}
        </div>
      </div>

      <Button
        label={isLoading ? "Loading..." : "Add Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductForm;
