/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { defaultBlockSpecs, defaultInlineContentSpecs, defaultStyleSpecs } from '../blocks/defaultBlocks'
import type { BlockNoDefaults, PartialBlockNoDefaults } from '../schema/blocks/types'
import {
    BlockSchema,
    BlockSchemaFromSpecs,
    BlockSpecs,
    getBlockSchemaFromSpecs,
    getInlineContentSchemaFromSpecs,
    getStyleSchemaFromSpecs,
    InlineContentSchema,
    InlineContentSchemaFromSpecs,
    InlineContentSpecs,
    StyleSchema,
    StyleSchemaFromSpecs,
    StyleSpecs,
} from '../schema/index'
import type { WangxDocEditor } from './WangxDocEditor'

function removeUndefined<T extends Record<string, any> | undefined>(obj: T): T {
    if (!obj) {
        return obj
    }
    return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined)) as T
}

export class WangxDocSchema<BSchema extends BlockSchema, ISchema extends InlineContentSchema, SSchema extends StyleSchema> {
    public readonly blockSpecs: BlockSpecs
    public readonly inlineContentSpecs: InlineContentSpecs
    public readonly styleSpecs: StyleSpecs

    public readonly blockSchema: BSchema
    public readonly inlineContentSchema: ISchema
    public readonly styleSchema: SSchema

    // Helper so that you can use typeof schema.WangxDocEditor
    public readonly WangxDocEditor: WangxDocEditor<BSchema, ISchema, SSchema> = 'only for types' as any

    public readonly Block: BlockNoDefaults<BSchema, ISchema, SSchema> = 'only for types' as any

    public readonly PartialBlock: PartialBlockNoDefaults<BSchema, ISchema, SSchema> = 'only for types' as any

    public static create<
        BSpecs extends BlockSpecs = typeof defaultBlockSpecs,
        ISpecs extends InlineContentSpecs = typeof defaultInlineContentSpecs,
        SSpecs extends StyleSpecs = typeof defaultStyleSpecs,
    >(options?: {
        /**
         * A list of custom block types that should be available in the editor.
         */
        blockSpecs?: BSpecs
        /**
         * A list of custom InlineContent types that should be available in the editor.
         */
        inlineContentSpecs?: ISpecs
        /**
         * A list of custom Styles that should be available in the editor.
         */
        styleSpecs?: SSpecs
    }) {
        return new WangxDocSchema<BlockSchemaFromSpecs<BSpecs>, InlineContentSchemaFromSpecs<ISpecs>, StyleSchemaFromSpecs<SSpecs>>(options)
        // as WangxDocSchema<
        // BlockSchemaFromSpecs<BSpecs>,
        // InlineContentSchemaFromSpecs<ISpecs>,
        // StyleSchemaFromSpecs<SSpecs>
        // >;
    }

    constructor(opts?: { blockSpecs?: BlockSpecs; inlineContentSpecs?: InlineContentSpecs; styleSpecs?: StyleSpecs }) {
        this.blockSpecs = removeUndefined(opts?.blockSpecs) || defaultBlockSpecs
        this.inlineContentSpecs = removeUndefined(opts?.inlineContentSpecs) || defaultInlineContentSpecs
        this.styleSpecs = removeUndefined(opts?.styleSpecs) || defaultStyleSpecs

        this.blockSchema = getBlockSchemaFromSpecs(this.blockSpecs) as any
        this.inlineContentSchema = getInlineContentSchemaFromSpecs(this.inlineContentSpecs) as any
        this.styleSchema = getStyleSchemaFromSpecs(this.styleSpecs) as any
    }
}
