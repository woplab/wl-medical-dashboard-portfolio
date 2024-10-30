// Home.tsx
'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import UserInformation from "@/app/ui/dashboard/UserInformation";
import Chart from "@/app/ui/dashboard/Chart";
import UserCalendar from "@/app/ui/dashboard/UserCalendar";

const Home = () => {
    type RootState = ReturnType<typeof rootReducer>;
    const user = useSelector((state: RootState) => state.user);

    return (
        <main className="flex min-h-screen flex-col items-center px-6 pb-6">
            <UserInformation />
            <div className="flex flex-col lg:flex-row w-full gap-8 justify-between lg:px-2 px-0">
                <Chart />
                <UserCalendar />
            </div>
        </main>
    );
};

export default Home;
