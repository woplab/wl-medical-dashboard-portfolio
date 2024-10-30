'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import rootReducer from '../reducers/rootReducer';
import RegistrationForm from './RegistrationForm';
import LeftSidebar from "@/app/ui/static/LeftSidebar";
import { useCookies } from 'react-cookie';
import UserInfoPanel from "@/app/ui/static/UserInfoPanel";
import { FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';
import Router from 'next/router';

const defaultAvatar = '/assets/user.png'; // Default avatar image path

const RegistrationChecker = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    // Define a type for the root state
    type RootState = ReturnType<typeof rootReducer>;

    // Then use RootState in useSelector
    const loading = useSelector((state: RootState) => state.loading.loading);
    const user = useSelector((state: RootState) => state.user);
    const [cookies, setCookie] = useCookies(['user']);
    const [isChecking, setIsChecking] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth > 1280;
        }
        return true;
    });

    useEffect(() => {
        setTimeout(() => { // Start of timeout block
            const userData = cookies['user'];
            if (userData && !Object.values(user).some(value => value)) {
                dispatch({ type: 'REGISTER_USER', payload: userData });
            }
            setIsChecking(false);
        }, 500); // Delay set to 500 milliseconds
    }, []);

    useEffect(() => {
        setCookie('user', JSON.stringify(user), { path: '/' });
    }, [user]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleResize = () => {
        if (window.innerWidth <= 1280) {
            setIsSidebarOpen(false);
        } else {
            setIsSidebarOpen(true);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Listen for route changes to close the sidebar on smaller screens
    useEffect(() => {
        const handleRouteChange = () => {
            if (window.innerWidth <= 1280) {
                setIsSidebarOpen(false);
            }
        };

        Router.events.on('routeChangeStart', handleRouteChange);
        return () => {
            Router.events.off('routeChangeStart', handleRouteChange);
        };
    }, []);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center h-screen">
                    <Image width={100} height={100} src="/assets/preloader.gif" alt="Loading..." />
                </div>
            );
        } else {
            return React.cloneElement(children as React.ReactElement, { key: isSidebarOpen ? 'appointment-card-open' : 'appointment-card-closed' });
        }
    };

    return (
        <div className="registration-checker">
            {isChecking ? (
                <div className="flex justify-center items-center h-screen">
                    <Image width={100} height={100} src="/assets/preloader.gif" alt="Checking registration..." />
                </div>
            ) : Object.values(user).some(value => value) ? (
                <>
                    <div className="overflow-y-auto">
                        {isSidebarOpen && <LeftSidebar key="sidebar" isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
                        <div className={`${isSidebarOpen ? 'xl:pl-64' : ''} ${isSidebarOpen ? 'pl-0 w-full xl:w-auto' : 'pl-0 w-full'}`}>
                            <UserInfoPanel/>
                            {renderContent()}
                        </div>
                    </div>
                    {!isSidebarOpen && (
                        <button className='bg-blue text-white rounded-full p-2 fixed bottom-16 left-4 z-10' onClick={toggleSidebar}>
                            <FiChevronRight size={24} />
                        </button>
                    )}
                </>
            ) : (
                <RegistrationForm />
            )}
        </div>
    );
};

export default RegistrationChecker;
