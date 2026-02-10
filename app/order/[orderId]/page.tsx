// ✅ server component – NO 'use client'
import OrderDetails from "./OrderDetails";
import Container from "@/app/components/Container";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";

interface IParams {
  orderId?: string;
}

const Order = async ({ params }: { params: IParams }) => {
  const order = await getOrderById(params.orderId);
  // ✅ HANDLE NULL HERE
  if (!order) {
    return <NullData title="No order" />;
  }
  return (
    <div className="p-8">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
};

export default Order;

// import  OrderDetails from "./OrderDetails";
// import  Container from "@/app/components/Container";
// import getOrderById from "@/actions/getOrderById";

// interface IParams {
//   orderId?: string;
// }

// const Order = async({ params }: { params: IParams }) => {
//     const order = await getOrderById(params.orderId)
//   return (
//     <div className="p-8">
//      <Container>
//       <OrderDetails order={order} />
//      </Container>
//     </div>
//   );
// };

// export default Order;