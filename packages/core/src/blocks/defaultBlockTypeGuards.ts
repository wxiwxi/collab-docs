/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import type { WangxDocEditor } from '../editor/WangxDocEditor'
import { BlockFromConfig, BlockSchema, FileBlockConfig, InlineContentSchema, StyleSchema } from '../schema/index'
import { Block, DefaultBlockSchema, defaultBlockSchema, DefaultInlineContentSchema, defaultInlineContentSchema } from './defaultBlocks'
import { defaultProps } from './defaultProps'

export function checkDefaultBlockTypeInSchema<
    BlockType extends keyof DefaultBlockSchema,
    I extends InlineContentSchema,
    S extends StyleSchema,
>(blockType: BlockType, editor: WangxDocEditor<any, I, S>): editor is WangxDocEditor<{ Type: DefaultBlockSchema[BlockType] }, I, S> {
    return blockType in editor.schema.blockSchema && editor.schema.blockSchema[blockType] === defaultBlockSchema[blockType]
}

export function checkDefaultInlineContentTypeInSchema<
    InlineContentType extends keyof DefaultInlineContentSchema,
    B extends BlockSchema,
    S extends StyleSchema,
>(
    inlineContentType: InlineContentType,
    editor: WangxDocEditor<B, any, S>
): editor is WangxDocEditor<B, { Type: DefaultInlineContentSchema[InlineContentType] }, S> {
    return (
        inlineContentType in editor.schema.inlineContentSchema &&
        editor.schema.inlineContentSchema[inlineContentType] === defaultInlineContentSchema[inlineContentType]
    )
}

export function checkBlockIsDefaultType<BlockType extends keyof DefaultBlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    blockType: BlockType,
    block: Block<any, I, S>,
    editor: WangxDocEditor<any, I, S>
): block is BlockFromConfig<DefaultBlockSchema[BlockType], I, S> {
    return block.type === blockType && block.type in editor.schema.blockSchema && checkDefaultBlockTypeInSchema(block.type, editor)
}

export function checkBlockIsFileBlock<B extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    block: Block<any, I, S>,
    editor: WangxDocEditor<B, I, S>
): block is BlockFromConfig<FileBlockConfig, I, S> {
    return (block.type in editor.schema.blockSchema && editor.schema.blockSchema[block.type].isFileBlock) || false
}

export function checkBlockIsFileBlockWithPreview<B extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    block: Block<any, I, S>,
    editor: WangxDocEditor<B, I, S>
): block is BlockFromConfig<
    FileBlockConfig & {
        propSchema: Required<FileBlockConfig['propSchema']>
    },
    I,
    S
> {
    return (
        (block.type in editor.schema.blockSchema &&
            editor.schema.blockSchema[block.type].isFileBlock &&
            'showPreview' in editor.schema.blockSchema[block.type].propSchema) ||
        false
    )
}

export function checkBlockIsFileBlockWithPlaceholder<B extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    block: Block<B, I, S>,
    editor: WangxDocEditor<B, I, S>
) {
    const config = editor.schema.blockSchema[block.type]
    return config.isFileBlock && !block.props.url
}

export function checkBlockTypeHasDefaultProp<Prop extends keyof typeof defaultProps, I extends InlineContentSchema, S extends StyleSchema>(
    prop: Prop,
    blockType: string,
    editor: WangxDocEditor<any, I, S>
): editor is WangxDocEditor<
    {
        [BT in string]: {
            type: BT
            propSchema: {
                [P in Prop]: (typeof defaultProps)[P]
            }
            content: 'table' | 'inline' | 'none'
        }
    },
    I,
    S
> {
    return (
        blockType in editor.schema.blockSchema &&
        prop in editor.schema.blockSchema[blockType].propSchema &&
        editor.schema.blockSchema[blockType].propSchema[prop] === defaultProps[prop]
    )
}

export function checkBlockHasDefaultProp<Prop extends keyof typeof defaultProps, I extends InlineContentSchema, S extends StyleSchema>(
    prop: Prop,
    block: Block<any, I, S>,
    editor: WangxDocEditor<any, I, S>
): block is BlockFromConfig<
    {
        type: string
        propSchema: {
            [P in Prop]: (typeof defaultProps)[P]
        }
        content: 'table' | 'inline' | 'none'
    },
    I,
    S
> {
    return checkBlockTypeHasDefaultProp(prop, block.type, editor)
}
