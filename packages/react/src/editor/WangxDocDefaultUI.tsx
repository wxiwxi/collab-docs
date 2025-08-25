/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { FilePanelController } from '../components/FilePanel/FilePanelController'
import { FormattingToolbarController } from '../components/FormattingToolbar/FormattingToolbarController'
import { LinkToolbarController } from '../components/LinkToolbar/LinkToolbarController'
import { SideMenuController } from '../components/SideMenu/SideMenuController'
import { GridSuggestionMenuController } from '../components/SuggestionMenu/GridSuggestionMenu/GridSuggestionMenuController'
import { SuggestionMenuController } from '../components/SuggestionMenu/SuggestionMenuController'
import { TableHandlesController } from '../components/TableHandles/TableHandlesController'
import { useWangxDocEditor } from '../hooks/useWangxDocEditor'

export type WangxDocDefaultUIProps = {
    formattingToolbar?: boolean
    linkToolbar?: boolean
    slashMenu?: boolean
    sideMenu?: boolean
    filePanel?: boolean
    tableHandles?: boolean
    emojiPicker?: boolean
}

export function WangxDocDefaultUI(props: WangxDocDefaultUIProps) {
    const editor = useWangxDocEditor()

    if (!editor) {
        throw new Error('WangxDocDefaultUI must be used within a WangxDocContext.Provider')
    }

    return (
        <>
            {props.formattingToolbar !== false && <FormattingToolbarController />}
            {props.linkToolbar !== false && <LinkToolbarController />}
            {props.slashMenu !== false && <SuggestionMenuController triggerCharacter="/" />}
            {props.emojiPicker !== false && <GridSuggestionMenuController triggerCharacter=":" columns={10} minQueryLength={2} />}
            {props.sideMenu !== false && <SideMenuController />}
            {editor.filePanel && props.filePanel !== false && <FilePanelController />}
            {editor.tableHandles && props.tableHandles !== false && <TableHandlesController />}
        </>
    )
}
