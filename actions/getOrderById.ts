import prisma from "@/libs/prismadb";

export default async function getOrderById(orderId?: string) {
  if (!orderId) return null; // handle undefined early

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true }, // optional if you need user data
    });

    return order || null;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message || "Failed to fetch order");
  }
}

//This is from video
// import prisma from '@/libs/prismadb'

// interface IParams{
//     orderId?:string
// }

// export default async function getOrderById(params:IParams) {
//     try{
//         const {orderId} = params
//         const order = await prisma.order.findUnique({
//             where:{
//                 id:orderId
//             }
//         })
//         if(!order) return null
//         return order

//     } catch (error: any){
//         throw new Error(error)
//     }
// }


// import OrderDetails from "./OrderDetails";
// import Container from "@/app/components/Container";
// import getOrderById from "@/actions/getOrderById";

// interface IParams {
//   orderId?: string;
// }

// const Order = async ({ params }: { params: IParams }) => {
//   const order = await getOrderById(params.orderId);

//   return (
//     <div className="p-8">
//       <Container>
//         <OrderDetails order={order} />
//       </Container>
//     </div>
//   );
// };

// export default Order;