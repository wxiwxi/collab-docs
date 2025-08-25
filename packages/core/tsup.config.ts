/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { defineConfig } from 'tsup'

export default defineConfig([
    {
        entry: ['src/index.ts'],
        format: ['esm'],
        ignoreWatch: ['**/*.md'],
        sourcemap: true,
        bundle: true,
        // dts: false,
        dts: true,
        clean: true,
        minify: true,
        outDir: 'build/esm',
    },
])
