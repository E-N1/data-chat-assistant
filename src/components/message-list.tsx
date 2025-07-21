"use client";

import React from 'react';
import styles from '@/styles/MessageList.module.css';

type Message = {
  sender: string;
  text: string;
};

type MessageListProps = {
  messages: Message[];
};

const MessageList: React.FC<MessageListProps> = ({ messages }) => (
  <ul className={styles.messageList}>
    {messages.map((message, index) => (
      <li key={index} className={message.sender === 'user' ? styles.userMessage : styles.botMessage}>
        <strong>{message.sender}: </strong>{message.text}
      </li>
    ))}
  </ul>
);

export default MessageList;