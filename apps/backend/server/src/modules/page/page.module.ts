/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PageEntity } from '../../entities/page.entity'
import { PageController } from './page.controller'
import { PageService } from './page.service'

@Module({
    imports: [TypeOrmModule.forFeature([PageEntity])],
    controllers: [PageController],
    providers: [PageService],
    exports: [],
})
export class PageModule {}
