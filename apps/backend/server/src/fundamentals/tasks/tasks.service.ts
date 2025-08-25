/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { Injectable, Logger } from '@nestjs/common'
import { Cron, Interval, Timeout } from '@nestjs/schedule'

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name)

    @Cron('45 * * * * *')
    handleCron() {
        this.logger.debug('Called when the second is 45')
    }

    @Interval(10000)
    handleInterval() {
        this.logger.debug('Called every 10 seconds')
    }

    @Timeout(5000)
    handleTimeout() {
        this.logger.debug('Called once after 5 seconds')
    }
}
