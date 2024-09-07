import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectLoggedInUser } from '../../auth/authSlice';
import { selectUserInfo, updateUserAsync } from '../userSlice';
import { useForm } from 'react-hook-form';

export default function UserProfile() {
  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const userinfo=useSelector(selectUserInfo);

  const [selectedEditIndex, setselectedEditIndex] = useState(-1);
  const [showAddAddressForm, setshowAddAddressForm] = useState(false);

  const handleEdit=(newAddress, index)=>{
    const newUser={...userinfo,addresses:[...userinfo.addresses]};
    newUser.addresses.splice(index,1,newAddress);
    dispatch(updateUserAsync(newUser))
    setselectedEditIndex(-1)
  }

  const handleRemove=(e,index)=>{
    const newUser={...userinfo,addresses:[...userinfo.addresses]};
    newUser.addresses.splice(index,1);
    dispatch(updateUserAsync(newUser))
  }

  const handleAdd=(address)=>{
    const newUser={...userinfo,addresses:[...userinfo.addresses, address]};
    dispatch(updateUserAsync(newUser))
    setshowAddAddressForm(false);
  }

  const handleEditForm=(index)=>{
    setselectedEditIndex(index);
    const address=userinfo.addresses[index];
    setValue('name',address.name);
    setValue('email',address.email);
    setValue('city',address.city);
    setValue('state',address.state);
    setValue('pincode',address.pincode);
    setValue('phone',address.phone);
    setValue('street',address.street);

  }

  return (
    <div>
        <div className="bg-blue-200 rounded-md mt-5 mb-10 mx-1 max-w-9xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 pt-3 pb-3">Name: {userinfo.name? userinfo.name:"Guest user"}</h1>
            <h3 className="text-1xl capitalize font-semibold tracking-tight text-gray-900 pt-0 pb-3">Email address: {userinfo.email}</h3>
            {userinfo.role==='admin'&&<h3 className="text-1xl uppercase font-semibold tracking-tight text-gray-900 pt-0 pb-3">{userinfo.role}</h3>}

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              
              <button
              onClick={(e)=>{setshowAddAddressForm(true); setselectedEditIndex(-1)}}
              type="submit"
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
              Add new address
              </button>

              { showAddAddressForm && <form noValidate 
                      onSubmit={handleSubmit((data)=>{
                      handleAdd(data)
                      reset(); })} 
                      className="py-4 bg-white rounded-md my-3 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        
                        <div className="space-y-12">
                          <div className="border-b border-gray-900/10 pb-12">
                          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-4">
                              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                  Full name
                              </label>
                              <div className="mt-2">
                                  <input
                                  type="text"
                                  {...register('name',{required:'Full name is required'})}
                                  id="first-name"
                                  autoComplete="given-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                              </div>
                              </div>

                              <div className="sm:col-span-4">
                              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                  Email address
                              </label>
                              <div className="mt-2">
                                  <input
                                  id="email"
                                  {...register('email',{required:'email is required'})}
                                  type="email"
                                  autoComplete="email"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                              </div>
                              </div>

                              <div className="sm:col-span-4">
                              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                  Phone number
                              </label>
                              <div className="mt-2">
                                  <input
                                  id="phone"
                                  {...register('phone',{required:'Phone number is required'})}
                                  type="tel"
                                  autoComplete="phone"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                              </div>
                              </div>

                              <div className="col-span-full">
                              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                  Street address
                              </label>
                              <div className="mt-2">
                                  <input
                                  type="text"
                                  {...register('street',{required:'Street address is required'})}
                                  id="street"
                                  autoComplete="street-address"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                              </div>
                              </div>

                              <div className="sm:col-span-2 sm:col-start-1">
                              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                  City
                              </label>
                              <div className="mt-2">
                                  <input
                                  type="text"
                                  {...register('city',{required:'City name is required'})}
                                  id="city"
                                  autoComplete="address-level2"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                              </div>
                              </div>

                              <div className="sm:col-span-2">
                              <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                  State / Province
                              </label>
                              <div className="mt-2">
                                  <input
                                  type="text"
                                  {...register('state',{required:'State name is required'})}
                                  id="state"
                                  autoComplete="address-level1"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                              </div>
                              </div>

                              <div className="sm:col-span-2">
                              <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                                  ZIP / Postal code
                              </label>
                              <div className="mt-2">
                                  <input
                                  type="text"
                                  {...register('pinCode',{required:'PIN code is required'})}
                                  id="pinCode"
                                  autoComplete="pinCode"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                              </div>
                              </div>
                          </div>
                          <div className="mt-6 flex items-center justify-end gap-x-6">
                              
                              <button onClick={(e)=>reset()} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                              Reset
                              </button>

                              <button onClick={(e)=>setshowAddAddressForm(false)} type="button" className="text-sm font-semibold leading-6 text-white bg-red-500 hover:bg-red-400 px-3 py-1.5 rounded-md">
                              Cancel
                              </button>

                              <button
                              type="submit"
                              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                              >
                              Add Address
                              </button>
                          </div>
                          </div>

                        </div>            
                </form> }
              
              <div className='text-base font-medium mt-5 text-gray-900'>Saved Address</div>
              {userinfo.addresses.map((address,index)=>
                <div key={index}>
                
                { selectedEditIndex===index && <form noValidate 
                      onSubmit={handleSubmit((data)=>{
                      handleEdit(data,index)
                      reset(); })} 
                      className="py-4 bg-white rounded-md my-3 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        
                        <div className="space-y-12">
                          <div className="border-b border-gray-900/10 pb-12">
                          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-4">
                              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                  Full name
                              </label>
                              <div className="mt-2">
                                  <input
                                  type="text"
                                  {...register('name',{required:'Full name is required'})}
                                  id="first-name"
                                  autoComplete="given-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                              </div>
                              </div>

                              <div className="sm:col-span-4">
                              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                  Email address
                              </label>
                              <div className="mt-2">
                                  <input
                                  id="email"
                                  {...register('email',{required:'email is required'})}
                                  type="email"
                                  autoComplete="email"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                              </div>
                              </div>

                              <div className="sm:col-span-4">
                              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                  Phone number
                              </label>
                              <div className="mt-2">
                                  <input
                                  id="phone"
                                  {...register('phone',{required:'Phone number is required'})}
                                  type="tel"
                                  autoComplete="phone"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                              </div>
                              </div>

                              <div className="col-span-full">
                              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                  Street address
                              </label>
                              <div className="mt-2">
                                  <input
                                  type="text"
                                  {...register('street',{required:'Street address is required'})}
                                  id="street"
                                  autoComplete="street-address"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                              </div>
                              </div>

                              <div className="sm:col-span-2 sm:col-start-1">
                              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                  City
                              </label>
                              <div className="mt-2">
                                  <input
                                  type="text"
                                  {...register('city',{required:'City name is required'})}
                                  id="city"
                                  autoComplete="address-level2"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                              </div>
                              </div>

                              <div className="sm:col-span-2">
                              <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                  State / Province
                              </label>
                              <div className="mt-2">
                                  <input
                                  type="text"
                                  {...register('state',{required:'State name is required'})}
                                  id="state"
                                  autoComplete="address-level1"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                              </div>
                              </div>

                              <div className="sm:col-span-2">
                              <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                                  ZIP / Postal code
                              </label>
                              <div className="mt-2">
                                  <input
                                  type="text"
                                  {...register('pinCode',{required:'PIN code is required'})}
                                  id="pinCode"
                                  autoComplete="pinCode"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                              </div>
                              </div>
                          </div>
                          <div className="mt-6 flex items-center justify-end gap-x-6">
                              <button onClick={(e)=>setselectedEditIndex(-1)} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                              Cancel
                              </button>
                              <button
                              type="submit"
                              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                              Edit Address
                              </button>
                          </div>
                          </div>

                        </div>            
                </form> }

                  <div className="flex justify-between gap-x-6 p-4 mt-2 border-none bg-slate-200 rounded-lg">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                        <p className="text-md font-semibold leading-6 text-gray-900">{address.name}</p>
                        <p className="text-sm mt-1 truncate leading-5 text-gray-600">{address.street}</p>
                        <p className="text-sm mt-1 truncate leading-5 text-gray-600">{address.city}</p>
                        <p className="text-sm mt-1 truncate leading-5 text-gray-600">{address.state}</p>
                        </div>   
                    </div>

                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">Phone: +91-{address.phone}</p>
                        <p className="text-sm leading-6 text-gray-500">{address.pincode}</p>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end gap-6 justify-center">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={(e)=>{
                            handleEditForm(index)
                          }}
                        >
                          Edit Address
                        </button>
                        <button
                          type="button"
                          className="font-medium text-red-600 hover:text-red-500"
                          onClick={(e)=>handleRemove(e,index)}
                        >
                          Remove Address
                        </button>                  
                    </div>
                  </div>

                </div>
              )}
            </div>
        </div>
    </div>
  );
}
