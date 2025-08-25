/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class ParseIntPipe implements PipeTransform<string> {
    async transform(value: string) {
        const val = parseInt(value, 10)
        if (isNaN(val)) {
            throw new BadRequestException('Validation failed')
        }
        return val
    }
}
