
//渲染
'use client'
import Image from "next/image"
import Link from "next/link"
import './login.css'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterPage() {
    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">注册</h1>
                        <p className="text-balance text-muted-foreground">
                            输入邮箱来登录你的账户
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">邮箱</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
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
                            <Input id="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full">
                            登录
                        </Button>
                        <Button variant="outline" className="w-full">
                            微信登录
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        还没有账户？{" "}
                        <Link href="" className="underline">
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

export default RegisterPage;
