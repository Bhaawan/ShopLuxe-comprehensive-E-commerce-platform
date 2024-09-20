import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserOrderAsync, selectUserInfo, selectUserInfoStatus, selectUserOrders } from '../userSlice';
import { discountedPrice } from '../../../app/constants';

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders=useSelector(selectUserOrders);
  const status=useSelector(selectUserInfoStatus);


  useEffect(()=>{
    dispatch(fetchLoggedInUserOrderAsync());
  },[dispatch]);

  return (
  
    <div>
      { orders && 
        orders.map((order,index)=>
        (<div key={index}>
          <div className="bg-blue-200 rounded-md mt-5 mb-10 mx-1 max-w-9xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 pt-3 pb-3">Order #{order.id}</h1>
            <h3 className="text-1xl capitalize font-semibold tracking-tight text-gray-900 pt-0 pb-3">Order status: {order.status}</h3>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.product.thumbnail}
                            alt={item.product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.product.href}>{item.product.title}</a>
                              </h3>
                              <p className="ml-4">${discountedPrice(item.product)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Quantity:{item.product.quantity} 
                              
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${order.totalAmount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total Items</p>
                <p>{order.totalItems} items</p>
              </div>
              <div className='text-base font-medium mt-5 text-gray-900'>Shipping Address</div>
              <div className="flex justify-between gap-x-6 p-4 mt-2 border-none bg-slate-200 rounded-lg">
                <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                    <p className="text-md font-semibold leading-6 text-gray-900">{order.selectedAddress.name}</p>
                    <p className="text-sm mt-1 truncate leading-5 text-gray-600">{order.selectedAddress.street}</p>
                    <p className="text-sm mt-1 truncate leading-5 text-gray-600">{order.selectedAddress.city}</p>
                    <p className="text-sm mt-1 truncate leading-5 text-gray-600">{order.selectedAddress.state}</p>
                    </div>   
                </div>

                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">Phone: +91-{order.selectedAddress.phone}</p>
                    <p className="text-sm leading-6 text-gray-500">{order.selectedAddress.pincode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>))
      }
      {
        !orders && (<h1>No orders yet....</h1>)
      }
    </div>
    
  );
}
