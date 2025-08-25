/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { BlockSchema, formatKeyboardShortcut, InlineContentSchema, WangxDocEditor, StyleSchema } from '@wangx-doc/core'
import { useCallback, useMemo, useState } from 'react'
import { RiLink } from 'react-icons/ri'

import { useComponentsContext } from '../../../editor/ComponentsContext'
import { useEditorContentOrSelectionChange } from '../../../hooks/useEditorContentOrSelectionChange'
import { useWangxDocEditor } from '../../../hooks/useWangxDocEditor'
import { useSelectedBlocks } from '../../../hooks/useSelectedBlocks'
import { useDictionary } from '../../../i18n/dictionary'
import { EditLinkMenuItems } from '../../LinkToolbar/EditLinkMenuItems'

function checkLinkInSchema(editor: WangxDocEditor<BlockSchema, any, StyleSchema>): editor is WangxDocEditor<
    BlockSchema,
    {
        link: {
            type: 'link'
            propSchema: any
            content: 'styled'
        }
    },
    StyleSchema
> {
    return 'link' in editor.schema.inlineContentSchema && editor.schema.inlineContentSchema['link'] === 'link'
}

export const CreateLinkButton = () => {
    const editor = useWangxDocEditor<BlockSchema, InlineContentSchema, StyleSchema>()
    const Components = useComponentsContext()!
    const dict = useDictionary()

    const linkInSchema = checkLinkInSchema(editor)

    const selectedBlocks = useSelectedBlocks(editor)

    const [url, setUrl] = useState<string>(editor.getSelectedLinkUrl() || '')
    const [text, setText] = useState<string>(editor.getSelectedText())

    useEditorContentOrSelectionChange(() => {
        setText(editor.getSelectedText() || '')
        setUrl(editor.getSelectedLinkUrl() || '')
    }, editor)

    const update = useCallback(
        (url: string, text: string) => {
            editor.createLink(url, text)
            editor.focus()
        },
        [editor]
    )

    const show = useMemo(() => {
        if (!linkInSchema) {
            return false
        }

        for (const block of selectedBlocks) {
            if (block.content === undefined) {
                return false
            }
        }

        return true
    }, [linkInSchema, selectedBlocks])

    if (!show || !('link' in editor.schema.inlineContentSchema) || !editor.isEditable) {
        return null
    }

    return (
        <Components.Generic.Popover.Root>
            <Components.Generic.Popover.Trigger>
                {/* TODO: hide tooltip on click */}
                <Components.FormattingToolbar.Button
                    className={'bn-button'}
                    data-test="createLink"
                    label={dict.formatting_toolbar.link.tooltip}
                    mainTooltip={dict.formatting_toolbar.link.tooltip}
                    secondaryTooltip={formatKeyboardShortcut(dict.formatting_toolbar.link.secondary_tooltip, dict.generic.ctrl_shortcut)}
                    icon={<RiLink />}
                />
            </Components.Generic.Popover.Trigger>
            <Components.Generic.Popover.Content className={'bn-popover-content bn-form-popover'} variant={'form-popover'}>
                <EditLinkMenuItems url={url} text={text} editLink={update} />
            </Components.Generic.Popover.Content>
        </Components.Generic.Popover.Root>
    )
}
