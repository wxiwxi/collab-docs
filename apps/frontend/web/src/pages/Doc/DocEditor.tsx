/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import '@wangx-doc/shadcn/style.css'

import {
    defaultBlockSpecs,
    defaultInlineContentSpecs,
    filterSuggestionItems,
    insertOrUpdateBlock,
    locales,
    WangxDocEditor,
    WangxDocSchema,
    PartialBlock,
} from '@wangx-doc/core'
import { DefaultReactSuggestionItem, getDefaultReactSlashMenuItems, SuggestionMenuController, useCreateWangxDoc } from '@wangx-doc/react'
import { WangxDocView } from '@wangx-doc/shadcn'
import { useQuery } from '@tanstack/react-query'
import { Sparkles } from 'lucide-react'
import PubSub from 'pubsub-js'
import { useEffect, useMemo } from 'react'
// import { yXmlFragmentToProseMirrorFragment, yXmlFragmentToProseMirrorRootNode } from 'y-prosemirror'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

import { AI } from '@/blocks/ai'
import { Mention } from '@/blocks/mention'
import { BasicAIChat } from '@/components/BasicAIChat'
import * as srv from '@/services'
import { User } from '@/types/api'

import { cursorRender } from './cursorRender'

interface DocEditorProps {
    pageId: string
    initialContent?: PartialBlock[]
    doc: Y.Doc
    provider: WebsocketProvider
}

const schema = WangxDocSchema.create({
    inlineContentSpecs: {
        ...defaultInlineContentSpecs,
        mention: Mention,
    },
    blockSpecs: {
        ...defaultBlockSpecs,
        ai: AI,
    },
})

// Function which gets all users for the mentions menu.
const getMentionMenuItems = async (editor: WangxDocEditor, pageId?: string): Promise<DefaultReactSuggestionItem[]> => {
    const items: DefaultReactSuggestionItem[] = []
    // 获取远程页面
    const res = await srv.fetchPageList()
    const pages = res.data.pages

    for (const page of pages) {
        if (page.pageId !== pageId) {
            items.push({
                icon: <span>{page.emoji}</span>,
                title: page.title,
                onItemClick: () => {
                    editor.insertInlineContent([
                        {
                            // @ts-expect-error mention type
                            type: 'mention',
                            props: {
                                id: page.pageId,
                                title: page.title,
                                icon: page.emoji,
                            },
                        },
                        ' ', // add a space after the mention
                    ])
                },
            })
        }
    }

    return items
}

// Slash menu item to insert an Alert block
const insertAI = (editor: typeof schema.WangxDocEditor) => ({
    title: 'wangx AI',
    subtext: 'WangX AI，让进取的人更具职业价值',
    onItemClick: () => {
        const aiAnchorBlock = insertOrUpdateBlock(editor, {
            type: 'paragraph',
        })
        const { id: aiAnchorBlockId } = aiAnchorBlock

        PubSub.publishSync('ai-inserted', aiAnchorBlockId)
    },
    aliases: ['alert', 'notification', 'emphasize', 'warning', 'error', 'info', 'success'],
    icon: <Sparkles color="#6B45FF" size={18} />,
})

export function DocEditor(props: DocEditorProps) {
    const { pageId, doc, provider } = props

    const { data: currentUser } = useQuery<User>({
        queryKey: ['currentUser'],
    })

    // const userName = useMemo(() => {
    //     const storedName = sessionStorage.getItem('wangxdoc-user-name')
    //     if (storedName) {
    //         return storedName
    //     } else {
    //         const randomName = `wangx-${Math.floor(Math.random() * 1000)}`
    //         sessionStorage.setItem('wangxdoc-user-name', randomName)
    //         return randomName
    //     }
    // }, [])

    const randomColor = useMemo(() => {
        const storedColor = sessionStorage.getItem('wangxdoc-user-color')
        if (storedColor) {
            return storedColor
        }
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        const color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
        sessionStorage.setItem('wangxdoc-user-color', color)
        return color
    }, [])

    const editor = useCreateWangxDoc(
        {
            schema,
            dictionary: locales.zh,
            // initialContent,
            collaboration: {
                // The Yjs Provider responsible for transporting updates:
                provider,
                // Where to store data in the Y.Doc:
                fragment: doc.getXmlFragment(`document-store-${pageId}`),
                // Information (name and color) for this user:
                user: {
                    name: currentUser?.username ?? '',
                    color: randomColor,
                },
                renderCursor: cursorRender,
            },
        },
        [pageId, provider, doc, currentUser]
    )

    useEffect(() => {
        // 借鉴了 ssr 的实现：https://github.com/TypeCellOS/BlockNote/blob/main/packages/server-util/src/context/ServerBlockNoteEditor.ts
        // const json = yXmlFragmentToProseMirrorFragment(doc.getXmlFragment(`document-store-${pageId}`), editor.pmSchema)
        // // console.log('🚀 ~ useEffect ~ json:', json)
        // console.log('🚀 ~ useEffect ~ json:', editor.document)
    }, [])

    return (
        <WangxDocView editor={editor} theme="light" slashMenu={false}>
            <SuggestionMenuController
                triggerCharacter="@"
                getItems={async query => {
                    // @ts-expect-error getItems type
                    const items = await getMentionMenuItems(editor, pageId)
                    return filterSuggestionItems(items, query)
                }}
            />
            {/* Replaces the default Slash Menu. */}
            <SuggestionMenuController
                triggerCharacter="/"
                getItems={async query =>
                    // Gets all default slash menu items and `insertAI` item.
                    filterSuggestionItems([insertAI(editor), ...getDefaultReactSlashMenuItems(editor)], query)
                }
            />
            {/* @ts-expect-error editor schema type fix */}
            <BasicAIChat editor={editor} />
        </WangxDocView>
    )
}
