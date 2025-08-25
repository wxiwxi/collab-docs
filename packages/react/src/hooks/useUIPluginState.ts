/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { useEffect, useState } from 'react'

export function useUIPluginState<State>(onUpdate: (callback: (state: State) => void) => void): State | undefined {
    const [state, setState] = useState<State>()

    useEffect(() => {
        return onUpdate(state => {
            setState({ ...state })
        })
    }, [onUpdate])

    return state
}
