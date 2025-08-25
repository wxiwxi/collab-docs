/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { assertEmpty } from '@wangx-doc/core'
import { ComponentProps } from '@wangx-doc/react'
import { forwardRef } from 'react'

import { cn } from '../lib/utils'
import { useShadCNComponentsContext } from '../ShadCNComponentsContext'

export const ExtendButton = forwardRef<HTMLButtonElement, ComponentProps['TableHandle']['ExtendButton']>((props, ref) => {
    const { className, children, onMouseDown, onClick, ...rest } = props

    // false, because rest props can be added by shadcn when button is used as a trigger
    // assertEmpty in this case is only used at typescript level, not runtime level
    assertEmpty(rest, false)

    const ShadCNComponents = useShadCNComponentsContext()!

    return (
        <ShadCNComponents.Button.Button
            variant={'ghost'}
            className={cn(
                className,
                'bn-p-0 bn-h-full bn-w-full bn-text-gray-400',
                className?.includes('bn-extend-button-add-remove-columns') ? 'bn-ml-1' : 'bn-mt-1',
                className?.includes('bn-extend-button-editing') ? 'bn-bg-accent bn-text-accent-foreground' : ''
            )}
            ref={ref}
            onClick={onClick}
            onMouseDown={onMouseDown}
            {...rest}
        >
            {children}
        </ShadCNComponents.Button.Button>
    )
})
