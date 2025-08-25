/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { ReactNode } from 'react'

import { useComponentsContext } from '../../editor/ComponentsContext'
import { BasicTextStyleButton } from './DefaultButtons/BasicTextStyleButton'
import { ColorStyleButton } from './DefaultButtons/ColorStyleButton'
import { CreateLinkButton } from './DefaultButtons/CreateLinkButton'
import { FileCaptionButton } from './DefaultButtons/FileCaptionButton'
import { FileDeleteButton } from './DefaultButtons/FileDeleteButton'
import { FileDownloadButton } from './DefaultButtons/FileDownloadButton'
import { FilePreviewButton } from './DefaultButtons/FilePreviewButton'
import { FileRenameButton } from './DefaultButtons/FileRenameButton'
import { FileReplaceButton } from './DefaultButtons/FileReplaceButton'
import { NestBlockButton, UnnestBlockButton } from './DefaultButtons/NestBlockButtons'
import { TextAlignButton } from './DefaultButtons/TextAlignButton'
import { BlockTypeSelect, BlockTypeSelectItem } from './DefaultSelects/BlockTypeSelect'
import { FormattingToolbarProps } from './FormattingToolbarProps'

export const getFormattingToolbarItems = (blockTypeSelectItems?: BlockTypeSelectItem[]): JSX.Element[] => [
    <BlockTypeSelect key={'blockTypeSelect'} items={blockTypeSelectItems} />,
    <FileCaptionButton key={'fileCaptionButton'} />,
    <FileReplaceButton key={'replaceFileButton'} />,
    <FileRenameButton key={'fileRenameButton'} />,
    <FileDeleteButton key={'fileDeleteButton'} />,
    <FileDownloadButton key={'fileDownloadButton'} />,
    <FilePreviewButton key={'filePreviewButton'} />,
    <BasicTextStyleButton basicTextStyle={'bold'} key={'boldStyleButton'} />,
    <BasicTextStyleButton basicTextStyle={'italic'} key={'italicStyleButton'} />,
    <BasicTextStyleButton basicTextStyle={'underline'} key={'underlineStyleButton'} />,
    <BasicTextStyleButton basicTextStyle={'strike'} key={'strikeStyleButton'} />,
    <TextAlignButton textAlignment={'left'} key={'textAlignLeftButton'} />,
    <TextAlignButton textAlignment={'center'} key={'textAlignCenterButton'} />,
    <TextAlignButton textAlignment={'right'} key={'textAlignRightButton'} />,
    <ColorStyleButton key={'colorStyleButton'} />,
    <NestBlockButton key={'nestBlockButton'} />,
    <UnnestBlockButton key={'unnestBlockButton'} />,
    <CreateLinkButton key={'createLinkButton'} />,
]

// TODO: props.blockTypeSelectItems should only be available if no children
//  are passed
/**
 * By default, the FormattingToolbar component will render with default
 * selects/buttons. However, you can override the selects/buttons to render
 * by passing children. The children you pass should be:
 *
 * - Default selects: Components found within the `/DefaultSelects` directory.
 * - Default buttons: Components found within the `/DefaultButtons` directory.
 * - Custom selects: The `ToolbarSelect` component in the
 * `components/mantine-shared/Toolbar` directory.
 * - Custom buttons: The `ToolbarButton` component in the
 * `components/mantine-shared/Toolbar` directory.
 */
export const FormattingToolbar = (props: FormattingToolbarProps & { children?: ReactNode }) => {
    const Components = useComponentsContext()!

    return (
        <Components.FormattingToolbar.Root className={'bn-toolbar bn-formatting-toolbar'}>
            {props.children || getFormattingToolbarItems(props.blockTypeSelectItems)}
        </Components.FormattingToolbar.Root>
    )
}
