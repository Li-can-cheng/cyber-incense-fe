import React from 'react'; // TS项目中引入React
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

// 定义FontSans函数返回值的类型，假设这是基于官方文档或类型定义文件
interface FontSansType {
    variable: string;
}

const fontSans: FontSansType = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

// 定义RootLayout组件的Props类型
interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en" suppressHydrationWarning>
        <head ><title></title></head>
        <body
            className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
            )}
        >
        {children}
        </body>
        </html>
    );
};

export default RootLayout;
