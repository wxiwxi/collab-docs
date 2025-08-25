/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ApplicationEntity } from '../../entities/application.entity'
import { ApplicationController } from './application.controller'
import { ApplicationService } from './application.service'

@Module({
    imports: [TypeOrmModule.forFeature([ApplicationEntity])],
    controllers: [ApplicationController],
    providers: [ApplicationService],
    exports: [],
})
export class ApplicationModule {}
