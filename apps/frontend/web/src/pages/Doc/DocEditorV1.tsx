/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import '@wangx-doc/shadcn/style.css'

import {
    Block,
    defaultBlockSpecs,
    defaultInlineContentSpecs,
    filterSuggestionItems,
    locales,
    PartialBlock,
    WangxDocEditor,
    WangxDocSchema,
} from '@wangx-doc/core'
import { DefaultReactSuggestionItem, SuggestionMenuController, useCreateWangxDoc } from '@wangx-doc/react'
import { WangxDocView } from '@wangx-doc/shadcn'
import { useEffect, useMemo } from 'react'
// import { yXmlFragmentToProseMirrorFragment, yXmlFragmentToProseMirrorRootNode } from 'y-prosemirror'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

import { Mention } from '@/blocks/mention'

import { cursorRender } from './cursorRender'

interface DocEditorProps {
    pageId: string
    initialContent?: PartialBlock[]
    doc: Y.Doc
    provider: WebsocketProvider
}

const pages = [
    {
        id: '1',
        name: 'Notion 与飞书文档协同方案精析，字节前端专家传授百万年薪架构师级项目重难点',
        url: '#',
        emoji: '🔭',
        links: [{ id: '', name: '服务端渲染（SSR）与前后端同构技术原理揭秘，字节前端专家带你光速进阶全栈', emoji: '🐚', url: '#' }],
    },
    {
        id: '2',
        name: 'Ant Design 组件库架构设计与开发实践，高级前端专家带你掌握基建面试技巧',
        url: '#',
        emoji: '🔦',
    },
    {
        id: '3',
        name: 'Taro、Tauri 多端开发实践与原理剖析，《Taro 多端开发权威指南》作者带你悟透多端框架原理',
        url: '#',
        emoji: '👽',
    },
    {
        id: '4',
        name: 'Nest 服务端开发与原理深度剖析，《NestJS 实战》作者带你领略框架设计之美',
        url: '#',
        emoji: '🥤',
    },
    {
        id: '5',
        name: 'Babel 与编译原理详解，字节高级前端专家带你从零实现飞书表格公式执行器',
        url: '#',
        emoji: '🚀',
    },
    {
        id: '6',
        name: '服务端渲染（SSR）与前后端同构技术原理揭秘，字节前端专家带你光速进阶全栈',
        url: '#',
        emoji: '🐚',
    },
]

const schema = WangxDocSchema.create({
    inlineContentSpecs: {
        ...defaultInlineContentSpecs,
        mention: Mention,
    },
    blockSpecs: {
        ...defaultBlockSpecs,
    },
})

// Function which gets all users for the mentions menu.
const getMentionMenuItems = (editor: WangxDocEditor, pageId?: string): DefaultReactSuggestionItem[] => {
    const items: DefaultReactSuggestionItem[] = []

    for (const page of pages) {
        if (page.id !== pageId) {
            items.push({
                icon: <span>{page.emoji}</span>,
                title: page.name,
                onItemClick: () => {
                    editor.insertInlineContent([
                        {
                            // @ts-expect-error mention type
                            type: 'mention',
                            props: {
                                id: page.id,
                                title: page.name,
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

async function saveToStorage(pageId: string, jsonBlocks: Block[]) {
    const storageString = localStorage.getItem('allPages')
    if (!storageString) {
        localStorage.setItem('allPages', JSON.stringify({ [pageId]: { pageId, blocks: jsonBlocks } }))
        return
    }
    const stored = JSON.parse(storageString)
    localStorage.setItem('allPages', JSON.stringify({ ...stored, [pageId]: { pageId, blocks: jsonBlocks } }))
}

export function DocEditor(props: DocEditorProps) {
    const { pageId, initialContent, doc, provider } = props

    const page = useMemo(() => {
        return pages.find(page => page.id === pageId)
    }, [pageId])

    const userName = useMemo(() => {
        const storedName = sessionStorage.getItem('wangxdoc-user-name')
        if (storedName) {
            return storedName
        } else {
            const randomName = `wangx-${Math.floor(Math.random() * 1000)}`
            sessionStorage.setItem('wangxdoc-user-name', randomName)
            return randomName
        }
    }, [])

    const randomColor = useMemo(() => {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
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
                    name: userName,
                    color: randomColor,
                },
                renderCursor: cursorRender,
            },
        },
        [pageId, provider, doc, initialContent]
    )

    useEffect(() => {
        // 借鉴了 ssr 的实现：https://github.com/TypeCellOS/BlockNote/blob/main/packages/server-util/src/context/ServerBlockNoteEditor.ts
        // const json = yXmlFragmentToProseMirrorFragment(doc.getXmlFragment(`document-store-${pageId}`), editor.pmSchema)
        // // console.log('🚀 ~ useEffect ~ json:', json)
        // console.log('🚀 ~ useEffect ~ json:', editor.document)
    }, [])

    // 加载缓存的文档内容
    useEffect(() => {
        if (!page?.id) {
            return
        }

        editor.onChange(editor => {
            saveToStorage(page?.id, editor.document as Block[])
        })
    }, [page?.id, editor])

    return (
        <WangxDocView editor={editor} theme="light">
            <SuggestionMenuController
                triggerCharacter="@"
                getItems={async query => {
                    // @ts-expect-error getItems type
                    return filterSuggestionItems(getMentionMenuItems(editor, page?.id), query)
                }}
            />
        </WangxDocView>
    )
}
