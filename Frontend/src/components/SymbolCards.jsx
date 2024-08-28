import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function SymbolCards({ item, onUpdate }) {
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState("");
    const [authUser, setAuthUser] = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleUpdate = (data) => {
        onUpdate({ oldName: item.name, oldPassword: data.oldPassword, name: data.newName, bio: data.newBio, image: data.newImage, password: data.newPassword });
        setShowModal(false);
        setPassword("");
    };

    return (
        <>
            <div className='mt-4 my-3 p-3'>
                <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-blue-900 dark:text-white dark:border">
                    <figure><img src={item.image} alt="Artist" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {item.name}
                        </h2>
                        <p>{item.title}</p>
                        <div className="card-actions justify-between">
                            <div className="">{item.bio}</div>
                            <div>
                                {authUser ? (
                                    <button
                                        className="px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200 mr-2"
                                        onClick={() => setShowModal(true)}
                                    >
                                        Edit
                                    </button>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200 mr-2"
                                    >
                                        Edit
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white p-8 rounded-md'>
                        <h2 className='text-2xl mb-4'>Confirm Updation</h2>
                        <form onSubmit={handleSubmit(handleUpdate)}>
                            <div>
                                <p>Please enter your password to confirm the updation of {item.name}.</p>
                                <input
                                    type='Password'
                                    className='w-full px-3 py-2 border rounded-md my-2'
                                    {...register("oldPassword", { required: true })}
                                />
                                {errors.oldPassword && <span className='text-sm text-red-500'>This field is required</span>}
                            </div>
                            <div>
                                <p>Please enter new name for symbol {item.name}.</p>
                                <input
                                    type='text'
                                    className='w-full px-3 py-2 border rounded-md my-2'
                                    {...register("newName", { required: true })}
                                />
                                {errors.newName && <span className='text-sm text-red-500'>This field is required</span>}
                            </div>
                            <div>
                                <p>Please enter new bio for symbol {item.name}.</p>
                                <input
                                    type='text'
                                    className='w-full px-3 py-2 border rounded-md my-2'
                                    {...register("newBio", { required: true })}
                                />
                                {errors.newBio && <span className='text-sm text-red-500'>This field is required</span>}
                            </div>
                            <div>
                                <p>Please enter new image URL for symbol {item.name}.</p>
                                <input
                                    type='text'
                                    className='w-full px-3 py-2 border rounded-md my-2'
                                    {...register("newImage", { required: true })}
                                />
                                {errors.newImage && <span className='text-sm text-red-500'>This field is required</span>}
                            </div>
                            <div>
                                <p>Please enter new password for symbol {item.name}.</p>
                                <input
                                    type='password'
                                    className='w-full px-3 py-2 border rounded-md my-2'
                                    {...register("newPassword", { required: true })}
                                />
                                {errors.newPassword && <span className='text-sm text-red-500'>This field is required</span>}
                            </div>
                            <div className='flex justify-end'>
                                <button
                                    type='button'
                                    className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 duration-300 mr-2'
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 duration-300'
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default SymbolCards;
