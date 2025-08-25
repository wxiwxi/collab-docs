/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */

import { Button } from '@wangx-doc/shadcn-shared-ui/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@wangx-doc/shadcn-shared-ui/components/ui/form'
import { Input } from '@wangx-doc/shadcn-shared-ui/components/ui/input'
import { useToast } from '@wangx-doc/shadcn-shared-ui/hooks/use-toast'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import * as srv from '@/services'
import { CreateUserPayload } from '@/types/api'
import { encrypt } from '@/utils/crypto'

// 动态光效背景组件
const DynamicBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const particles: {
            x: number
            y: number
            radius: number
            color: string
            speedX: number
            speedY: number
            alpha: number
        }[] = []

        // 创建粒子
        const createParticles = () => {
            const colors = ['#4a66f1', '#f14a66', '#66f14a', '#f1c84a']

            for (let i = 0; i < 100; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    speedX: Math.random() * 0.5 - 0.25,
                    speedY: Math.random() * 0.5 - 0.25,
                    alpha: Math.random() * 0.5 + 0.1,
                })
            }
        }

        // 绘制粒子
        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // 绘制背景渐变
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
            gradient.addColorStop(0, '#000011')
            gradient.addColorStop(1, '#050520')
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // 绘制光线
            drawLightLines()

            // 绘制粒子
            particles.forEach((particle, index) => {
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
                ctx.globalAlpha = particle.alpha
                ctx.fillStyle = particle.color
                ctx.fill()

                // 更新位置
                particle.x += particle.speedX
                particle.y += particle.speedY

                // 粒子离开画布时重置
                if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
                    particles[index] = {
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        radius: Math.random() * 2 + 1,
                        color: particle.color,
                        speedX: Math.random() * 0.5 - 0.25,
                        speedY: Math.random() * 0.5 - 0.25,
                        alpha: Math.random() * 0.5 + 0.1,
                    }
                }
            })

            requestAnimationFrame(drawParticles)
        }

        // 绘制光线
        const drawLightLines = () => {
            const time = Date.now() * 0.0005

            // 绘制蓝色光线
            ctx.beginPath()
            ctx.moveTo(0, canvas.height * 0.8)
            ctx.bezierCurveTo(
                canvas.width * 0.2,
                canvas.height * (0.8 + Math.sin(time) * 0.05),
                canvas.width * 0.8,
                canvas.height * (0.8 + Math.sin(time + 1) * 0.05),
                canvas.width,
                canvas.height * 0.7
            )
            ctx.lineWidth = 2
            ctx.strokeStyle = 'rgba(66, 133, 244, 0.3)'
            ctx.stroke()

            // 绘制红色光线
            ctx.beginPath()
            ctx.moveTo(0, canvas.height * 0.75)
            ctx.bezierCurveTo(
                canvas.width * 0.3,
                canvas.height * (0.75 + Math.cos(time) * 0.03),
                canvas.width * 0.7,
                canvas.height * (0.75 + Math.cos(time + 2) * 0.03),
                canvas.width,
                canvas.height * 0.65
            )
            ctx.lineWidth = 1.5
            ctx.strokeStyle = 'rgba(234, 67, 53, 0.2)'
            ctx.stroke()
        }

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            particles.length = 0
            createParticles()
        }

        createParticles()
        drawParticles()

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
}

// 主组件
export function PreferLogin() {
    const form = useForm<CreateUserPayload>()
    const [inputType, setInputType] = useState<'login' | 'register'>('login')
    const navigate = useNavigate()
    const { toast } = useToast()
    const [isSignUp, setIsSignUp] = useState(false)

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
                setIsSignUp(false)
            }
        } catch {
            toast({
                variant: 'destructive',
                title: '登录失败，请稍后重试',
            })
        }
    }

    const toggleSignMode = () => {
        form.clearErrors()
        setIsSignUp(!isSignUp)
        setInputType(isSignUp ? 'login' : 'register')
    }

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-black">
            <DynamicBackground />

            {/* 内容容器 */}
            <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
                <div className="w-[420px] max-w-full relative">
                    {/* 玻璃面板效果 - 增强磨砂效果 */}
                    <div className="rounded-3xl backdrop-blur-lg backdrop-saturate-150 backdrop-filter bg-white/5 border border-white/10 shadow-xl p-6 sm:p-8 text-white before:absolute before:inset-0 before:z-[-1] before:bg-gradient-to-r before:from-white/5 before:to-transparent before:rounded-3xl">
                        {/* 切换按钮 */}
                        <div className="flex rounded-2xl bg-black/20 backdrop-blur-md p-1 mb-4 sm:mb-6 border border-white/10">
                            <button
                                className={`flex-1 py-1.5 sm:py-2 text-sm font-medium rounded-xl transition-all ${!isSignUp ? 'bg-gradient-to-r from-blue-500/80 to-indigo-600/80 shadow-md' : 'hover:bg-white/10'}`}
                                onClick={() => {
                                    if (isSignUp) toggleSignMode()
                                }}
                            >
                                登录
                            </button>
                            <button
                                className={`flex-1 py-1.5 sm:py-2 text-sm font-medium rounded-xl transition-all ${isSignUp ? 'bg-gradient-to-r from-blue-500/80 to-indigo-600/80 shadow-md' : 'hover:bg-white/10'}`}
                                onClick={() => {
                                    if (!isSignUp) toggleSignMode()
                                }}
                            >
                                注册
                            </button>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-white">
                            {isSignUp ? '创建新账户' : '欢迎回来'}
                        </h2>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3 sm:space-y-4">
                                <FormField
                                    control={form.control}
                                    rules={{ required: '请输入用户名' }}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white/90 text-sm sm:text-base">用户名</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="请输入用户名"
                                                    className="h-9 sm:h-10 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 backdrop-blur-sm rounded-xl"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    rules={{ required: '请输入密码' }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white/90 text-sm sm:text-base">密码</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    placeholder="请输入密码"
                                                    className="h-9 sm:h-10 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 backdrop-blur-sm rounded-xl"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full h-9 sm:h-10 mt-4 sm:mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all border-0 backdrop-blur-sm backdrop-filter shadow-lg relative overflow-hidden before:absolute before:inset-0 before:bg-white/10 before:z-[-1] before:opacity-0 hover:before:opacity-20 before:transition-opacity rounded-xl"
                                >
                                    {inputType === 'login' ? '登录' : '注册'}
                                </Button>
                            </form>
                        </Form>

                        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-white/70">
                            {!isSignUp ? (
                                <>
                                    还没有账号?{' '}
                                    <Button
                                        variant="link"
                                        className="text-blue-400 hover:text-blue-300 p-0 text-xs sm:text-sm"
                                        onClick={toggleSignMode}
                                    >
                                        立即注册
                                    </Button>
                                </>
                            ) : (
                                <>
                                    已有账号?{' '}
                                    <Button
                                        variant="link"
                                        className="text-blue-400 hover:text-blue-300 p-0 text-xs sm:text-sm"
                                        onClick={toggleSignMode}
                                    >
                                        登录
                                    </Button>
                                </>
                            )}
                        </div>

                        <div className="mt-4 sm:mt-8 text-xs text-center text-white/50">继续即表示您同意我们的服务条款和隐私政策</div>
                    </div>

                    {/* Logo和标题 */}
                    <div className="absolute -top-16 sm:-top-20 left-0 right-0 text-center">
                        <div className="inline-flex items-center text-xl sm:text-2xl font-bold text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-6 w-6 sm:h-8 sm:w-8"
                            >
                                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                            </svg>
                            协同文档
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
