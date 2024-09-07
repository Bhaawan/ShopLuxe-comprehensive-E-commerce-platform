import { useEffect, useState } from "react";
import { discountedPrice, ITEMS_PER_PAGE } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders, updateOrderAsync } from "../../order/orderSlice";
import { PencilIcon, EyeIcon, ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline'
import Pagination from "../../common/Pagination";

function AdminOrders() {

    const [page, setPage] = useState(1);
    const dispatch=useDispatch();
    const orders=useSelector(selectOrders);
    const totalOrders=useSelector(selectTotalOrders);
    const [editableItemId, setEditableItemId] = useState(-1);
    const [sort, setsort] = useState({});

    const handlePage=(page)=>{
        setPage(page);
    }

    const handleSort=(sortOption)=>{
        let sort={_sort:sortOption.sort,_order:sortOption.order};
        setsort(sort);
    }

    const handleShow=()=>{
        console.log("handleShow");
    }

    const handleEdit=(order)=>{
        if(editableItemId!==-1)
        {
            setEditableItemId(-1);
        }
        else
        {
            setEditableItemId(order.id)
        }
    }

    const handleStatusChange=(e,order)=>{
        const updatedOrder={...order, status:e.target.value}
        dispatch(updateOrderAsync(updatedOrder))
        setEditableItemId(-1);
    }

    const chooseColor=(status)=>{
        switch(status){
            case 'pending': return 'bg-purple-200 text-purple-600';
            case 'dispatched': return 'bg-yellow-200 text-yellow-600';
            case 'shipped': return 'bg-blue-200 text-blue-600';
            case 'delivered': return 'bg-green-200 text-green-600';
            case 'cancelled': return 'bg-red-200 text-red-600';
            default: return 'bg-red-200 text-red-600';
        }
    }
    
    useEffect(()=>{
        const pagination={_page:page, _limit:ITEMS_PER_PAGE};
        dispatch(fetchAllOrdersAsync({sort,pagination}))
    }, [dispatch, page, sort]);

    return ( 
        <div className="overflow-x-auto">
            <div className="bg-gray-100 flex items-center justify-center overflow-hidden">
            <div className="w-full">
                <div className="bg-white shadow-md rounded my-6">
                <table className="w-full">
                    <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-[18px] leading-normal">
                        <th className="cursor-pointer py-[24px] px-6 text-left flex justify-center items-center gap-1" onClick={e=>handleSort({sort:'id',order:sort._order==='asc'?'desc':'asc'})}>Order <span className="text-xl">#</span>
                        {sort._sort==='id' && (sort._order==='desc'?<ArrowUpIcon className="w-4 h-4 ml-2 text-red-600 "></ArrowUpIcon>:
                            <ArrowDownIcon className="w-4 h-4 ml-2 text-green-600"></ArrowDownIcon>)}
                        </th>
                        
                        <th className="py-3 px-6 text-left">Items</th>

                        <th className="cursor-pointer py-[24px] px-6 text-left flex justify-center items-center gap-1" onClick={e=>handleSort({sort:'totalAmount',order:sort._order==='asc'?'desc':'asc'})}>Total Amount
                        {sort._sort==='totalAmount' && (sort._order==='desc'?<ArrowUpIcon className="w-4 h-4 ml-2 text-red-600 "></ArrowUpIcon>:
                            <ArrowDownIcon className="w-4 h-4 ml-2 text-green-600"></ArrowDownIcon>)}
                        </th>

                        <th className="py-3 px-6 text-center">Shipping Address</th>
                        <th className="py-3 px-6 text-center">Status</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {orders.map((order,index)=> 
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                                <span className="font-medium text-md"># {order.id}</span>
                            </div>
                            </td>
                            <td className="py-3 px-6 text-left">
                                {order.items.map((item,index1)=><div key={index1} className="flex items-center">
                                    <div className="mr-2">
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src={item.product.thumbnail}
                                        alt={item.product.title}
                                    />
                                    </div>
                                    <span className="font-semibold flex justify-center items-center gap-2">{item.product.title} 
                                    
                                    <span className="bg-blue-500 text-white font-semibold px-2 rounded-md text-[13px] py-0.3 text-center mt-1">QTY: {item.quantity}</span>
                                     
                                    <span className="bg-green-500 text-white font-semibold px-2 rounded-md text-[13px] py-0.3 text-center mt-1">PRICE: ${discountedPrice(item.product)}</span>
                                    </span>
                                </div>)}
                            </td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex items-center justify-center text-xl">
                                    ${Math.round(order.totalAmount)}
                                </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex-col justify-center items-end">
                                    <div className="uppercase mb-1 font-semibold w-[8.75rem ]">{order.selectedAddress.name}</div>
                                    <div>{order.selectedAddress.city}</div>
                                    <div>{order.selectedAddress.state}</div>
                                    <div>{order.selectedAddress.pinCode}</div>
                                    <div>{order.selectedAddress.phone}</div>
                                </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                                {order.id===editableItemId ? 
                                (<select className="text-[15px] py-1 rounded-md" onChange={e=>handleStatusChange(e,order)}>
                                    <option value="">-- Select --</option>
                                    <option value="pending">Pending</option>
                                    <option value="dispatched">Dispatched</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>):
                                (<span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs capitalize font-semibold`}>
                                    {order.status}
                                </span>)}

                            </td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex item-center justify-center gap-2">
                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-105 cursor-pointer">
                                        <EyeIcon className="w-6 h-6" onClick={e=>handleShow(order)}></EyeIcon>
                                    </div>
                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-105 cursor-pointer">
                                        <PencilIcon className="w-6 h-6" onClick={e=>handleEdit(order)}></PencilIcon>
                                    </div>
                                </div>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
                </div>
            </div>
            </div>

            <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalOrders}></Pagination>

        </div>
    );
}

export default AdminOrders;