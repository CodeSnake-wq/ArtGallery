import React, { useEffect, useState } from 'react';
import Cards from './ArtistCards';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';

function Artist() {
  const [artist, setArtist] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getArtist = async () => {
      try {
        const res = await axios.get("http://localhost:4001/artists");
        console.log(res.data);
        setArtist(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getArtist();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const artistInfo = {
      name: data.name,
      bio: data.bio,
      image: data.image,
      password: data.password
    };
    await axios
      .post("http://localhost:4001/artists", artistInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Artist added successfully!");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
          setTimeout(() => { }, 3000);
        }
      })
  }

  const onDelete = async (data) => {
    try {
      const res = await axios.delete("http://localhost:4001/artists", { data: data });
      console.log(data);
      if (res.data) {
        toast.success("Artist deleted successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 3000)
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
        setTimeout(() => { }, 3000)
      }
    }
  }

  return (
    <>
      <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 drak:bg-slate-900'>
        <div className='mt-16 items-center justify-center text-center'>
          <h1 className='text-2xl font-semibold md:text-4xl'>
            Welcome to the artists list of Aboriginal art <span className='text-pink-500'>Australia</span>
          </h1>
          <p className='mt-8'>
            Discover the brilliant minds and soulful creativity of our featured artists. Each piece in our collection is a testament to their unique vision, skill, and cultural heritage. Join us in celebrating the artists who bring Australia's rich Aboriginal art to life.
          </p>
          <Link to="/">
            <button className='mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300'>
              Back
            </button>
          </Link>
          <button
            className='mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 duration-300 ml-4'
            onClick={() => setShowModal(true)}
          >
            Add New Artist
          </button>
        </div>
        <div className='mt-12 grid grid-cols-1 md:grid-cols-3'>
          {artist.map((item) => (
            <Cards key={item.id} item={item} onDelete={onDelete} />
          ))}
        </div>
      </div>

      {showModal && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-8 rounded-md'>
            <h2 className='text-2xl mb-4'>Add New Artist</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-4'>
                <label className='block text-gray-700'>Name</label>
                <input
                  type='text'
                  className='w-full px-3 py-2 border rounded-md'
                  {...register("name", { required: true })}
                />
                {errors.name && <span className='text-red-500'>This field is required</span>}
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Bio</label>
                <textarea
                  className='w-full px-3 py-2 border rounded-md'
                  {...register("bio", { required: true })}
                ></textarea>
                {errors.bio && <span className='text-red-500'>This field is required</span>}
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Image URL</label>
                <input
                  type='text'
                  className='w-full px-3 py-2 border rounded-md'
                  {...register("image", { required: true })}
                />
                {errors.image && <span className='text-red-500'>This field is required</span>}
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Password to delete post</label>
                <input
                  type='password'
                  className='w-full px-3 py-2 border rounded-md'
                  {...register("password", { required: true })}
                />
                {errors.password && <span className='text-red-500'>This field is required</span>}
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
                  className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 duration-300'
                >
                  Add Artist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Artist;