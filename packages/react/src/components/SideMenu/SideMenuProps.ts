/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import {
    BlockSchema,
    DefaultBlockSchema,
    DefaultInlineContentSchema,
    DefaultStyleSchema,
    InlineContentSchema,
    SideMenuState,
    StyleSchema,
    UiElementPosition,
    WangxDocEditor,
} from '@wangx-doc/core'
import { FC } from 'react'

import { DragHandleMenuProps } from './DragHandleMenu/DragHandleMenuProps'

export type SideMenuProps<
    BSchema extends BlockSchema = DefaultBlockSchema,
    I extends InlineContentSchema = DefaultInlineContentSchema,
    S extends StyleSchema = DefaultStyleSchema,
> = {
    editor: WangxDocEditor<BSchema, I, S>
    dragHandleMenu?: FC<DragHandleMenuProps<BSchema, I, S>>
} & Omit<SideMenuState<BSchema, I, S>, keyof UiElementPosition> &
    Pick<WangxDocEditor<BSchema, I, S>['sideMenu'], 'blockDragStart' | 'blockDragEnd' | 'freezeMenu' | 'unfreezeMenu'>
