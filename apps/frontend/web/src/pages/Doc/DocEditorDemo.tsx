/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import {
    defaultBlockSpecs,
    defaultInlineContentSpecs,
    defaultStyleSpecs,
    filterSuggestionItems,
    locales,
    WangxDocEditor,
    WangxDocSchema,
} from '@wangx-doc/core'
import { DefaultReactSuggestionItem, SuggestionMenuController, useCreateWangxDoc } from '@wangx-doc/react'
// import {} from '@wangx-doc/react'
import { WangxDocView } from '@wangx-doc/shadcn'

import { Mention } from '@/blocks/mention'

const schema = WangxDocSchema.create({
    inlineContentSpecs: {
        // built-in inline content specs
        ...defaultInlineContentSpecs,
        mention: Mention,
    },
    blockSpecs: {
        // built-in block specs
        ...defaultBlockSpecs,
    },
    styleSpecs: {
        // built-in style specs
        ...defaultStyleSpecs,
    },
})

const getMentionMenuItems = (editor: WangxDocEditor) => {
    const menus = [
        {
            icon: <span>👽</span>,
            title: '小李',
        },
        {
            icon: <span>🔭</span>,
            title: '小张',
        },
        {
            icon: <span>🥤</span>,
            title: '小明',
        },
    ]
    return menus.map(menu => ({
        ...menu,
        onItemClick: () => {
            editor.insertInlineContent([
                {
                    // @ts-expect-error mention
                    type: 'mention',
                    props: {
                        id: 'wangx',
                        title: menu.title,
                        icon: menu.icon,
                    },
                },
                ' ',
            ])
        },
    })) as DefaultReactSuggestionItem[]
}

export function DocEditorDemo() {
    // tiptap editor
    // const editor = useEditor()   @tiptap/react
    const editor = useCreateWangxDoc({
        schema, // 整个编辑器的 schema
        dictionary: locales.zh, // 语言包
        initialContent: undefined, // 初始内容
    })
    return (
        <WangxDocView editor={editor}>
            <SuggestionMenuController
                triggerCharacter="@"
                getItems={async query => {
                    // @ts-expect-error getItems type
                    return filterSuggestionItems(getMentionMenuItems(editor), query)
                }}
            />
        </WangxDocView>
    )
}
