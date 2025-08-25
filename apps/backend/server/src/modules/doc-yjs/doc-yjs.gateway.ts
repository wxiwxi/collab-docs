/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { Logger, OnModuleInit } from '@nestjs/common'
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Request } from 'express'
import { Server } from 'ws'

import { setupWSConnection } from '../../fundamentals/yjs-postgresql/utils'

@WebSocketGateway({
    path: 'doc-yjs',
})
export class DocYjsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
    onModuleInit() {}

    @WebSocketServer() server: Server

    @SubscribeMessage('ping')
    ping() {
        return 'pong'
    }

    handleConnection(connection: WebSocket, request: Request) {
        // We can handle authentication of user like below
        // const token = getCookie(request?.headers?.cookie, 'auth_token');
        // const ERROR_CODE_WEBSOCKET_AUTH_FAILED = 4000;
        // if (!token) {
        //   connection.close(ERROR_CODE_WEBSOCKET_AUTH_FAILED);
        // } else {
        //   const signedJwt = this.authService.verifyToken(token);
        //   if (!signedJwt) connection.close(ERROR_CODE_WEBSOCKET_AUTH_FAILED);
        //   else {
        //     const docName = getCookie(request?.headers?.cookie, 'roomName');
        //     setupWSConnection(connection, request, { ...(docName && { docName }) });
        //   }
        // }

        setupWSConnection(connection, request)
    }

    handleDisconnect() {
        // Logger.log(`Client disconnected: ${JSON.stringify(client)}`)
        Logger.log(`Client disconnected`)
    }

    // 示例文档更新
    @SubscribeMessage('doc-update')
    docUpdate(client: any, payload: any) {
        Logger.log(`doc-update, payload: ${JSON.stringify(payload)}`)

        return payload
    }
}
