import React, { useState, useRef, useEffect, Fragment } from 'react';
import { Dialog, Transition, Input, Button } from '@headlessui/react';
import '../styles/ChatModal.css';

function ChatModal({ isOpen, onClose }) {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage = inputValue.trim();
        setInputValue('');

        // Add user message
        const newMessages = [...messages, { role: 'user', content: userMessage }];
        if (newMessages.length > 5) {
            newMessages.shift();
        }

        setMessages(newMessages);
        setIsLoading(true);

        try {
            // Call backend API
            const response = await fetch('/api/chat/assistant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: newMessages,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to get response');
            }

            // Add assistant's response
            setMessages(prev => [...prev, data.message]);
        } catch (error) {
            console.error('Error:', error);
            // Add error message
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: `Sorry, I encountered an error: ${error.message}. Please try again.` 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const hasMessages = messages.length > 0;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="chat-modal" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="chat-modal-overlay" />
                </Transition.Child>

                <div className="chat-modal-wrapper">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className={`chat-modal-panel ${hasMessages ? 'has-messages' : ''}`}>
                            {/* Close Button */}
                            <Button className="chat-close-btn" onClick={onClose}>
                                <i className="fa fa-times"></i>
                            </Button>

                            {!hasMessages ? (
                                // Initial State
                                <div className="chat-initial">
                                    <Dialog.Title className="chat-title">Ask anything</Dialog.Title>
                                    <form onSubmit={handleSubmit} className="chat-form-initial">
                                        <div className="chat-input-box">
                                            <Input
                                                ref={inputRef}
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                placeholder="Ask me anything..."
                                                className="chat-textarea-initial"
                                                disabled={isLoading}
                                                autoComplete="off"
                                            />
                                            <Button
                                                type="submit"
                                                className="chat-send-btn"
                                                disabled={!inputValue.trim() || isLoading}
                                            >
                                                <i className="fa fa-arrow-right"></i>
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                // Chat State
                                <div className="chat-interface">
                                    <div className="chat-messages-area">
                                        {messages.map((message, index) => (
                                            <div key={index} className={`chat-msg ${message.role}`}>
                                                <div className="msg-avatar">
                                                    {message.role === 'user' ? (
                                                        <i className="fa fa-user"></i>
                                                    ) : (
                                                        <i className="fa fa-magic"></i>
                                                    )}
                                                </div>
                                                <div className="msg-content">{message.content}</div>
                                            </div>
                                        ))}
                                        {isLoading && (
                                            <div className="chat-msg assistant">
                                                <div className="msg-avatar">
                                                    <i className="fa fa-magic"></i>
                                                </div>
                                                <div className="msg-content">
                                                    <div className="typing-dots">
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    <form onSubmit={handleSubmit} className="chat-form-bottom">
                                        <div className="chat-input-box">
                                            <Input
                                                ref={inputRef}
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                placeholder="Type your message..."
                                                className="chat-textarea"
                                                disabled={isLoading}
                                                autoComplete="off"
                                            />
                                            <Button
                                                type="submit"
                                                className="chat-send-btn"
                                                disabled={!inputValue.trim() || isLoading}
                                            >
                                                <i className="fa fa-arrow-right"></i>
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}

export default ChatModal;
