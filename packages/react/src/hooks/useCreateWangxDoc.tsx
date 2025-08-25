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
    WangxDocEditorOptions,
} from '@wangx-doc/core'
import { DependencyList, useMemo } from 'react'

/**
 * Main hook for importing a WangxDoc editor into a React project
 *
 * TODO: document in docs
 */
export const useCreateWangxDoc = <
    BSchema extends BlockSchema = DefaultBlockSchema,
    ISchema extends InlineContentSchema = DefaultInlineContentSchema,
    SSchema extends StyleSchema = DefaultStyleSchema,
>(
    options: Partial<WangxDocEditorOptions<BSchema, ISchema, SSchema>> = {},
    deps: DependencyList = []
) => {
    return useMemo(() => {
        const editor = WangxDocEditor.create<BSchema, ISchema, SSchema>(options)
        if (window) {
            // for testing / dev purposes
            ;(window as any).ProseMirror = editor._tiptapEditor
        }
        return editor
    }, deps)
}

/**
 * @deprecated use useCreateWangxDoc instead
 */
export const useWangxDoc = useCreateWangxDoc
