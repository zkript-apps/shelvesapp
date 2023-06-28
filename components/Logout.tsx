"use client"
import React from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';

const Logout = () => {
    const router = useRouter();
    Cookies.remove('p_token');
    // delay for visual
    setTimeout(() => {
        router.push("/")
    }, 1000);
    return (
        <main className="pb-16 pt-8">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                Logging out...
            </div>
        </main>
    )
}

export default Logout