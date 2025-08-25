/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { createReactBlockSpec } from '@wangx-doc/react'
export const AI = createReactBlockSpec(
    {
        type: 'ai',
        propSchema: {},
        content: 'none',
    },
    {
        render: props => {
            return (
                <div className="text-2xl font-bold text-center">
                    <div className="text-3xl">AI 人工智能</div>
                    <div className="text-xl">AI 人工智能是未来的趋势</div>
                    <div>{props.block.type}</div>
                </div>
            )
        },
    }
)
