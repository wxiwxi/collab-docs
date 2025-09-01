/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { Button } from '@wangx-doc/shadcn-shared-ui/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@wangx-doc/shadcn-shared-ui/components/ui/dropdown-menu'
import { useToast } from '@wangx-doc/shadcn-shared-ui/hooks/use-toast'
import { Download, MoreVertical, Upload } from 'lucide-react'
import React, { useRef } from 'react'

// 创建一个上下文来传递编辑器实例
export const EditorContext = React.createContext<any>(null)

interface DocumentActionsProps {
    title?: string
    editor?: any // WangxDocEditor 实例，使用 any 避免复杂的泛型类型问题
}

export function DocumentActions({ title, editor }: DocumentActionsProps) {
    const { toast } = useToast()
    const fileInputRef = useRef<HTMLInputElement>(null)

    /**
     * 导出当前文档为 Markdown
     */
    const handleExportMarkdown = async () => {
        if (!editor || typeof editor.exportMarkdown !== 'function') {
            toast({
                title: '错误',
                description: '编辑器不支持 Markdown 导出功能',
                variant: 'destructive',
            })
            return
        }

        try {
            // 使用新的 TipTap-based 导出功能
            const markdownContent = await editor.exportMarkdown()

            const filename = title ? `${title}.md` : 'document.md'
            const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' })
            const url = URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = url
            link.download = filename
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)

            toast({
                title: '成功',
                description: 'Markdown 文件导出成功！',
            })
        } catch (error) {
            console.error('Markdown 导出失败:', error)
            toast({
                title: '错误',
                description: 'Markdown 文件导出失败',
                variant: 'destructive',
            })
        }
    }

    /**
     * 导入 Markdown 文件
     */
    const handleImportMarkdown = () => {
        if (!editor || typeof editor.importMarkdown !== 'function') {
            toast({
                title: '错误',
                description: '编辑器不支持 Markdown 导入功能',
                variant: 'destructive',
            })
            return
        }

        fileInputRef.current?.click()
    }

    /**
     * 处理文件选择
     */
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        if (!file.name.endsWith('.md') && !file.name.endsWith('.markdown')) {
            toast({
                title: '错误',
                description: '请选择 Markdown 文件（.md 或 .markdown）',
                variant: 'destructive',
            })
            return
        }

        try {
            const content = await file.text()
            await editor.importMarkdown(content)

            toast({
                title: '成功',
                description: 'Markdown 文件导入成功！',
            })
        } catch (error) {
            console.error('Markdown 导入失败:', error)
            toast({
                title: '错误',
                description: 'Markdown 文件导入失败',
                variant: 'destructive',
            })
        }

        // 清空文件输入框，允许重复选择同一文件
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <>
            {/* 隐藏的文件输入框 */}
            <input ref={fileInputRef} type="file" accept=".md,.markdown" onChange={handleFileChange} style={{ display: 'none' }} />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={handleImportMarkdown}>
                        <Upload className="mr-2 h-4 w-4" />
                        <span>导入 Markdown</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportMarkdown}>
                        <Download className="mr-2 h-4 w-4" />
                        <span>导出为 Markdown</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
