/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */

import { z } from 'zod'

/**
 * 创建应用的数据传输对象
 */
export const createPageSchema = z
    .object({
        emoji: z.string(),
        title: z.string(),
    })
    .required()

export type CreatePageDto = z.infer<typeof createPageSchema>

/**
 * 删除应用的数据传输对象
 */
export const deletePageSchema = z
    .object({
        pageId: z.string(),
    })
    .required()

export type DeletePageDto = z.infer<typeof deletePageSchema>
