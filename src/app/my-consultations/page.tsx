'use client'
import React, { useState } from 'react';
// @ts-ignore
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useCookies } from 'react-cookie';
import Link from 'next/link';
import Swal from 'sweetalert2';

interface Doctor {
    name: string;
    specialty: string;
    bookedDate: string;
    bookedTime: string;
}

interface Event {
    title: string;
    start: Date;
    end: Date;
    resource: Doctor;
}

const localizer = momentLocalizer(moment);

const UserCalendar = () => {
    const [cookies] = useCookies(['user']);
    const user = cookies.user;

    const doctors: Doctor[] = user?.doctors || [];

    const events: Event[] = doctors.map((doctor: Doctor) => ({
        title: `${doctor.name} (${doctor.specialty})`,
        start: new Date(doctor.bookedDate + 'T' + doctor.bookedTime),
        end: new Date(doctor.bookedDate + 'T' + doctor.bookedTime),
        resource: doctor,
    }));

    const colors = {
        background: "#E5EEFF",
        pink: "#FF7BAC",
        light_blue: "#8BACED",
        blue: "#1A65F5",
        black: "#2C2C2C",
        white: "#FFFFFF",
        gray: "#A7A7A7",
    };

    // State to manage the current date and view of the calendar
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState<string>('month');

    const handleEventSelect = (event: Event) => {
        Swal.fire({
            title: 'Appointment Details',
            html: `
                <p><strong>Doctor:</strong> ${event.resource.name}</p>
                <p><strong>Specialty:</strong> ${event.resource.specialty}</p>
                <p><strong>Date:</strong> ${event.start.toDateString()}</p>
                <p><strong>Time:</strong> ${event.start.toLocaleTimeString()}</p>
            `,
            icon: 'info',
            confirmButtonText: 'Close',
        });
    };

    return (
        <div className="user-calendar-container px-4 lg:px-8 pt-4 pb-6 h-[600px]">
            {events.length > 0 ? (
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    views={['month', 'agenda']}
                    style={{ height: '100%', backgroundColor: colors.white }}
                    eventPropGetter={(event: Event) => ({
                        style: {
                            backgroundColor: colors.pink,
                            color: colors.white,
                        },
                    })}
                    // Handle navigation events
                    onNavigate={(newDate: Date) => setCurrentDate(newDate)}
                    // Handle view change events
                    onView={(newView: string) => setCurrentView(newView)}
                    // Handle event selection
                    onSelectEvent={handleEventSelect}
                    // Set the current date and view
                    date={currentDate}
                    view={currentView}
                />
            ) : (
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-center text-gray-500 font-semibold text-lg">No appointments available.</p>
                    <Link href="/my-doctors" className="bg-blue text-center text-white rounded-lg p-2 mt-4 hover:bg-light_blue">
                        Schedule a consultation
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserCalendar;
