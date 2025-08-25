/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { BlockSchema, getDefaultEmojiPickerItems, InlineContentSchema, StyleSchema, WangxDocEditor } from '@wangx-doc/core'

import { DefaultReactGridSuggestionItem } from './types'

export async function getDefaultReactEmojiPickerItems<BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    editor: WangxDocEditor<BSchema, I, S>,
    query: string
): Promise<DefaultReactGridSuggestionItem[]> {
    return (await getDefaultEmojiPickerItems(editor, query)).map(({ id, onItemClick }) => ({
        id,
        onItemClick,
        icon: id as any,
    }))
}
