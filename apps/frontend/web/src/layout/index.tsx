/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { SidebarProvider } from '@wangx-doc/shadcn-shared-ui/components/ui/sidebar'
import { useLayoutEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { Aside } from '@/components/LayoutAside/Aside'

export function Layout() {
    useLayoutEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = `/account/login?redirect=${window.location.pathname}`
        }
    }, [])
    return (
        <SidebarProvider>
            <Aside />
            <Outlet />
        </SidebarProvider>
    )
}
