/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import * as awarenessProtocol from 'y-protocols/awareness'
import * as Y from 'yjs'

export interface IWSSharedDoc extends Y.Doc {
    name: string
    conns: Map<object, Set<number>>
    awareness: awarenessProtocol.Awareness
}

export interface IPersistence {
    bindState: (arg1: string, arg2: IWSSharedDoc) => void
    writeState: (arg1: string, arg2: IWSSharedDoc) => Promise<any>
    provider?: any
}
