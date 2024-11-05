// src/main.tsx
import { h, render } from 'preact';
import ChatBot from './components/chatbot'; // Ensure this path is correct
import './index.css';

render(<ChatBot />, document.getElementById('app')!); // Matches the HTML div id
