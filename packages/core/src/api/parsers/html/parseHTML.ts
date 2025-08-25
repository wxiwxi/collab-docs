/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { DOMParser, Schema } from 'prosemirror-model'

import { Block } from '../../../blocks/defaultBlocks'
import { BlockSchema, InlineContentSchema, StyleSchema } from '../../../schema/index'
import { nodeToBlock } from '../../nodeConversions/nodeToBlock'
import { nestedListsToWangxDocStructure } from './util/nestedLists'
export async function HTMLToBlocks<BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    html: string,
    blockSchema: BSchema,
    icSchema: I,
    styleSchema: S,
    pmSchema: Schema
): Promise<Block<BSchema, I, S>[]> {
    const htmlNode = nestedListsToWangxDocStructure(html)
    const parser = DOMParser.fromSchema(pmSchema)

    // Other approach might be to use
    // const doc = pmSchema.nodes["doc"].createAndFill()!;
    // and context: doc.resolve(3),

    const parentNode = parser.parse(htmlNode, {
        topNode: pmSchema.nodes['blockGroup'].create(),
    })

    const blocks: Block<BSchema, I, S>[] = []

    for (let i = 0; i < parentNode.childCount; i++) {
        blocks.push(nodeToBlock(parentNode.child(i), blockSchema, icSchema, styleSchema))
    }

    return blocks
}
