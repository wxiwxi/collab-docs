/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */

import { Extension } from '@tiptap/core'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        markdown: {
            /**
             * 导出编辑器内容为 Markdown 字符串
             */
            exportMarkdown: () => ReturnType
            /**
             * 从 Markdown 字符串导入内容
             */
            importMarkdown: (markdown: string) => ReturnType
            /**
             * 导出并下载 Markdown 文件
             */
            downloadMarkdown: (filename?: string) => ReturnType
            /**
             * 从文件选择器导入 Markdown 文件
             */
            importMarkdownFile: () => ReturnType
        }
    }
}

/**
 * 将 ProseMirror 文档转换为 Markdown
 */
function nodeToMarkdown(node: any): string {
    let result = ''

    switch (node.type.name) {
        case 'doc':
            node.content.forEach((child: any) => {
                result += nodeToMarkdown(child) + '\n\n'
            })
            break

        case 'paragraph':
            node.content?.forEach((child: any) => {
                result += nodeToMarkdown(child)
            })
            break

        case 'heading': {
            const level = node.attrs.level || 1
            result += '#'.repeat(level) + ' '
            node.content?.forEach((child: any) => {
                result += nodeToMarkdown(child)
            })
            break
        }

        case 'text': {
            let text = node.text || ''
            // 处理文本标记
            if (node.marks) {
                for (const mark of node.marks) {
                    switch (mark.type.name) {
                        case 'strong':
                            text = `**${text}**`
                            break
                        case 'em':
                            text = `*${text}*`
                            break
                        case 'code':
                            text = `\`${text}\``
                            break
                        case 'strike':
                            text = `~~${text}~~`
                            break
                        case 'link':
                            text = `[${text}](${mark.attrs.href})`
                            break
                    }
                }
            }
            result += text
            break
        }

        case 'code_block': {
            const language = node.attrs.language || ''
            result += `\`\`\`${language}\n${node.textContent}\n\`\`\``
            break
        }

        case 'blockquote':
            node.content?.forEach((child: any) => {
                result += '> ' + nodeToMarkdown(child)
            })
            break

        case 'bullet_list':
            node.content?.forEach((child: any) => {
                result += '- ' + nodeToMarkdown(child)
            })
            break

        case 'ordered_list':
            node.content?.forEach((child: any, index: number) => {
                result += `${index + 1}. ` + nodeToMarkdown(child)
            })
            break

        case 'list_item':
            node.content?.forEach((child: any) => {
                result += nodeToMarkdown(child)
            })
            break

        case 'horizontal_rule':
            result += '---'
            break

        case 'hard_break':
            result += '\\\n'
            break

        default:
            if (node.content) {
                node.content.forEach((child: any) => {
                    result += nodeToMarkdown(child)
                })
            }
            break
    }

    return result
}

/**
 * TipTap Markdown 扩展
 * 基于简化的 Markdown 转换实现
 */
export const MarkdownExtension = Extension.create({
    name: 'markdown',

    addStorage() {
        return {
            lastExport: null,
            lastImport: null,
        }
    },

    addCommands() {
        return {
            exportMarkdown:
                () =>
                ({ editor }) => {
                    try {
                        if (!editor || !editor.state || !editor.state.doc) {
                            console.error('编辑器状态无效')
                            return false
                        }

                        const doc = editor.state.doc
                        const markdown = nodeToMarkdown(doc.toJSON())
                        // 将结果存储到编辑器存储中，以便外部访问
                        editor.storage.markdown = { lastExport: markdown.trim() }
                        return true
                    } catch (error) {
                        console.error('导出 Markdown 失败:', error)
                        return false
                    }
                },

            importMarkdown:
                (markdown: string) =>
                ({ commands, editor }) => {
                    try {
                        if (!editor || !editor.commands || !commands) {
                            console.error('编辑器命令不可用')
                            return false
                        }

                        // 创建一个临时的 DOM 来解析 Markdown
                        const tempDiv = document.createElement('div')

                        // 简单的 Markdown 到 HTML 转换
                        let html = markdown
                            // 标题
                            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                            // 粗体
                            .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
                            // 斜体
                            .replace(/\*(.*?)\*/gim, '<em>$1</em>')
                            // 代码
                            .replace(/`(.*?)`/gim, '<code>$1</code>')
                            // 删除线
                            .replace(/~~(.*?)~~/gim, '<del>$1</del>')
                            // 链接
                            .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
                            // 水平线
                            .replace(/^---$/gim, '<hr>')
                            // 代码块
                            .replace(/```(\w+)?\n?([\s\S]*?)```/gim, '<pre><code>$2</code></pre>')
                            // 引用
                            .replace(/^> (.*)$/gim, '<blockquote><p>$1</p></blockquote>')
                            // 无序列表
                            .replace(/^- (.*)$/gim, '<li>$1</li>')
                            // 有序列表
                            .replace(/^\d+\. (.*)$/gim, '<li>$1</li>')

                        // 处理列表包装
                        html = html.replace(/(<li>.*?<\/li>)(?:\s*<li>.*?<\/li>)*/gims, match => {
                            return `<ul>${match}</ul>`
                        })

                        // 处理段落
                        const lines = html.split('\n')
                        const processedLines = lines.map(line => {
                            const trimmed = line.trim()
                            if (
                                trimmed &&
                                !trimmed.startsWith('<h') &&
                                !trimmed.startsWith('<ul>') &&
                                !trimmed.startsWith('<ol>') &&
                                !trimmed.startsWith('<blockquote>') &&
                                !trimmed.startsWith('<hr>') &&
                                !trimmed.startsWith('<pre>') &&
                                !trimmed.startsWith('<li>') &&
                                !trimmed.endsWith('</ul>') &&
                                !trimmed.endsWith('</ol>')
                            ) {
                                return `<p>${trimmed}</p>`
                            }
                            return trimmed
                        })

                        tempDiv.innerHTML = processedLines.join('\n')

                        // 使用 commands.setContent 而不是直接操作事务
                        const success = commands.setContent(tempDiv.innerHTML)

                        // 如果成功，保存到存储
                        if (success) {
                            editor.storage.markdown = {
                                lastImport: markdown,
                                lastExport: editor.storage.markdown?.lastExport || null,
                            }
                        }

                        return success
                    } catch (error) {
                        console.error('导入 Markdown 失败:', error)
                        return false
                    }
                },

            downloadMarkdown:
                (filename = 'document.md') =>
                ({ editor, commands }) => {
                    try {
                        // 先执行导出命令
                        const exportSuccess = commands.exportMarkdown()

                        if (exportSuccess && editor.storage.markdown?.lastExport) {
                            const markdown = editor.storage.markdown.lastExport
                            const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })
                            const url = URL.createObjectURL(blob)

                            const link = document.createElement('a')
                            link.href = url
                            link.download = filename
                            document.body.appendChild(link)
                            link.click()
                            document.body.removeChild(link)
                            URL.revokeObjectURL(url)

                            return true
                        }
                        return false
                    } catch (error) {
                        console.error('下载 Markdown 失败:', error)
                        return false
                    }
                },

            importMarkdownFile:
                () =>
                ({ commands }) => {
                    const input = document.createElement('input')
                    input.type = 'file'
                    input.accept = '.md,.markdown'

                    input.onchange = async event => {
                        const file = (event.target as HTMLInputElement).files?.[0]
                        if (!file) {
                            return
                        }

                        try {
                            const text = await file.text()
                            commands.importMarkdown(text)
                        } catch (error) {
                            console.error('导入文件失败:', error)
                        }
                    }

                    input.click()
                    return true
                },
        }
    },
})
