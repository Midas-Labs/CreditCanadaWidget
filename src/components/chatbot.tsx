import React from 'preact'
import { useState , useEffect, useRef} from 'preact/hooks' // Updated import

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

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [appDetails, setAppDetails] = useState({
    appId: '',
    publicKey: '',
    domain: '',
    name: '',
    id: ''
  })

  const toggleChat = () => setIsOpen(!isOpen)

  useEffect(() => {
    async function fetchAppDetails() {
      const details = await getAppDetails()
      setAppDetails(details)
    }
    fetchAppDetails()
  }, [])

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
      if (response.status === 401) {
        // Handle unauthorized response
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
            <div className="flex items-center border-b border-gray-300 bg-gray-100 p-4">
              <img src="/logo-small.png" alt="Credit Canada" className="mr-2 h-8 w-8" />
              <h3 className="font-bold text-gray-900 pl-6" style={{ fontSize: '23px', marginRight: 'auto' }}> Credit Canada - Ai Chatbot</h3>
              <button
                onClick={toggleChat}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
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
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                    placeholder="Type a message..."
                    spellCheck={false}
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
            onClick={toggleChat}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="black"
              viewBox="0 0 24 24"
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




// import { useState } from 'preact/hooks'
// import preactLogo from './assets/preact.svg'
// import viteLogo from '/vite.svg'
// import './app.css'

// export function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} class="logo" alt="Vite logo" />
//         </a>
//         <a href="https://preactjs.com" target="_blank">
//           <img src={preactLogo} class="logo preact" alt="Preact logo" />
//         </a>
//       </div>
//       <h1>Vite + Preact</h1>
//       <div class="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/app.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p>
//         Check out{' '}
//         <a
//           href="https://preactjs.com/guide/v10/getting-started#create-a-vite-powered-preact-app"
//           target="_blank"
//         >
//           create-preact
//         </a>
//         , the official Preact + Vite starter
//       </p>
//       <p class="read-the-docs">
//         Click on the Vite and Preact logos to learn more
//       </p>
//     </>
//   )
// }
