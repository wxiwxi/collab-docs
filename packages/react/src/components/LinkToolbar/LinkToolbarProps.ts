/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { BlockSchema, InlineContentSchema, LinkToolbarState, StyleSchema, UiElementPosition, WangxDocEditor } from '@wangx-doc/core'

export type LinkToolbarProps = Omit<LinkToolbarState, keyof UiElementPosition> &
    Pick<
        WangxDocEditor<BlockSchema, InlineContentSchema, StyleSchema>['linkToolbar'],
        'deleteLink' | 'editLink' | 'startHideTimer' | 'stopHideTimer'
    >
