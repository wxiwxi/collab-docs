/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */

// tailwind config is required for editor support
import sharedConfig from '@wangx-doc/shadcn-shared-ui/tailwind.config'
import type { Config } from 'tailwindcss'

const config: Pick<Config, 'presets'> = {
    presets: [
        {
            ...sharedConfig,
            content: ['./src/**/*.{js,ts,jsx,tsx}', '../../../packages/shadcn-shared-ui/src/**/*{.js,.ts,.jsx,.tsx}'],
        },
    ],
}

export default config
