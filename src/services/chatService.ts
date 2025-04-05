import { createClient } from "@supabase/supabase-js";
import { ChatMessage, ChatSession } from "@/types/chat";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

// Local storage fallback when Supabase is not configured
const LOCAL_STORAGE_KEY = "salig_chat_sessions";

/**
 * Save chat sessions to local storage
 */
const saveToLocalStorage = (sessions: ChatSession[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sessions));
};

/**
 * Get chat sessions from local storage
 */
const getFromLocalStorage = (): ChatSession[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Check if Supabase is properly configured
 */
const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseKey;
};

/**
 * Create a new chat session
 */
export const createChatSession = async (
  title: string = "New Chat",
): Promise<ChatSession> => {
  const newSession: ChatSession = {
    id: crypto.randomUUID(),
    title,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    messages: [],
  };

  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from("chat_sessions").insert(newSession);

      if (error) throw error;
    } catch (error) {
      console.error("Error creating chat session in Supabase:", error);
      // Fallback to local storage
      const sessions = getFromLocalStorage();
      sessions.push(newSession);
      saveToLocalStorage(sessions);
    }
  } else {
    // Use local storage
    const sessions = getFromLocalStorage();
    sessions.push(newSession);
    saveToLocalStorage(sessions);
  }

  return newSession;
};

/**
 * Get all chat sessions
 */
export const getChatSessions = async (): Promise<ChatSession[]> => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("chat_sessions")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching chat sessions from Supabase:", error);
      // Fallback to local storage
      return getFromLocalStorage();
    }
  } else {
    // Use local storage
    return getFromLocalStorage();
  }
};

/**
 * Get a specific chat session by ID
 */
export const getChatSessionById = async (
  sessionId: string,
): Promise<ChatSession | null> => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("chat_sessions")
        .select("*")
        .eq("id", sessionId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching chat session from Supabase:", error);
      // Fallback to local storage
      const sessions = getFromLocalStorage();
      return sessions.find((session) => session.id === sessionId) || null;
    }
  } else {
    // Use local storage
    const sessions = getFromLocalStorage();
    return sessions.find((session) => session.id === sessionId) || null;
  }
};

/**
 * Update a chat session with new messages
 */
export const updateChatSession = async (
  sessionId: string,
  messages: ChatMessage[],
): Promise<void> => {
  const updatedAt = new Date().toISOString();

  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase
        .from("chat_sessions")
        .update({
          messages,
          updated_at: updatedAt,
        })
        .eq("id", sessionId);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating chat session in Supabase:", error);
      // Fallback to local storage
      const sessions = getFromLocalStorage();
      const sessionIndex = sessions.findIndex(
        (session) => session.id === sessionId,
      );

      if (sessionIndex !== -1) {
        sessions[sessionIndex].messages = messages;
        sessions[sessionIndex].updated_at = updatedAt;
        saveToLocalStorage(sessions);
      }
    }
  } else {
    // Use local storage
    const sessions = getFromLocalStorage();
    const sessionIndex = sessions.findIndex(
      (session) => session.id === sessionId,
    );

    if (sessionIndex !== -1) {
      sessions[sessionIndex].messages = messages;
      sessions[sessionIndex].updated_at = updatedAt;
      saveToLocalStorage(sessions);
    }
  }
};

/**
 * Delete a chat session
 */
export const deleteChatSession = async (sessionId: string): Promise<void> => {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase
        .from("chat_sessions")
        .delete()
        .eq("id", sessionId);

      if (error) throw error;
    } catch (error) {
      console.error("Error deleting chat session from Supabase:", error);
      // Fallback to local storage
      const sessions = getFromLocalStorage();
      const updatedSessions = sessions.filter(
        (session) => session.id !== sessionId,
      );
      saveToLocalStorage(updatedSessions);
    }
  } else {
    // Use local storage
    const sessions = getFromLocalStorage();
    const updatedSessions = sessions.filter(
      (session) => session.id !== sessionId,
    );
    saveToLocalStorage(updatedSessions);
  }
};

/**
 * Update chat session title
 */
export const updateChatSessionTitle = async (
  sessionId: string,
  title: string,
): Promise<void> => {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase
        .from("chat_sessions")
        .update({
          title,
          updated_at: new Date().toISOString(),
        })
        .eq("id", sessionId);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating chat session title in Supabase:", error);
      // Fallback to local storage
      const sessions = getFromLocalStorage();
      const sessionIndex = sessions.findIndex(
        (session) => session.id === sessionId,
      );

      if (sessionIndex !== -1) {
        sessions[sessionIndex].title = title;
        sessions[sessionIndex].updated_at = new Date().toISOString();
        saveToLocalStorage(sessions);
      }
    }
  } else {
    // Use local storage
    const sessions = getFromLocalStorage();
    const sessionIndex = sessions.findIndex(
      (session) => session.id === sessionId,
    );

    if (sessionIndex !== -1) {
      sessions[sessionIndex].title = title;
      sessions[sessionIndex].updated_at = new Date().toISOString();
      saveToLocalStorage(sessions);
    }
  }
};
