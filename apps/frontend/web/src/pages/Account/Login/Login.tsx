/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */

import { Button } from '@wangx-doc/shadcn-shared-ui/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@wangx-doc/shadcn-shared-ui/components/ui/form'
import { Input } from '@wangx-doc/shadcn-shared-ui/components/ui/input'
import { useToast } from '@wangx-doc/shadcn-shared-ui/hooks/use-toast'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import * as srv from '@/services'
import { CreateUserPayload } from '@/types/api'
import { encrypt } from '@/utils/crypto'

import { TaiJi } from './TaiJi'
import { World } from './World'

export function Login() {
    const form = useForm<CreateUserPayload>()
    const [inputType, setInputType] = useState<'login' | 'register'>('login')
    const navigate = useNavigate()
    const { toast } = useToast()

    const handleSubmit = async (values: CreateUserPayload) => {
        const { password } = values
        const encryptedPassword = await encrypt(password)

        if (!encryptedPassword) {
            return
        }

        try {
            const res = await srv[inputType]({
                ...values,
                password: encryptedPassword,
            })

            if (!res.data) {
                toast({
                    variant: 'destructive',
                    title: '请稍后重试',
                })
                return
            }

            if (inputType === 'login') {
                toast({
                    variant: 'success',
                    title: '登录成功',
                })

                localStorage.setItem('token', res.data.access_token)

                const redirectUrl = new URLSearchParams(window.location.search).get('redirect') || '/doc'
                navigate(redirectUrl)
            }

            if (inputType === 'register') {
                toast({
                    title: '注册成功，请前往登录',
                })
                setInputType('login')
            }
        } catch {
            toast({
                variant: 'destructive',
                title: '登录失败，请稍后重试',
            })
        }
    }

    return (
        <div className="container relative h-screen w-full flex-row items-center justify-end grid max-w-none grid-cols-2  !min-w-[1300px]">
            <div className="relative h-full flex-col bg-muted p-10 text-white dark:border-r flex">
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <svg
                        xmlns="http:www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-6 w-6"
                    >
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    协同文档
                </div>
            </div>
            <TaiJi />
            <World yi="yin" />
            <World yi="yang" />
            <div className="lg:p-8">
                <div className="flex items-center justify-center ">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold mb-8">协同文档</h1>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)}>
                                <FormField
                                    control={form.control}
                                    rules={{ required: '请输入用户名' }}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>用户名</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="请输入用户名" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    rules={{ required: '请输入密码' }}
                                    render={({ field }) => (
                                        <FormItem className="mt-2">
                                            <FormLabel>密码</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="password" placeholder="请输入密码" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full mt-4">
                                    {inputType == 'login' ? '登录' : '注册'}
                                </Button>
                            </form>
                        </Form>
                        {inputType === 'login' ? (
                            <div className="text-center text-sm">
                                没有账号?{' '}
                                <Button
                                    variant="link"
                                    onClick={() => {
                                        form.clearErrors()
                                        setInputType('register')
                                    }}
                                >
                                    注册
                                </Button>
                            </div>
                        ) : (
                            <div className="text-center text-sm">
                                已有账号?{' '}
                                <Button
                                    variant="link"
                                    onClick={() => {
                                        form.clearErrors()
                                        setInputType('login')
                                    }}
                                >
                                    登录
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
