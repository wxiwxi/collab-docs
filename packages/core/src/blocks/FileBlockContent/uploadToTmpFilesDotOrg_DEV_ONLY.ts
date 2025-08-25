/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
/**
 * Uploads a file to tmpfiles.org and returns the URL to the uploaded file.
 *
 * @warning This function should only be used for development purposes, replace with your own backend!
 */
export const uploadToTmpFilesDotOrg_DEV_ONLY = async (file: File): Promise<string> => {
    const body = new FormData()
    body.append('file', file)

    const ret = await fetch('https://tmpfiles.org/api/v1/upload', {
        method: 'POST',
        body: body,
    })
    return (await ret.json()).data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/')
}
