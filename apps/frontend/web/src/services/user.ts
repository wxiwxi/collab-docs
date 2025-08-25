/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */

import { CurrentUserRes, LoginPayload, LoginRes } from '@/types/api'
import { request } from '@/utils/request'

/**
 * 用户登录
 * @param data
 * @returns
 */
export const login = async (data: LoginPayload): Promise<LoginRes> => {
    return await request.post('/auth/login', data)
}

/**
 * 获取当前用户信息
 * @returns
 */
export const currentUser = async (): Promise<CurrentUserRes> => {
    return await request.get('/currentUser')
}

/**
 * 用户注册
 * @param data
 * @returns
 */
export const register = async (data: { username: string; password: string }) => {
    return await request.post('/user/register', data)
}

/**
 * 用户退出登录
 * @returns
 */
export const logout = async () => {
    return await request.post('/user/logout')
}
