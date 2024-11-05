import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { cn } from '../lib/utils'
import { CodeBlock } from '../components/ui/codeblock'
import { MemoizedReactMarkdown } from '../components/markdown'
import { IconUser } from '../components/ui/icons'
import { Message } from '../lib/chat-types'
import { h } from 'preact'

export interface ChatMessageWidgetProps {
  message: Message
  aiIcon: React.ReactNode
}

export function ChatMessageWidget({ message, aiIcon, ...props }: ChatMessageWidgetProps) {
  return (
    <div
      className={cn('group relative mb-4 flex items-start md:-ml-12')}
      {...props}
    >
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md shadow',
          message.role === 'user' ? 'bg-background' : 'w-8'
        )}
      >
        {message.role === 'user' ? <IconUser /> : aiIcon}
      </div>
      <div className="ml-4 flex-1 space-y-2 text-black overflow-hidden px-1">
        <MemoizedReactMarkdown
          markdown={message.content}
          className="prose break-words text-black prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            a(props: any) {
              return (
                <a
                  className="text-black"
                  target="_blank"
                  href={props.href}
                  rel="nofollow noreferrer noopener"
                >
                  {props.children}
                </a>
              )
            },
            p({ children }: { children: React.ReactNode }) {
              return <p className="mb-2 text-black last:mb-0">{children}</p>
            },
            code({
              node,
              inline,
              className,
              children,
              ...props
            }: {
              node: any
              inline: boolean
              className?: string
              children?: React.ReactNode
              [key: string]: any
            }) {
              if (children && Array.isArray(children) && children.length) {
                if (children[0] === '▍') {
                  return (
                    <span className="mt-1 animate-pulse cursor-default">▍</span>
                  )
                }

                children[0] = (children[0] as string).replace('`▍`', '▍')
              }

              const match = /language-(\w+)/.exec(className || '')

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              )
            }
          }}
       />
          {/* {message.content}
        </MemoizedReactMarkdown> */}
      </div>
    </div>
  )
}
