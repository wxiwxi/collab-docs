/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PostgresqlPersistence } from 'y-postgresql'

import { PageEntity } from '../../entities/page.entity'
import { yjsXmlMentionCollect } from '../../utils/yjsXMLMentionCollect'

@Injectable()
export class PageService {
    constructor(
        @InjectRepository(PageEntity)
        private readonly pageRepository: Repository<PageEntity>,
        @Inject('YJS_POSTGRESQL_ADAPTER') private readonly yjsPostgresqlAdapter: PostgresqlPersistence
    ) {}

    async create(payload) {
        this.pageRepository.save(payload)
        return payload
    }

    async update(payload) {
        const res = await this.pageRepository.update({ pageId: payload.pageId }, payload)

        if (res.affected === 0) {
            return new NotFoundException('page not found')
        }

        return payload
    }

    async fetch(params: { pageId: string; userId: number }) {
        const page = await this.pageRepository.findOne({
            where: { pageId: params.pageId, user: { id: params.userId } },
        })

        if (!page) {
            return new NotFoundException('page not found')
        }

        return page
    }

    async list(params: { userId: number }) {
        const [data, count] = await this.pageRepository.findAndCount({
            where: { user: { id: params.userId } },
            order: { createdAt: 'DESC' },
        })

        return {
            pages: data,
            count,
        }
    }

    async delete(payload: { pageId: string; userId: number }) {
        const res = await this.pageRepository.delete({ pageId: payload.pageId, user: { id: payload.userId } })

        if (res.affected === 0) {
            return new NotFoundException('page not found')
        }

        return res.raw[0]
    }

    async graph() {
        const pages = await this.pageRepository.find()
        const doc = await this.yjsPostgresqlAdapter.getYDoc('doc-yjs')
        const withLinksPages = pages.map(page => {
            const pageDoc = doc.getXmlElement(`document-store-${page.pageId}`).toJSON()
            if (pageDoc) {
                return {
                    ...page,
                    links: yjsXmlMentionCollect(pageDoc),
                }
            }
        })

        return withLinksPages
    }
}
