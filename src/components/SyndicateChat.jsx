import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Terminal } from 'lucide-react'
import { getRoleColor } from '../data/syndicates'
import telegram from '../utils/telegram'

/**
 * SyndicateChat - Tactical Terminal for Communication
 * Phase 6: Neural Syndicates
 */
const SyndicateChat = ({ syndicate, playerId, onClose }) => {
  const [messages, setMessages] = useState(syndicate.chat.messages || [])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return 'now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`
    return `${Math.floor(seconds / 86400)}d`
  }

  const getMemberByAuthorId = (authorId) => {
    return syndicate.members.find(m => m.id === authorId)
  }

  const handleSend = () => {
    if (!inputValue.trim()) return

    const newMessage = {
      id: `msg-${Date.now()}`,
      author: 'You',
      authorId: playerId,
      type: 'user',
      text: inputValue.trim(),
      timestamp: Date.now()
    }

    setMessages([...messages, newMessage])
    setInputValue('')
    telegram.impactOccurred('light')

    // Mock response after delay (simulate other members)
    setTimeout(() => {
      const mockResponse = {
        id: `msg-${Date.now() + 1}`,
        type: 'system',
        text: `Message received from GRID_ID: ${getMemberByAuthorId(playerId)?.gridId || 'UNKNOWN'}`,
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, mockResponse])
    }, 2000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center px-2 sm:px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(5, 5, 5, 0.7)'
        }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Chat Panel */}
      <motion.div
        className="relative w-full max-w-2xl flex flex-col"
        style={{
          clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)',
          background: 'rgba(5, 5, 5, 0.4)',
          backdropFilter: 'blur(40px)',
          border: `1px solid ${syndicate.colors.primary}60`,
          height: '70vh',
          maxHeight: '600px'
        }}
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        {/* Close Button */}
        <motion.button
          className="absolute top-3 sm:top-4 right-3 sm:right-4 w-10 h-10 flex items-center justify-center z-10"
          style={{
            clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
            background: 'rgba(5, 5, 5, 0.8)',
            border: '1px solid rgba(255, 0, 60, 0.4)'
          }}
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-5 h-5 text-critical-red" strokeWidth={2.5} />
        </motion.button>

        {/* Header */}
        <div className="p-4 sm:p-5 border-b" style={{ borderColor: `${syndicate.colors.primary}30` }}>
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: syndicate.colors.primary }} />
            <div>
              <h3
                className="font-display text-lg sm:text-xl font-black uppercase tracking-tight"
                style={{ color: syndicate.colors.primary }}
              >
                TACTICAL TERMINAL
              </h3>
              <p className="text-xs font-mono text-cyan-dim uppercase tracking-wider">
                [{syndicate.tag}] • {syndicate.members.length} Online
              </p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-cyan-neon/20 scrollbar-track-transparent">
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => {
              const member = msg.authorId ? getMemberByAuthorId(msg.authorId) : null
              const isCurrentPlayer = msg.authorId === playerId

              if (msg.type === 'system') {
                return (
                  <motion.div
                    key={msg.id}
                    className="text-center py-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    <div className="inline-block px-3 py-1 rounded font-mono text-xs text-warning-yellow bg-warning-yellow/10 border border-warning-yellow/30">
                      {msg.text}
                    </div>
                  </motion.div>
                )
              }

              return (
                <motion.div
                  key={msg.id}
                  className="flex flex-col"
                  initial={{ opacity: 0, x: isCurrentPlayer ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                >
                  {/* Author & Timestamp */}
                  <div className={`flex items-center gap-2 mb-1 ${isCurrentPlayer ? 'justify-end' : 'justify-start'}`}>
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: member ? getRoleColor(member.role) : syndicate.colors.primary }}
                    >
                      {isCurrentPlayer ? 'YOU' : msg.author}
                    </span>
                    <span className="font-mono text-[10px] text-cyan-dim/50">
                      {getTimeAgo(msg.timestamp)}
                    </span>
                  </div>

                  {/* Message Bubble */}
                  <div className={`flex ${isCurrentPlayer ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className="max-w-[80%] px-3 py-2 rounded font-mono text-sm"
                      style={{
                        background: isCurrentPlayer
                          ? `linear-gradient(135deg, ${syndicate.colors.primary}20, ${syndicate.colors.secondary}20)`
                          : 'rgba(5, 5, 5, 0.6)',
                        border: isCurrentPlayer
                          ? `1px solid ${syndicate.colors.primary}40`
                          : '1px solid rgba(0, 229, 255, 0.2)',
                        color: '#00e5ff',
                        wordBreak: 'break-word'
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t" style={{ borderColor: `${syndicate.colors.primary}30` }}>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type message..."
              className="flex-1 px-4 py-3 font-mono text-sm text-cyan-neon bg-obsidian rounded outline-none"
              style={{
                border: `1px solid ${syndicate.colors.primary}40`
              }}
              maxLength={200}
            />

            <motion.button
              className="px-4 sm:px-6 py-3 font-display font-bold text-sm uppercase tracking-wider flex items-center gap-2"
              style={{
                clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
                background: inputValue.trim()
                  ? `linear-gradient(to right, ${syndicate.colors.primary}, ${syndicate.colors.secondary})`
                  : 'rgba(100, 100, 100, 0.3)',
                color: inputValue.trim() ? '#050505' : '#666',
                cursor: inputValue.trim() ? 'pointer' : 'not-allowed'
              }}
              onClick={handleSend}
              disabled={!inputValue.trim()}
              whileHover={inputValue.trim() ? { scale: 1.02 } : {}}
              whileTap={inputValue.trim() ? { scale: 0.98 } : {}}
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">SEND</span>
            </motion.button>
          </div>

          {/* Character Counter */}
          <div className="mt-2 text-right">
            <span className="font-mono text-[10px] text-cyan-dim/50">
              {inputValue.length}/200
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default SyndicateChat
