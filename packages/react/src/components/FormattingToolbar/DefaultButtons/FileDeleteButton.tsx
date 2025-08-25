/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import {
    BlockSchema,
    checkBlockIsFileBlock,
    checkBlockIsFileBlockWithPlaceholder,
    InlineContentSchema,
    StyleSchema,
} from '@wangx-doc/core'
import { useCallback, useMemo } from 'react'
import { RiDeleteBin7Line } from 'react-icons/ri'

import { useComponentsContext } from '../../../editor/ComponentsContext'
import { useWangxDocEditor } from '../../../hooks/useWangxDocEditor'
import { useSelectedBlocks } from '../../../hooks/useSelectedBlocks'
import { useDictionary } from '../../../i18n/dictionary'

export const FileDeleteButton = () => {
    const dict = useDictionary()
    const Components = useComponentsContext()!

    const editor = useWangxDocEditor<BlockSchema, InlineContentSchema, StyleSchema>()

    const selectedBlocks = useSelectedBlocks(editor)

    const fileBlock = useMemo(() => {
        // Checks if only one block is selected.
        if (selectedBlocks.length !== 1) {
            return undefined
        }

        const block = selectedBlocks[0]

        if (checkBlockIsFileBlock(block, editor)) {
            return block
        }

        return undefined
    }, [editor, selectedBlocks])

    const onClick = useCallback(() => {
        editor.focus()
        editor.removeBlocks([fileBlock!])
    }, [editor, fileBlock])

    if (!fileBlock || checkBlockIsFileBlockWithPlaceholder(fileBlock, editor) || !editor.isEditable) {
        return null
    }

    return (
        <Components.FormattingToolbar.Button
            className={'bn-button'}
            label={dict.formatting_toolbar.file_delete.tooltip[fileBlock.type] || dict.formatting_toolbar.file_delete.tooltip['file']}
            mainTooltip={dict.formatting_toolbar.file_delete.tooltip[fileBlock.type] || dict.formatting_toolbar.file_delete.tooltip['file']}
            icon={<RiDeleteBin7Line />}
            onClick={onClick}
        />
    )
}
