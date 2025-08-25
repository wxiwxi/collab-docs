/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import type { WangxDocEditor } from '@wangx-doc/core'
import { useEffect } from 'react'

import { useWangxDocContext } from '../editor/WangxDocContext'

export function useEditorSelectionChange(callback: () => void, editor?: WangxDocEditor<any, any, any>) {
    const editorContext = useWangxDocContext()
    if (!editor) {
        editor = editorContext?.editor
    }

    useEffect(() => {
        if (!editor) {
            throw new Error("'editor' is required, either from WangxDocContext or as a function argument")
        }
        return editor.onSelectionChange(callback)
    }, [callback, editor])
}
