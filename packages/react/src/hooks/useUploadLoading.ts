/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { useState } from 'react'

import { useOnUploadEnd } from './useOnUploadEnd'
import { useOnUploadStart } from './useOnUploadStart'

export function useUploadLoading(blockId?: string) {
    const [showLoader, setShowLoader] = useState(false)

    useOnUploadStart(uploadBlockId => {
        if (uploadBlockId === blockId) {
            setShowLoader(true)
        }
    })

    useOnUploadEnd(uploadBlockId => {
        if (uploadBlockId === blockId) {
            setShowLoader(false)
        }
    })

    return showLoader
}
