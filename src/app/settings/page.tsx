'use client'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useCookies } from 'react-cookie';
import Image from "next/image";
import Swal from 'sweetalert2';

const UserProfileForm = () => {
    const [cookies, setCookie] = useCookies(['user']);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dob: '',
        sex: '',
        height: '',
        weight: '',
        chronicDiseases: '',
        doctors: [],
        avatar: cookies.user && cookies.user.avatar ? cookies.user.avatar : '/assets/user.png'
    });

    // Populate form data from cookies when component mounts
    useEffect(() => {
        if (cookies.user) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                ...cookies.user,
                avatar: cookies.user.avatar ? cookies.user.avatar : prevFormData.avatar
            }));
        }
    }, [cookies.user]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const avatarData = reader.result;
                setFormData({
                    ...formData,
                    avatar: avatarData // Update avatar data
                });
                setCookie('user', { ...formData, avatar: avatarData }, { path: '/' }); // Save updated avatar data in the cookie
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCookie('user', formData, { path: '/' });
        Swal.fire({
            icon: 'success',
            title: 'Profile Updated',
            text: 'Your profile has been updated successfully!',
            confirmButtonText: 'OK'
        });
    };

    return (
        <div className="flex flex-col lg:flex-row mt-4 p-6 bg-white rounded-lg mx-4 lg:mx-8 mb-6 gap-4">
            {/* Avatar */}
            <div className="w-full lg:w-1/4 flex flex-col items-center mb-4 lg:mb-0">
                <Image src={formData.avatar} width={200} height={200} alt="User Avatar" className="h-32 w-32 rounded-full mb-4 aspect-square" />
                <label htmlFor="avatar-upload" className="block w-full text-center text-blue underline cursor-pointer hover:text-light_blue focus:outline-none focus:bg-blue-600">Change Photo</label>
                <input type="file" id="avatar-upload" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </div>
            {/* User Details */}
            <div className="w-full lg:w-3/4">
                <form onSubmit={handleSubmit} className="">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="w-full">
                            <label className="mb-2 text-light_blue" htmlFor="name">Name</label>
                            <input type="text" name="name" placeholder="Name" value={formData.name}
                                   onChange={handleChange}
                                   className="block w-full px-4 py-2 mb-4 border bg-b_tr border-none focus:outline-none rounded-full text-black"/>
                        </div>

                        <div className="w-full">
                            <label className="mb-2 text-light_blue" htmlFor="email">Email</label>
                            <input type="email" name="email" placeholder="Email" value={formData.email}
                                   onChange={handleChange}
                                   className="block w-full px-4 py-2 mb-4 border bg-b_tr border-none focus:outline-none rounded-full text-black"/>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="w-full">
                            <label className="mb-2 text-light_blue" htmlFor="dob">Date of Birth</label>
                            <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob}
                                   onChange={handleChange}
                                   className="block w-full px-4 py-2 mb-4 border bg-b_tr border-none focus:outline-none rounded-full text-black"/>
                        </div>

                        <div className="w-full relative">
                            <label className="mb-2 text-light_blue" htmlFor="sex">Sex</label>
                            <select name="sex" value={formData.sex} onChange={handleChange}
                                    className="block w-full px-4 py-2 mb-4 border bg-b_tr border-none focus:outline-none rounded-full text-black appearance-none">
                                <option value="">Select Sex</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="h-6 w-6 text-blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 8.293a1 1 0 0 1 1.414 0L10 9.586l1.293-1.293a1 1 0 1 1 1.414 1.414l-2 2a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 0-1.414zM10 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" clipRule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-2 border-b-2 border-gray_light mb-6"></div>

                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="w-full">
                            <label className="mb-2 text-light_blue" htmlFor="height">Height</label>
                            <input type="number" name="height" placeholder="Height" value={formData.height}
                                   onChange={handleChange}
                                   className="block w-full px-4 py-2 mb-4 border bg-b_tr border-none focus:outline-none rounded-full text-black"/>
                        </div>

                        <div className="w-full">
                            <label className="mb-2 text-light_blue" htmlFor="weight">Weight</label>
                            <input type="number" name="weight" placeholder="Weight" value={formData.weight}
                                   onChange={handleChange}
                                   className="block w-full px-4 py-2 mb-4 border bg-b_tr border-none focus:outline-none rounded-full text-black"/>
                        </div>
                    </div>
                    <label className="mb-2 text-light_blue" htmlFor="chronicDiseases">Chronic Diseases</label>
                    <textarea name="chronicDiseases" placeholder="Type here"
                              value={formData.chronicDiseases} onChange={handleChange}
                              className="block w-full h-24 px-4 py-2 mb-4 border bg-b_tr border-none focus:outline-none rounded-lg text-black resize-vertical"/>
                    <button type="submit"
                            className="block px-6 py-2 text-white bg-blue rounded-full hover:bg-light_blue focus:outline-none focus:bg-blue-600">Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserProfileForm;
