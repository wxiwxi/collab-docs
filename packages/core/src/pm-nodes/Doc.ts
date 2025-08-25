/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { Node } from '@tiptap/core'

export const Doc = Node.create({
    name: 'doc',
    topNode: true,
    content: 'blockGroup',
})
