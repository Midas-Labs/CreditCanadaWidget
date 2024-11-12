import React from 'preact/compat'
import { useState, useEffect, useRef } from 'preact/hooks'
import { useChat } from '../lib/hooks/use-chat'
import { ChatListWidget } from '../components/chat-list'
// import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
// import { PromptForm } from '@/components/prompt-form'
// import { EmptyScreen } from '@/components/empty-screen'
import { TooltipProvider } from '../components/ui/tooltip'
import { IconArrowElbow } from '../components/ui/icons'
// import { Button } from '@/components/ui/button'
import { getAppDetails } from '../lib/get-app-details' // Import the function
import { Textarea } from './ui/textarea'
import CreditCompanionDescription from './ui/mini-disclaimer' // Import the disclaimer component
import { h } from 'preact'


export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [appDetails, setAppDetails] = useState({
    appId: '',
    publicKey: '',
    domain: '',
    name: '',
    id: ''
  })

  useEffect(() => {
    async function fetchAppDetails() {
      const details = await getAppDetails()
      setAppDetails(details)
    }
    fetchAppDetails()
  }, [])

  // Prevent rendering until appDetails are loaded
  if (!appDetails.appId || !appDetails.publicKey) {
    return null // Or return a loading spinner/component
  }

  const { appId, publicKey, domain, name, id } = appDetails

  const { messages, append, reload, stop, isLoading, input, setInput } = useChat({
    appId,
    apiKey: publicKey,
    sendExtraMessageFields: true,
    initialMessages: [],
    id,
    body: {
      id
    },
    onResponse(response) {
      if (response.status !== 200) {
        console.error('Chat API error:', response)
        // Handle unauthorized or error response
      }
    }
  })


  const formRef = useRef(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!input.trim()) {
      return
    }
    const userInput = input
    console.log('User Input:', userInput)
    setInput('')
    await append({
      content: userInput,
      role: 'user'
    })
  }

  useEffect(() => {
    if (inputRef.current && isOpen) {
      inputRef.current.focus()
    }
  }, [isOpen])

  return (
    <TooltipProvider>
      <div className={`fixed z-50 ${isOpen ? 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' : 'bottom-5 left-5'}`}>
        {isOpen ? (
          <div className="flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg" style={{ height: '450px', width: '750px' }}>
            {/* Header */}
            <div className="flex items-center h-16 border-b border-gray-300 bg-gray-100 p-4">
              <img src="/public/logo-small.png" alt="Credit Canada" className="mr-2 h-8 w-8" />
              <h3 className="font-bold text-gray-900 pl-6" style={{ fontSize: '23px', marginRight: 'auto' }}> Nova Ai </h3>
              <button
                onClick={() => setIsOpen((prev) => !prev)}                
                className="text-gray-600 bg-transparent hover:text-gray-800 hover:border-transparent hover:bg-transparent focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  // bg="transparent"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* Disclaimer */}
            {/* <div className="p-4">
            <CreditCompanionDescription /> {/* Add the disclaimer component here */}

            {/* </div> */} 
            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.length ? (
                <ChatListWidget
                  aiIcon={
                    <img
                      className="h-8 w-8 rounded-md"
                      src="/logo-mini.png"
                      alt={domain}
                    />
                  }
                  messages={messages}
                />
              ) : (
                // Initial welcome message or leave it empty
                // <div className="text-center text-gray-500">
                //   <p className="text-black">How can I assist you today?</p>
                // </div>
                <div className="p-4">
                  <CreditCompanionDescription /> {/* Add the disclaimer component here */}
                </div>
              )}
            </div>
            {/* Input Form */}
            <div className="border-t border-gray-300 p-4">
              <form onSubmit={handleSubmit} ref={formRef}>
                <div className="relative flex w-full grow flex-col justify-center overflow-hidden rounded-md border border-gray-300">
                  <Textarea
                    ref={inputRef}
                    rows={1}
                    value={input}
                    onChange={e => {
                      const target = e.target as HTMLTextAreaElement;
                      setInput(target.value)
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                    placeholder="Type a message..."
                    spellcheck={false}
                    className="min-h-[60px] w-full resize-none px-4 py-3 focus:outline-none"
                    style={{ lineHeight: '60px', paddingTop: '0', paddingBottom: '0' }} // Adjust line-height and padding
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <button
                      type="submit"
                      disabled={isLoading || input.trim() === ''}
                      className="flex items-center justify-center rounded-md bg-black px-2 py-1 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
                    >
                      <IconArrowElbow />
                      <span className="sr-only">Send message</span>
                    </button>
                  </div>
          
                </div>
              </form>
            </div>
          </div>
        ) : (
          // Chat Toggle Button
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f45405] text-white hover:bg-opacity-90 hover:bg-gray-500 hover:border-transparent focus:outline-none focus:ring-0 p-0"
          >
            <svg
              className="h-full w-full"
              fill="white"
              stroke="black"
              viewBox="-2 -3 28 28"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </button>
        )}
      </div>
    </TooltipProvider>
  )
}
