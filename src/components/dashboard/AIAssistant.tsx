import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, Loader2, Sparkles, Info, Trash2 } from "lucide-react";
import { getGreeting, getAIResponse, ChatMessage } from "@/ai/aiService";
import { Badge } from "@/components/ui/badge";

const AIAssistant: React.FC = () => {
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
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>(
    [],
  );

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Store the current input to ensure consistency
    const currentInput = input.trim();

    // Add user message to chat
    const userMessage: ChatMessage = {
      role: "user",
      content: currentInput,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Get response from AI service
      const response = await getAIResponse(currentInput);

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response.content,
        timestamp: response.metadata?.timestamp || new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      // Fallback message in case of error
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content:
          "I'm sorry, I'm having trouble processing your request right now. Please try again later.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
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
    // Create a new conversation starting with the greeting
    const initialMessage: ChatMessage = {
      role: "assistant",
      content: getGreeting(),
      timestamp: new Date().toISOString(),
    };

    // Add user message to chat
    const userMessage: ChatMessage = {
      role: "user",
      content: question,
      timestamp: new Date().toISOString(),
    };

    // Save current conversation if dialog is already open
    if (isOpen) {
      setConversationHistory(messages);
    }

    // Start a new conversation with the greeting and user question
    setMessages([initialMessage, userMessage]);
    setIsOpen(true);
    setIsLoading(true);

    try {
      // Get response from AI service
      const response = await getAIResponse(question);

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response.content,
        timestamp: response.metadata?.timestamp || new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      // Fallback message in case of error
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content:
          "I'm sorry, I'm having trouble processing your request right now. Please try again later.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle dialog open/close events
  const handleDialogChange = (open: boolean) => {
    if (!open && messages.length > 1) {
      // Save the current conversation when closing
      setConversationHistory(messages);

      // Reset to initial greeting message when dialog is closed
      setMessages([
        {
          role: "assistant",
          content: getGreeting(),
          timestamp: new Date().toISOString(),
        },
      ]);
    }
    setIsOpen(open);
  };

  // Clear the current conversation
  const handleClearConversation = () => {
    setMessages([
      {
        role: "assistant",
        content: getGreeting(),
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const formatTime = (timestamp: string | undefined) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
        <div className="bg-blue-50 border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center text-blue-700 font-semibold">
              <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
              SALIG AI Assistant
            </h3>
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              <Info className="h-3 w-3 mr-1" /> Consistent Responses
            </Badge>
          </div>
          <p className="text-sm text-gray-500">
            Get personalized disaster preparedness advice and real-time
            information
          </p>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-600">Ask me about:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() =>
                handleQuickQuestion("What should I prepare for typhoon season?")
              }
            >
              Typhoon preparedness
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleQuickQuestion("Show me evacuation routes")}
            >
              Evacuation routes
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleQuickQuestion("Current weather alerts")}
            >
              Weather alerts
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleQuickQuestion("What is SALIG?")}
            >
              About SALIG
            </Button>
          </div>
        </div>
        <div className="border-t border-gray-200 p-4">
          <Dialog open={isOpen} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Bot className="mr-2 h-4 w-4" />
                Ask SALIG
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bot className="mr-2 h-5 w-5 text-blue-600" />
                    SALIG AI Assistant
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleClearConversation}
                      title="Clear conversation"
                    >
                      <Trash2 className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      <Info className="h-3 w-3 mr-1" /> Consistent Responses
                    </Badge>
                  </div>
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-4 max-h-[60vh] overflow-y-auto p-4 bg-gray-50 rounded-md">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${message.role === "user" ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-800"}`}
                    >
                      <div className="flex flex-col">
                        <div>{message.content}</div>
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
                    <div className="max-w-[80%] rounded-lg p-3 bg-white border border-gray-200 text-gray-800 flex items-center">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      SALIG AI is thinking...
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-end gap-2">
                <Textarea
                  placeholder="Ask about disaster preparedness, weather alerts, or evacuation information..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 min-h-[80px]"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  className="mb-1"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <DialogFooter className="sm:justify-start">
                <div className="text-xs text-gray-500">
                  SALIG AI provides general guidance. Always follow official
                  instructions during emergencies.
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default AIAssistant;
