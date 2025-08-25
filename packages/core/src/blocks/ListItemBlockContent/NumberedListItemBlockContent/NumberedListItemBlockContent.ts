/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { InputRule } from '@tiptap/core'

import { updateBlockCommand } from '../../../api/blockManipulation/commands/updateBlock/updateBlock'
import { getBlockInfoFromSelection } from '../../../api/getBlockInfoFromPos'
import { createBlockSpecFromStronglyTypedTiptapNode, createStronglyTypedTiptapNode, PropSchema } from '../../../schema/index'
import { createDefaultBlockDOMOutputSpec } from '../../defaultBlockHelpers'
import { defaultProps } from '../../defaultProps'
import { handleEnter } from '../ListItemKeyboardShortcuts'
import { NumberedListIndexingPlugin } from './NumberedListIndexingPlugin'

export const numberedListItemPropSchema = {
    ...defaultProps,
} satisfies PropSchema

const NumberedListItemBlockContent = createStronglyTypedTiptapNode({
    name: 'numberedListItem',
    content: 'inline*',
    group: 'blockContent',
    priority: 90,
    addAttributes() {
        return {
            index: {
                default: null,
                parseHTML: element => element.getAttribute('data-index'),
                renderHTML: attributes => {
                    return {
                        'data-index': attributes.index,
                    }
                },
            },
        }
    },

    addInputRules() {
        return [
            // Creates an ordered list when starting with "1.".
            new InputRule({
                find: new RegExp(`^1\\.\\s$`),
                handler: ({ state, chain, range }) => {
                    const blockInfo = getBlockInfoFromSelection(state)
                    if (blockInfo.blockContent.node.type.spec.content !== 'inline*') {
                        return
                    }

                    chain()
                        .command(
                            updateBlockCommand(this.options.editor, blockInfo.blockContainer.beforePos, {
                                type: 'numberedListItem',
                                props: {},
                            })
                        )
                        // Removes the "1." characters used to set the list.
                        .deleteRange({ from: range.from, to: range.to })
                },
            }),
        ]
    },

    addKeyboardShortcuts() {
        return {
            Enter: () => handleEnter(this.options.editor),
            'Mod-Shift-7': () => {
                const blockInfo = getBlockInfoFromSelection(this.editor.state)
                if (blockInfo.blockContent.node.type.spec.content !== 'inline*') {
                    return true
                }

                return this.editor.commands.command(
                    updateBlockCommand(this.options.editor, blockInfo.blockContainer.beforePos, {
                        type: 'numberedListItem',
                        props: {},
                    })
                )
            },
        }
    },

    addProseMirrorPlugins() {
        return [NumberedListIndexingPlugin()]
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-content-type=' + this.name + ']', // TODO: remove if we can't come up with test case that needs this
            },
            // Case for regular HTML list structure.
            // (e.g.: when pasting from other apps)
            {
                tag: 'li',
                getAttrs: element => {
                    if (typeof element === 'string') {
                        return false
                    }

                    const parent = element.parentElement

                    if (parent === null) {
                        return false
                    }

                    if (parent.tagName === 'OL' || (parent.tagName === 'DIV' && parent.parentElement!.tagName === 'OL')) {
                        return {}
                    }

                    return false
                },
                node: 'numberedListItem',
            },
            {
                tag: 'p',
                getAttrs: element => {
                    if (typeof element === 'string') {
                        return false
                    }

                    const parent = element.parentElement

                    if (parent === null) {
                        return false
                    }

                    if (parent.getAttribute('data-content-type') === 'numberedListItem') {
                        return {}
                    }

                    return false
                },
                priority: 300,
                node: 'numberedListItem',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return createDefaultBlockDOMOutputSpec(
            this.name,
            // We use a <p> tag, because for <li> tags we'd need an <ol> element to
            // put them in to be semantically correct, which we can't have due to the
            // schema.
            'p',
            {
                ...(this.options.domAttributes?.blockContent || {}),
                ...HTMLAttributes,
            },
            this.options.domAttributes?.inlineContent || {}
        )
    },
})

export const NumberedListItem = createBlockSpecFromStronglyTypedTiptapNode(NumberedListItemBlockContent, numberedListItemPropSchema)
