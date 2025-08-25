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

export const Panel = forwardRef<HTMLDivElement, ComponentProps['FilePanel']['Root']>((props, ref) => {
    const {
        className,
        tabs,
        defaultOpenTab,
        openTab,
        setOpenTab,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        loading, // TODO: implement loader
        ...rest
    } = props

    assertEmpty(rest)

    const ShadCNComponents = useShadCNComponentsContext()!

    return (
        <ShadCNComponents.Tabs.Tabs
            className={cn(className, 'bn-bg-popover bn-p-2 bn-rounded-lg')}
            ref={ref}
            value={openTab}
            defaultValue={defaultOpenTab}
            onValueChange={setOpenTab}
        >
            {/*{loading && <LoadingOverlay visible={loading} />}*/}

            <ShadCNComponents.Tabs.TabsList>
                {tabs.map(tab => (
                    <ShadCNComponents.Tabs.TabsTrigger value={tab.name} key={tab.name}>
                        {tab.name}
                    </ShadCNComponents.Tabs.TabsTrigger>
                ))}
            </ShadCNComponents.Tabs.TabsList>

            {tabs.map(tab => (
                <ShadCNComponents.Tabs.TabsContent value={tab.name} key={tab.name}>
                    <ShadCNComponents.Card.Card>
                        <ShadCNComponents.Card.CardContent className={'bn-p-4'}>{tab.tabPanel}</ShadCNComponents.Card.CardContent>
                    </ShadCNComponents.Card.Card>
                </ShadCNComponents.Tabs.TabsContent>
            ))}
        </ShadCNComponents.Tabs.Tabs>
    )
})
