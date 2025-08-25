/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { DOMSerializer, Schema } from 'prosemirror-model'

import { PartialBlock } from '../../../blocks/defaultBlocks'
import type { WangxDocEditor } from '../../../editor/WangxDocEditor'
import { BlockSchema, InlineContentSchema, StyleSchema } from '../../../schema/index'
import { serializeBlocksInternalHTML } from './util/serializeBlocksInternalHTML'
// Used to serialize WangxDoc blocks and ProseMirror nodes to HTML without
// losing data. Blocks are exported using the `toInternalHTML` method in their
// `blockSpec`.
//
// The HTML created by this serializer is the same as what's rendered by the
// editor to the DOM. This means that it retains the same structure as the
// editor, including the `blockGroup` and `blockContainer` wrappers. This also
// means that it can be converted back to the original blocks without any data
// loss.
export const createInternalHTMLSerializer = <BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    schema: Schema,
    editor: WangxDocEditor<BSchema, I, S>
) => {
    const serializer = DOMSerializer.fromSchema(schema)

    return {
        serializeBlocks: (blocks: PartialBlock<BSchema, I, S>[], options: { document?: Document }) => {
            return serializeBlocksInternalHTML(editor, blocks, serializer, options).outerHTML
        },
    }
}
