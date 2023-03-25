'use client'

import Link from 'next/link'
import React from 'react'

import Hero from '@/components/Hero'

import { config, Tool } from '@/config'

type CardProps = {
  tools: Tool[]
  title: string
}

const HomePage = () => {
  const [value, setValue] = React.useState('')

  const filter = (tool: Tool): boolean =>
    tool.label.toLowerCase().includes(value.toLowerCase()) ||
    tool.keywords.some((keyword) =>
      keyword.toLowerCase().includes(value.toLowerCase())
    )

  return (
    <div>
      <Hero />
      <div className='flex flex-col items-start'>
        {/* 搜尋 */}
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          className='w-full py-2 border-accent-2 border rounded-lg px-2 outline-none focus:border-accent-5 bg-transparent transition-colors duration-300'
          placeholder='搜尋'
        />
        {/* 工具 */}
        <div
          id='get-started'
          className='scroll-mt-20 flex flex-col w-full my-12 gap-6'
        >
          {value
            ? config.tools
                .filter((tool) => tool.links.some((tool) => filter(tool)))
                .map((tool) => {
                  const { label, links } = tool
                  const filtered = links.filter((tool) => filter(tool))

                  return (
                    <Card key={label} tools={filtered} title={label}></Card>
                  )
                })
            : config.tools.map((tool) => {
                const { label, links } = tool

                return <Card key={label} tools={links} title={label} />
              })}
        </div>
      </div>
    </div>
  )
}

const Card = (props: CardProps) => {
  const { tools, title } = props

  return (
    <div className='rounded-lg border border-accent-2 p-4 w-full'>
      <div>{title}</div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
        {tools.map((tool) => (
          <Item key={tool.label} {...tool} />
        ))}
      </div>
    </div>
  )
}

const Item = (props: Tool) => {
  const { color, icon, label, link } = props
  const Icon = icon

  return (
    <Link
      href={link}
      className='flex flex-col justify-center items-center hover:scale-105 transition-transform duration-300 bg-accent-1 rounded-lg p-4 text-center'
    >
      <Icon color={color} size={32} />
      <div className='mt-1.5'>{label}</div>
    </Link>
  )
}

export default HomePage