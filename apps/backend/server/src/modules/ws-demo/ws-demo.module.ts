/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { Module } from '@nestjs/common'

import { WSDemoGateway } from './ws-demo.gateway'

@Module({
    imports: [],
    providers: [WSDemoGateway],
    exports: [],
})
export class WSDemoModule {}
