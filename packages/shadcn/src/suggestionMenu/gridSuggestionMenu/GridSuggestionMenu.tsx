/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { assertEmpty } from '@wangx-doc/core'
import { ComponentProps } from '@wangx-doc/react'
import { forwardRef } from 'react'

export const GridSuggestionMenu = forwardRef<HTMLDivElement, ComponentProps['GridSuggestionMenu']['Root']>((props, ref) => {
    const { className, children, id, columns, ...rest } = props

    assertEmpty(rest)

    return (
        <div className={className} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` } as any} ref={ref} id={id} role="grid">
            {children}
        </div>
    )
})
