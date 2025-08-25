/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { Node } from '@tiptap/core'

import type { WangxDocEditor } from '../editor/WangxDocEditor'
import { WangxDocDOMAttributes } from '../schema/index'
import { mergeCSSClasses } from '../util/browser'

// Object containing all possible block attributes.
const BlockAttributes: Record<string, string> = {
    blockColor: 'data-block-color',
    blockStyle: 'data-block-style',
    id: 'data-id',
    depth: 'data-depth',
    depthChange: 'data-depth-change',
}

/**
 * The main "Block node" documents consist of
 */
export const BlockContainer = Node.create<{
    domAttributes?: WangxDocDOMAttributes
    editor: WangxDocEditor<any, any, any>
}>({
    name: 'blockContainer',
    group: 'blockContainer',
    // A block always contains content, and optionally a blockGroup which contains nested blocks
    content: 'blockContent blockGroup?',
    // Ensures content-specific keyboard handlers trigger first.
    priority: 50,
    defining: true,

    parseHTML() {
        return [
            {
                tag: 'div',
                getAttrs: element => {
                    if (typeof element === 'string') {
                        return false
                    }

                    const attrs: Record<string, string> = {}
                    for (const [nodeAttr, HTMLAttr] of Object.entries(BlockAttributes)) {
                        if (element.getAttribute(HTMLAttr)) {
                            attrs[nodeAttr] = element.getAttribute(HTMLAttr)!
                        }
                    }

                    if (element.getAttribute('data-node-type') === 'blockContainer') {
                        return attrs
                    }

                    return false
                },
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        const blockOuter = document.createElement('div')
        blockOuter.className = 'bn-block-outer'
        blockOuter.setAttribute('data-node-type', 'blockOuter')
        for (const [attribute, value] of Object.entries(HTMLAttributes)) {
            if (attribute !== 'class') {
                blockOuter.setAttribute(attribute, value)
            }
        }

        const blockHTMLAttributes = {
            ...(this.options.domAttributes?.block || {}),
            ...HTMLAttributes,
        }
        const block = document.createElement('div')
        block.className = mergeCSSClasses('bn-block', blockHTMLAttributes.class)
        block.setAttribute('data-node-type', this.name)
        for (const [attribute, value] of Object.entries(blockHTMLAttributes)) {
            if (attribute !== 'class') {
                block.setAttribute(attribute, value)
            }
        }

        blockOuter.appendChild(block)

        return {
            dom: blockOuter,
            contentDOM: block,
        }
    },
})
