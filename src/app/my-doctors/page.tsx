// DoctorsPage.js
import React from 'react';
import DoctorCard from '../ui/my-doctors/DoctorCard';
import doctorsData from '../data/doctors.json';

const DoctorsPage = () => {
    return (
        <div className="pt-4 px-8 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {doctorsData.map((doctor, index) => (
                    <DoctorCard key={index} doctor={doctor} />
                ))}
            </div>
        </div>
    );
};

export default DoctorsPage;
