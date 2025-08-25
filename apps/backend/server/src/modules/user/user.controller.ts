/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { Body, Controller, Post } from '@nestjs/common'

import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async add(@Body() body) {
        const newUser = await this.userService.register(body)
        return { data: newUser, success: true }
    }
}
