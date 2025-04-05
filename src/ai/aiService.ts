import responses from "./ai_responses.json";

// Interface for AI response data structure
export interface AIResponseData {
  greeting: string;
  responses: string[];
  instructions: {
    purpose: string;
    tone: string;
    response_format: string;
    topics: string[];
  };
  fallback_prompt?: string;
}

// Interface for API response
export interface APIResponse {
  content: string;
  metadata?: {
    confidence?: number;
    source?: string;
    timestamp?: string;
    topics?: string[];
    relevance?: number;
  };
}

// Interface for chat history
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

// Cache for storing previous responses to ensure consistency
const responseCache = new Map<string, string>();

/**
 * Get the greeting message for the AI assistant
 * @returns The greeting message
 */
export const getGreeting = (): string => {
  return responses.greeting;
};

/**
 * Get a random response from the predefined list
 * This is a temporary solution until the API integration is complete
 * @returns A random response string
 */
export const getRandomResponse = (): string => {
  const responseList = responses.responses;
  return responseList[Math.floor(Math.random() * responseList.length)];
};

/**
 * Normalize a question by removing punctuation, extra spaces, and converting to lowercase
 */
const normalizeQuestion = (question: string): string => {
  return question
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

/**
 * Get a response based on keywords in the user input
 * @param userInput The user's message
 * @returns A relevant response string or null if no match
 */
export const getKeywordBasedResponse = (userInput: string): string | null => {
  const input = userInput.toLowerCase();

  // Check if we have a cached response for this exact input
  const normalizedInput = normalizeQuestion(userInput);
  if (responseCache.has(normalizedInput)) {
    return responseCache.get(normalizedInput) || null;
  }

  // Define topic categories with their keywords and response indices
  const topicMap = [
    {
      topic: "salig",
      keywords: [
        "salig",
        "system",
        "what is",
        "about",
        "purpose",
        "app",
        "application",
      ],
      responseIndices: [10, 11, 12, 13, 14],
    },
    {
      topic: "geography",
      keywords: [
        "bilar",
        "location",
        "where",
        "geography",
        "terrain",
        "landscape",
        "area",
        "region",
        "map",
        "topography",
      ],
      responseIndices: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    },
    {
      topic: "typhoon",
      keywords: [
        "typhoon",
        "storm",
        "cyclone",
        "hurricane",
        "wind",
        "bagyo",
        "tropical depression",
        "tropical storm",
        "gale",
        "monsoon",
      ],
      responseIndices: [0, 6, 25, 26, 27, 28, 29, 110, 111, 112, 113, 114],
    },
    {
      topic: "flood",
      keywords: [
        "flood",
        "water",
        "rain",
        "overflow",
        "rising water",
        "inundation",
        "deluge",
        "flash flood",
        "high water",
        "submerged",
      ],
      responseIndices: [1, 7, 30, 31, 32, 33, 34, 115, 116, 117, 118, 119],
    },
    {
      topic: "earthquake",
      keywords: [
        "earthquake",
        "shake",
        "tremor",
        "quake",
        "seismic",
        "temblor",
        "aftershock",
        "epicenter",
        "fault line",
        "magnitude",
        "richter",
      ],
      responseIndices: [2, 9, 35, 36, 37, 38, 39, 120, 121, 122, 123, 124],
    },
    {
      topic: "emergency kit",
      keywords: [
        "emergency",
        "supplies",
        "kit",
        "prepare",
        "bag",
        "pack",
        "go-bag",
        "survival kit",
        "emergency supplies",
        "disaster kit",
        "preparedness kit",
        "72-hour kit",
      ],
      responseIndices: [4, 8, 40, 41, 42, 43, 44, 125, 126, 127, 128, 129],
    },
    {
      topic: "evacuation",
      keywords: [
        "evacuation",
        "evacuate",
        "center",
        "leave",
        "shelter",
        "escape",
        "flee",
        "relocate",
        "safe zone",
        "evacuation route",
        "evacuation plan",
        "muster point",
      ],
      responseIndices: [5, 45, 46, 47, 48, 49, 130, 131, 132, 133, 134],
    },
    {
      topic: "weather",
      keywords: [
        "weather",
        "forecast",
        "rain",
        "predict",
        "climate",
        "meteorology",
        "precipitation",
        "barometer",
        "atmospheric",
        "humidity",
        "temperature",
        "pressure",
      ],
      responseIndices: [3, 50, 51, 52, 53, 54, 135, 136, 137, 138, 139],
    },
    {
      topic: "history",
      keywords: [
        "history",
        "past",
        "previous",
        "before",
        "happened",
        "historical",
        "record",
        "chronicle",
        "archive",
        "documented",
        "earlier",
      ],
      responseIndices: [55, 56, 57, 58, 59, 140, 141, 142, 143, 144],
    },
    {
      topic: "water safety",
      keywords: [
        "water safety",
        "clean water",
        "drink",
        "contaminated",
        "purify",
        "potable",
        "filter",
        "boil",
        "disinfect",
        "hydration",
        "water storage",
        "water treatment",
      ],
      responseIndices: [60, 61, 62, 63, 64, 145, 146, 147, 148, 149],
    },
    {
      topic: "home safety",
      keywords: [
        "home",
        "house",
        "building",
        "reinforce",
        "secure",
        "retrofit",
        "strengthen",
        "fortify",
        "shelter",
        "residence",
        "dwelling",
        "structure",
      ],
      responseIndices: [65, 66, 67, 68, 69, 150, 151, 152, 153, 154],
    },
    {
      topic: "first aid",
      keywords: [
        "first aid",
        "medical",
        "injury",
        "wound",
        "treatment",
        "health",
        "medicine",
        "bandage",
        "CPR",
        "resuscitation",
        "splint",
        "tourniquet",
        "bleeding",
        "fracture",
      ],
      responseIndices: [70, 71, 72, 73, 74, 155, 156, 157, 158, 159],
    },
    {
      topic: "communication",
      keywords: [
        "communication",
        "contact",
        "signal",
        "radio",
        "phone",
        "message",
        "call",
        "emergency contact",
        "ham radio",
        "walkie-talkie",
        "satellite phone",
        "emergency broadcast",
        "alert system",
      ],
      responseIndices: [75, 76, 77, 78, 79, 160, 161, 162, 163, 164],
    },
    {
      topic: "power",
      keywords: [
        "power",
        "electricity",
        "outage",
        "blackout",
        "battery",
        "energy",
        "generator",
        "solar",
        "backup power",
        "alternative energy",
        "power bank",
        "inverter",
        "fuel",
      ],
      responseIndices: [80, 81, 82, 83, 84, 165, 166, 167, 168, 169],
    },
    {
      topic: "food",
      keywords: [
        "food",
        "eat",
        "store",
        "ration",
        "supply",
        "nutrition",
        "meal",
        "non-perishable",
        "canned food",
        "dried food",
        "emergency food",
        "food storage",
        "preservation",
        "expiration",
      ],
      responseIndices: [85, 86, 87, 88, 89, 170, 171, 172, 173, 174],
    },
    {
      topic: "children",
      keywords: [
        "child",
        "children",
        "kid",
        "family",
        "young",
        "baby",
        "infant",
        "toddler",
        "youth",
        "minor",
        "teenager",
        "adolescent",
        "school",
        "daycare",
      ],
      responseIndices: [90, 91, 92, 93, 94, 175, 176, 177, 178, 179],
    },
    {
      topic: "pets",
      keywords: [
        "pet",
        "animal",
        "dog",
        "cat",
        "companion",
        "livestock",
        "veterinary",
        "pet carrier",
        "pet food",
        "pet supplies",
        "pet evacuation",
        "pet safety",
      ],
      responseIndices: [95, 96, 97, 98, 99, 180, 181, 182, 183, 184],
    },
    {
      topic: "community",
      keywords: [
        "community",
        "neighbor",
        "barangay",
        "local",
        "help",
        "volunteer",
        "support",
        "mutual aid",
        "community response",
        "neighborhood watch",
        "community center",
        "civic group",
        "community resilience",
      ],
      responseIndices: [100, 101, 102, 103, 104, 185, 186, 187, 188, 189],
    },
    {
      topic: "road safety",
      keywords: [
        "road",
        "drive",
        "car",
        "travel",
        "transportation",
        "vehicle",
        "traffic",
        "highway",
        "route",
        "evacuation route",
        "roadblock",
        "detour",
        "bridge",
        "tunnel",
      ],
      responseIndices: [105, 106, 107, 108, 109, 190, 191, 192, 193, 194],
    },
    {
      topic: "preparedness plan",
      keywords: [
        "plan",
        "prepare",
        "readiness",
        "strategy",
        "checklist",
        "drill",
        "practice",
        "emergency plan",
        "family plan",
        "business continuity",
        "contingency plan",
        "disaster plan",
        "preparation",
        "rehearsal",
      ],
      responseIndices: [195, 196, 197, 198, 199, 200, 201, 202, 203, 204],
    },
    {
      topic: "recovery",
      keywords: [
        "recovery",
        "rebuild",
        "restore",
        "aftermath",
        "after disaster",
        "return",
        "reconstruction",
        "rehabilitation",
        "restoration",
        "cleanup",
        "debris removal",
        "damage assessment",
        "repair",
      ],
      responseIndices: [205, 206, 207, 208, 209, 210, 211, 212, 213, 214],
    },
    {
      topic: "insurance",
      keywords: [
        "insurance",
        "coverage",
        "claim",
        "policy",
        "financial",
        "compensation",
        "premium",
        "deductible",
        "disaster insurance",
        "flood insurance",
        "property insurance",
        "reimbursement",
        "adjuster",
      ],
      responseIndices: [215, 216, 217, 218, 219, 220, 221, 222, 223, 224],
    },
    {
      topic: "mental health",
      keywords: [
        "mental",
        "stress",
        "anxiety",
        "trauma",
        "psychological",
        "emotional",
        "cope",
        "PTSD",
        "counseling",
        "therapy",
        "depression",
        "mental wellness",
        "psychological first aid",
        "crisis counseling",
      ],
      responseIndices: [225, 226, 227, 228, 229, 230, 231, 232, 233, 234],
    },
    {
      topic: "special needs",
      keywords: [
        "disability",
        "special needs",
        "elderly",
        "senior",
        "accessible",
        "mobility",
        "wheelchair",
        "hearing impaired",
        "visually impaired",
        "medical device",
        "oxygen",
        "caregiver",
        "assisted living",
        "accessibility",
      ],
      responseIndices: [235, 236, 237, 238, 239, 240, 241, 242, 243, 244],
    },
    {
      topic: "warning systems",
      keywords: [
        "warning",
        "alert",
        "siren",
        "notification",
        "alarm",
        "signal",
        "monitor",
        "early warning",
        "emergency broadcast",
        "warning sign",
        "emergency alert system",
        "public announcement",
        "emergency notification",
      ],
      responseIndices: [245, 246, 247, 248, 249, 250, 251, 252, 253, 254],
    },
    {
      topic: "fire safety",
      keywords: [
        "fire",
        "burn",
        "smoke",
        "flame",
        "extinguisher",
        "heat",
        "combustion",
        "wildfire",
        "forest fire",
        "smoke detector",
        "fire alarm",
        "fire escape",
        "fire drill",
        "fire blanket",
        "sprinkler",
      ],
      responseIndices: [255, 256, 257, 258, 259, 260, 261, 262, 263, 264],
    },
    {
      topic: "landslide",
      keywords: [
        "landslide",
        "mudslide",
        "rockfall",
        "slope",
        "erosion",
        "soil",
        "debris",
        "land movement",
        "ground failure",
        "hillside collapse",
        "mass wasting",
        "landslip",
        "avalanche",
      ],
      responseIndices: [265, 266, 267, 268, 269, 270, 271, 272, 273, 274],
    },
    {
      topic: "volcanic eruption",
      keywords: [
        "volcano",
        "eruption",
        "ash",
        "lava",
        "magma",
        "pyroclastic",
        "crater",
        "volcanic ash",
        "volcanic gas",
        "volcanic activity",
        "volcanic hazard",
        "lahar",
        "pumice",
        "volcanic bomb",
      ],
      responseIndices: [275, 276, 277, 278, 279, 280, 281, 282, 283, 284],
    },
    {
      topic: "tsunami",
      keywords: [
        "tsunami",
        "tidal wave",
        "seismic sea wave",
        "coastal",
        "ocean",
        "sea",
        "harbor wave",
        "coastal flooding",
        "tsunami warning",
        "tsunami evacuation",
        "tsunami zone",
        "wave height",
        "run-up",
      ],
      responseIndices: [285, 286, 287, 288, 289, 290, 291, 292, 293, 294],
    },
    {
      topic: "pandemic",
      keywords: [
        "pandemic",
        "epidemic",
        "virus",
        "disease",
        "outbreak",
        "infection",
        "contagious",
        "quarantine",
        "isolation",
        "social distancing",
        "vaccination",
        "public health",
        "mask",
        "sanitizer",
      ],
      responseIndices: [295, 296, 297, 298, 299, 300, 301, 302, 303, 304],
    },
    {
      topic: "drought",
      keywords: [
        "drought",
        "water shortage",
        "dry spell",
        "arid",
        "water conservation",
        "water restriction",
        "water rationing",
        "rainwater harvesting",
        "water storage",
        "water supply",
        "irrigation",
        "water management",
      ],
      responseIndices: [305, 306, 307, 308, 309, 310, 311, 312, 313, 314],
    },
    {
      topic: "heat wave",
      keywords: [
        "heat wave",
        "extreme heat",
        "hot weather",
        "heatstroke",
        "heat exhaustion",
        "dehydration",
        "cooling center",
        "air conditioning",
        "fan",
        "shade",
        "sunburn",
        "heat index",
        "temperature",
      ],
      responseIndices: [315, 316, 317, 318, 319, 320, 321, 322, 323, 324],
    },
  ];

  // Check each topic for keyword matches
  // Keep track of all matching categories to find the best match
  let bestMatch = { category: null, keywordScore: 0, keywordLength: 0 };

  for (const category of topicMap) {
    for (const keyword of category.keywords) {
      // Check if keyword is in the input
      if (input.includes(keyword)) {
        // Calculate a score based on keyword length (longer keywords are more specific)
        const score = keyword.length;

        // If this is a better match than what we have, update bestMatch
        if (score > bestMatch.keywordScore) {
          bestMatch = {
            category,
            keywordScore: score,
            keywordLength: keyword.length,
          };
        }
      }
    }
  }

  // If we found a matching category, return a response from it
  if (bestMatch.category) {
    // Use the hash of input to consistently select a response
    // But also incorporate the matched keyword to ensure similar questions get similar answers
    const hashValue = hashCode(input);
    const responseIndex =
      bestMatch.category.responseIndices[
        Math.abs(hashValue) % bestMatch.category.responseIndices.length
      ];
    const response = responses.responses[responseIndex] || null;

    // Cache this response for future identical questions
    if (response) {
      responseCache.set(normalizedInput, response);
    }

    return response;
  }

  // If no specific match is found, check for general disaster-related terms
  const generalDisasterTerms = [
    "disaster",
    "emergency",
    "prepare",
    "safety",
    "risk",
    "danger",
    "hazard",
  ];
  for (const term of generalDisasterTerms) {
    if (input.includes(term)) {
      // Return a general disaster preparedness response
      const response = responses.responses[0] || null; // Default to first response about general preparedness

      // Cache this response for future identical questions
      if (response) {
        responseCache.set(normalizedInput, response);
      }

      return response;
    }
  }

  // If no match at all, return null to trigger fallback response
  return null;
};

/**
 * Improved string hash function to ensure more consistent responses for the same input
 * Uses a better distribution algorithm to reduce collisions
 * @param str Input string to hash
 * @returns A numeric hash code
 */
function hashCode(str: string): number {
  // Normalize input by converting to lowercase and trimming whitespace
  const normalizedStr = str.toLowerCase().trim();

  // Use a more robust hashing algorithm (djb2)
  let hash = 5381;
  for (let i = 0; i < normalizedStr.length; i++) {
    const char = normalizedStr.charCodeAt(i);
    hash = ((hash << 5) + hash + char) & 0xffffffff; // hash * 33 + char with 32-bit integer overflow handling
  }

  return Math.abs(hash);
}

/**
 * Mock API call to get a response based on user input
 * This function will be replaced with an actual API call in the future
 * @param userInput The user's message
 * @returns Promise with the AI response
 */
export const getAIResponse = async (
  userInput: string,
): Promise<APIResponse> => {
  // Check if we have a cached response for this exact question
  const normalizedQuestion = normalizeQuestion(userInput);
  if (responseCache.has(normalizedQuestion)) {
    return {
      content: responseCache.get(normalizedQuestion) as string,
      metadata: {
        confidence: 0.99,
        source: "cache",
        timestamp: new Date().toISOString(),
        relevance: 1.0,
      },
    };
  }

  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        // Try to get a keyword-based response first
        const keywordResponse = getKeywordBasedResponse(userInput);

        if (keywordResponse) {
          // Cache this response for future identical questions
          responseCache.set(normalizedQuestion, keywordResponse);

          resolve({
            content: keywordResponse,
            metadata: {
              confidence: 0.95,
              source: "keyword-match",
              timestamp: new Date().toISOString(),
              relevance: 0.9,
            },
          });
        } else {
          // Use fallback prompt instead of random response for better consistency
          const fallbackResponse =
            responses.fallback_prompt ||
            "I'm sorry, I don't have specific information about that. Could you ask about disaster preparedness, evacuation procedures, or emergency supplies?";

          // Cache this response for future identical questions
          responseCache.set(normalizedQuestion, fallbackResponse);

          resolve({
            content: fallbackResponse,
            metadata: {
              confidence: 0.6,
              source: "fallback-prompt",
              timestamp: new Date().toISOString(),
              relevance: 0.4,
            },
          });
        }
      } catch (error) {
        console.error("Error in getAIResponse:", error);
        // Provide a fallback response in case of any errors
        const errorResponse =
          "I'm sorry, I encountered an error processing your request. Please try again.";

        resolve({
          content: errorResponse,
          metadata: {
            confidence: 0.3,
            source: "error-fallback",
            timestamp: new Date().toISOString(),
            relevance: 0.2,
          },
        });
      }
    }, 1000); // Reduced delay for better UX
  });
};

/**
 * Check if OpenAI API key is available
 * @returns Boolean indicating if the API key is available
 */
export const isOpenAIKeyAvailable = (): boolean => {
  return !!import.meta.env.VITE_OPENAI_API_KEY;
};

/**
 * Real API integration with OpenAI
 * @param userInput The user's message
 * @param chatHistory Previous chat messages for context
 * @returns Promise with the AI response
 */
export const fetchFromOpenAI = async (
  userInput: string,
  chatHistory: ChatMessage[] = [],
): Promise<APIResponse> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    console.warn("OpenAI API key not found, falling back to local responses");
    return getAIResponse(userInput);
  }

  try {
    // Format the messages for OpenAI API
    const messages = [
      {
        role: "system",
        content: `${responses.instructions.purpose}. Respond in a ${responses.instructions.tone} tone. ${responses.instructions.response_format}`,
      },
      ...chatHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: userInput },
    ];

    // This would be the actual API call
    /*
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 150,
        temperature: 0.7
      })
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      content: data.choices[0].message.content,
      metadata: {
        confidence: 0.98,
        source: "openai-api",
        timestamp: new Date().toISOString()
      }
    };
    */

    // For now, simulate the API call with a delay and return a keyword-based or random response
    return getAIResponse(userInput);
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    // Fallback to local responses if API fails
    return {
      content: getRandomResponse(),
      metadata: {
        confidence: 0.7,
        source: "fallback-local",
        timestamp: new Date().toISOString(),
      },
    };
  }
};
