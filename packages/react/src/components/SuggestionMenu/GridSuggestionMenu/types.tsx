/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { DefaultGridSuggestionItem } from '@wangx-doc/core'

import { SuggestionMenuProps } from '../types'

export type DefaultReactGridSuggestionItem = DefaultGridSuggestionItem & {
    icon?: JSX.Element
}

export type GridSuggestionMenuProps<T> = SuggestionMenuProps<T> & {
    columns: number
}
