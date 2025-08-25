/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { Dictionary } from '@wangx-doc/core'

import { useWangxDocContext } from '../editor/WangxDocContext'

export function useDictionary(): Dictionary {
    const ctx = useWangxDocContext()
    return ctx!.editor!.dictionary
}
