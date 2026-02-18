'use client'
import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Heading from '@/app/components/Heading';
import Status from '@/app/components/Status';
import ActionBtn from '@/app/components/ActionBtn';
import { MdDone, MdClose, MdCached, MdDelete, MdRemoveRedEye } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { formatPrice } from "@/utils/formatPrice";
import firebaseApp from "@/libs/firebase";
import cloudinary from "@/libs/cloudinary";

interface ManageProductsClientProps {
  products: Product[];
}
const ManageProductsClient: React.FC<ManageProductsClientProps> = ({ products }) => {
  const router = useRouter();
    // ✅ Local state for products
     // ✅ Local state for products
  const [localProducts, setLocalProducts] = useState<Product[]>(products);

  // const storage = getStorage(firebaseApp);
  let rows:any = [];

  if(products){
     rows = products.map((product) => {
      return{
    id: product.id,
    name: product.name,
    price: formatPrice(product.price),
    category: product.category,
    brand: product.brand,
    inStock: product.inStock,
    images: product.images,
      }
  });
}
   
//   // Delete product safely
//   const handleDelete = useCallback(
//   async (id: string, images: any[]) => {
//     // 1️⃣ User clicks delete → loading toast
//     const toastId = toast.loading("Deleting product, please wait...");

//     try {
//       // 2️⃣ Call backend (Cloudinary + Prisma handled there)
//       await axios.delete(`/api/product/${id}`, {
//         data: {
//           images: images?.map((img) => ({
//             public_id: img.public_id,
//           })),
//         },
//       });

//       // 3️⃣ Success toast
//       toast.success("Product deleted successfully", { id: toastId });
//       // 4️⃣ Refresh UI
//       router.refresh();
//     } catch (error) {
//       console.error("Delete product error:", error);

//       // ❌ Error toast
//       toast.error("Failed to delete product", { id: toastId });
//     }
//   },
//   []
// );
// Delete product safely
  



// For last deleting image 
// it is fully worked 
// const handleDelete = useCallback(
//     async (id: string, images: { public_id: string }[]) => {
//       const toastId = toast.loading("Deleting product, please wait...");

//       try {
//         // Call backend API to delete product + images
//         await axios.delete(`/api/product/${id}`, {
//           data: {
//             images: images.map((img) => ({ public_id: img.public_id })),
//           },
//         });

//         toast.success("Product deleted successfully", { id: toastId });
//         router.refresh(); // Refresh page to remove deleted product from UI
//       } catch (err) {
//         console.error("Deleting product error:", err);
//         toast.error("Failed to delete product", { id: toastId });
//       }
//     }, []);
  // DataGrid columns
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'name', headerName: 'Name', width: 220 },
    {
      field: 'price',
      headerName: 'Price (USD)',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <div className="font-bold text-slate-800">{params.value}</div>
      ),
    },
    { field: 'category', headerName: 'Category', width: 100 },
    { field: 'brand', headerName: 'Brand', width: 100 },
    {
      field: 'inStock',
      headerName: 'Stock',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <div>
          {params.row.inStock ? (
            <Status text="in stock" icon={MdDone} bg="bg-teal-200" color="text-teal-700" />
          ) : (
            <Status text="out of stock" icon={MdClose} bg="bg-rose-200" color="text-rose-700" />
          )}
        </div>
      ),
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => {
        return(
           <div className="flex justify-between gap-4 w-full">
          <ActionBtn
            icon={MdCached}
            onClick={() => {handleToggleStock(params.row.id, params.row.inStock)}
        }/>
          <ActionBtn
            icon={MdDelete}
            onClick={() => {handleDelete(params.row.id, params.row.images)}
      }/>
          <ActionBtn icon={MdRemoveRedEye} onClick={() => { 
            router.push(`product/${params.row.id}`);
           }} />
        </div>
        );

      },
    },
  ];
  // Toggle inStock
  const handleToggleStock = useCallback((id: string, inStock: boolean) => {
    // toast.success("Updating stock...");
    axios
      .put('/api/product', {
         id, 
         inStock: !inStock,
         })
      .then((res) => {
        // setLocalProducts((prev) =>
        //   prev.map((p) => (p.id === id ? { ...p, inStock: !inStock } : p))
        // );
        toast.success('Product status changed')
        router.refresh();
      })
      .catch((err) => {
        toast.error("Oos! Something went wrong");
        console.error(err);
      });
  }, []);
  // Rows for DataGrid
//   const handleDelete = useCallback(async (id: string, images: any[]) => {
//   const toastId = toast.loading("Deleting product, please wait...");

//   // Separate function for image deletion
//   const handleImageDelete = async () => {
//     try {
//       await axios.delete(`/api/product/${id}`, {
//         data: {
//           images: images.map((img) => ({ public_id: img.public_id })),
//         },
//       });
//     } catch (err) {
//       console.error("Deleting images error:", err);
//       throw err;
//     }
//   };

//   try {
//     await handleImageDelete(); // ✅ must call it
//     toast.success("Product deleted successfully", { id: toastId });
//     router.refresh();
//   } catch (err) {
//     toast.error("Failed to delete product", { id: toastId });
//   }
// }, []);
// const handleDelete = useCallback(async (id: string, images: any[]) => {
//   // const router = useRouter();
//   toast('Deleting product, please wait!');

//   const handleImageDelete = async () => {
//     try {
//       for (const item of images) {
//         if (item.image) {
//           // Cloudinary delete API
//           await axios.post('/api/cloudinary/delete', { public_id: item.image });
//           console.log('Image deleted:', item.image);
//         }
//       }
//     } catch (error) {
//       console.log("Deleting images error:", error);
//     }
//   };

//   await handleImageDelete();

//   axios.delete(`/api/product/${id}`)
//     .then(() => {
//       toast.success("Product deleted");
//       router.refresh();
//     })
//     .catch((err) => {
//       toast.error("Failed to delete product");
//       console.log(err);
//     });
// }, []);
const handleDelete = useCallback(async (id: string, images: any[]) => {
  toast("Deleting product, please wait!");

  const handleImageDelete = async () => {
    try {
      for (const item of images) {
        if (item.image?.public_id) {
          // 🔥 IMPORTANT: Cloudinary public_id MUST NOT contain file extension
          const cleanPublicId = item.image.public_id.replace(
            /\.(jpg|jpeg|png|webp)$/i,
            ""
          );

          await axios.post("/api/cloudinary/delete", {
            public_id: cleanPublicId,
          });

          console.log("Image deleted:", cleanPublicId);
        }
      }
    } catch (error) {
      console.log("Deleting images error:", error);
    }
  };

  // 1️⃣ delete images first
  await handleImageDelete();

  // 2️⃣ then delete product
  axios
    .delete(`/api/product/${id}`)
    .then(() => {
      toast.success("Product deleted");
      router.refresh();
    })
    .catch((err) => {
      toast.error("Failed to delete product");
      console.log(err);
    });
}, []);

// const handleDelete = useCallback(async (id: string, images: any[]) => {
//   toast('Deleting product, please wait!');

//   const handleImageDelete = async () => {
    
//     try {
//       for (const item of images) {
//         if (item.image?.public_id) {
//           // Cloudinary delete API
//           await axios.post('/api/cloudinary/delete', {
//             public_id: item.image.public_id,
//           });
//           console.log('Image deleted:', item.image.public_id);
//         }
//       }
//     } catch (error) {
//       console.log("Deleting images error", error);
//     }
//   };

//   await handleImageDelete();

//   axios.delete(`/api/product/${id}`)
//     .then(() => {
//       toast.success("Product deleted");
//       router.refresh();
//     })
//     .catch((err) => {
//       toast.error("Failed to delete product");
//       console.log(err);
//     });
// }, []);

//This is got from video only 
// const storage = getStorage(firebase);
// const handleDelete = useCallback((id:string, images:any []) =>{
//   toast('Deleting product, please wait!')
//   const handleImageDelete = async () =>{
//     try{
//       for(const item of images){
//         if(item.image){
//           const imageRef = ref(storage, item.image)
//           await deleteObject(imageRef)
//           console.log('image deleted,', item.image)
//         }
//       }
//     } catch (error){
//       return console.log("Deleting images error", error)
//     }
//   }
// await handleImageDelete()
//  axios.delete(`/api/product/${id}`).then((res) => {
//   toast.success("Product deleted");
//   router.refresh();
//  }).catch((err) => {
//   toast.error("Failed to delete product");
//   console.log(err);
//  });
// }, [])


  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Products" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageProductsClient;

