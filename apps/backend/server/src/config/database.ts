/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考，不可开源。
 */
import { join } from 'node:path'

export default () => {
    const isProd = process.env.NODE_ENV === 'production'
    return {
        database: {
            type: 'postgres',
            // host: 'localhost',
            host: isProd ? '172.28.49.109' : '192.168.1.6',
            port: 5433,
            username: 'postgres',
            database: 'postgres',
            password: 'xiaoer',
            entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
            synchronize: true,
        },
    }
}
