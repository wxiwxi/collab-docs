/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import {
    BlockSchema,
    checkBlockIsFileBlockWithPlaceholder,
    checkBlockIsFileBlockWithPreview,
    InlineContentSchema,
    StyleSchema,
} from '@wangx-doc/core'
import { useCallback, useMemo } from 'react'
import { RiImageAddFill } from 'react-icons/ri'

import { useComponentsContext } from '../../../editor/ComponentsContext'
import { useWangxDocEditor } from '../../../hooks/useWangxDocEditor'
import { useSelectedBlocks } from '../../../hooks/useSelectedBlocks'
import { useDictionary } from '../../../i18n/dictionary'

export const FilePreviewButton = () => {
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

        if (checkBlockIsFileBlockWithPreview(block, editor)) {
            return block
        }

        return undefined
    }, [editor, selectedBlocks])

    const onClick = useCallback(() => {
        if (fileBlock) {
            editor.updateBlock(fileBlock, {
                props: {
                    showPreview: !fileBlock.props.showPreview as any, // TODO
                },
            })
        }
    }, [editor, fileBlock])

    if (!fileBlock || checkBlockIsFileBlockWithPlaceholder(fileBlock, editor) || !editor.isEditable) {
        return null
    }

    return (
        <Components.FormattingToolbar.Button
            className={'bn-button'}
            label={'Toggle preview'}
            mainTooltip={dict.formatting_toolbar.file_preview_toggle.tooltip}
            icon={<RiImageAddFill />}
            isSelected={fileBlock.props.showPreview}
            onClick={onClick}
        />
    )
}
