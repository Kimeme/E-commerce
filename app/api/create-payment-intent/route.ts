import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {getCurrentUser} from "@/actions/getCurrentUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

const calculateOrderAmount = (items: CartProductType[]) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const price:any = Math.floor(totalPrice);
  return price;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { items, payment_intent_id } = body;
  const total = calculateOrderAmount(items) * 100;

  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "usd",
    status: "pending",
    deliverStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
  };

  try {
    if (payment_intent_id) {
      const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

      if (current_intent) {
        const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {
          amount: total,
        });

        const existing_order = await prisma.order.findFirst({
          where: { paymentIntentId: payment_intent_id },
        });

        if (!existing_order) {
          return NextResponse.json({ error: "Invalid Payment Intent" }, { status: 400 });
        }

        await prisma.order.update({
          where: { id: existing_order.id },
          data: {
            amount: total,
            products: items,
          },
        });

        return NextResponse.json({ paymentIntent: updated_intent });
      }
    } else {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });

      orderData.paymentIntentId = paymentIntent.id;
      await prisma.order.create({
        data: orderData,
      });

    //   return NextResponse.json({ paymentIntent });
          // return only necessary info to frontend
            return NextResponse.json({
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret, // <-- this line is the key
  });
    }
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// import Stripe from "stripe";
// import prisma from "@/libs/prismadb";
// import { NextResponse } from "next/server";
// import { CartProductType } from "@/app/product/[productId]/ProductDetails";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,{
//     apiVersion:"2022-11-15",
// });
//  const calculateOrderAmount = (item:CartProductType[]) => {
//     const totalPrice = item.reduce((acc,item) => {
//         const itemTotal = item.price * item.quantity;
//         return acc + itemTotal;
//     }, 0);
//     return totalPrice
//  };

//  export async function POST(request:Request) {
//     const currentUser= await getCurrentUser()

//     if(!currentUser){
//         return NextResponse.json({error:'Unauthorized'}, {status:401})
//     }

//     const body = await request.json();
//     const {items, payment_intent_id}= body
//     const total = calculateOrderAmount(items) * 100
//     const orderDate = {
//         user:{connect:{id:currentUser.id}},
//         amount:total,
//         currency:'usd',
//         status:"pending",
//         deliverStatus:"pending",
//         paymentIntentId:payment_intent_id,
//         products:items
//     }
//     if(payment_intent_id){
//       const current_intent = await stripe.paymentIntents.retrieve(
//         payment_intent_id
//       );
//       if(current_intent){
//         const updated_intent = await stripe.paymentIntents.update(
//             payment_intent_id,{amount:total}
//         );
//      // update the order
//       const[existing_order, update_order] = await Promise.all([
//         prisma.order.findFirst({
//             where:{paymentIntentId:payment_intent_id},
//             data:{
//                 amount:total,
//                 products:items
//             }
//         })
//       ]);
//       if(!existing_order){
//         return NextResponse.json(
//             { error:"Invalid Payment Intent"},
//             {status:400}
// );
//       }
//       return NextResponse.json({paymentIntent: updated_intent});
//       }
//     }else{
//         //create the intent
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount:total,
//             currency:"usd",
//             automatic_payment_methods:{enabled:true},
//         });
//         //create the order
//         orderDate.paymentIntentId= paymentIntent.id;
//         await prisma.order.create({
//             data:orderDate,
//         });
//         return NextResponse.json({paymentIntent})
//     }
//  }