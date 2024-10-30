'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';
import { useRouter, usePathname } from 'next/navigation'; // Import useRouter and usePathname from next/navigation

interface Doctor {
    name: string;
    specialty: string;
    experience: number;
    city: string;
    state: string;
    imageUrl: string;
}

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
    const { name, specialty, experience, city, state, imageUrl } = doctor;
    const [cookies, setCookie] = useCookies(['user']);
    const router = useRouter(); // Initialize useRouter from next/navigation
    const pathname = usePathname(); // Initialize usePathname from next/navigation

    const handleBookConsultation = (selectedDate: string, selectedTime: string) => {
        if (!selectedDate || !selectedTime) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select both date and time for the consultation!',
            });
            return;
        }

        const doctorsArray = cookies.user?.doctors || [];
        const doctorExists = doctorsArray.some((doc: any) => doc.name === name);

        if (doctorExists) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `You have already booked a consultation with ${name}`,
            });
            return;
        }

        const selectedDoctor = {
            name: name,
            specialty: specialty,
            bookedDate: selectedDate,
            bookedTime: selectedTime
        };

        const updatedDoctorsArray = [...doctorsArray, selectedDoctor];

        const updatedUser = { ...cookies.user, doctors: updatedDoctorsArray };
        setCookie('user', JSON.stringify(updatedUser), { path: '/' });

        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: `Consultation booked with ${name} (Specialty: ${specialty}) for ${selectedDate} at ${selectedTime}.`,
            showCancelButton: true,
            confirmButtonText: 'My Consultations',
            cancelButtonText: 'Close',
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirect to My Consultations page using router.push
                router.push('/my-consultations');
            }
        });
    };

    const openBookingPopup = () => {
        // Generate time options for 12:00 PM to 6:00 PM with 30-minute intervals
        const timeOptions = [];
        for (let hour = 12; hour <= 18; hour++) {
            for (let minutes = 0; minutes < 60; minutes += 30) {
                const time = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                timeOptions.push(`<option value="${time}">${time}</option>`);
            }
        }

        // Get tomorrow's date in YYYY-MM-DD format
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];

        Swal.fire({
            title: 'Book Consultation',
            html: `
                <input type="date" id="swal-date" class="swal2-input" min="${minDate}">
                <select id="swal-time" class="swal2-input">${timeOptions.join('')}</select>
            `,
            showCancelButton: true,
            confirmButtonText: 'Book',
            cancelButtonText: 'Cancel',
            focusConfirm: false,
            preConfirm: () => {
                const dateInput = document.getElementById('swal-date') as HTMLInputElement;
                const timeInput = document.getElementById('swal-time') as HTMLSelectElement;
                const selectedDate = dateInput.value;
                const selectedTime = timeInput.value;
                handleBookConsultation(selectedDate, selectedTime);
            }
        });
    };

    return (
        <div className="w-full bg-white rounded-lg overflow-hidden flex flex-col items-center p-4">
            <Image className="object-cover object-center" src={imageUrl} alt={name} height={80} width={80} />
            <div className="text-center flex flex-col gap-2 mt-4">
                <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                <p className="text-blue font-semibold bg-background p-1 rounded-full">{specialty}</p>
                <p className="text-gray text-sm">Experience: {experience} years</p>
                <p className="text-gray text-sm">{city}, {state}</p>
                <button
                    className="bg-blue hover:bg-light_blue text-white font-bold py-2 px-4 rounded-full"
                    onClick={openBookingPopup}
                >
                    Book Consultation
                </button>
            </div>
        </div>
    );
};

export default DoctorCard;
