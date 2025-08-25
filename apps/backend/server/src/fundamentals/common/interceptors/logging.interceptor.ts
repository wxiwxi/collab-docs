/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now()
        return next.handle().pipe(tap(() => Logger.log(`After... ${Date.now() - now}ms`)))
    }
}
