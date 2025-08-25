/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { RiExternalLinkFill } from 'react-icons/ri'

import { useComponentsContext } from '../../../editor/ComponentsContext'
import { useDictionary } from '../../../i18n/dictionary'
import { sanitizeUrl } from '../../../util/sanitizeUrl'
import { LinkToolbarProps } from '../LinkToolbarProps'

export const OpenLinkButton = (props: Pick<LinkToolbarProps, 'url'>) => {
    const Components = useComponentsContext()!
    const dict = useDictionary()

    return (
        <Components.LinkToolbar.Button
            className={'bn-button'}
            mainTooltip={dict.link_toolbar.open.tooltip}
            label={dict.link_toolbar.open.tooltip}
            isSelected={false}
            onClick={() => {
                window.open(sanitizeUrl(props.url, window.location.href), '_blank')
            }}
            icon={<RiExternalLinkFill />}
        />
    )
}
