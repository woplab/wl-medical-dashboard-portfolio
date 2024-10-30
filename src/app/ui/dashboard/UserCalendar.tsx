// UserCalendar.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { useCookies } from 'react-cookie';
import Link from "next/link";

// Define the type for an appointment
interface Appointment {
    name: string;
    specialty: string;
    bookedDate: string;
    bookedTime: string;
}

// Define the type for Calendar's value
type CalendarValue = Date | [Date, Date] | null;

const UserCalendar = () => {
    const [cookies] = useCookies(['user']); // Initialize useCookies hook
    const [appointment, setAppointment] = useState<Appointment | null>(null); // State for storing the latest appointment
    const [showVideoPopup, setShowVideoPopup] = useState(false);
    const [selectedDate, setSelectedDate] = useState<CalendarValue>(new Date());

    // Effect to fetch the latest appointment from cookies
    useEffect(() => {
        if (cookies.user && cookies.user.doctors) {
            const appointments: Appointment[] = cookies.user.doctors;
            if (appointments.length > 0) {
                setAppointment(appointments[appointments.length - 1]);
            }
        }
    }, [cookies]);

    const handleDateChange = (value: Date | Date[], event: React.SyntheticEvent<any>) => {
        if (value instanceof Date || (Array.isArray(value) && value.length === 2 && value.every(item => item instanceof Date))) {
            setSelectedDate(value as CalendarValue);
        }
    };

    const toggleVideoPopup = () => {
        setShowVideoPopup(!showVideoPopup);
    };

    const closeVideoPopup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            setShowVideoPopup(false);
        }
    };

    const tileContent = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month' && date.getDay() === 0) {
            return <div style={{ color: '#2C2C2C' }}>{date.getDate()}</div>;
        }
        return null;
    };

    return (
        <div className="w-full lg:w-1/3 px-0 lg:px-4">
            <Calendar
                value={selectedDate}
                // @ts-ignore
                onChange={handleDateChange}
                locale="en"
                tileContent={tileContent}
            />

            <div className="flex flex-col bg-white rounded-lg p-4 mt-4">
                {appointment ? (
                    <>
                        <h2 className="font-bold text-lg mb-4">{appointment.specialty}</h2>
                        <div className="flex flex-col gap-2">
                            <span className="flex flex-row gap-2 items-center text-black justify-between">
                                <span className="flex flex-row gap-2 items-center text-black">
                                    <FiCalendar /> Date:
                                </span>
                                <p className="font-semibold">{appointment.bookedDate}</p>
                            </span>
                            <span className="flex flex-row gap-2 items-center text-black justify-between">
                                <span className="flex flex-row gap-2 items-center text-black">
                                    <FiClock /> Time:
                                </span>
                                <p className="font-semibold">{appointment.bookedTime}</p>
                            </span>
                            <span className="flex flex-row gap-2 items-center text-black justify-between">
                                <span className="flex flex-row gap-2 items-center text-black">
                                    <FiUser /> Doctor:
                                </span>
                                <p className="font-semibold">{appointment.name}</p>
                            </span>
                            <Link href={'/my-consultations'} className="bg-blue text-center text-white rounded-lg p-2 mt-4 hover:bg-light_blue">
                                Open My Consultations
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col gap-2">
                        <p className="text-center text-gray-500 font-semibold text-lg">No appointments available.</p>
                        <Link href={'/my-doctors'} className="bg-blue text-center text-white rounded-lg p-2 mt-4 hover:bg-light_blue">
                            Schedule a consultation
                        </Link>
                    </div>
                )}
            </div>

            {showVideoPopup && (
                <div className="video-popup-overlay" onClick={closeVideoPopup}>
                    <div className="video-popup">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=ieIMJcfjvjkj_Etb"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserCalendar;
