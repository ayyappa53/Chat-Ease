import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from '../firebase';
import { Value } from "sass";
import { AuthContext } from "./AuthContext";

export  const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {

    const { currentUser } = useContext(AuthContext);

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                const chatId = currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid;
                return {
                    user: action.payload,
                    chatId: chatId
                };
            default:
                return state;
        }
    };

    const INITIAL_STATE = {
        chatId: "null",
        user: {}
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};