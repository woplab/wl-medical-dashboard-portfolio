import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Clock from 'react-live-clock';
import Image from "next/image";

const UserInfoSidebar = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
    const [temperature, setTemperature] = useState('');
    const [weatherIcon, setWeatherIcon] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const [cookies] = useCookies(['user']);
    const [showExitButton, setShowExitButton] = useState(false);
    const [userInfo, setUserInfo] = useState<{ name: string, avatar: string } | null>(null);

    const fetchTime = async () => {
        try {
            const response = await axios.get('https://worldtimeapi.org/api/ip');
            const { datetime } = response.data;
            setCurrentTime(new Date(datetime).toLocaleString());
        } catch (error) {
            console.error('Error fetching current time:', error);
        }
    };

    const fetchWeather = async () => {
        try {
            const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: userLocation,
                    appid: '170f594e14baa4dd2d04aa316901836a',
                    units: 'metric',
                }
            });
            const { temp } = response.data.main;
            const { icon } = response.data.weather[0];
            setTemperature(temp);
            setWeatherIcon(icon);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const fetchUserLocation = async () => {
        try {
            const response = await axios.get('https://ipinfo.io/json');
            const { city } = response.data;
            setUserLocation(city);
        } catch (error) {
            console.error('Error fetching user location:', error);
        }
    };

    useEffect(() => {
        fetchTime();
        fetchUserLocation();
    }, []);

    useEffect(() => {
        if (userLocation) {
            fetchWeather();
        }
    }, [userLocation]);

    useEffect(() => {
        if (cookies.user) {
            setUserInfo(cookies.user);
        }
    }, [cookies.user]);

    const handleExit = () => {
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload();
    };

    const handleNameClick = () => {
        setShowExitButton(!showExitButton);
    };

    return (
        <div className="w-full flex flex-row items-center p-8 justify-between">
            <div className="flex flex-row gap-4">
                <div className="flex-row items-center gap-4 bg-blue text-white rounded p-2  hidden md:flex">
                    <p className="text-white font-bold">{userLocation}</p>
                    <div className="flex flex-row items-center">
                        <p className="text-white">{temperature}&deg;C</p>
                        {weatherIcon && (
                            <img
                                src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
                                alt="Weather Icon"
                                className='w-6 h-6'
                            />
                        )}
                    </div>
                </div>

                <div className=" flex-row items-center gap-4 bg-pink p-2 rounded hidden md:flex">
                    <p className="text-white font-bold">Time:</p>
                    <Clock format={'HH:mm'} ticking={true} className="text-white"/>
                </div>

                <Image className="visible md:hidden" src={'/assets/logo-nda.svg'} alt={''} width={52} height={70} />
            </div>

            <div className="flex flex-row items-center gap-2">
                {/* Render user photo */}
                {userInfo && userInfo.avatar ? (
                    <Image
                        src={userInfo.avatar}
                        alt="User Photo"
                        className="rounded-full h-8 w-8"
                        height={24}
                        width={24}
                    />
                ) : (
                    <Image
                        src="/assets/user.png"
                        alt="User Photo"
                        className="rounded-full h-8 w-8"
                        height={24}
                        width={24}
                    />
                )}

                {/* Render user name */}
                {userInfo && (
                    <div className="relative text-center cursor-pointer" onClick={handleNameClick}>
                        <p className="select-none font-medium flex gap-1 items-center justify-center">
                            {userInfo.name} {showExitButton ? <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                                <path fill="black"
                                      d="m4.427 7.427l3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427"/>
                            </svg>
                        </> : <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                                <path fill="black"
                                      d="m4.427 9.573l3.396-3.396a.25.25 0 0 1 .354 0l3.396 3.396a.25.25 0 0 1-.177.427H4.604a.25.25 0 0 1-.177-.427"/>
                            </svg>
                        </>}
                        </p>
                        {/* Conditionally render "Exit" button */}
                        {showExitButton && (
                            <button onClick={handleExit}
                                    className="w-[150px] bg-blue text-center text-white p-2 mt-4 hover:bg-light_blue rounded-md absolute right-0 top-[100%]">
                                Sign out
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserInfoSidebar;