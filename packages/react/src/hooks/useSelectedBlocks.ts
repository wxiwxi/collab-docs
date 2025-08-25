/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { Block, BlockSchema, InlineContentSchema, WangxDocEditor, StyleSchema } from '@wangx-doc/core'
import { useState } from 'react'

import { useWangxDocContext } from '../editor/WangxDocContext'
import { useEditorContentOrSelectionChange } from './useEditorContentOrSelectionChange'

export function useSelectedBlocks<BSchema extends BlockSchema, ISchema extends InlineContentSchema, SSchema extends StyleSchema>(
    editor?: WangxDocEditor<BSchema, ISchema, SSchema>
) {
    const editorContext = useWangxDocContext<BSchema, ISchema, SSchema>()
    if (!editor) {
        editor = editorContext?.editor
    }

    if (!editor) {
        throw new Error("'editor' is required, either from WangxDocContext or as a function argument")
    }

    const e = editor

    const [selectedBlocks, setSelectedBlocks] = useState<Block<BSchema, ISchema, SSchema>[]>(
        () => e.getSelection()?.blocks || [e.getTextCursorPosition().block]
    )

    useEditorContentOrSelectionChange(() => setSelectedBlocks(e.getSelection()?.blocks || [e.getTextCursorPosition().block]), e)

    return selectedBlocks
}
