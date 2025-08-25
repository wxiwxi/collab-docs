/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { assertEmpty } from '@wangx-doc/core'
import { ComponentProps } from '@wangx-doc/react'
import { forwardRef } from 'react'

import { useShadCNComponentsContext } from '../ShadCNComponentsContext'

export const PanelFileInput = forwardRef<HTMLInputElement, ComponentProps['FilePanel']['FileInput']>((props, ref) => {
    const { className, accept, value, placeholder, onChange, ...rest } = props

    assertEmpty(rest)

    const ShadCNComponents = useShadCNComponentsContext()!

    return (
        <ShadCNComponents.Input.Input
            type={'file'}
            className={className}
            ref={ref}
            accept={accept}
            value={value ? value.name : undefined}
            onChange={async e => onChange?.(e.target.files![0])}
            placeholder={placeholder}
        />
    )
})
