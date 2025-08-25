/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { DefaultBlockSchema, DefaultInlineContentSchema, defaultStyleSpecs } from '../../../blocks/defaultBlocks'
import { uploadToTmpFilesDotOrg_DEV_ONLY } from '../../../blocks/FileBlockContent/uploadToTmpFilesDotOrg_DEV_ONLY'
import { WangxDocEditor } from '../../../editor/WangxDocEditor'
import { WangxDocSchema } from '../../../editor/WangxDocSchema'
import { createStyleSpec } from '../../../schema/styles/createSpec'
import { EditorTestCases } from '../index'

const small = createStyleSpec(
    {
        type: 'small',
        propSchema: 'boolean',
    },
    {
        render: () => {
            const dom = document.createElement('small')
            return {
                dom,
                contentDOM: dom,
            }
        },
    }
)

const fontSize = createStyleSpec(
    {
        type: 'fontSize',
        propSchema: 'string',
    },
    {
        render: value => {
            const dom = document.createElement('span')
            dom.setAttribute('style', 'font-size: ' + value)
            return {
                dom,
                contentDOM: dom,
            }
        },
    }
)

const schema = WangxDocSchema.create({
    styleSpecs: {
        ...defaultStyleSpecs,
        small,
        fontSize,
    },
})

export const customStylesTestCases: EditorTestCases<DefaultBlockSchema, DefaultInlineContentSchema, typeof schema.styleSchema> = {
    name: 'custom style schema',
    createEditor: () => {
        return WangxDocEditor.create({
            uploadFile: uploadToTmpFilesDotOrg_DEV_ONLY,
            schema,
        })
    },
    documents: [
        {
            name: 'small/basic',
            blocks: [
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            text: 'This is a small text',
                            styles: {
                                small: true,
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'fontSize/basic',
            blocks: [
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            text: 'This is text with a custom fontSize',
                            styles: {
                                fontSize: '18px',
                            },
                        },
                    ],
                },
            ],
        },
    ],
}
