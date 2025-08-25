/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import {
    BlockSchema,
    DefaultBlockSchema,
    DefaultInlineContentSchema,
    DefaultStyleSchema,
    filenameFromURL,
    InlineContentSchema,
    StyleSchema,
} from '@wangx-doc/core'
import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'

import { useComponentsContext } from '../../../editor/ComponentsContext'
import { useWangxDocEditor } from '../../../hooks/useWangxDocEditor'
import { useDictionary } from '../../../i18n/dictionary'
import { FilePanelProps } from '../FilePanelProps'

export const EmbedTab = <
    B extends BlockSchema = DefaultBlockSchema,
    I extends InlineContentSchema = DefaultInlineContentSchema,
    S extends StyleSchema = DefaultStyleSchema,
>(
    props: FilePanelProps<I, S>
) => {
    const Components = useComponentsContext()!
    const dict = useDictionary()

    const { block } = props

    const editor = useWangxDocEditor<B, I, S>()

    const [currentURL, setCurrentURL] = useState<string>('')

    const handleURLChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setCurrentURL(event.currentTarget.value)
    }, [])

    const handleURLEnter = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                event.preventDefault()
                editor.updateBlock(block, {
                    props: {
                        name: filenameFromURL(currentURL),
                        url: currentURL,
                    } as any,
                })
            }
        },
        [editor, block, currentURL]
    )

    const handleURLClick = useCallback(() => {
        editor.updateBlock(block, {
            props: {
                name: filenameFromURL(currentURL),
                url: currentURL,
            } as any,
        })
    }, [editor, block, currentURL])

    return (
        <Components.FilePanel.TabPanel className={'bn-tab-panel'}>
            <Components.FilePanel.TextInput
                className={'bn-text-input'}
                placeholder={dict.file_panel.embed.url_placeholder}
                value={currentURL}
                onChange={handleURLChange}
                onKeyDown={handleURLEnter}
                data-test={'embed-input'}
            />
            <Components.FilePanel.Button className={'bn-button'} onClick={handleURLClick} data-test="embed-input-button">
                {dict.file_panel.embed.embed_button[block.type] || dict.file_panel.embed.embed_button['file']}
            </Components.FilePanel.Button>
        </Components.FilePanel.TabPanel>
    )
}
