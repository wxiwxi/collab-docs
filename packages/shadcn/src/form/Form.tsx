/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { assertEmpty } from '@wangx-doc/core'
import { ComponentProps } from '@wangx-doc/react'
import { useForm } from 'react-hook-form'

import { useShadCNComponentsContext } from '../ShadCNComponentsContext'

export const Form = (props: ComponentProps['Generic']['Form']['Root']) => {
    const { children, ...rest } = props

    assertEmpty(rest)

    const ShadCNComponents = useShadCNComponentsContext()!

    const form = useForm()

    return <ShadCNComponents.Form.Form {...form}>{children}</ShadCNComponents.Form.Form>
}
