/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { splitBlockCommand } from '../../api/blockManipulation/commands/splitBlock/splitBlock'
import { updateBlockCommand } from '../../api/blockManipulation/commands/updateBlock/updateBlock'
import { getBlockInfoFromSelection } from '../../api/getBlockInfoFromPos'
import { WangxDocEditor } from '../../editor/WangxDocEditor'

export const handleEnter = (editor: WangxDocEditor<any, any, any>) => {
    const ttEditor = editor._tiptapEditor
    const { blockContent, blockContainer } = getBlockInfoFromSelection(ttEditor.state)

    const selectionEmpty = ttEditor.state.selection.anchor === ttEditor.state.selection.head

    if (
        !(
            blockContent.node.type.name === 'bulletListItem' ||
            blockContent.node.type.name === 'numberedListItem' ||
            blockContent.node.type.name === 'checkListItem'
        ) ||
        !selectionEmpty
    ) {
        return false
    }

    return ttEditor.commands.first(({ state, chain, commands }) => [
        () =>
            // Changes list item block to a paragraph block if the content is empty.
            commands.command(() => {
                if (blockContent.node.childCount === 0) {
                    return commands.command(
                        updateBlockCommand(editor, blockContainer.beforePos, {
                            type: 'paragraph',
                            props: {},
                        })
                    )
                }

                return false
            }),

        () =>
            // Splits the current block, moving content inside that's after the cursor
            // to a new block of the same type below.
            commands.command(() => {
                if (blockContent.node.childCount > 0) {
                    chain().deleteSelection().command(splitBlockCommand(state.selection.from, true)).run()

                    return true
                }

                return false
            }),
    ])
}
