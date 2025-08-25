/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { BlockSchema, InlineContentSchema, StyleSchema } from '@wangx-doc/core'
import { useEffect, useState } from 'react'

import { useWangxDocEditor } from '../../hooks/useWangxDocEditor'

export function useResolveUrl(fetchUrl: string) {
    const editor = useWangxDocEditor<BlockSchema, InlineContentSchema, StyleSchema>()

    const [loadingState, setLoadingState] = useState<'loading' | 'loaded' | 'error'>('loading')
    const [downloadUrl, setDownloadUrl] = useState<string | undefined>()

    useEffect(() => {
        let mounted = true
        ;(async () => {
            let url = ''
            setLoadingState('loading')

            try {
                url = await editor.resolveFileUrl(fetchUrl)
            } catch {
                setLoadingState('error')
                return
            }

            if (mounted) {
                setLoadingState('loaded')
                setDownloadUrl(url)
            }
        })()

        return () => {
            mounted = false
        }
    }, [editor, fetchUrl])

    if (loadingState !== 'loaded') {
        return {
            loadingState,
        }
    }

    if (!downloadUrl) {
        throw new Error('Finished fetching file but did not get download URL.')
    }

    return {
        loadingState,
        downloadUrl,
    }
}
