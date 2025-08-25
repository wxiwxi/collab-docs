/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { BaseEdge, EdgeProps, getStraightPath } from '@xyflow/react'
import { memo } from 'react'

interface GraphEdgeProps extends EdgeProps {
    data: {
        label: string
    }
}

export const GraphEdge = memo((props: GraphEdgeProps) => {
    const { id, selected, sourceX, sourceY, targetX, targetY } = props
    const [edgePath] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    })

    const edgeStyle = {
        strokeStyle: selected ? 'solid' : 'dashed',
        strokeDasharray: selected ? '0' : '4 4',
        stroke: selected ? '#3182CE' : '#E2E8F0',
    }

    return (
        <>
            <BaseEdge id={id} path={edgePath} style={edgeStyle} />
        </>
    )
})
