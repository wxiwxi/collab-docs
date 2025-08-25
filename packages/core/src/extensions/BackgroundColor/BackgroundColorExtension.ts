/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { Extension } from '@tiptap/core'

import { defaultProps } from '../../blocks/defaultProps'

export const BackgroundColorExtension = Extension.create({
    name: 'blockBackgroundColor',

    addGlobalAttributes() {
        return [
            {
                types: ['blockContainer'],
                attributes: {
                    backgroundColor: {
                        default: defaultProps.backgroundColor.default,
                        parseHTML: element =>
                            element.hasAttribute('data-background-color')
                                ? element.getAttribute('data-background-color')
                                : defaultProps.backgroundColor.default,
                        renderHTML: attributes => {
                            if (attributes.backgroundColor === defaultProps.backgroundColor.default) {
                                return {}
                            }
                            return {
                                'data-background-color': attributes.backgroundColor,
                            }
                        },
                    },
                },
            },
        ]
    },
})
