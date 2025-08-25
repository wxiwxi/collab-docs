/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { flip, offset } from '@floating-ui/react'
import {
    BlockSchema,
    DefaultBlockSchema,
    DefaultInlineContentSchema,
    DefaultStyleSchema,
    InlineContentSchema,
    StyleSchema,
} from '@wangx-doc/core'
import { FC } from 'react'

import { useWangxDocEditor } from '../../hooks/useWangxDocEditor'
import { useUIElementPositioning } from '../../hooks/useUIElementPositioning'
import { useUIPluginState } from '../../hooks/useUIPluginState'
import { FilePanel } from './FilePanel'
import { FilePanelProps } from './FilePanelProps'

export const FilePanelController = <
    B extends BlockSchema = DefaultBlockSchema,
    I extends InlineContentSchema = DefaultInlineContentSchema,
    S extends StyleSchema = DefaultStyleSchema,
>(props: {
    filePanel?: FC<FilePanelProps<I, S>>
}) => {
    const editor = useWangxDocEditor<B, I, S>()

    if (!editor.filePanel) {
        throw new Error('FileToolbarController can only be used when WangxDoc editor schema contains file block')
    }

    const state = useUIPluginState(editor.filePanel.onUpdate.bind(editor.filePanel))

    const { isMounted, ref, style, getFloatingProps } = useUIElementPositioning(state?.show || false, state?.referencePos || null, 5000, {
        placement: 'bottom',
        middleware: [offset(10), flip()],
        onOpenChange: open => {
            if (!open) {
                editor.filePanel!.closeMenu()
                editor.focus()
            }
        },
    })

    if (!isMounted || !state) {
        return null
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { show, referencePos, ...data } = state

    const Component = props.filePanel || FilePanel

    return (
        <div ref={ref} style={style} {...getFloatingProps()}>
            <Component {...data} />
        </div>
    )
}
