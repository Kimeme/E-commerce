'use client'
import React, {useCallback } from "react";
import { useRouter } from "next/navigation";
import { Order, User} from "@prisma/client";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Heading from '@/app/components/Heading';
import Status from '@/app/components/Status';
import ActionBtn from '@/app/components/ActionBtn';
import { MdDone, MdRemoveRedEye, MdDeliveryDining,MdAccessTimeFilled } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { formatPrice } from "@/utils/formatPrice";
import moment from "moment"
interface ManageOrdersClientProps {
  orders: ExtendedOrder[];
}
type ExtendedOrder = Order & {
    user: User
}
const  ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
  const router = useRouter();
  let rows: any = [];

  if(orders){
     rows = orders.map((order) => {
      return{
    id: order.id,
    customer: order.user.name,
    amount: formatPrice(order.amount/100),
    paymentStatus: order.status,
    date: moment(order.createdDate).fromNow(),
    deliverStatus: order.deliverStatus,
      }
  });
}

  // DataGrid columns
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'customer', headerName: 'Customer Name', width: 130 },
    {
      field: 'amount',
      headerName: 'Amount (USD)',
      width: 130,
      renderCell: (params) => (
        <div className="font-bold text-slate-800">{params.value}</div>
      ),
    },
    {
     field: 'paymentStatus',
      headerName: 'Payment Status', 
      width: 130,
      renderCell: (params) => {
        return(
        <div>
          {params.row.paymentStatus == 'pending' ? (
            <Status text="pending" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" />
          ) : params.row.paymentStatus == 'complete' ?  (
            <Status text="completed" icon={MdDone} bg="bg-green-200" color="text-green-700" />
          ) : (<> </>)}
        </div>

        );
    },
    },
    {
     field: 'deliverStatus',
      headerName: 'Delivery Status', 
      width: 130, 
      renderCell: (params) => {
        return(
        <div>
          {params.row.deliverStatus == 'pending' ? (
            <Status text="pending" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" />
          ) : params.row.deliverStatus == 'dispatched' ?  (
            <Status text="dispatched" icon={MdDeliveryDining} bg="bg-purple-200" color="text-purple-700" />
          ) : params.row.deliverStatus == 'delivered' ?  (
            <Status text="delivered" icon={MdDone} bg="bg-green-200" color="text-green-700" />
          ) : <> </>}
        </div>

        );
    },
    },
    {
        field:'date',
        headerName: "Date",
        width:130,

    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => {
        return(
           <div className="flex justify-between gap-4 w-full">
          <ActionBtn
            icon={MdDeliveryDining}
            onClick={() => {handleDispatch(params.row.id)}
        }/>
          <ActionBtn
            icon={MdDone}
            onClick={() => {handleDeliver(params.row.id)}
    }/>
          <ActionBtn icon={MdRemoveRedEye} onClick={() => { 
            router.push(`/order/${params.row.id}`);
           }} />
        </div>
        );

      },
    },
  ];
  // Toggle inStock
  const handleDispatch = useCallback((id: string) => {
    // toast.success("Updating stock...");
    axios
      .put('/api/order', {
         id, 
         deliverStatus: 'dispatched',
         })
      .then((res) => {
        toast.success('Order Dispatched')
        router.refresh();
      })
      .catch((err) => {
        toast.error("Oos! Something went wrong");
        console.error(err);
      });
  }, []);

  const handleDeliver = useCallback((id: string) => {
    axios
      .put('/api/order', {
         id, 
         deliverStatus: 'delivered',
         })
      .then((res) => {
        toast.success('Order Delivered')
        router.refresh();
      })
      .catch((err) => {
        toast.error("Oos! Something went wrong");
        console.error(err);
      });
  }, []);
 
  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Orders" center />
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

export default ManageOrdersClient;

