/**
 * Types & Chapter Lists for Dr-Aspirant
 */

export interface ChemicalElement {
  number: number;
  symbol: string;
  name: string;
  mass: number;
  category: string;
  period: number;
  group: number;
  state: 'Solid' | 'Liquid' | 'Gas' | 'Synthetic';
  config: string;
  electronegativity?: number;
  boilingPoint?: string;
  meltingPoint?: string;
  shells: number[]; // e.g. [2, 8, 1] for Sodium
  description: string;
}

export interface FormulaItem {
  id: string;
  title: string;
  formula: string;
  description: string;
  class: '11th' | '12th';
  subject: 'Physics' | 'Chemistry';
  chapter: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  subject: 'Physics' | 'Chemistry' | 'Botany' | 'Zoology' | 'Maths';
  chapter: string;
  class: '11th' | '12th';
}

export interface Chapter {
  id: string;
  name: string;
  subject: 'Physics' | 'Chemistry' | 'Botany' | 'Zoology' | 'Maths';
  class: '11th' | '12th';
}

export interface TestSettings {
  category: 'NEET' | 'JEE' | 'Individual';
  selectedSubject: 'Physics' | 'Chemistry' | 'Botany' | 'Zoology' | 'Maths' | 'All';
  selectedChapters: string[]; // Chapter IDs
  questionCount: number;
  timeLimit: number; // in minutes
}

export interface TestState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: { [key: number]: number }; // questionIndex -> optionIndex
  isSubmitted: boolean;
  timeLeft: number; // in seconds
  score: number;
  correctAnswersCount: number;
  incorrectAnswersCount: number;
  unattemptedCount: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
