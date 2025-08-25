/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { WangxDocEditor, StyleSchema } from '@wangx-doc/core'
import { useState } from 'react'

import { useWangxDocContext } from '../editor/WangxDocContext'
import { useEditorChange } from './useEditorChange'
import { useEditorSelectionChange } from './useEditorSelectionChange'

export function useActiveStyles<T extends StyleSchema>(editor?: WangxDocEditor<any, any, T>) {
    const editorContext = useWangxDocContext<any, any, T>()
    if (!editor) {
        editor = editorContext?.editor
    }

    if (!editor) {
        throw new Error("'editor' is required, either from WangxDocContext or as a function argument")
    }

    const e = editor

    const [styles, setStyles] = useState(() => e.getActiveStyles())

    // Updates state on editor content change.
    useEditorChange(() => {
        setStyles(e.getActiveStyles())
    }, e)

    // Updates state on selection change.
    useEditorSelectionChange(() => {
        setStyles(e.getActiveStyles())
    }, e)

    return styles
}
