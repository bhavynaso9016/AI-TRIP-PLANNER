import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { googleLogout } from '@react-oauth/google';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

function Header() {
    const [openDialog, setOpenDialog] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        const handleStorageChange = () => {
            setUser(JSON.parse(localStorage.getItem('user')));
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const getUserProfile = async (tokenInfo) => {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenInfo.access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenInfo.access_token}`,
                        Accept: "application/json",
                    },
                }
            );
            localStorage.setItem("user", JSON.stringify(response.data));
            setUser(response.data);
            setOpenDialog(false);
        } catch (error) {
            console.error("Error fetching user profile:", error.message);
        }
    };

    const login = useGoogleLogin({
        onSuccess: (response) => getUserProfile(response),
        onError: (error) => console.error("Login Failed:", error),
    });

    const handleLogout = () => {
        googleLogout();
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/"; // Redirect to home page after logout
    };

    return (
        <div className='p-2 w-full shadow-sm flex justify-between items-center px-5'>
            <img src='/logo.svg' alt="Logo" />
            <div>
                {user ? (
                    <div className='flex items-center gap-3'>
                        <a href="/create-trip">
                            <Button variant="outline" className="rounded-full text-sm">➕ Create-Trip</Button>
                        </a>
                        <a href="/my-trips">
                            <Button variant="outline" className="rounded-full text-sm">🗺️ My Trips </Button>
                        </a>
                        <Popover>
                            <PopoverTrigger>
                                <img src={user?.picture} className='h-[50px] w-[50px] rounded-full' alt="User Profile" />
                            </PopoverTrigger>
                            <PopoverContent className="bg-white text-black w-48 p-2 rounded-full shadow-lg">
                                <h2
                                    className="cursor-pointer hover:text-black text-center"
                                    onClick={handleLogout} // Call the logout function
                                >
                                    Sign Out
                                </h2>
                            </PopoverContent>
                        </Popover>
                    </div>
                ) : (
                    <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
                )}
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="bg-white p-6 rounded-lg shadow-lg">
                    <DialogHeader>
                        <DialogDescription>
                            <img src="/logo.svg" alt="Logo" />
                            <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
                            <p>Sign in to the app with Google authentication securely</p>
                            <Button onClick={login} className="w-full mt-5 flex gap items-center">
                                <FcGoogle className="w-7 h-7" /> Sign in with Google
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Header;
