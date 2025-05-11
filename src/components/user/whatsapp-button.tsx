"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "../logo";

const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userMessage, setUserMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    { text: string; sender: "bot" | "user"; timestamp: string }[]
  >([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const phoneNumber: string = "+971509902467";

  // Format timestamp
  const getTimestamp = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Auto-send greeting message with typing effect
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            text: "Hello! Welcome to MR ONE Real Estate. How can we assist you with your property needs today?",
            sender: "bot",
            timestamp: getTimestamp(),
          },
        ]);
      }, 2000); // 2s typing delay
      return () => clearTimeout(typingTimer);
    }
  }, [isOpen, messages?.length]);

  const handleSendMessage = (): void => {
    if (userMessage.trim()) {
      const newMessage = {
        text: userMessage,
        sender: "user" as const,
        timestamp: getTimestamp(),
      };
      setMessages((prev) => [...prev, newMessage]);
      const formattedNumber = phoneNumber.replace(/\D/g, "");
      const encodedMessage = encodeURIComponent(userMessage);
      const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
      setUserMessage("");

      // Simulate bot reply after sending message
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "We'll contact you shortly regarding your query.",
            sender: "bot",
            timestamp: getTimestamp(),
          },
        ]);
      }, 1000); // 1s delay for bot reply
    }
  };

  const handleSuggestionClick = (suggestion: string): void => {
    // Populate the input field with the suggestion
    setUserMessage(suggestion);
  };

  const closeWidget = (): void => {
    setIsOpen(false);
    setUserMessage("");
    setIsTyping(false);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Animation variants
  const widgetVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const typingVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: { repeat: Infinity, duration: 1 },
    },
  };

  return (
    <div className="fixed bottom-11 right-6 z-50">
      {/* Floating WhatsApp Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center rounded-full bg-green-600 px-3 py-2 shadow-lg transition-colors hover:bg-green-600"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          aria-label="Contact on WhatsApp"
        >
          <div className="flex items-center">
            <div className="relative h-6 w-6">
              <Image
                src="/images/common/whatsapp.png"
                alt="WhatsApp"
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
            <span className="ml-1 font-medium text-white">Whatsapp</span>
          </div>
        </motion.button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={widgetVariants}
          className="flex h-[420px] w-80 flex-col rounded-2xl border border-gray-100 bg-white shadow-xl sm:w-90"
        >
          {/* Header */}
          <div className="rounded-t-2xl bg-green-500 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white">
                  {/* <Logo /> */}
                  {/* images/user/user-img.jpeg */}
                  {/* <Image
                    src="/images/common/whatsapp.png"
                    alt="WhatsApp"
                 
                    objectFit="cover"
                  /> */}
                  <Image
                    src={"/images/user/user-img.jpeg"}
                    className=""
                    alt={`Avatar`}
                    role="presentation"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">MR ONE</span>
                  {isTyping && (
                    <motion.div
                      className="flex items-center gap-1 text-sm text-green-100"
                      variants={typingVariants}
                      animate="animate"
                    >
                      <span>Typing</span>
                      <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-white"></span>
                      <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-white delay-100"></span>
                      <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-white delay-200"></span>
                    </motion.div>
                  )}
                </div>
              </div>
              <button
                onClick={closeWidget}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-red-500 hover:bg-gray-200"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex w-full flex-1 flex-col justify-between space-y-4 overflow-y-auto bg-[url('/images/common/whatsapp-bg.jpg')] bg-cover bg-center p-4">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate="visible"
                  variants={messageVariants}
                  className={`flex max-w-[75%] flex-col ${
                    msg.sender === "bot" ? "items-start" : "ml-auto items-end"
                  }`}
                >
                  <div
                    className={`rounded-xl p-2 shadow-sm ${
                      msg.sender === "bot"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    <span className="text-sm">{msg.text}</span>
                    <div className="m-0 flex justify-end p-0">
                      <span className="text-xs text-gray-500">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Real Estate Suggested Options - Moved to End */}
            {!isTyping && messages.length > 0 && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={messageVariants}
                className="space-y-2 text-end text-sm"
              >
                {[
                  "What properties are available in Dubai?",
                  "How can I buy a property with MR ONE?",
                  "What’s the process for property investment?",
                ].map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSuggestionClick(option)}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-fit rounded-lg bg-blue-50 p-2 text-end text-sm text-blue-800 shadow-sm transition-colors hover:bg-blue-100"
                  >
                    {option}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 rounded-b-2xl border-t border-gray-100 bg-white p-3">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Ask about properties..."
              className="flex-1 rounded-full border border-gray-200 p-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <motion.button
              onClick={handleSendMessage}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="rounded-full bg-green-500 p-2 text-white hover:bg-green-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                transform="rotate(90)"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WhatsAppWidget;
