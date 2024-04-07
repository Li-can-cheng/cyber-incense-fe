// pages/index.tsx
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';//next/router改为next/navigation

const HomePage = () => {
    const router = useRouter();

    //router发生变化的时候执行，第一次进入页面也会执行
    useEffect(() => {
        router.replace('/login');
    }, [router]);

    return <div>Redirecting...</div>;
};

export default HomePage;
