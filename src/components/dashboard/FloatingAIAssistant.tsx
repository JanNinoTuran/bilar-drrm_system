import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Bot,
  Send,
  Loader2,
  Sparkles,
  Info,
  AlertTriangle,
  X,
  Plus,
  MessageSquare,
  Trash2,
  Edit2,
  Check,
  Clock,
} from "lucide-react";
import {
  getGreeting,
  getAIResponse,
  fetchFromOpenAI,
  isOpenAIKeyAvailable,
} from "@/ai/aiService";
import { Badge } from "@/components/ui/badge";
import { ChatMessage, ChatSession } from "@/types/chat";
import {
  createChatSession,
  getChatSessions,
  getChatSessionById,
  updateChatSession,
  deleteChatSession,
  updateChatSessionTitle,
} from "@/services/chatService";

const FloatingAIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: getGreeting(),
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [useOpenAI, setUseOpenAI] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check if OpenAI API key is available and load chat sessions on component mount
  useEffect(() => {
    const hasOpenAIKey = isOpenAIKeyAvailable();
    setUseOpenAI(hasOpenAIKey);

    // Load chat sessions
    loadChatSessions();
  }, []);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat sessions from database or local storage
  const loadChatSessions = async () => {
    try {
      const sessions = await getChatSessions();
      setChatSessions(sessions);

      // If there are sessions, set the current session to the most recent one
      if (sessions.length > 0) {
        setCurrentSessionId(sessions[0].id);
        // Load messages for the current session
        const session = await getChatSessionById(sessions[0].id);
        if (session && session.messages.length > 0) {
          setMessages(session.messages);
        } else {
          // Initialize with greeting if no messages
          setMessages([
            {
              role: "assistant",
              content: getGreeting(),
              timestamp: new Date().toISOString(),
            },
          ]);
        }
      } else {
        // Create a new session if none exist
        createNewChat();
      }
    } catch (error) {
      console.error("Error loading chat sessions:", error);
    }
  };

  // Create a new chat session
  const createNewChat = async () => {
    try {
      const newSession = await createChatSession();
      setChatSessions([newSession, ...chatSessions]);
      setCurrentSessionId(newSession.id);
      setMessages([
        {
          role: "assistant",
          content: getGreeting(),
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error("Error creating new chat session:", error);
    }
  };

  // Switch to a different chat session
  const switchChatSession = async (sessionId: string) => {
    try {
      const session = await getChatSessionById(sessionId);
      if (session) {
        setCurrentSessionId(sessionId);
        setMessages(
          session.messages.length > 0
            ? session.messages
            : [
                {
                  role: "assistant",
                  content: getGreeting(),
                  timestamp: new Date().toISOString(),
                },
              ],
        );
      }
    } catch (error) {
      console.error("Error switching chat session:", error);
    }
  };

  // Delete a chat session
  const handleDeleteSession = async (
    sessionId: string,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation(); // Prevent triggering the parent click event

    try {
      await deleteChatSession(sessionId);
      const updatedSessions = chatSessions.filter(
        (session) => session.id !== sessionId,
      );
      setChatSessions(updatedSessions);

      // If the current session was deleted, switch to another one or create a new one
      if (sessionId === currentSessionId) {
        if (updatedSessions.length > 0) {
          switchChatSession(updatedSessions[0].id);
        } else {
          createNewChat();
        }
      }
    } catch (error) {
      console.error("Error deleting chat session:", error);
    }
  };

  // Start editing session title
  const startEditingTitle = (session: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent click event
    setIsEditingTitle(true);
    setEditTitle(session.title);
  };

  // Save edited session title
  const saveSessionTitle = async (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent click event

    if (editTitle.trim()) {
      try {
        await updateChatSessionTitle(sessionId, editTitle);
        setChatSessions(
          chatSessions.map((session) =>
            session.id === sessionId
              ? { ...session, title: editTitle }
              : session,
          ),
        );
      } catch (error) {
        console.error("Error updating chat session title:", error);
      }
    }

    setIsEditingTitle(false);
  };

  // Format relative time for chat sessions
  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage: ChatMessage = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Get response from AI service based on available API
      const response = useOpenAI
        ? await fetchFromOpenAI(input, messages)
        : await getAIResponse(input);

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response.content,
        timestamp: response.metadata?.timestamp || new Date().toISOString(),
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);

      // Update the first message as the title if this is the first user message
      if (updatedMessages.filter((msg) => msg.role === "user").length === 1) {
        const title =
          input.length > 30 ? `${input.substring(0, 30)}...` : input;
        await updateChatSessionTitle(currentSessionId, title);
        setChatSessions(
          chatSessions.map((session) =>
            session.id === currentSessionId ? { ...session, title } : session,
          ),
        );
      }

      // Save messages to the current session
      await updateChatSession(currentSessionId, finalMessages);
    } catch (error) {
      console.error("Error getting AI response:", error);
      // Fallback message in case of error
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content:
          "I'm sorry, I'm having trouble processing your request right now. Please try again later.",
        timestamp: new Date().toISOString(),
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);

      // Save messages to the current session
      await updateChatSession(currentSessionId, finalMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = async (question: string) => {
    setIsOpen(true);

    // Add user message to chat
    const userMessage: ChatMessage = {
      role: "user",
      content: question,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Get response from AI service based on available API
      const response = useOpenAI
        ? await fetchFromOpenAI(question, messages)
        : await getAIResponse(question);

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response.content,
        timestamp: response.metadata?.timestamp || new Date().toISOString(),
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);

      // Update the first message as the title if this is the first user message
      if (updatedMessages.filter((msg) => msg.role === "user").length === 1) {
        const title =
          question.length > 30 ? `${question.substring(0, 30)}...` : question;
        await updateChatSessionTitle(currentSessionId, title);
        setChatSessions(
          chatSessions.map((session) =>
            session.id === currentSessionId ? { ...session, title } : session,
          ),
        );
      }

      // Save messages to the current session
      await updateChatSession(currentSessionId, finalMessages);
    } catch (error) {
      console.error("Error getting AI response:", error);
      // Fallback message in case of error
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content:
          "I'm sorry, I'm having trouble processing your request right now. Please try again later.",
        timestamp: new Date().toISOString(),
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);

      // Save messages to the current session
      await updateChatSession(currentSessionId, finalMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp: string | undefined) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Fixed Side Button */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-l-full shadow-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </div>

      {/* Side Panel Dialog */}
      {isOpen && (
        <div className="fixed right-0 top-0 h-full w-[800px] bg-white shadow-lg z-40 overflow-hidden flex flex-col border-l border-gray-200 pt-20">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
            <div className="flex items-center">
              <Bot className="mr-2 h-5 w-5 text-blue-600" />
              <h3 className="font-medium">SALIG</h3>
            </div>
            <div className="flex items-center gap-2">
              {useOpenAI ? (
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  <Sparkles className="h-3 w-3 mr-1" /> API Connected
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-amber-50 text-amber-700 border-amber-200"
                >
                  <Info className="h-3 w-3 mr-1" /> Using Local Data
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Chat History Sidebar */}
            {showSidebar && (
              <div className="w-[250px] border-r border-gray-200 bg-gray-50 flex flex-col">
                <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-white">
                  <h4 className="font-medium text-sm">Chat History</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={createNewChat}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <ScrollArea className="flex-1">
                  <div className="p-2 space-y-1">
                    {chatSessions.map((session) => (
                      <div
                        key={session.id}
                        onClick={() => switchChatSession(session.id)}
                        className={`p-2 rounded-md text-sm flex items-start gap-2 cursor-pointer group hover:bg-gray-100 ${currentSessionId === session.id ? "bg-blue-50 hover:bg-blue-50" : ""}`}
                      >
                        <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          {isEditingTitle && currentSessionId === session.id ? (
                            <div className="flex items-center gap-1">
                              <Input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="h-6 text-xs"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={(e) => saveSessionTitle(session.id, e)}
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-start justify-between">
                              <div className="truncate font-medium">
                                {session.title || "New Chat"}
                              </div>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-5 w-5"
                                  onClick={(e) => startEditingTitle(session, e)}
                                >
                                  <Edit2 className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-5 w-5 text-red-500"
                                  onClick={(e) =>
                                    handleDeleteSession(session.id, e)
                                  }
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          )}
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatRelativeTime(session.updated_at)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {/* Chat Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4 bg-gray-50">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${message.role === "user" ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-800"} shadow-sm`}
                      >
                        <div className="flex flex-col">
                          <div className="whitespace-pre-wrap">
                            {message.content}
                          </div>
                          <div
                            className={`text-xs mt-1 ${message.role === "user" ? "text-blue-200" : "text-gray-400"}`}
                          >
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-3 bg-white border border-gray-200 text-gray-800 flex items-center shadow-sm">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        SALIG is thinking...
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 space-y-4 bg-white">
                <div className="flex items-end gap-2">
                  <Textarea
                    placeholder="Ask about disaster preparedness, weather alerts, or evacuation information..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 min-h-[80px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !input.trim()}
                    className="mb-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm text-gray-600 font-medium">
                    Quick questions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50"
                      onClick={() =>
                        handleQuickQuestion(
                          "What should I prepare for typhoon season?",
                        )
                      }
                    >
                      Typhoon preparedness
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50"
                      onClick={() =>
                        handleQuickQuestion("Show me evacuation routes")
                      }
                    >
                      Evacuation routes
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50"
                      onClick={() =>
                        handleQuickQuestion("Current weather alerts")
                      }
                    >
                      Weather alerts
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50"
                      onClick={() =>
                        handleQuickQuestion("What's in an emergency kit?")
                      }
                    >
                      Emergency kit
                    </Button>
                  </div>
                </div>

                <div className="text-xs text-gray-500 flex items-center pt-2">
                  <AlertTriangle className="h-3 w-3 mr-1 text-amber-500" />
                  SALIG — Because in times of danger, trust matters. Always
                  follow official instructions during emergencies.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAIAssistant;
