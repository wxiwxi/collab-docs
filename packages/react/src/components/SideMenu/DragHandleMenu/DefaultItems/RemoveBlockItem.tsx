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
    StyleSchema,
} from '@wangx-doc/core'
import { ReactNode } from 'react'

import { useComponentsContext } from '../../../../editor/ComponentsContext'
import { useWangxDocEditor } from '../../../../hooks/useWangxDocEditor'
import { DragHandleMenuProps } from '../DragHandleMenuProps'

export const RemoveBlockItem = <
    BSchema extends BlockSchema = DefaultBlockSchema,
    I extends InlineContentSchema = DefaultInlineContentSchema,
    S extends StyleSchema = DefaultStyleSchema,
>(
    props: DragHandleMenuProps<BSchema, I, S> & {
        children: ReactNode
    }
) => {
    const Components = useComponentsContext()!

    const editor = useWangxDocEditor<BSchema, I, S>()

    return (
        <Components.Generic.Menu.Item className={'bn-menu-item'} onClick={() => editor.removeBlocks([props.block])}>
            {props.children}
        </Components.Generic.Menu.Item>
    )
}
