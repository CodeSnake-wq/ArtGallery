import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function ArtistCards({ item, onDelete }) {
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const handleDelete = (data) => {
        onDelete({ name: item.name, password: data.password });
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
                                <button
                                    className="px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200 mr-2"
                                    onClick={() => setShowModal(true)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white p-8 rounded-md'>
                        <h2 className='text-2xl mb-4'>Confirm Deletion</h2>
                        <p>Please enter your password to confirm the deletion of {item.name}.</p>
                        <form onSubmit={handleSubmit(handleDelete)}>
                            <input
                                type='password'
                                className='w-full px-3 py-2 border rounded-md my-2'
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span className='text-sm text-red-500'>This field is required</span>}
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
                                    Delete
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default ArtistCards;
