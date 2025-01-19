import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Message {
  id: number;
  sender: 'user' | 'admin';
  type: 'text' | 'voice';
  content: string;
  timestamp: string;
  duration: string;
}

interface HomeState {
  messages: Message[];
}

const initialState: HomeState = {
  messages: [],
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{
        sender: 'user' | 'admin';
        type: 'text' | 'voice';
        content: string;
        duration: string;
      }>,
    ) => {
      const {sender, type, content, duration} = action.payload;

      // Add the user's message
      state.messages.push({
        id: new Date().getTime(),
        sender,
        type,
        content,
        timestamp: new Date().toISOString(),
        duration,
      });

      // Add the admin's response
      if (sender === 'user') {
        state.messages.push({
          id: new Date().getTime() + 1,
          sender: 'admin',
          type: 'text',
          content:
            'Hello! 🌍 Im Travel GPT, your personal travel assistant. I can help you plan your perfect trip, find flights ✈️, book hotels 🏨, suggest activities 🎯, and assist with any travel-related questions! How can I make your journey amazing? (dummy message)',
          timestamp: new Date().toISOString(),
        });
      }
    },
  },
});

export const {addMessage} = homeSlice.actions;
export default homeSlice.reducer;
