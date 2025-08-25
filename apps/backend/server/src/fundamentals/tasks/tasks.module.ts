/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { Module } from '@nestjs/common'

import { TasksService } from './tasks.service'

@Module({
    providers: [TasksService],
})
export class TasksModule {}
