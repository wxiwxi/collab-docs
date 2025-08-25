/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { InjectQueue } from '@nestjs/bull'
import { Controller, Post } from '@nestjs/common'
import { Queue } from 'bull'

@Controller('audio')
export class AudioController {
    constructor(@InjectQueue('audio') private readonly audioQueue: Queue) {}

    @Post('transcode')
    async transcode() {
        await this.audioQueue.add(
            'transcode',
            {
                file: 'audio.mp3',
            },
            { delay: 1000 }
        )
    }
}
