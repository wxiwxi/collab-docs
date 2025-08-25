/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { Block } from '../blocks/defaultBlocks'
import { BlockSchema, InlineContentSchema, StyleSchema } from '../schema/index'

export type Selection<BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema> = {
    blocks: Block<BSchema, I, S>[]
}
