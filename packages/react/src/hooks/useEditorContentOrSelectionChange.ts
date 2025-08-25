/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import type { WangxDocEditor } from '@wangx-doc/core'

import { useEditorChange } from './useEditorChange'
import { useEditorSelectionChange } from './useEditorSelectionChange'

export function useEditorContentOrSelectionChange(callback: () => void, editor?: WangxDocEditor<any, any, any>) {
    useEditorChange(callback, editor)
    useEditorSelectionChange(callback, editor)
}
