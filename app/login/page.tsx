
//如果不是静态的，就要渲染
'use client'
import Image from "next/image"
import Link from "next/link"
import './login.css'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, {useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
// npm i --save-dev @types/js-cookie
import Cookies from 'js-cookie';
import {useFormState} from "react-hook-form";

/**
 * 登录页面
 * tip：一开始都敲完整点，然后再慢慢抽取，这样会对代码有更深的理解。
 * @constructor
 */
export function LoginPage() {
    //创建状态
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    //处理输入变化
    const handleEmailChange=(event:React.ChangeEvent<HTMLInputElement>)=>setEmail(event.target.value);
    const handlePasswordChange=(event:React.ChangeEvent<HTMLInputElement>)=>setPassword(event.target.value);

    const router = useRouter();
    //处理表单提交
    const handleSubmit = async(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();//防止表单默认提交

        //构建请求体
        const requestBody={
            userName: email,
            password: password,
        };

        try{
            //发送post请求
            const response = await axios.post('http://localhost:5000/auth/user/doLogin',requestBody);
            console.log('response',response);
            const { tokenValue } = response.data.data;//注意套娃
            Cookies.set('satoken', tokenValue, { expires: 7 }); // Token在7天后过期
            console.log(Cookies.get('satoken')); // 应该打印出tokenValue
            router.push('/forgot-password');
            //axios直接返回了数据，不需要转换json
            console.log('登录成功',response.data);

        }catch (error){
            //打印错误
            if(axios.isAxiosError(error)){
                // 可选链，如果error.response为undefined或者null，也可以正常打印错误。不然给报错报错了，直接套娃。
                console.error('请求失败',error.response?.data);
            }else{
                console.error('未知错误',error);
            }
        }
    };



    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">登录</h1>
                        <p className="text-balance text-muted-foreground">
                            输入邮箱来登录你的账户
                        </p>
                    </div>
                    <form  onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">邮箱</Label>
                            <Input
                                id="email"
                                type="text"
                                placeholder="m@example.com"
                                required
                                value={email} //
                                onChange={handleEmailChange} // onChange，用于事件变换
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">密码</Label>
                                <Link
                                    href="/forgot-password"
                                    className="ml-auto inline-block text-sm underline"
                                >
                                    忘记密码？
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <Button type="submit" className="w-full" >
                            登录
                        </Button>
                        <Button variant="outline" className="w-full">
                            微信登录
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        还没有账户？{" "}
                        <Link href="/register" className="underline">
                            注册
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block image-container">
                <Image
                    src="/next.svg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale custom-object-position"
                />
            </div>
        </div>
    )
}

export default LoginPage;
