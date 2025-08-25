/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { AudioController } from './audio.controller'
import { AudioProcessor } from './audio.processor'

@Module({
    imports: [
        BullModule.registerQueueAsync({
            name: 'audio',
            useFactory: (config: ConfigService) => ({
                redis: config.get('redis'),
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AudioController],
    providers: [AudioProcessor],
})
export class AudioModule {}
