/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */

import { useQuery } from '@tanstack/react-query'
import { Avatar, AvatarFallback, AvatarImage } from '@wangx-doc/shadcn-shared-ui/components/ui/avatar'
import { Button } from '@wangx-doc/shadcn-shared-ui/components/ui/button'
import { Collapsible } from '@wangx-doc/shadcn-shared-ui/components/ui/collapsible'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@wangx-doc/shadcn-shared-ui/components/ui/dropdown-menu'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@wangx-doc/shadcn-shared-ui/components/ui/sidebar'
import { useToast } from '@wangx-doc/shadcn-shared-ui/hooks/use-toast'
import { cn } from '@wangx-doc/shadcn-shared-ui/lib/utils'
import {
    ArrowUpRight,
    FileStack,
    MessageCircleQuestion,
    MoreHorizontal,
    Plus,
    Search,
    Settings,
    StarOff,
    Trash2,
    Waypoints,
} from 'lucide-react'
import { NavLink, useMatch, useNavigate } from 'react-router-dom'

import * as srv from '@/services'
import { miaoConfetti } from '@/utils/miao-confetti'
import { randomEmoji } from '@/utils/randomEmoji'

export function Aside() {
    const { data: pages, refetch } = useQuery({
        queryKey: ['pages'],
        queryFn: async () => {
            return (await srv.fetchPageList()).data.pages
        },
    })
    const navigate = useNavigate()
    const activeDocParams = useMatch('/doc/:id')?.params
    const { toast } = useToast()
    const { isMobile } = useSidebar()

    /**
     * 获取当前用户信息
     */
    const { data: currentUser } = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const res = await srv.currentUser()
            return res.data
        },
    })

    /**
     * 新建文档
     */
    const handleCreate = async () => {
        const res = await srv.createPage({
            emoji: randomEmoji(),
            title: '未命名文档',
        })
        navigate(`/doc/${res.data.pageId}`)
        refetch()
    }

    /**
     * 删除文档
     * @param pageId
     */
    const handleDelete = async (pageId: string) => {
        await srv.removePage(pageId)
        refetch()
        if (activeDocParams?.id === pageId) {
            navigate('/doc')
        }
    }

    const handleConfetti = () => {
        miaoConfetti.firework()
    }
    const handleLogout = () => {
        toast({
            title: '退出登录',
        })
        localStorage.removeItem('token')
        // queryClient.clear()
        navigate(`/account/login?redirect=${window.location.pathname}`)
    }
    return (
        <Sidebar variant="inset">
            <SidebarHeader>
                <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-2">
                    <a href="/" className="flex items-center gap-2 relative" title="协同文档">
                        <img className="w-8 shrink-0" src="/collaborative-editor-icon.png" alt="Logo" />
                        <p className="min-w-24 overflow-hidden font-semibold text-lg group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:pointer-events-none">
                            协同文档
                        </p>
                    </a>
                </div>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a>
                                <Search />
                                <span>搜索</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <NavLink to={`/doc`}>
                                <FileStack />
                                <span>全部文档</span>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <NavLink to={`/doc/graph`}>
                                <Waypoints />
                                <span>文档图谱</span>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="flex flex-row justify-between">
                        <span>所有文档</span>
                        <SidebarGroupAction onClick={handleCreate}>
                            <Plus />
                        </SidebarGroupAction>
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        {pages?.map(item => (
                            <Collapsible key={item.pageId}>
                                <SidebarMenuItem key={item.pageId}>
                                    <SidebarMenuButton
                                        asChild
                                        className={cn(activeDocParams?.id === item.pageId && 'bg-zinc-100 font-bold')}
                                    >
                                        <NavLink key={`/doc/${item.pageId}`} to={`/doc/${item.pageId}`} title={item.title}>
                                            <span className="text-lg">{item.emoji}</span>
                                            <span className="text-xs">{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                    {/* {item.links && (
                                        <>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuAction
                                                    className="left-2 bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90"
                                                    showOnHover
                                                >
                                                    <ChevronRight />
                                                </SidebarMenuAction>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.links.map(page => (
                                                        <SidebarMenuSubItem key={page.name}>
                                                            <SidebarMenuSubButton asChild>
                                                                <a href="#">
                                                                    <span className="text-lg">{page.emoji}</span>
                                                                    <span>{page.name}</span>
                                                                </a>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </>
                                    )} */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <SidebarMenuAction showOnHover>
                                                <MoreHorizontal />
                                                <span className="sr-only">More</span>
                                            </SidebarMenuAction>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="w-56 rounded-lg"
                                            side={isMobile ? 'bottom' : 'right'}
                                            align={isMobile ? 'end' : 'start'}
                                        >
                                            <DropdownMenuItem disabled>
                                                <StarOff className="text-muted-foreground" />
                                                <span>取消收藏</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <NavLink to={`/doc/${item.pageId}`} target="_blank">
                                                    <ArrowUpRight className="text-muted-foreground" />
                                                    <span>新标签打开</span>
                                                </NavLink>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="data-[highlighted]:bg-destructive data-[highlighted]:text-destructive-foreground"
                                                onClick={() => handleDelete(item.pageId)}
                                            >
                                                <Trash2 />
                                                <span>Delete</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </SidebarMenuItem>
                            </Collapsible>
                        ))}
                        {/* <SidebarMenuItem>
                            <SidebarMenuButton className="text-sidebar-foreground/70">
                                <MoreHorizontal />
                                <span>More</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem> */}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full h-fit flex justify-start gap-3 rounded-lg pl-0 pr-2 py-1 text-muted-foreground transition-all hover:text-primary"
                            onClick={handleConfetti}
                        >
                            {currentUser && (
                                <>
                                    <Avatar>
                                        <AvatarImage src={`https://robohash.org/${currentUser.username}?set=set1&size=100x100`} />
                                        <AvatarFallback>{currentUser.username}</AvatarFallback>
                                    </Avatar>
                                    <p className="text-left min-w-0 overflow-hidden">
                                        <span className="text-lg">{currentUser.username}！</span>
                                        庆祝一下 🎉
                                    </p>
                                </>
                            )}
                        </Button>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Settings />
                            <p className="min-w-0 overflow-hidden group-data-[collapsible=icon]:opacity-0">设置</p>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <MessageCircleQuestion />
                            <p className="min-w-0 overflow-hidden group-data-[collapsible=icon]:opacity-0">关于</p>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Button variant="outline" size="sm" className="w-full mt-1" onClick={handleLogout}>
                            退出登录
                        </Button>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
