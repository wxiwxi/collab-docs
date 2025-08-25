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
    PartialTableContent,
    StyleSchema,
} from '@wangx-doc/core'

import { useComponentsContext } from '../../../../editor/ComponentsContext'
import { useWangxDocEditor } from '../../../../hooks/useWangxDocEditor'
import { useDictionary } from '../../../../i18n/dictionary'
import { TableHandleMenuProps } from '../TableHandleMenuProps'

export const DeleteRowButton = <I extends InlineContentSchema = DefaultInlineContentSchema, S extends StyleSchema = DefaultStyleSchema>(
    props: TableHandleMenuProps<I, S>
) => {
    const Components = useComponentsContext()!
    const dict = useDictionary()
    const editor = useWangxDocEditor<{ table: DefaultBlockSchema['table'] }, I, S>()

    return (
        <Components.Generic.Menu.Item
            onClick={() => {
                const content: PartialTableContent<I, S> = {
                    type: 'tableContent',
                    columnWidths: props.block.content.columnWidths,
                    rows: props.block.content.rows.filter((_, index) => index !== props.index),
                }

                editor.updateBlock(props.block, {
                    type: 'table',
                    content,
                })

                // Have to reset text cursor position to the block as `updateBlock`
                // moves the existing selection out of the block.
                editor.setTextCursorPosition(props.block)
            }}
        >
            {dict.table_handle.delete_row_menuitem}
        </Components.Generic.Menu.Item>
    )
}

export const DeleteColumnButton = <I extends InlineContentSchema = DefaultInlineContentSchema, S extends StyleSchema = DefaultStyleSchema>(
    props: TableHandleMenuProps<I, S>
) => {
    const Components = useComponentsContext()!
    const dict = useDictionary()

    const editor = useWangxDocEditor<{ table: DefaultBlockSchema['table'] }, I, S>()

    return (
        <Components.Generic.Menu.Item
            onClick={() => {
                const content: PartialTableContent<I, S> = {
                    type: 'tableContent',
                    columnWidths: props.block.content.columnWidths.filter((_, index) => index !== props.index),
                    rows: props.block.content.rows.map(row => ({
                        cells: row.cells.filter((_, index) => index !== props.index),
                    })),
                }

                editor.updateBlock(props.block, {
                    type: 'table',
                    content,
                })

                // Have to reset text cursor position to the block as `updateBlock`
                // moves the existing selection out of the block.
                editor.setTextCursorPosition(props.block)
            }}
        >
            {dict.table_handle.delete_column_menuitem}
        </Components.Generic.Menu.Item>
    )
}

export const DeleteButton = <I extends InlineContentSchema = DefaultInlineContentSchema, S extends StyleSchema = DefaultStyleSchema>(
    props: TableHandleMenuProps<I, S> & { orientation: 'row' | 'column' }
) => (props.orientation === 'row' ? <DeleteRowButton {...props} /> : <DeleteColumnButton {...props} />)
