/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform, Type } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        const { metatype } = metadata
        if (!metatype || !this.toValidate(metatype)) {
            return value
        }
        const object = plainToClass(metatype, value)
        const errors = await validate(object)
        if (errors.length > 0) {
            const errObj = {}
            errors.forEach(err => {
                const { property, constraints } = err
                errObj[property] = Object.values(constraints)
            })
            throw new HttpException({ message: 'Request params validation failed', error: errObj }, HttpStatus.BAD_REQUEST)
        }
        return value
    }

    private toValidate(metatype: Type<any>): boolean {
        const types = [String, Boolean, Number, Array, Object]
        return !types.find(type => metatype === type)
    }
}
