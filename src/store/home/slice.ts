import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Message {
  id: number;
  sender: 'user' | 'admin';
  type: 'text' | 'voice';
  content: string;
  timestamp: string;
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
      }>,
    ) => {
      const {sender, type, content} = action.payload;

      // Add the user's message
      state.messages.push({
        id: new Date().getTime(),
        sender,
        type,
        content,
        timestamp: new Date().toISOString(),
      });

      // Add the admin's response
      if (sender === 'user') {
        state.messages.push({
          id: new Date().getTime() + 1,
          sender: 'admin',
          type: 'text',
          content: 'This is a testing message.',
          timestamp: new Date().toISOString(),
        });
      }
    },
  },
});

export const {addMessage} = homeSlice.actions;
export default homeSlice.reducer;
