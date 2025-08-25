/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { createReactInlineContentSpec } from '@wangx-doc/react'

import { MentionContent } from './MentionContent'

// The Mention inline content.
export const Mention = createReactInlineContentSpec(
    {
        type: 'mention',
        propSchema: {
            id: {
                default: 'Unknown',
            },
        },
        content: 'none',
    },
    {
        render: props => {
            const { id } = props.inlineContent.props
            return <MentionContent pageId={id} />
        },
    }
)
