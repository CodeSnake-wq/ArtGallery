import React, { useState } from 'react';
import logo from '../../public/Logo.png';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";

function Banner() {
    const [email, setEmail] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const email = { email: data.email }
        await axios
            .post('http://localhost:4001/subscriber', email)
            .then((res) => {
                console.log(res.data)
                if (res.data) {
                    toast.success("Subscribed successfully!");
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500)
                }
            })
            
            .catch((err) => {
                if (err.response) {
                    console.log(err)
                    toast.error("Error: " + err.response.data.message)
                    setTimeout(() => {}, 1500)
                }
            })
    };

    return (
        <>
            <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
                <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-32">
                    <div className="space-y-12">
                        <h1 className="text-4xl font-bold">
                            Hello Everyone! Welcome to <span className="text-blue-500">art gallery of aboriginal art</span> of <span className="text-purple-500">Australia</span>
                        </h1>
                        <p className="text-xl font-semibold">
                            Immerse yourself in the rich cultural heritage and contemporary creativity of Australia's First Nations peoples. Explore our diverse collection of stunning artworks that tell powerful stories of connection, spirituality, and tradition. Enjoy your visit!
                        </p>
                        <div>
                            <p className="mb-2">
                                Subscribe to our newsletter to stay up-to-date with the latest news and events.
                            </p>
                            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                                <label className="input input-bordered flex items-center gap-2 dark:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 dark:text-white">
                                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                    </svg>
                                    <input
                                        type="email"
                                        className="grow"
                                        placeholder="Email"
                                        {...register("email", { required: true })}
                                    />
                                </label>
                                {errors.email && <span className='text-sm text-red-500'>This field is required</span>}
                                <button type="submit" className="mt-6 btn btn-secondary">Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="order-1 w-full md:w-1/2 mt-20">
                    <img src={logo} className="flex-justify-center" alt="Art Gallery Logo" />
                </div>
            </div>
        </>
    );
}

export default Banner;
