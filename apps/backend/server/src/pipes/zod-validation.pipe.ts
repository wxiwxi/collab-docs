/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */

import { BadRequestException, PipeTransform } from '@nestjs/common'
import { ZodSchema } from 'zod'

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) {}

    transform(value: unknown /* , metadata: ArgumentMetadata */) {
        try {
            const parsedValue = this.schema.parse(value)
            return parsedValue
        } catch {
            throw new BadRequestException('Validation failed')
        }
    }
}
