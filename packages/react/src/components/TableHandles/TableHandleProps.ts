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
    StyleSchema,
    TableHandlesState,
    WangxDocEditor,
} from '@wangx-doc/core'
import { DragEvent, FC } from 'react'

import { DragHandleMenuProps } from '../SideMenu/DragHandleMenu/DragHandleMenuProps'

type NonUndefined<T> = T extends undefined ? never : T

export type TableHandleProps<I extends InlineContentSchema = DefaultInlineContentSchema, S extends StyleSchema = DefaultStyleSchema> = {
    editor: WangxDocEditor<
        {
            table: DefaultBlockSchema['table']
        },
        I,
        S
    >
    orientation: 'row' | 'column'
    index: number
    dragStart: (e: DragEvent) => void
    showOtherSide: () => void
    hideOtherSide: () => void
    menuContainer: HTMLDivElement
    tableHandleMenu?: FC<
        DragHandleMenuProps<
            {
                table: DefaultBlockSchema['table']
            },
            I,
            S
        >
    >
} & Pick<TableHandlesState<I, S>, 'block'> &
    Pick<
        NonUndefined<
            WangxDocEditor<
                {
                    table: DefaultBlockSchema['table']
                },
                I,
                S
            >['tableHandles']
        >,
        'dragEnd' | 'freezeHandles' | 'unfreezeHandles'
    >
