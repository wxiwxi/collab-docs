/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { Node } from 'prosemirror-model'
import { Transaction } from 'prosemirror-state'

import { Block } from '../../../../blocks/defaultBlocks'
import type { WangxDocEditor } from '../../../../editor/WangxDocEditor'
import { BlockIdentifier, BlockSchema, InlineContentSchema, StyleSchema } from '../../../../schema/index'
import { nodeToBlock } from '../../../nodeConversions/nodeToBlock'

export function removeBlocksWithCallback<BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    editor: WangxDocEditor<BSchema, I, S>,
    blocksToRemove: BlockIdentifier[],
    // Should return new removedSize.
    callback?: (node: Node, pos: number, tr: Transaction, removedSize: number) => number
): Block<BSchema, I, S>[] {
    const ttEditor = editor._tiptapEditor
    const tr = ttEditor.state.tr

    const idsOfBlocksToRemove = new Set<string>(blocksToRemove.map(block => (typeof block === 'string' ? block : block.id)))
    const removedBlocks: Block<BSchema, I, S>[] = []
    let removedSize = 0

    ttEditor.state.doc.descendants((node, pos) => {
        // Skips traversing nodes after all target blocks have been removed.
        if (idsOfBlocksToRemove.size === 0) {
            return false
        }

        // Keeps traversing nodes if block with target ID has not been found.
        if (node.type.name !== 'blockContainer' || !idsOfBlocksToRemove.has(node.attrs.id)) {
            return true
        }

        // Saves the block that is being deleted.
        removedBlocks.push(
            nodeToBlock(node, editor.schema.blockSchema, editor.schema.inlineContentSchema, editor.schema.styleSchema, editor.blockCache)
        )
        idsOfBlocksToRemove.delete(node.attrs.id)

        // Removes the block and calculates the change in document size.
        removedSize = callback?.(node, pos, tr, removedSize) || removedSize
        const oldDocSize = tr.doc.nodeSize
        tr.delete(pos - removedSize - 1, pos - removedSize + node.nodeSize + 1)
        const newDocSize = tr.doc.nodeSize
        removedSize += oldDocSize - newDocSize

        return false
    })

    // Throws an error if now all blocks could be found.
    if (idsOfBlocksToRemove.size > 0) {
        const notFoundIds = [...idsOfBlocksToRemove].join('\n')

        throw Error('Blocks with the following IDs could not be found in the editor: ' + notFoundIds)
    }

    editor.dispatch(tr)

    return removedBlocks
}

export function removeBlocks<BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    editor: WangxDocEditor<BSchema, I, S>,
    blocksToRemove: BlockIdentifier[]
): Block<BSchema, I, S>[] {
    return removeBlocksWithCallback(editor, blocksToRemove)
}
