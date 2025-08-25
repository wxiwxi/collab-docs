/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { assertEmpty } from '@wangx-doc/core'
import { ComponentProps } from '@wangx-doc/react'
import { forwardRef } from 'react'

export const GridSuggestionMenuLoader = forwardRef<HTMLDivElement, ComponentProps['GridSuggestionMenu']['Loader']>((props, ref) => {
    const {
        className,
        children, // unused, using "dots" instead
        columns,
        ...rest
    } = props

    assertEmpty(rest)

    return (
        <div className={className} style={{ gridColumn: `1 / ${columns + 1}` }} ref={ref}>
            {children}
        </div>
    )
})
