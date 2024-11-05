import { Separator } from './ui/separator'
import { ChatMessageWidget } from './chat-message'
import { Message } from '../lib/chat-types'
import { h } from 'preact';



export interface ChatListWidgetProps {
  messages: Message[];
  aiIcon: React.ReactNode;
}

export function ChatListWidget({ messages, aiIcon }: ChatListWidgetProps) {
  if (!messages.length) {
    console.error('Invalid message content:', messages)
    return null; // Return null if there are no messages

  }

  return (
    <div className="relative mx-auto max-w-2xl pl-8">
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessageWidget message={message} aiIcon={aiIcon} />
          {index < messages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div>
      ))}
    </div>
  );
}