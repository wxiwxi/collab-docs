/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import {
    DefaultBlockSchema,
    DefaultInlineContentSchema,
    DefaultStyleSchema,
    InlineContentSchema,
    WangxDocEditor,
    StyleSchema,
    TableHandlesState,
} from '@wangx-doc/core'

export type ExtendButtonProps<I extends InlineContentSchema = DefaultInlineContentSchema, S extends StyleSchema = DefaultStyleSchema> = {
    editor: WangxDocEditor<
        {
            table: DefaultBlockSchema['table']
        },
        I,
        S
    >
    onMouseDown: () => void
    onMouseUp: () => void
    orientation: 'addOrRemoveRows' | 'addOrRemoveColumns'
} & Pick<TableHandlesState<I, S>, 'block'>
