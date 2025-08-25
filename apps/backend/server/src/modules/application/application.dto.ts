/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */

import { z } from 'zod'

/**
 * 创建应用的数据传输对象
 */
export const createApplicationSchema = z
    .object({
        type: z.enum(['vanilla', 'react', 'vue']),
        name: z.string(),
    })
    .required()

export type CreateApplicationDto = z.infer<typeof createApplicationSchema>

/**
 * 删除应用的数据传输对象
 */
export const deleteApplicationSchema = z
    .object({
        appId: z.string(),
    })
    .required()

export type DeleteApplicationDto = z.infer<typeof deleteApplicationSchema>
