/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { assertEmpty } from '@wangx-doc/core'
import { ComponentProps } from '@wangx-doc/react'
import { forwardRef } from 'react'

import { cn } from '../lib/utils'

export const PanelTab = forwardRef<HTMLDivElement, ComponentProps['FilePanel']['TabPanel']>((props, ref) => {
    const { className, children, ...rest } = props

    assertEmpty(rest)

    return (
        <div className={cn(className, 'bn-flex bn-flex-col bn-gap-2 bn-items-start bn-justify-center')} ref={ref}>
            {children}
        </div>
    )
})
