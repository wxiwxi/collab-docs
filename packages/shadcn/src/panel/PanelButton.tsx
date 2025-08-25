/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { assertEmpty } from '@wangx-doc/core'
import { ComponentProps } from '@wangx-doc/react'
import { forwardRef } from 'react'

import { useShadCNComponentsContext } from '../ShadCNComponentsContext'

export const PanelButton = forwardRef<HTMLButtonElement, ComponentProps['FilePanel']['Button']>((props, ref) => {
    const { className, children, onClick, label, ...rest } = props

    assertEmpty(rest)

    const ShadCNComponents = useShadCNComponentsContext()!

    return (
        <ShadCNComponents.Button.Button type={'submit'} className={className} aria-label={label} ref={ref} onClick={onClick}>
            {children}
        </ShadCNComponents.Button.Button>
    )
})
