import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteItemFromCartAsync,
  increment,
  incrementAsync,
  selectCartLoaded,
  selectItems,
  updateCartAsync,
} from './cartSlice';

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
import { discountedPrice } from '../../app/constants';



export default function Cart() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  
  const count = useSelector(selectItems);
  const items=useSelector(selectItems);
  const cartLoaded=useSelector(selectCartLoaded);
  const totalAmount = items.reduce((amount, item) => discountedPrice(item.product) * item.quantity + amount,0);
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity=(e,item)=>{
    dispatch(updateCartAsync({id:item.id, quantity: +e.target.value}))
  }

  const handleDelete=(e,itemId)=>{
    dispatch(deleteItemFromCartAsync(itemId));
  }

  return (
    <>
      {items.length>0 && cartLoaded &&
      <div className="bg-white rounded-md mt-3 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 pt-3 pb-3">Cart</h1>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
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
                        <p className="text-gray-500">Quantity 
                          <select onChange={(e)=>handleQuantity(e,item)} value={item.quantity} className="ml-3 rounded-lg bg-zinc-200 border-none">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </p>
                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={(e)=>handleDelete(e,item.id)}
                          >
                            Remove
                          </button>
                        </div>
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
            <p>${totalAmount.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total Items</p>
            <p>{totalItems} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{' '}
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>}
      
      {items.length===0 && <div className="bg-white rounded-md mt-3 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 pt-3 pb-3">Cart</h1>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h3 className="text-2xl font-semibold tracking-tight text-gray-900 pt-3 pb-3">Your cart is empty, let's fix that 🛒🛒🛒</h3>
        </div>
      </div>}
    </>
  );
}
