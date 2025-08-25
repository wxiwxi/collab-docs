/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { useEffect } from 'react'

import { useWangxDocEditor } from './useWangxDocEditor'

export function useOnUploadEnd(callback: (blockId?: string) => void) {
    const editor = useWangxDocEditor()

    useEffect(() => {
        return editor.onUploadEnd(callback)
    }, [callback, editor])
}
