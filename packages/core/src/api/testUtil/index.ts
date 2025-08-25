/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { PartialBlock } from '../../blocks/defaultBlocks'
import { WangxDocEditor } from '../../editor/WangxDocEditor'
import { BlockSchema } from '../../schema/blocks/types'
import { InlineContentSchema } from '../../schema/inlineContent/types'
import { StyleSchema } from '../../schema/styles/types'
import { NoInfer } from '../../util/typescript'

export type EditorTestCases<B extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema> = {
    name: string
    createEditor: () => WangxDocEditor<B, I, S>
    documents: Array<{
        name: string
        blocks: PartialBlock<NoInfer<B>, NoInfer<I>, NoInfer<S>>[]
    }>
}
