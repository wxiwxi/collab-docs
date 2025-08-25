/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import {
    BlockSchema,
    DefaultBlockSchema,
    DefaultInlineContentSchema,
    DefaultStyleSchema,
    InlineContentSchema,
    WangxDocEditor,
    WangxDocSchema,
    StyleSchema,
} from '@wangx-doc/core'

import { useWangxDocContext } from '../editor/WangxDocContext'

/**
 * Get the WangxDocEditor instance from the nearest WangxDocContext provider
 * @param _schema: optional, pass in the schema to return type-safe WangxDocEditor if you're using a custom schema
 */
export function useWangxDocEditor<
    BSchema extends BlockSchema = DefaultBlockSchema,
    ISchema extends InlineContentSchema = DefaultInlineContentSchema,
    SSchema extends StyleSchema = DefaultStyleSchema,
>(_schema?: WangxDocSchema<BSchema, ISchema, SSchema>): WangxDocEditor<BSchema, ISchema, SSchema> {
    const context = useWangxDocContext(_schema)

    if (!context?.editor) {
        throw new Error('useWangxDocEditor was called outside of a WangxDocContext provider or WangxDocView component')
    }

    return context.editor
}
