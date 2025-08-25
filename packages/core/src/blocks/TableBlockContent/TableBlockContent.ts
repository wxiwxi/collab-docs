/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { Node } from '@tiptap/core'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableRow } from '@tiptap/extension-table-row'
import { Node as PMNode } from 'prosemirror-model'
import { TableView } from 'prosemirror-tables'

import { createBlockSpecFromStronglyTypedTiptapNode, createStronglyTypedTiptapNode } from '../../schema/index'
import { mergeCSSClasses } from '../../util/browser'
import { createDefaultBlockDOMOutputSpec } from '../defaultBlockHelpers'
import { defaultProps } from '../defaultProps'
import { EMPTY_CELL_WIDTH, TableExtension } from './TableExtension'

export const tablePropSchema = {
    backgroundColor: defaultProps.backgroundColor,
    textColor: defaultProps.textColor,
}

export const TableBlockContent = createStronglyTypedTiptapNode({
    name: 'table',
    content: 'tableRow+',
    group: 'blockContent',
    tableRole: 'table',

    isolating: true,

    parseHTML() {
        return [{ tag: 'table' }]
    },

    renderHTML({ HTMLAttributes }) {
        return createDefaultBlockDOMOutputSpec(
            this.name,
            'table',
            {
                ...(this.options.domAttributes?.blockContent || {}),
                ...HTMLAttributes,
            },
            this.options.domAttributes?.inlineContent || {}
        )
    },

    // This node view is needed for the `columnResizing` plugin. By default, the
    // plugin adds its own node view, which overrides how the node is rendered vs
    // `renderHTML`. This means that the wrapping `blockContent` HTML element is
    // no longer rendered. The `columnResizing` plugin uses the `TableView` as its
    // default node view. `WangxDocTableView` extends it by wrapping it in a
    // `blockContent` element, so the DOM structure is consistent with other block
    // types.
    addNodeView() {
        return ({ node, HTMLAttributes }) => {
            class WangxDocTableView extends TableView {
                constructor(
                    public node: PMNode,
                    public cellMinWidth: number,
                    public blockContentHTMLAttributes: Record<string, string>
                ) {
                    super(node, cellMinWidth)

                    const blockContent = document.createElement('div')
                    blockContent.className = mergeCSSClasses('bn-block-content', blockContentHTMLAttributes.class)
                    blockContent.setAttribute('data-content-type', 'table')
                    for (const [attribute, value] of Object.entries(blockContentHTMLAttributes)) {
                        if (attribute !== 'class') {
                            blockContent.setAttribute(attribute, value)
                        }
                    }

                    const tableWrapper = this.dom

                    const tableWrapperInner = document.createElement('div')
                    tableWrapperInner.className = 'tableWrapper-inner'
                    tableWrapperInner.appendChild(tableWrapper.firstChild!)

                    tableWrapper.appendChild(tableWrapperInner)

                    blockContent.appendChild(tableWrapper)
                    const floatingContainer = document.createElement('div')
                    floatingContainer.className = 'table-widgets-container'
                    floatingContainer.style.position = 'relative'
                    tableWrapper.appendChild(floatingContainer)

                    this.dom = blockContent
                }

                ignoreMutation(record: MutationRecord): boolean {
                    return !(record.target as HTMLElement).closest('.tableWrapper-inner') || super.ignoreMutation(record)
                }
            }

            return new WangxDocTableView(node, EMPTY_CELL_WIDTH, {
                ...(this.options.domAttributes?.blockContent || {}),
                ...HTMLAttributes,
            })
        }
    },
})

const TableParagraph = Node.create({
    name: 'tableParagraph',
    group: 'tableContent',
    content: 'inline*',

    parseHTML() {
        return [
            {
                preserveWhitespace: 'full',
                // set this rule as high priority so it takes precedence over the default paragraph rule,
                // but only if we're in the tableContent context
                priority: 210,
                context: 'tableContent',
                tag: 'p',
                getAttrs: (/* _element */) => {
                    return {}
                },
            },
            {
                tag: 'p',
                getAttrs: element => {
                    if (typeof element === 'string' || !element.textContent) {
                        return false
                    }

                    const parent = element.parentElement

                    if (parent === null) {
                        return false
                    }

                    if (parent.tagName === 'TD') {
                        return {}
                    }

                    return false
                },
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['p', HTMLAttributes, 0]
    },
})

export const Table = createBlockSpecFromStronglyTypedTiptapNode(TableBlockContent, tablePropSchema, [
    TableExtension,
    TableParagraph,
    TableHeader.extend({
        content: 'tableContent',
    }),
    TableCell.extend({
        content: 'tableContent',
    }),
    TableRow,
])
