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
    StyleSchema,
    WangxDocEditor,
    WangxDocSchema,
} from '@wangx-doc/core'
import { createContext, useContext, useState } from 'react'

type WangxDocContextValue<
    BSchema extends BlockSchema = DefaultBlockSchema,
    ISchema extends InlineContentSchema = DefaultInlineContentSchema,
    SSchema extends StyleSchema = DefaultStyleSchema,
> = {
    setContentEditableProps?: ReturnType<typeof useState<Record<string, any>>>[1] // copy type of setXXX from useState
    editor?: WangxDocEditor<BSchema, ISchema, SSchema>
    colorSchemePreference?: 'light' | 'dark'
}

export const WangxDocContext = createContext<WangxDocContextValue | undefined>(undefined)

/**
 * Get the WangxDocContext instance from the nearest WangxDocContext provider
 * @param _schema: optional, pass in the schema to return type-safe Context if you're using a custom schema
 */
export function useWangxDocContext<
    BSchema extends BlockSchema = DefaultBlockSchema,
    ISchema extends InlineContentSchema = DefaultInlineContentSchema,
    SSchema extends StyleSchema = DefaultStyleSchema,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(_schema?: WangxDocSchema<BSchema, ISchema, SSchema>): WangxDocContextValue<BSchema, ISchema, SSchema> | undefined {
    const context = useContext(WangxDocContext) as any

    return context
}
