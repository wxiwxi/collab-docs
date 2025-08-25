/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { Block } from '../blocks/defaultBlocks'
import { BlockSchema, InlineContentSchema, StyleSchema } from '../schema/index'

export type TextCursorPosition<BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema> = {
    block: Block<BSchema, I, S>
    prevBlock: Block<BSchema, I, S> | undefined
    nextBlock: Block<BSchema, I, S> | undefined
    parentBlock: Block<BSchema, I, S> | undefined
}
