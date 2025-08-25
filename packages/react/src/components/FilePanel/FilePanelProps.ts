/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import {
    DefaultInlineContentSchema,
    DefaultStyleSchema,
    FilePanelState,
    InlineContentSchema,
    StyleSchema,
    UiElementPosition,
} from '@wangx-doc/core'

export type FilePanelProps<I extends InlineContentSchema = DefaultInlineContentSchema, S extends StyleSchema = DefaultStyleSchema> = Omit<
    FilePanelState<I, S>,
    keyof UiElementPosition
>
