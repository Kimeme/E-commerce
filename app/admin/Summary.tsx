'use client'
import { Order, Product, User } from "@prisma/client";
import Heading from "../components/Heading";
import { formatPrice } from "@/utils/formatPrice";
import { formatNumber } from "@/utils/formatNumber";

interface SummaryProps {
    orders: Order[];
    products: Product[];
    users: User[];
}

type SummaryDataType = {
    [key: string]: {
        label: string;
        digit: number;
    }
}

const Summary: React.FC<SummaryProps> = ({ orders, products, users }) => {

    const summaryData: SummaryDataType = {
        sale: {
            label: 'Total Sale',
            digit: orders.reduce((acc, item) => item.status === 'complete' ? acc + item.amount : acc, 0)
        },
        products: {
            label: 'Total Products',
            digit: products.length
        },
        orders: {
            label: 'Total Orders',
            digit: orders.length
        },
        paidOrders: {
            label: 'Paid Orders',
            digit: orders.filter(o => o.status === 'complete').length
        },
        unpaidOrders: {
            label: 'Unpaid Orders',
            digit: orders.filter(o => o.status === 'pending').length
        },
        users: {
            label: 'Total Users',
            digit: users.length
        }
    };

    return (
        <div className="max-w-[1150px] m-auto">
            <div className="mb-4 mt-8">
                <Heading title="Stats" center />
            </div>

            <div className="grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {Object.keys(summaryData).map((key) => (
                    <div key={key} className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition">
                        <div className="text-xl md:text-4xl font-bold">
                            {summaryData[key].label === 'Total Sale'
                                ? formatPrice(summaryData[key].digit)
                                : formatNumber(summaryData[key].digit)
                            }
                        </div>
                        <div>{summaryData[key].label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Summary;
