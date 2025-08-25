/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { Logger } from '@nestjs/common'
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'ws'

@WebSocketGateway({
    path: 'ws-demo',
})
export class WSDemoGateway {
    @WebSocketServer() server: Server

    @SubscribeMessage('ping')
    ping() {
        return 'pong'
    }

    @SubscribeMessage('doc-update')
    docUpdate(client: any, payload: any) {
        Logger.log(`doc-update, payload: ${JSON.stringify(payload)}`)

        return payload
    }
}
