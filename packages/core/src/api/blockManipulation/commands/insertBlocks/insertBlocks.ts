/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { Node } from 'prosemirror-model'

import { Block, PartialBlock } from '../../../../blocks/defaultBlocks'
import type { WangxDocEditor } from '../../../../editor/WangxDocEditor'
import { BlockIdentifier, BlockSchema, InlineContentSchema, StyleSchema } from '../../../../schema/index'
import { blockToNode } from '../../../nodeConversions/blockToNode'
import { nodeToBlock } from '../../../nodeConversions/nodeToBlock'
import { getNodeById } from '../../../nodeUtil'

export function insertBlocks<BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    editor: WangxDocEditor<BSchema, I, S>,
    blocksToInsert: PartialBlock<BSchema, I, S>[],
    referenceBlock: BlockIdentifier,
    placement: 'before' | 'after' = 'before'
): Block<BSchema, I, S>[] {
    const id = typeof referenceBlock === 'string' ? referenceBlock : referenceBlock.id

    const nodesToInsert: Node[] = []
    for (const blockSpec of blocksToInsert) {
        nodesToInsert.push(blockToNode(blockSpec, editor.pmSchema, editor.schema.styleSchema))
    }

    const { node, posBeforeNode } = getNodeById(id, editor._tiptapEditor.state.doc)

    if (placement === 'before') {
        editor.dispatch(editor._tiptapEditor.state.tr.insert(posBeforeNode, nodesToInsert))
    }

    if (placement === 'after') {
        editor.dispatch(editor._tiptapEditor.state.tr.insert(posBeforeNode + node.nodeSize, nodesToInsert))
    }

    // Now that the `PartialBlock`s have been converted to nodes, we can
    // re-convert them into full `Block`s.
    const insertedBlocks: Block<BSchema, I, S>[] = []
    for (const node of nodesToInsert) {
        insertedBlocks.push(
            nodeToBlock(node, editor.schema.blockSchema, editor.schema.inlineContentSchema, editor.schema.styleSchema, editor.blockCache)
        )
    }

    return insertedBlocks
}
