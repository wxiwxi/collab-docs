/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { BlockSchema, InlineContentSchema, StyleSchema } from '@wangx-doc/core'
import { FC, useCallback, useEffect } from 'react'

import { useWangxDocContext } from '../../editor/WangxDocContext'
import { useWangxDocEditor } from '../../hooks/useWangxDocEditor'
import { useCloseSuggestionMenuNoItems } from './hooks/useCloseSuggestionMenuNoItems'
import { useLoadSuggestionMenuItems } from './hooks/useLoadSuggestionMenuItems'
import { useSuggestionMenuKeyboardNavigation } from './hooks/useSuggestionMenuKeyboardNavigation'
import { SuggestionMenuProps } from './types'

export function SuggestionMenuWrapper<Item>(props: {
    query: string
    closeMenu: () => void
    clearQuery: () => void
    getItems: (query: string) => Promise<Item[]>
    onItemClick?: (item: Item) => void
    suggestionMenuComponent: FC<SuggestionMenuProps<Item>>
}) {
    const ctx = useWangxDocContext()
    const setContentEditableProps = ctx!.setContentEditableProps!
    const editor = useWangxDocEditor<BlockSchema, InlineContentSchema, StyleSchema>()

    const { getItems, suggestionMenuComponent, query, clearQuery, closeMenu, onItemClick } = props

    const onItemClickCloseMenu = useCallback(
        (item: Item) => {
            closeMenu()
            clearQuery()
            onItemClick?.(item)
        },
        [onItemClick, closeMenu, clearQuery]
    )

    const { items, usedQuery, loadingState } = useLoadSuggestionMenuItems(query, getItems)

    useCloseSuggestionMenuNoItems(items, usedQuery, closeMenu)

    const { selectedIndex } = useSuggestionMenuKeyboardNavigation(editor, query, items, onItemClickCloseMenu)

    // set basic aria attributes when the menu is open
    useEffect(() => {
        setContentEditableProps(p => ({
            ...p,
            'aria-expanded': true,
            'aria-controls': 'bn-suggestion-menu',
        }))
        return () => {
            setContentEditableProps(p => ({
                ...p,
                'aria-expanded': false,
                'aria-controls': undefined,
            }))
        }
    }, [setContentEditableProps])

    // set selected item (active descendent) attributes when selected item changes
    useEffect(() => {
        setContentEditableProps(p => ({
            ...p,
            'aria-activedescendant': selectedIndex ? 'bn-suggestion-menu-item-' + selectedIndex : undefined,
        }))
        return () => {
            setContentEditableProps(p => ({
                ...p,
                'aria-activedescendant': undefined,
            }))
        }
    }, [setContentEditableProps, selectedIndex])

    const Component = suggestionMenuComponent

    return <Component items={items} onItemClick={onItemClickCloseMenu} loadingState={loadingState} selectedIndex={selectedIndex} />
}
