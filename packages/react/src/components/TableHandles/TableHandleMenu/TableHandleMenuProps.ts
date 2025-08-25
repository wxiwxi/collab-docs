/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import {
    DefaultBlockSchema,
    DefaultInlineContentSchema,
    DefaultStyleSchema,
    InlineContentSchema,
    SpecificBlock,
    StyleSchema,
} from '@wangx-doc/core'

export type TableHandleMenuProps<I extends InlineContentSchema = DefaultInlineContentSchema, S extends StyleSchema = DefaultStyleSchema> = {
    orientation: 'row' | 'column'
    block: SpecificBlock<{ table: DefaultBlockSchema['table'] }, 'table', I, S>
    index: number
}
