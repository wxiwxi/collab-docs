/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import type { Dictionary } from '../../i18n/dictionary'

export type DefaultSuggestionItem = {
    key: keyof Dictionary['slash_menu']
    title: string
    onItemClick: () => void
    subtext?: string
    badge?: string
    aliases?: string[]
    group?: string
}
