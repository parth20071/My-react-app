import React, { useState, useEffect, useRef } from 'react';
import { 
  Stethoscope, 
  Atom, 
  Calculator, 
  BookOpen, 
  FileText, 
  MessageSquare, 
  Send, 
  X, 
  Clock, 
  RotateCcw, 
  Check, 
  HelpCircle, 
  ChevronRight, 
  Award, 
  ArrowRight,
  TrendingUp,
  Search,
  CheckCircle,
  Copy,
  AlertCircle
} from 'lucide-react';
import { CHAPTERS_DATA, ELEMENTS_DATA, FORMULAS_DATA, MOCK_QUESTIONS_POOL } from './data';
import { ChemicalElement, FormulaItem, Question, Chapter, TestSettings, TestState, ChatMessage } from './types';

export default function App() {
  // --- Global Navigation & States ---
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'periodic' | 'converter' | 'formulas' | 'test'>('home');
  const [selectedElement, setSelectedElement] = useState<ChemicalElement | null>(null);

  // --- Search & Filters ---
  const [periodicSearch, setPeriodicSearch] = useState('');
  const [elementCategoryFilter, setElementCategoryFilter] = useState('All');

  // --- Formula Filters ---
  const [formulasSearch, setFormulasSearch] = useState('');
  const [selectedFormulaSubject, setSelectedFormulaSubject] = useState<'Physics' | 'Chemistry'>('Chemistry');
  const [selectedFormulaClass, setSelectedFormulaClass] = useState<'11th' | '12th' | 'All'>('All');
  const [copiedFormulaId, setCopiedFormulaId] = useState<string | null>(null);

  // --- Unit Converter ---
  const [converterType, setConverterType] = useState<'pressure' | 'energy' | 'distance' | 'temperature' | 'mass'>('pressure');
  const [inputValue, setInputValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('atm');
  const [toUnit, setToUnit] = useState<string>('Pa');
  const [conversionResult, setConversionResult] = useState<string>('');

  // --- Custom Test Builder State ---
  const [testSettings, setTestSettings] = useState<TestSettings>({
    category: 'NEET',
    selectedSubject: 'All',
    selectedChapters: [], // empty -> all chapters of subject
    questionCount: 180,
    timeLimit: 180 // 3 hours
  });
  
  const [testState, setTestState] = useState<TestState | null>(null);
  const [isGeneratingTest, setIsGeneratingTest] = useState(false);
  const [testError, setTestError] = useState<string | null>(null);
  
  // Chapter search filter in custom test creator
  const [chapterSearchText, setChapterSearchText] = useState('');

  // --- Floating AI STEM Chatbox State ---
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'assistant',
      content: 'Hello! I am your Dr-Aspirant AI Tutor. Ask me any conceptual query or difficult numerical from Physics, Chemistry, Maths, Zoology, or Botany, and I will explain it with extremely simple, step-by-step methods.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // --- Rotating 3D Bohr Element Canvas ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotationAngle, setRotationAngle] = useState({ x: 0.3, y: 0.5 });
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // --- Timers & Submissions ---
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- Setup Intro Animation ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // --- Auto-scroll chat box to bottom ---
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  // --- Handle Real-time Countdown Timer for Test ---
  useEffect(() => {
    if (testState && !testState.isSubmitted) {
      timerIntervalRef.current = setInterval(() => {
        setTestState(prev => {
          if (!prev) return null;
          if (prev.timeLeft <= 1) {
            // Time Out - Auto Submit
            clearInterval(timerIntervalRef.current!);
            return {
              ...prev,
              timeLeft: 0,
              isSubmitted: true,
              ...evaluateScore(prev.questions, prev.answers)
            };
          }
          return {
            ...prev,
            timeLeft: prev.timeLeft - 1
          };
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [testState?.isSubmitted, testState?.questions]);

  // --- 3D Element Interactive Rotation logic (Canvas rendering) ---
  useEffect(() => {
    if (!selectedElement || !canvasRef.current || activeTab !== 'periodic') return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let spherePulse = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      spherePulse += 0.03;

      // Draw Legend or Background Indicators
      ctx.fillStyle = '#64748b';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText("Drag to rotate 360° continuously", cx, canvas.height - 12);

      // 1. Draw central nucleus (glowing protons & neutrons)
      const nucleusRadius = 18 + Math.sin(spherePulse) * 1.2;
      const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, nucleusRadius);
      grad.addColorStop(0, '#f43f5e'); // Red protons
      grad.addColorStop(0.5, '#0ea5e9'); // Blue neutrons
      grad.addColorStop(1, 'rgba(15, 23, 42, 0.4)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, nucleusRadius, 0, Math.PI * 2);
      ctx.fill();

      // Outer nucleus border
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, nucleusRadius + 4, 0, Math.PI * 2);
      ctx.stroke();

      // Nucleus Symbol Label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(selectedElement.symbol, cx, cy + 4);

      // 2. Draw Concentric Shells (Orbits) in BLACK (as requested: black color orbits)
      const maxShells = selectedElement.shells.length;
      
      selectedElement.shells.forEach((electronCount, shellIdx) => {
        const orbitRadius = 45 + shellIdx * 28;
        
        // Calculate perspective ellipse rotation values based on state's x & y rotation angles
        ctx.strokeStyle = '#000000'; // STRICT REQUIREMENT: orbits of atom must be black colour
        ctx.lineWidth = 1.5;

        // Render an interactive 3D circle tilted in space
        ctx.beginPath();
        for (let angle = 0; angle <= Math.PI * 2; angle += 0.05) {
          // Get 3D coordinates on the flat circle plane
          const x3d = orbitRadius * Math.cos(angle);
          const z3d = orbitRadius * Math.sin(angle);
          const y3d = 0;

          // Rotate around X-axis
          const cosX = Math.cos(rotationAngle.x);
          const sinX = Math.sin(rotationAngle.x);
          const yRotX = y3d * cosX - z3d * sinX;
          const zRotX = y3d * sinX + z3d * cosX;

          // Rotate around Y-axis
          const cosY = Math.cos(rotationAngle.y);
          const sinY = Math.sin(rotationAngle.y);
          const xRotY = x3d * cosY + zRotX * sinY;
          // Projected into 2D coordinates on our screens
          const projX = cx + xRotY;
          const projY = cy + yRotX;

          if (angle === 0) ctx.moveTo(projX, projY);
          else ctx.lineTo(projX, projY);
        }
        ctx.closePath();
        ctx.stroke();

        // 3. Draw Revolving Electrons on those tilted black orbits
        for (let e = 0; e < electronCount; e++) {
          // Add a temporal orbital motion speed offset peculiar to each shell
          const speedFactor = 0.8 / (shellIdx + 1);
          const orbitalAngle = (spherePulse * speedFactor) + (e * (Math.PI * 2) / electronCount);

          const x3e = orbitRadius * Math.cos(orbitalAngle);
          const z3e = orbitRadius * Math.sin(orbitalAngle);
          const y3e = 0;

          // Apply rotation transformation
          const cosX = Math.cos(rotationAngle.x);
          const sinX = Math.sin(rotationAngle.x);
          const yRotX = y3e * cosX - z3e * sinX;
          const zRotX = y3e * sinX + z3e * cosX;

          const cosY = Math.cos(rotationAngle.y);
          const sinY = Math.sin(rotationAngle.y);
          const xRotY = x3e * cosY + zRotX * sinY;

          const eX = cx + xRotY;
          const eY = cy + yRotX;

          // Draw electron particle as a high-contrast shining teal sphere
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00f5ff';
          ctx.fillStyle = '#00f5ff';
          ctx.beginPath();
          ctx.arc(eX, eY, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset shadow
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [selectedElement, rotationAngle, activeTab]);

  // --- Drag mechanics to rotate the atom 360° smoothly ---
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;

    // Adjust angles based on horizontal and vertical displacement
    setRotationAngle((prev) => ({
      x: prev.x + deltaY * 0.015,
      y: prev.y + deltaX * 0.015
    }));

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleCanvasMouseUp = () => {
    isDragging.current = false;
  };

  // Touch triggers for mobile compatibility
  const handleCanvasTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleCanvasTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - lastMousePos.current.x;
    const deltaY = e.touches[0].clientY - lastMousePos.current.y;

    setRotationAngle((prev) => ({
      x: prev.x + deltaY * 0.015,
      y: prev.y + deltaX * 0.015
    }));

    lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  // --- Dynamic Unit Converter Logic ---
  useEffect(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) {
      setConversionResult('Invalid Input');
      return;
    }

    let result = 0;
    if (converterType === 'pressure') {
      // standard value mapping base to Pascal (Pa)
      let paValue = val;
      if (fromUnit === 'atm') paValue = val * 101325;
      else if (fromUnit === 'bar') paValue = val * 100000;
      else if (fromUnit === 'mmHg') paValue = val * 133.322;
      else if (fromUnit === 'torr') paValue = val * 133.322;

      if (toUnit === 'Pa') result = paValue;
      else if (toUnit === 'atm') result = paValue / 101325;
      else if (toUnit === 'bar') result = paValue / 100000;
      else if (toUnit === 'mmHg') result = paValue / 133.322;
      else if (toUnit === 'torr') result = paValue / 133.322;

    } else if (converterType === 'energy') {
      // standard value mapping base to Joule (J)
      let jValue = val;
      if (fromUnit === 'cal') jValue = val * 4.184;
      else if (fromUnit === 'eV') jValue = val * 1.60218e-19;
      else if (fromUnit === 'L-atm') jValue = val * 101.325;
      else if (fromUnit === 'erg') jValue = val * 1e-7;

      if (toUnit === 'J') result = jValue;
      else if (toUnit === 'cal') result = jValue / 4.184;
      else if (toUnit === 'eV') result = jValue / 1.60218e-19;
      else if (toUnit === 'L-atm') result = jValue / 101.325;
      else if (toUnit === 'erg') result = jValue * 1e7;

    } else if (converterType === 'distance') {
      // standard base: meter (m)
      let mValue = val;
      if (fromUnit === 'Å') mValue = val * 1e-10;
      else if (fromUnit === 'pm') mValue = val * 1e-12;
      else if (fromUnit === 'nm') mValue = val * 1e-9;
      else if (fromUnit === 'cm') mValue = val * 0.01;

      if (toUnit === 'm') result = mValue;
      else if (toUnit === 'Å') result = mValue / 1e-10;
      else if (toUnit === 'pm') result = mValue / 1e-12;
      else if (toUnit === 'nm') result = mValue / 1e-9;
      else if (toUnit === 'cm') result = mValue * 100;

    } else if (converterType === 'temperature') {
      // formulas for temperature conversions
      let kelvin = val;
      if (fromUnit === '°C') kelvin = val + 273.15;
      else if (fromUnit === '°F') kelvin = ((val - 32) * 5) / 9 + 273.15;

      if (toUnit === 'K') result = kelvin;
      else if (toUnit === '°C') result = kelvin - 273.15;
      else if (toUnit === '°F') result = ((kelvin - 273.15) * 9) / 5 + 32;

    } else if (converterType === 'mass') {
      // standard base: kg
      let kgValue = val;
      if (fromUnit === 'amu') kgValue = val * 1.66054e-27;
      else if (fromUnit === 'g') kgValue = val * 0.001;
      else if (fromUnit === 'mg') kgValue = val * 1e-6;

      if (toUnit === 'kg') result = kgValue;
      else if (toUnit === 'amu') result = kgValue / 1.66054e-27;
      else if (toUnit === 'g') result = kgValue * 1000;
      else if (toUnit === 'mg') result = kgValue * 1e6;
    }

    setConversionResult(result.toExponential(5).replace(/e\+0/g, 'e').replace(/e\-0/g, 'e-'));
  }, [inputValue, fromUnit, toUnit, converterType]);

  const handleConverterTypeChange = (type: typeof converterType) => {
    setConverterType(type);
    if (type === 'pressure') {
      setFromUnit('atm');
      setToUnit('Pa');
    } else if (type === 'energy') {
      setFromUnit('cal');
      setToUnit('J');
    } else if (type === 'distance') {
      setFromUnit('Å');
      setToUnit('nm');
    } else if (type === 'temperature') {
      setFromUnit('°C');
      setToUnit('K');
    } else if (type === 'mass') {
      setFromUnit('amu');
      setToUnit('g');
    }
  };

  // --- Quick Formula Copier ---
  const copyFormulaText = (formula: FormulaItem) => {
    const textToCopy = `${formula.title}: ${formula.formula}\n(${formula.description})`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedFormulaId(formula.id);
      setTimeout(() => setCopiedFormulaId(null), 2000);
    });
  };

  // --- Floating AI STEM Chat Box Messenger ---
  const handleSendChatMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: 'user',
      content: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const payload = {
        messages: [...chatMessages, userMsg].map((msg) => ({
          role: msg.role,
          content: msg.content
        }))
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        role: 'assistant',
        content: data.content || 'I encountered an error solving your query. Please ask me again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      setChatMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: 'assistant',
          content: "Oops! I encountered an offline state or the server is warming up. Please make sure your GEMINI_API_KEY secret is loaded in AI Studio. Here is a helpful tip: Check the formulas tab for immediate key derivations!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // --- Custom Test Rules and Setup ---
  const handleSelectExamSettings = (exam: 'NEET' | 'JEE' | 'Individual') => {
    let subjectsSelected: any = 'All';
    let questionCount = 180;
    let timeLimit = 180; // 3 hours (180 mins) automatically set for NEET and JEE

    if (exam === 'NEET') {
      subjectsSelected = 'All'; // which automatically implies Phy, Chm, Bot, Zoo
      questionCount = 180;
      timeLimit = 180;
    } else if (exam === 'JEE') {
      subjectsSelected = 'All'; // which automatically implies Phy, Chm, Maths
      questionCount = 90;
      timeLimit = 180;
    } else {
      subjectsSelected = 'Chemistry'; // individual default
      questionCount = 45;
      timeLimit = 50; // default for individual subject
    }

    setTestSettings({
      category: exam,
      selectedSubject: subjectsSelected,
      selectedChapters: [],
      questionCount,
      timeLimit
    });
  };

  const toggleChapterSelection = (chapterId: string) => {
    setTestSettings(prev => {
      const active = [...prev.selectedChapters];
      const index = active.indexOf(chapterId);
      if (index > -1) {
        active.splice(index, 1);
      } else {
        active.push(chapterId);
      }
      return { ...prev, selectedChapters: active };
    });
  };

  const getFilteredChapters = () => {
    let list = CHAPTERS_DATA;
    // filter by subject based on Exam types
    if (testSettings.category === 'NEET') {
      list = CHAPTERS_DATA.filter(c => ['Physics', 'Chemistry', 'Botany', 'Zoology'].includes(c.subject));
    } else if (testSettings.category === 'JEE') {
      list = CHAPTERS_DATA.filter(c => ['Physics', 'Chemistry', 'Maths'].includes(c.subject));
    } else if (testSettings.category === 'Individual') {
      list = CHAPTERS_DATA.filter(c => c.subject === testSettings.selectedSubject);
    }

    if (chapterSearchText.trim()) {
      list = list.filter(c => c.name.toLowerCase().includes(chapterSearchText.toLowerCase()));
    }
    return list;
  };

  // Select/Deselect All filtered chapters
  const handleSelectAllChapters = (select: boolean) => {
    const chapters = getFilteredChapters().map(c => c.id);
    setTestSettings(prev => ({
      ...prev,
      selectedChapters: select ? Array.from(new Set([...prev.selectedChapters, ...chapters])) : prev.selectedChapters.filter(id => !chapters.includes(id))
    }));
  };

  // Generate Custom Paper with Gemini API (Checked by Gemini) & offline fallback
  const startCustomExam = async () => {
    setIsGeneratingTest(true);
    setTestError(null);

    // Collect names of chapters
    const activeChapterIds = testSettings.selectedChapters.length > 0 
      ? testSettings.selectedChapters 
      : getFilteredChapters().map(c => c.id);
    
    const chaptersChosenNames = CHAPTERS_DATA
      .filter(c => activeChapterIds.includes(c.id))
      .map(c => c.name);

    // Determine subjects active
    let subjectsList: ('Physics' | 'Chemistry' | 'Botany' | 'Zoology' | 'Maths')[] = [];
    if (testSettings.category === 'NEET') {
      subjectsList = ['Physics', 'Chemistry', 'Botany', 'Zoology'];
    } else if (testSettings.category === 'JEE') {
      subjectsList = ['Physics', 'Chemistry', 'Maths'];
    } else {
      subjectsList = [testSettings.selectedSubject as any];
    }

    try {
      // Call modern Gemini endpoint to generate rigorous high-quality questions
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: subjectsList.join(' & '),
          chapters: chaptersChosenNames,
          questionCount: testSettings.questionCount > 10 ? 10 : testSettings.questionCount, // Limit API tokens in preview to avoid timeouts, we can generate a segment and merge with mock pool
          examType: testSettings.category
        })
      });

      if (!response.ok) {
        throw new Error('API server failed');
      }

      const responseData = await response.json();
      let apiQuestions: Question[] = responseData.questions || [];

      // Check if we received valid questions
      if (!Array.isArray(apiQuestions) || apiQuestions.length === 0) {
        throw new Error('Malformed API questions list');
      }

      // Complete the remaining question volume requested using highly structured NCERT fallback questions pool
      const neededCount = testSettings.questionCount;
      let finalQuestions: Question[] = [...apiQuestions];

      if (finalQuestions.length < neededCount) {
        // Fetch matching questions from preloaded pool
        let matchedFromPool: Question[] = [];
        subjectsList.forEach((sub) => {
          const subPool = MOCK_QUESTIONS_POOL[sub] || [];
          matchedFromPool.push(...subPool);
        });

        // shuffle array
        const shuffled = matchedFromPool.sort(() => 0.5 - Math.random());
        for (const poolQ of shuffled) {
          if (finalQuestions.length >= neededCount) break;
          // check for duplicate text
          if (!finalQuestions.some(q => q.text.toLowerCase() === poolQ.text.toLowerCase())) {
            finalQuestions.push({
              ...poolQ,
              id: `pool_q_${Math.random().toString()}`
            });
          }
        }
      }

      // If still smaller, replicate or generate fallback identifiers nicely
      if (finalQuestions.length === 0) {
        throw new Error('Could not populate any test questions.');
      }

      // Slice to match exactly the user requested question count
      finalQuestions = finalQuestions.slice(0, neededCount);

      // Start the test index state
      setTestState({
        questions: finalQuestions,
        currentQuestionIndex: 0,
        answers: {},
        isSubmitted: false,
        timeLeft: testSettings.timeLimit * 60,
        score: 0,
        correctAnswersCount: 0,
        incorrectAnswersCount: 0,
        unattemptedCount: neededCount
      });
      setActiveTab('test');

    } catch (err: any) {
      console.warn('Backend question generation offline/failed, falling back to preloaded pristine local NCERT Question Pool:', err);
      // Fallback completely to local offline mock generation pool
      let fallbackMatched: Question[] = [];
      subjectsList.forEach((sub) => {
        const subPool = MOCK_QUESTIONS_POOL[sub] || [];
        fallbackMatched.push(...subPool);
      });

      if (fallbackMatched.length === 0) {
        // extreme safe fallback with a dynamic mock question
        fallbackMatched = [{
          id: 'fb_1',
          text: 'What is the correct NCERT chemical formula for rust formed on Iron surface?',
          options: ['Fe2O3 · xH2O', 'Fe3O4', 'FeO', 'Fe(OH)3'],
          correctAnswerIndex: 0,
          explanation: 'Rust is hydrated ferric oxide: Fe2O3 · xH2O. It forms via electrochemical corrosion cycles.',
          subject: 'Chemistry',
          chapter: 'Redox Reactions & Electrochemistry',
          class: '12th'
        }];
      }

      // Replicate elements up to requested count to satisfy exactly user limits
      let finalQuestions: Question[] = [];
      while (finalQuestions.length < testSettings.questionCount) {
        const copyList = fallbackMatched.map(q => ({
          ...q,
          id: `${q.id}_repeat_${Math.random().toString().slice(2, 6)}`
        })).sort(() => 0.5 - Math.random());
        finalQuestions.push(...copyList);
      }
      finalQuestions = finalQuestions.slice(0, testSettings.questionCount);

      // Start standard test
      setTestState({
        questions: finalQuestions,
        currentQuestionIndex: 0,
        answers: {},
        isSubmitted: false,
        timeLeft: testSettings.timeLimit * 60,
        score: 0,
        correctAnswersCount: 0,
        incorrectAnswersCount: 0,
        unattemptedCount: testSettings.questionCount
      });
      setActiveTab('test');
    } finally {
      setIsGeneratingTest(false);
    }
  };

  // Evaluate final marking rules (+4 correct, -1 negative mark)
  const evaluateScore = (questions: Question[], answers: { [key: number]: number }) => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    questions.forEach((q, idx) => {
      const selectedOption = answers[idx];
      if (selectedOption === undefined) {
        unattempted++;
      } else if (selectedOption === q.correctAnswerIndex) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const score = (correct * 4) - (incorrect * 1);

    return {
      score,
      correctAnswersCount: correct,
      incorrectAnswersCount: incorrect,
      unattemptedCount: unattempted
    };
  };

  const submitTestEarly = () => {
    if (!testState) return;
    if (window.confirm('Are you sure you want to submit your paper before time? All marked responses will be graded.')) {
      setTestState(prev => {
        if (!prev) return null;
        return {
          ...prev,
          isSubmitted: true,
          ...evaluateScore(prev.questions, prev.answers)
        };
      });
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const closeCompletedTestReport = () => {
    setTestState(null);
  };

  // Helper formatting for seconds to digital time HH:MM:SS
  const formatTimeHHMMSS = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [
      h > 0 ? String(h).padStart(2, '0') : '00',
      String(m).padStart(2, '0'),
      String(s).padStart(2, '0')
    ].join(':');
  };

  // Filtered periodic elements representing search keys
  const getFilteredElements = () => {
    return ELEMENTS_DATA.filter((elem) => {
      const matchesSearch = elem.name.toLowerCase().includes(periodicSearch.toLowerCase()) ||
        elem.symbol.toLowerCase().includes(periodicSearch.toLowerCase()) ||
        elem.number.toString() === periodicSearch;
      
      const matchesCategory = elementCategoryFilter === 'All' || elem.category === elementCategoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  };

  // Group elements in a nice grid matrix representing actual shell positions
  // Periodic table rows and columns mapped for active grid matrix elements
  const getElemCoordinates = (num: number) => {
    // Lanthanoids (57-71) go to Row 9, Columns 4-18
    if (num >= 57 && num <= 71) {
      return { r: 9, c: num - 57 + 4 };
    }
    // Actinoids (89-103) go to Row 10, Columns 4-18
    if (num >= 89 && num <= 103) {
      return { r: 10, c: num - 89 + 4 };
    }

    // Row 1
    if (num === 1) return { r: 1, c: 1 };
    if (num === 2) return { r: 1, c: 18 };

    // Row 2
    if (num >= 3 && num <= 4) return { r: 2, c: num - 2 };
    if (num >= 5 && num <= 10) return { r: 2, c: num - 5 + 13 };

    // Row 3
    if (num >= 11 && num <= 12) return { r: 3, c: num - 10 };
    if (num >= 13 && num <= 18) return { r: 3, c: num - 13 + 13 };

    // Row 4
    if (num >= 19 && num <= 36) return { r: 4, c: num - 18 };

    // Row 5
    if (num >= 37 && num <= 54) return { r: 5, c: num - 36 };

    // Row 6 (handle elements excluding Lanthanoids)
    if (num >= 55 && num <= 56) return { r: 6, c: num - 54 };
    if (num >= 72 && num <= 86) return { r: 6, c: num - 72 + 4 };

    // Row 7 (handle elements excluding Actinoids)
    if (num >= 87 && num <= 88) return { r: 7, c: num - 86 };
    if (num >= 104 && num <= 118) return { r: 7, c: num - 104 + 4 };

    return { r: 1, c: 1 };
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'diatomic-nonmetal': return 'bg-rose-100 text-rose-800 border-rose-300 hover:border-rose-500';
      case 'noble-gas': return 'bg-purple-100 text-purple-800 border-purple-300 hover:border-purple-500';
      case 'alkali-metal': return 'bg-amber-100 text-amber-800 border-amber-300 hover:border-amber-500';
      case 'alkaline-earth-metal': return 'bg-yellow-100 text-yellow-850 text-yellow-800 border-yellow-300 hover:border-yellow-500';
      case 'metalloid': return 'bg-teal-100 text-teal-805 text-teal-800 border-teal-300 hover:border-teal-500';
      case 'polyatomic-nonmetal': return 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:border-emerald-500';
      case 'halogen': return 'bg-sky-100 text-sky-800 border-sky-300 hover:border-sky-500';
      case 'transition-metal': return 'bg-blue-100 text-blue-800 border-blue-300 hover:border-blue-500';
      case 'post-transition-metal': return 'bg-indigo-100 text-indigo-800 border-indigo-300 hover:border-indigo-500';
      case 'lanthanoid': return 'bg-orange-100 text-orange-800 border-orange-305 border-orange-300 hover:border-orange-500';
      case 'actinoid': return 'bg-pink-100 text-pink-800 border-pink-305 border-pink-300 hover:border-pink-500';
      default: return 'bg-slate-100 text-slate-850 border-slate-300 hover:border-slate-500';
    }
  };


  // ==========================================
  // --- RENDERING INTRO ANIMATION SCREEN ---
  // ==========================================
  if (showIntro) {
    return (
      <div id="intro-screen" className="fixed inset-0 bg-slate-900 z-50 flex flex-col justify-center items-center text-white select-none">
        <div className="relative flex flex-col items-center">
          {/* Pulsating stethoscope logo container */}
          <div className="relative bg-teal-500/10 p-7 rounded-full border border-teal-500/30 animate-pulse mb-6">
            <Stethoscope className="w-20 h-20 text-teal-400 stroke-[1.5]" />
            <div className="absolute inset-0 rounded-full border border-teal-500/20 animate-ping" />
          </div>
          
          {/* Animated app name */}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider bg-gradient-to-r from-teal-400 via-indigo-400 to-teal-400 bg-clip-text text-transparent animate-bounce">
            Dr-Aspirant
          </h1>
          <p className="text-slate-400 mt-2 text-sm tracking-widest uppercase">The Ultimate NEET & JEE Prep Companion</p>
          
          {/* Elegant cardiogram SVG simulation track */}
          <svg className="w-56 h-12 mt-6 text-teal-500/50" viewBox="0 0 100 20" fill="none">
            <path 
              d="M0,10 H30 L35,2 L40,18 L45,6 L50,12 L55,10 H100" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              className="path" 
              strokeDasharray="200"
              strokeDashoffset="200"
              style={{ animation: 'drawCardiogram 2.5s ease-in-out infinite' }}
            />
          </svg>
        </div>
        
        {/* Style keyframe variables specifically inject for intro wave animation */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes drawCardiogram {
            to { stroke-dashoffset: 0; }
          }
        `}} />
      </div>
    );
  }

  // =========================================
  // --- MAIN DR-ASPIRANT APPLICATION UI ---
  // =========================================
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      
      {/* 2. TOP HEADER SECTION */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-205 border-slate-200 py-3.5 px-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-teal-500/10 p-2 rounded-lg border border-teal-500/20">
            <Stethoscope className="w-5.5 h-5.5 text-teal-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
              Dr-Aspirant
            </h1>
            <p className="text-[10px] text-slate-500 tracking-wider font-mono">NEET & JEE MASTERCLASS</p>
          </div>
        </div>

        {/* TOP RIGHT PROFILE NAV LOGO (App logo) */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-teal-600 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full hidden sm:inline-block">
            Target: 2026
          </span>
          <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-teal-600 shadow-inner">
            <Stethoscope className="w-4.5 h-4.5 text-teal-600" />
          </div>
        </div>
      </header>

      {/* 3. CORE ROUTER PAGE VIEWS */}
      <main className="flex-1 pb-24 overflow-x-hidden container mx-auto p-4 md:p-6">
        
        {/* ==================================
            A. LANDING HOME PAGE
            ================================== */}
        {activeTab === 'home' && (
          <div className="space-y-6 max-w-5xl mx-auto animate-fadeIn col-span-full">
            {/* Elegant Hero card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-teal-50/70 border border-slate-200 p-6 md:p-8 shadow-sm">
              <div className="absolute -right-12 -top-12 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 border border-teal-200 uppercase tracking-widest font-mono">
                  Daily Aspirant Motto
                </span>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-800 leading-tight">
                  Accelerate Your Physics, Chemistry & Biology Concept Drills
                </h2>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button 
                    onClick={() => setActiveTab('test')}
                    className="px-5 py-2 bg-teal-650 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-medium text-xs rounded-lg shadow-sm flex items-center gap-2 transition"
                  >
                    Create Custom Test <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('periodic')}
                    className="px-5 py-2 bg-white hover:bg-slate-50 active:scale-95 text-slate-705 text-slate-700 font-medium text-xs rounded-lg border border-slate-200 flex items-center gap-2 transition"
                  >
                    Interactive Periodic Table <Atom className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* INSTEAD OF SHORTCUTS: PRACTICAL, LIVE INTERACTIVE WIDGETS OF ALL TOOLS */}
            <div className="space-y-8 animate-fadeIn">
              
              {/* 1. Custom Test Widget */}
              <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-sm text-slate-800">
                <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-slate-800 text-sm">Custom Test</h3>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: 'NEET', label: 'NEET Practice' },
                    { id: 'JEE', label: 'JEE Practice' },
                    { id: 'Individual', label: 'Individual Subject' }
                  ].map((exam) => (
                    <button
                      key={exam.id}
                      onClick={() => {
                        handleSelectExamSettings(exam.id as any);
                        setActiveTab('test');
                      }}
                      className="p-3 text-center rounded-xl border border-slate-150 bg-slate-50 hover:bg-slate-100 transition active:scale-98 flex items-center justify-center font-bold text-xs text-slate-700 font-medium"
                    >
                      {exam.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. PRACTICAL WIDGET: scientific unit converter */}
              <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-sm text-slate-800">
                <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-sky-600" />
                    <h3 className="font-bold text-slate-800 text-sm">Unit Converter</h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                  {[
                    { type: 'pressure', label: 'Pressure' },
                    { type: 'energy', label: 'Energy' },
                    { type: 'distance', label: 'Distance' },
                    { type: 'temperature', label: 'Temp' },
                    { type: 'mass', label: 'Mass' }
                  ].map((item) => (
                    <button
                      key={item.type}
                      onClick={() => handleConverterTypeChange(item.type as any)}
                      className={`py-1.5 px-1 text-[11px] font-semibold rounded-lg border transition ${
                        converterType === item.type 
                          ? 'bg-sky-50 text-sky-600 border-sky-300 font-bold' 
                          : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 font-mono uppercase">From Input</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="bg-white text-slate-800 rounded px-2 py-1 text-xs font-bold grow border border-slate-300 outline-none focus:border-sky-500"
                        placeholder="Qty..."
                      />
                      <select
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value)}
                        className="bg-white text-slate-800 rounded px-1.5 py-1 text-xs border border-slate-300 focus:outline-none"
                      >
                        {converterType === 'pressure' && ['atm', 'Pa', 'bar', 'mmHg', 'torr'].map(u => <option key={u} value={u}>{u}</option>)}
                        {converterType === 'energy' && ['cal', 'J', 'eV', 'L-atm', 'erg'].map(u => <option key={u} value={u}>{u}</option>)}
                        {converterType === 'distance' && ['Å', 'pm', 'nm', 'm', 'cm'].map(u => <option key={u} value={u}>{u}</option>)}
                        {converterType === 'temperature' && ['°C', 'K', '°F'].map(u => <option key={u} value={u}>{u}</option>)}
                        {converterType === 'mass' && ['amu', 'kg', 'g', 'mg'].map(u => <option key={u} value={u}>{u}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 font-mono uppercase font-bold text-sky-605">Computed Target Conversion</label>
                    <div className="flex gap-2">
                      <div className="bg-white text-slate-800 rounded px-2.5 py-1 text-xs font-extrabold grow border border-slate-200 flex items-center pr-8 shadow-inner select-all min-h-[28px]">
                        {conversionResult}
                      </div>
                      <select
                        value={toUnit}
                        onChange={(e) => setToUnit(e.target.value)}
                        className="bg-white text-slate-850 rounded px-1.5 py-1 text-xs border border-slate-300 focus:outline-none"
                      >
                        {converterType === 'pressure' && ['atm', 'Pa', 'bar', 'mmHg', 'torr'].map(u => <option key={u} value={u}>{u}</option>)}
                        {converterType === 'energy' && ['cal', 'J', 'eV', 'L-atm', 'erg'].map(u => <option key={u} value={u}>{u}</option>)}
                        {converterType === 'distance' && ['Å', 'pm', 'nm', 'm', 'cm'].map(u => <option key={u} value={u}>{u}</option>)}
                        {converterType === 'temperature' && ['°C', 'K', '°F'].map(u => <option key={u} value={u}>{u}</option>)}
                        {converterType === 'mass' && ['amu', 'kg', 'g', 'mg'].map(u => <option key={u} value={u}>{u}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="col-span-full pt-1.5 border-t border-slate-200 text-[10px] text-slate-500 font-mono">
                    {converterType === 'pressure' && <p>• Context: 1 atm = 101,325 Pascals = 760 mmHg = 760 Torr.</p>}
                    {converterType === 'energy' && <p>• Context: 1 Calorie = 4.184 Joules. 1 eV = 1.602 × 10⁻¹⁹ Joules.</p>}
                    {converterType === 'distance' && <p>• Context: 1 Angstrom (Å) = 10⁻¹⁰ meters = 100 pm.</p>}
                    {converterType === 'temperature' && <p>• Context: Absolute Zero Kelvin = -273.15° Celsius.</p>}
                    {converterType === 'mass' && <p>• Context: 1 amu (unified mass carbon-12 base) ≈ 1.6605 × 10⁻²⁷ kg.</p>}
                  </div>
                </div>
              </div>

              {/* 3. PRACTICAL WIDGET: Revision Formulas */}
              <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-sm text-slate-800 font-sans">
                <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-bold text-slate-800 text-sm">Revision Formulas</h3>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-700">De Broglie Wavelength</span>
                    <span className="text-[9px] font-mono bg-indigo-50 border border-indigo-150 px-1.5 py-0.2 rounded font-semibold text-indigo-750">Physics • 11th</span>
                  </div>
                  <div className="bg-slate-900 text-emerald-400 p-2.5 rounded-lg text-center font-mono text-xs tracking-wider font-semibold border border-slate-850 shadow-inner">
                    λ = h / p
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-slate-100">
                    <span className="text-[10px] text-slate-500">Explore formulae across courses</span>
                    <button 
                      onClick={() => setActiveTab('formulas')}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-bold"
                    >
                      View All Formulae &rarr;
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. PRACTICAL WIDGET: Interactive Periodic Table Element Inspector */}
              <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-sm text-slate-800">
                <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Atom className="w-5 h-5 text-teal-600" />
                    <h3 className="font-bold text-slate-800 text-sm">Periodic Table</h3>
                  </div>
                </div>

                {/* Compact element showcase */}
                <div className="flex flex-col sm:flex-row gap-4 items-center bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div 
                    onClick={() => {
                      setSelectedElement(ELEMENTS_DATA[0]);
                      setActiveTab('periodic');
                    }}
                    className="w-16 h-16 p-2 rounded-xl border border-teal-300 bg-teal-50 text-teal-900 flex flex-col justify-between cursor-pointer hover:scale-105 transition-all shadow-sm shrink-0"
                  >
                    <span className="text-[9px] font-bold font-mono opacity-60">1</span>
                    <span className="text-center font-black text-xl leading-none">H</span>
                    <span className="text-center text-[9px] font-medium tracking-tighter truncate">Hydrogen</span>
                  </div>
                  <div className="space-y-1 text-center sm:text-left grow">
                    <h4 className="font-bold text-slate-800 text-xs">Hydrogen (Example Element)</h4>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      Atomic No: 1 • Group: 1 • Category: Diatomic Nonmetal • Mass: 1.008 u.
                    </p>
                    <button 
                      onClick={() => {
                        setActiveTab('periodic');
                      }}
                      className="text-[11px] text-teal-600 hover:text-teal-800 font-bold flex items-center gap-1 justify-center sm:justify-start"
                    >
                      Open Full Periodic Table &rarr;
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* NEET & JEE Motivation quote Banner */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
              <div className="bg-amber-100 p-2.5 rounded-full border border-amber-200 text-amber-600 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-amber-600 uppercase tracking-widest font-bold">Aspirant Quote of the Day</p>
                <p className="text-xs text-slate-650 text-slate-605 text-slate-600 italic font-serif">"The key to cracking JEE and NEET is consistent, deliberate practice. Concepts get hard unless broken down simply."</p>
              </div>
            </div>

            {/* REQUIEREMENTS BANNER: Developed by Bhavesh Singh Chahar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
              <div id="developed-box" className="bg-gradient-to-r from-teal-50 to-white border border-teal-200/60 p-4 rounded-xl text-center shadow-sm transition hover:scale-[1.01]">
                <p className="text-[10px] text-teal-600 font-mono tracking-widest font-bold">CREATION CREDIT</p>
                <h4 className="text-sm font-bold text-slate-850 text-slate-800 mt-1">This app is developed by Bhavesh Singh Chahar</h4>
              </div>
              <div id="founder-box" className="bg-gradient-to-r from-indigo-50 to-white border border-indigo-200/60 p-4 rounded-xl text-center shadow-sm transition hover:scale-[1.01]">
                <p className="text-[10px] text-indigo-600 font-mono tracking-widest font-bold">LEADERSHIP CREDIT</p>
                <h4 className="text-sm font-bold text-slate-850 text-slate-800 mt-1">Founder of Dr-Aspirant is Bhavesh Singh Chahar</h4>
              </div>
            </div>
          </div>
        )}

        {/* ==================================
            B. INTERACTIVE 3D PERIODIC TABLE
            ================================== */}
        {activeTab === 'periodic' && (
          <div className="space-y-6 animate-fadeIn col-span-full">
            {/* Header info bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-205 border-slate-200 shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Atom className="w-5.5 h-5.5 text-teal-600" /> Periodic table
                </h2>
              </div>

              {/* Filtering Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search name, symbol, number..." 
                    value={periodicSearch}
                    onChange={(e) => setPeriodicSearch(e.target.value)}
                    className="bg-white text-slate-800 pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-teal-500 w-52 shadow-inner"
                  />
                  {periodicSearch && (
                    <button onClick={() => setPeriodicSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <select 
                  value={elementCategoryFilter} 
                  onChange={(e) => setElementCategoryFilter(e.target.value)}
                  className="bg-white text-slate-800 text-xs py-1.5 px-3 rounded-lg border border-slate-300 outline-none focus:border-teal-500 shadow-sm"
                >
                  <option value="All">All Categories</option>
                  <option value="alkali-metal">Alkali Metals</option>
                  <option value="alkaline-earth-metal">Alkaline Earth</option>
                  <option value="transition-metal">Transition Metals</option>
                  <option value="lanthanoid">Lanthanoids</option>
                  <option value="actinoid">Actinoids</option>
                  <option value="metalloid">Metalloids</option>
                  <option value="diatomic-nonmetal">Diatomic Nonmetals</option>
                  <option value="polyatomic-nonmetal">Polyatomic Nonmetals</option>
                  <option value="halogen">Halogens</option>
                  <option value="noble-gas">Noble Gases</option>
                </select>
              </div>
            </div>

            {/* The Periodic Table grid structure */}
            <div className="overflow-x-auto pb-4">
              <div className="min-w-[800px] grid grid-cols-18 gap-1.5 p-2 bg-slate-100 border border-slate-200 rounded-xl shadow-inner">
                {/* Loop 10 rows representing all periods and the footer lanthanoid/actinoid blocks */}
                {Array.from({ length: 10 }).map((_, periodIdx) => {
                  const periodNum = periodIdx + 1;
                  
                  // Render empty row spacer for standard formatting separating lanthanoid/actinoid series list 
                  if (periodNum === 8) {
                    return <div key="row-spacer-8" className="col-span-18 h-4 animate-fadeIn" />;
                  }

                  return Array.from({ length: 18 }).map((__, colIdx) => {
                    const groupNum = colIdx + 1;
                    
                    // Find standard element matching period & group coordinates
                    const matchedElem = ELEMENTS_DATA.find(
                      (e) => {
                        const { r, c } = getElemCoordinates(e.number);
                        return r === periodNum && c === groupNum;
                      }
                    );

                    // Check if it matches search criteria
                    const isFilteredOut = matchedElem && !getFilteredElements().some(e => e.number === matchedElem.number);

                    if (!matchedElem) {
                      // Empty space in Periodic Grid
                      return <div key={`empty-${periodNum}-${groupNum}`} className="aspect-square opacity-0" />;
                    }

                    // Element cell
                    return (
                      <div 
                        key={matchedElem.number}
                        id={`element-cell-${matchedElem.symbol}`}
                        onClick={() => setSelectedElement(matchedElem)}
                        className={`aspect-square p-1.5 rounded-lg border flex flex-col justify-between cursor-pointer select-none transition-all duration-300 relative group
                          ${getCategoryColor(matchedElem.category)}
                          ${isFilteredOut ? 'opacity-20 hover:opacity-40 scale-95' : 'hover:scale-[1.1] hover:shadow-md hover:z-10 hover:border-slate-400'}
                        `}
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-[9px] font-mono opacity-80">{matchedElem.number}</span>
                          <span className="text-[8px] opacity-65 font-mono hidden group-hover:inline-block">{matchedElem.mass.toFixed(1)}</span>
                        </div>
                        <div className="text-center font-bold text-sm lg:text-base tracking-tight">{matchedElem.symbol}</div>
                        <div className="text-[8px] truncate text-center opacity-80">{matchedElem.name}</div>
                      </div>
                    );
                  });
                })}
              </div>
            </div>

            {/* Custom periodic classification color coding legends guide */}
            <div className="flex flex-wrap gap-3 p-3.5 bg-white border border-slate-200 rounded-xl text-xs justify-center font-mono text-slate-600 shadow-sm">
              <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-amber-100 border border-amber-300" />Alkali Metals</div>
              <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-yellow-100 border border-yellow-300" />Alkaline Earth</div>
              <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-blue-100 border border-blue-300" />Transition Metals</div>
              <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-orange-100 border border-orange-300" />Lanthanoids</div>
              <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-pink-100 border border-pink-300" />Actinoids</div>
              <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-teal-100 border border-teal-300" />Metalloids</div>
              <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-rose-100 border border-rose-300" />Diatomic Nonmetals</div>
              <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-emerald-100 border border-emerald-300" />Polyatomic Nonmetals</div>
              <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-sky-100 border border-sky-300" />Halogens</div>
              <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-purple-100 border border-purple-300" />Noble Gases</div>
            </div>

            {/* INTERESTING POPUP DIALOG CARD FOR SELECTED ELEMENT */}
            {selectedElement && (
              <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full shadow-2xl flex flex-col md:flex-row overflow-hidden animate-scaleIn text-slate-800">
                  
                  {/* Left Column: Chemistry and Physical facts details */}
                  <div className="p-6 md:w-1/2 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border ${getCategoryColor(selectedElement.category)}`}>
                          {selectedElement.category.replace(/-/g, ' ')}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-800 flex items-baseline gap-2 mt-1">
                          {selectedElement.name} <span className="text-xs font-mono text-slate-500">({selectedElement.symbol})</span>
                        </h3>
                      </div>
                      <button 
                        onClick={() => setSelectedElement(null)}
                        className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-205 border-slate-200">
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest font-mono font-bold">Atomic Number</p>
                        <p className="text-sm font-bold text-teal-605 text-teal-600">{selectedElement.number}</p>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-205 border-slate-200">
                        <p className="text-[9px] text-slate-505 text-slate-500 uppercase tracking-widest font-mono font-bold">Atomic Mass</p>
                        <p className="text-sm font-bold text-indigo-605 text-indigo-650 text-indigo-600">{selectedElement.mass.toFixed(4)} u</p>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-205 border-slate-200">
                        <p className="text-[9px] text-slate-505 text-slate-500 uppercase tracking-widest font-mono font-bold">Electron Configuration</p>
                        <p className="text-xs font-bold font-mono text-slate-700 mt-1">{selectedElement.config}</p>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-205 border-slate-200">
                        <p className="text-[9px] text-slate-505 text-slate-500 uppercase tracking-widest font-mono font-bold">Electronegativity</p>
                        <p className="text-sm font-bold text-amber-600">{selectedElement.electronegativity !== undefined ? selectedElement.electronegativity : 'N/A'}</p>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-205 border-slate-200">
                        <p className="text-[9px] text-slate-505 text-slate-500 uppercase tracking-widest font-mono font-bold">State of Matter</p>
                        <p className={`text-sm font-bold ${
                          selectedElement.state === 'Gas' ? 'text-sky-600' :
                          selectedElement.state === 'Liquid' ? 'text-blue-600' :
                          selectedElement.state === 'Solid' ? 'text-amber-700' :
                          'text-emerald-600'
                        }`}>{selectedElement.state}</p>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-205 border-slate-200">
                        <p className="text-[9px] text-slate-505 text-slate-500 uppercase tracking-widest font-mono font-bold">Shell configuration</p>
                        <p className="text-sm font-bold text-purple-650 text-purple-650 text-purple-600 tracking-wider font-mono">
                          {selectedElement.shells.join(' - ')}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs font-semibold text-slate-505 text-slate-600 uppercase tracking-wider font-mono">NCERT Fact Sheet</h4>
                      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-205 border-slate-200">
                        {selectedElement.description}
                      </p>
                    </div>

                    {/* Ask Gemini directly about this element button */}
                    <button
                      onClick={() => {
                        setChatInput(`Tell me some high scoring NEET/JEE physical concepts, coordination compounds or extraction questions related to ${selectedElement.name} (${selectedElement.symbol}).`);
                        setIsChatOpen(true);
                        setSelectedElement(null);
                      }}
                      className="w-full py-2 bg-gradient-to-r from-teal-600 to-indigo-650 text-white font-bold text-xs rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition"
                    >
                      <MessageSquare className="w-4 h-4" /> Ask Dr-Aspirant AI Tutor about {selectedElement.symbol}
                    </button>
                  </div>

                  {/* Right Column: Rotatable 3D Atomic Electron Dot Structure */}
                  <div className="bg-slate-50 p-6 md:w-1/2 border-t md:border-t-0 md:border-l border-slate-200 flex flex-col justify-between items-center relative min-h-[350px]">
                    <div className="w-full text-center space-y-1 z-10">
                      <span className="text-[10px] text-pink-650 text-pink-600 font-mono font-bold tracking-widest uppercase">INTERACTIVE BOHR MODEL</span>
                      <h4 className="font-bold text-slate-805 text-slate-800 text-base">3D Electron Orbital Plot</h4>
                      <p className="text-xs text-slate-500">Drag to rotate smoothly on all axes. Inner shells populate dynamically.</p>
                    </div>

                    {/* Draggable interactive canvas element */}
                    <div className="absolute inset-0 flex justify-center items-center">
                      <canvas 
                        ref={canvasRef}
                        width={340}
                        height={340}
                        onMouseDown={handleCanvasMouseDown}
                        onMouseMove={handleCanvasMouseMove}
                        onMouseUp={handleCanvasMouseUp}
                        onMouseLeave={handleCanvasMouseUp}
                        onTouchStart={handleCanvasTouchStart}
                        onTouchMove={handleCanvasTouchMove}
                        onTouchEnd={handleCanvasMouseUp}
                        className="cursor-grab active:cursor-grabbing w-full max-w-[340px] aspect-square"
                      />
                    </div>

                    {/* Shell markers stats at card footer */}
                    <div className="w-full bg-slate-900/60 self-end p-2 px-3 border border-slate-850 rounded-lg text-[10px] flex justify-between font-mono z-10 mt-auto">
                      <span className="text-slate-400">Electrons count: {selectedElement.shells.reduce((a, b) => a + b, 0)}</span>
                      <span className="text-teal-400">Orbits (Black): {selectedElement.shells.length}</span>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================================
            C. REVISION FORMULAS DIRECTORY
            ================================== */}
        {activeTab === 'formulas' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-sm text-slate-800">
              <div>
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <BookOpen className="w-5.5 h-5.5 text-indigo-600" /> Revision formulas
                </h2>
              </div>

              {/* Formula filtering, split, tabs */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                  <button 
                    onClick={() => setSelectedFormulaSubject('Chemistry')}
                    className={`px-4 py-1.5 rounded-md text-xs font-semibold tracking-wide transition ${
                      selectedFormulaSubject === 'Chemistry' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Chemistry Formulas
                  </button>
                  <button 
                    onClick={() => setSelectedFormulaSubject('Physics')}
                    className={`px-4 py-1.5 rounded-md text-xs font-semibold tracking-wide transition ${
                      selectedFormulaSubject === 'Physics' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Physics Formulas
                  </button>
                </div>

                {/* Class filter state */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-mono">Class:</span>
                  <div className="flex bg-slate-105 bg-slate-100 p-0.5 rounded border border-slate-200">
                    {['All', '11th', '12th'].map((cls) => (
                      <button 
                        key={cls}
                        onClick={() => setSelectedFormulaClass(cls as any)}
                        className={`px-2.5 py-1 rounded text-[10px] font-mono transition ${
                          selectedFormulaClass === cls ? 'bg-white text-indigo-600 font-bold shadow-sm' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {cls}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search input field */}
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search formula concept..." 
                    value={formulasSearch}
                    onChange={(e) => setFormulasSearch(e.target.value)}
                    className="bg-white text-slate-800 pl-8 pr-4 py-1.5 text-xs rounded-lg border border-slate-350 border-slate-300 outline-none w-44 focus:border-indigo-500 shadow-inner"
                  />
                </div>
              </div>
            </div>

            {/* Formulas listings formatted elegantly */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FORMULAS_DATA
                .filter(formula => formula.subject === selectedFormulaSubject)
                .filter(formula => selectedFormulaClass === 'All' || formula.class === selectedFormulaClass)
                .filter(formula => !formulasSearch.trim() || formula.title.toLowerCase().includes(formulasSearch.toLowerCase()) || formula.chapter.toLowerCase().includes(formulasSearch.toLowerCase()))
                .map((formula) => (
                  <div 
                    key={formula.id}
                    className="bg-white border border-slate-200 p-4.5 rounded-xl space-y-3 shadow-sm hover:border-slate-300 hover:shadow transition flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="bg-slate-50 text-indigo-600 text-[9px] font-semibold tracking-wide border border-indigo-100 py-0.5 px-2 rounded-full">
                            {formula.class} NCERT • {formula.chapter}
                          </span>
                          <h4 className="font-bold text-slate-800 text-sm pt-1.5">{formula.title}</h4>
                        </div>
                        <button 
                          onClick={() => copyFormulaText(formula)}
                          className="text-slate-400 hover:text-slate-700 p-1.5 rounded bg-slate-50 border border-slate-200 transition active:scale-95 flex items-center gap-1 text-[10px]"
                          title="Copy details"
                        >
                          {copiedFormulaId === formula.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>

                      {/* Display beautiful formula boxes */}
                      <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 flex items-center justify-center min-h-[55px] font-mono text-center">
                        <p className="text-teal-700 font-bold text-sm whitespace-pre-wrap tracking-wide leading-relaxed">
                          {formula.formula}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-serif bg-slate-50 border border-slate-100 p-2 rounded">
                      {formula.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ==================================
            D. PROFESSIONAL UNIT CONVERTER
            ================================== */}
        {activeTab === 'converter' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div className="bg-white border border-slate-200 p-5 rounded-xl text-center shadow-sm text-slate-800">
              <h2 className="text-sm font-bold text-slate-800 flex items-center justify-center gap-1.5">
                <Calculator className="w-5 h-5 text-sky-600" /> Unit converter
              </h2>
            </div>

            {/* Selection Grid for category types */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { type: 'pressure', label: 'Pressure' },
                { type: 'energy', label: 'Energy' },
                { type: 'distance', label: 'Distance' },
                { type: 'temperature', label: 'Temp' },
                { type: 'mass', label: 'Mass' }
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleConverterTypeChange(item.type as any)}
                  className={`py-2 px-1.5 text-xs font-semibold rounded-lg border transition transition-all duration-200 ${
                    converterType === item.type 
                      ? 'bg-sky-50 text-sky-600 border-sky-300 shadow-sm font-bold' 
                      : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Fully responsive calculation blocks */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-6 shadow-sm text-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* FROM input and selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-wider">From Value</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="bg-white text-slate-800 rounded-lg px-3 py-2 text-xs font-bold grow border border-slate-300 outline-none focus:border-sky-500 shadow-inner"
                      placeholder="Enter scalar..."
                    />
                    
                    <select
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                      className="bg-white text-slate-800 rounded-lg px-2 text-xs border border-slate-300 focus:outline-none focus:border-sky-500 shadow-sm"
                    >
                      {converterType === 'pressure' && ['atm', 'Pa', 'bar', 'mmHg', 'torr'].map(u => <option key={u} value={u}>{u}</option>)}
                      {converterType === 'energy' && ['cal', 'J', 'eV', 'L-atm', 'erg'].map(u => <option key={u} value={u}>{u}</option>)}
                      {converterType === 'distance' && ['Å', 'pm', 'nm', 'm', 'cm'].map(u => <option key={u} value={u}>{u}</option>)}
                      {converterType === 'temperature' && ['°C', 'K', '°F'].map(u => <option key={u} value={u}>{u}</option>)}
                      {converterType === 'mass' && ['amu', 'kg', 'g', 'mg'].map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>

                {/* TO result and selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-wider">Calculated Conversion</label>
                  <div className="flex gap-2">
                    <div className="bg-slate-50 rounded-lg px-3 py-2 text-xs font-bold text-teal-700 border border-slate-200 grow overflow-x-auto min-h-[38px] flex items-center">
                      {conversionResult}
                    </div>

                    <select
                      value={toUnit}
                      onChange={(e) => setToUnit(e.target.value)}
                      className="bg-white text-slate-805 rounded-lg px-2 text-xs border border-slate-300 focus:outline-none focus:border-sky-500 shadow-sm"
                    >
                      {converterType === 'pressure' && ['atm', 'Pa', 'bar', 'mmHg', 'torr'].map(u => <option key={u} value={u}>{u}</option>)}
                      {converterType === 'energy' && ['cal', 'J', 'eV', 'L-atm', 'erg'].map(u => <option key={u} value={u}>{u}</option>)}
                      {converterType === 'distance' && ['Å', 'pm', 'nm', 'm', 'cm'].map(u => <option key={u} value={u}>{u}</option>)}
                      {converterType === 'temperature' && ['°C', 'K', '°F'].map(u => <option key={u} value={u}>{u}</option>)}
                      {converterType === 'mass' && ['amu', 'kg', 'g', 'mg'].map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>

              </div>

              {/* Dynamic physical formula reference explanation */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1 font-mono text-slate-600 shadow-sm">
                <span className="text-teal-600 text-[10px] font-mono font-bold tracking-widest uppercase block pb-1 border-b border-slate-200/50">Revision Constant Contexts:</span>
                {converterType === 'pressure' && <p>• 1 atm = 101,325 Pascals = 760 mmHg = 760 Torr.</p>}
                {converterType === 'energy' && <p>• 1 Calorie = 4.184 Joules. 1 eV = 1.602 × 10⁻¹⁹ Joules.</p>}
                {converterType === 'distance' && <p>• 1 Angstrom (Å) = 10⁻¹⁰ meters = 100 pm.</p>}
                {converterType === 'temperature' && <p>• Absolute Zero Kelvin = -273.15° Celsius.</p>}
                {converterType === 'mass' && <p>• 1 amu (unified mass carbon-12 base) ≈ 1.6605 × 10⁻²⁷ kg.</p>}
              </div>
            </div>
          </div>
        )}

        {/* ==================================
            E. CUSTOM PRACTICE PAPER GENERATOR
            ================================== */}
        {activeTab === 'test' && (
          <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn col-span-full">
            
            {/* If test is not yet running */}
            {!testState && (
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm text-slate-800">
                  <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <FileText className="w-5.5 h-5.5 text-emerald-600" /> Custom test
                  </h2>
                </div>

                {/* Subject / Category selectors */}
                <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-5 shadow-sm text-slate-800">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">1. Choose Entrance / Stream Target</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {[
                        { id: 'NEET', desc: 'NEET (Phy, Chm, Bot, Zoo)', qCount: 180 },
                        { id: 'JEE', desc: 'JEE (Phy, Chm, Maths)', qCount: 90 },
                        { id: 'Individual', desc: 'Individual Subject Selection', qCount: 45 }
                      ].map((exam) => (
                        <button
                          key={exam.id}
                          onClick={() => handleSelectExamSettings(exam.id as any)}
                          className={`p-3 text-left rounded-xl border flex flex-col justify-between transition active:scale-98 shadow-sm ${
                            testSettings.category === exam.id 
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold' 
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                          }`}
                        >
                          <span className="font-bold text-slate-800 text-xs">{exam.id} Target</span>
                          <span className="text-[9px] text-slate-500 block pt-1">{exam.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* If selecting individual subjects */}
                  {testSettings.category === 'Individual' && (
                    <div className="space-y-2 animate-fadeIn">
                      <span className="text-[10px] font-bold text-slate-500 tracking-widest font-mono uppercase">Choose Individual Subject</span>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {['Physics', 'Chemistry', 'Botany', 'Zoology', 'Maths'].map((sub) => (
                          <button
                            key={sub}
                            onClick={() => {
                              setTestSettings(prev => ({
                                  ...prev,
                                  selectedSubject: sub as any,
                                  questionCount: 45 // Reset automatically back to 45 questions if individual
                              }));
                            }}
                            className={`py-1.5 rounded-lg text-xs font-semibold border text-center transition ${
                              testSettings.selectedSubject === sub 
                                ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                            }`}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question Count and Time Limit Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Time limit selector */}
                    <div className="space-y-2 bg-slate-50 p-4 border border-slate-200 rounded-xl">
                      <span className="text-[10px] text-slate-500 font-mono block font-bold">Question Count Slider</span>
                      <div className="flex items-center justify-between gap-4 pt-1">
                        <input 
                          type="range" 
                          min={5} 
                          max={testSettings.category === 'NEET' ? 180 : (testSettings.category === 'JEE' ? 90 : 45)}
                          value={testSettings.questionCount}
                          onChange={(e) => setTestSettings(prev => ({ ...prev, questionCount: parseInt(e.target.value) }))}
                          className="grow h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                        <span className="text-xs font-extrabold font-mono text-emerald-700 whitespace-nowrap bg-white border border-slate-200 p-1 px-2.5 rounded shadow-sm">
                          {testSettings.questionCount} Qs
                        </span>
                      </div>
                    </div>

                    {/* Choose time limits block (automatic sets 3 hours for neet/jee) */}
                    <div className="space-y-2 bg-slate-50 p-4 border border-slate-200 rounded-xl">
                      <span className="text-[10px] text-slate-500 font-mono block font-bold">Time Limit Duration</span>
                      
                      {['NEET', 'JEE'].includes(testSettings.category) ? (
                        <div className="text-xs text-slate-600 font-mono py-1.5">
                          ⏰ Auto: <strong className="text-emerald-700">3 Hours (180 mins)</strong> according to central exam directives.
                        </div>
                      ) : (
                        <div className="flex gap-2 pt-1">
                          {[10, 20, 50].map((mins) => (
                            <button
                              key={mins}
                              onClick={() => setTestSettings(prev => ({ ...prev, timeLimit: mins }))}
                              className={`py-1.5 px-3 rounded text-xs font-mono grow transition ${
                                testSettings.timeLimit === mins 
                                  ? 'bg-white border border-emerald-500 text-emerald-700 font-bold shadow-sm' 
                                  : 'bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                              }`}
                            >
                              {mins} Min
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Chapters Selector checklist based on NEET/JEE NCERT list */}
                  <div className="space-y-3.5 pt-2">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                        2. Verify NCERT Syllabus Chapters Included ({testSettings.selectedChapters.length === 0 ? 'All Chapters Selected' : `${testSettings.selectedChapters.length} Selected`})
                      </span>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleSelectAllChapters(true)}
                          className="text-[10px] text-teal-600 uppercase tracking-widest font-bold hover:underline"
                        >
                          Select All
                        </button>
                        <span className="text-slate-400">•</span>
                        <button 
                          onClick={() => handleSelectAllChapters(false)}
                          className="text-[10px] text-rose-600 uppercase tracking-widest font-bold hover:underline"
                        >
                          Clear
                        </button>
                        <input 
                          type="text" 
                          placeholder="Filter chapters..." 
                          value={chapterSearchText}
                          onChange={(e) => setChapterSearchText(e.target.value)}
                          className="bg-white text-[10px] font-mono rounded px-2 py-1 border border-slate-300 outline-none w-32 focus:border-teal-500 shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Chapter Visual Cards area with badges */}
                    <div className="max-h-60 overflow-y-auto bg-slate-50 border border-slate-200 rounded-xl p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 shadow-inner">
                      {getFilteredChapters().map((ch) => {
                        const isSelected = testSettings.selectedChapters.includes(ch.id);
                        return (
                          <div
                            key={ch.id}
                            onClick={() => toggleChapterSelection(ch.id)}
                            className={`p-2 rounded-lg border text-xs cursor-pointer select-none flex items-center justify-between transition hover:bg-slate-100 ${
                              isSelected 
                                ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-medium' 
                                : 'bg-white border-slate-200 text-slate-600'
                            }`}
                          >
                            <span className="truncate pr-1 font-medium">{ch.name}</span>
                            <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded shrink-0 ${
                              ch.class === '11th' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'
                            }`}>
                              Class {ch.class}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* START PROCESS BUTTON */}
                  <div className="pt-2">
                    <button
                      onClick={startCustomExam}
                      disabled={isGeneratingTest}
                      className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:opacity-95 font-bold text-xs uppercase tracking-widest rounded-xl shadow-md flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:scale-100"
                    >
                      {isGeneratingTest ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Gemini is generating and verifying your exam paper...</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4" /> Assemble & Initiate Practice Paper
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-slate-500 text-center font-mono pt-2">Correct Response: +4 Marks • Incorrect Response: -1 Negative Graded • Duration: {testSettings.timeLimit} Mins</p>
                  </div>

                </div>
              </div>
            )}

            {/* If practice test is ACTIVE / SUBMITTED */}
            {testState && (
              <div className="space-y-6">
                
                {/* Active Test Screen layout with floating countdown */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-sm space-y-4 text-slate-800">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-4 gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-250 border-emerald-200 px-2 py-0.5 rounded font-bold">
                        Target Concept Level: {testSettings.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-850 text-slate-800 pt-1">
                        Question {testState.currentQuestionIndex + 1} of {testState.questions.length}
                      </h3>
                    </div>

                    {/* Clock timer */}
                    <div className="flex items-center gap-2 bg-slate-50 p-2 px-3 border border-slate-200 rounded-xl font-mono text-slate-800">
                      <Clock className="w-4 h-4 text-rose-500" />
                      <span className={`text-xs font-bold ${testState.timeLeft < 180 ? 'text-rose-600 animate-pulse' : 'text-slate-700'}`}>
                        {formatTimeHHMMSS(testState.timeLeft)}
                      </span>
                    </div>
                  </div>

                  {/* Visual tracker dots block */}
                  <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 rounded-xl border border-slate-200">
                    {testState.questions.map((_, idx) => {
                      const isAttempted = testState.answers[idx] !== undefined;
                      const isCurrent = idx === testState.currentQuestionIndex;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            if (!testState.isSubmitted) {
                              setTestState(prev => prev ? { ...prev, currentQuestionIndex: idx } : null);
                            }
                          }}
                          className={`w-7 h-7 rounded text-[10px] font-mono font-bold transition flex items-center justify-center ${
                            isCurrent ? 'bg-indigo-650 bg-indigo-600 text-white border border-indigo-700 shadow' :
                            isAttempted ? 'bg-emerald-50 border border-emerald-300 text-emerald-700' :
                            'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100 hover:text-slate-800'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {/* ACTIVE QUESTION BOX */}
                  {(() => {
                    const q = testState.questions[testState.currentQuestionIndex];
                    const selectedOptIdx = testState.answers[testState.currentQuestionIndex];

                    return (
                      <div className="space-y-5 py-2 animate-fadeIn">
                        
                        {/* Question stem text */}
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-bold tracking-widest text-indigo-605 text-indigo-600 font-mono uppercase bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                            {q.subject} • {q.class} NCERT • {q.chapter}
                          </span>
                          <p className="text-slate-800 text-sm md:text-sm leading-relaxed bg-white p-4 rounded-xl border border-slate-200 font-medium shadow-inner">
                            {q.text}
                          </p>
                        </div>

                        {/* Four options multiple choices */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {q.options.map((opt, oIdx) => {
                            const isChosen = selectedOptIdx === oIdx;
                            const optionChar = ['A', 'B', 'C', 'D'][oIdx];

                            // submitted styles showing correct & incorrect colors
                            let borderStyle = 'border-slate-200 hover:border-slate-350 bg-slate-50 text-slate-700';
                            let markerStyle = 'bg-white text-slate-500 border border-slate-350';

                            if (testState.isSubmitted) {
                              if (oIdx === q.correctAnswerIndex) {
                                borderStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold shadow-sm';
                                markerStyle = 'bg-emerald-500 text-white';
                              } else if (isChosen) {
                                borderStyle = 'border-rose-500 bg-rose-50 text-rose-800 shadow-sm';
                                markerStyle = 'bg-rose-500 text-white';
                              } else {
                                borderStyle = 'border-slate-200 opacity-60 bg-white text-slate-400';
                              }
                            } else if (isChosen) {
                              borderStyle = 'border-indigo-500 bg-indigo-50 text-indigo-800 font-bold ring-1 ring-indigo-300 shadow-sm';
                              markerStyle = 'bg-indigo-600 text-white';
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={testState.isSubmitted}
                                onClick={() => {
                                  setTestState(prev => {
                                    if (!prev) return null;
                                    return {
                                      ...prev,
                                      answers: { ...prev.answers, [prev.currentQuestionIndex]: oIdx }
                                    };
                                  });
                                }}
                                className={`p-3 rounded-xl border text-left font-serif text-xs md:text-xs.1 flex items-start gap-3 transition active:scale-[0.99] disabled:scale-100 ${borderStyle}`}
                              >
                                <span className={`w-5 h-5 rounded-md flex items-center justify-center font-mono font-bold text-[10px] shrink-0 ${markerStyle}`}>
                                  {optionChar}
                                </span>
                                <span className="pt-0.5">{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* SHOW DETAILED EXPERT SOLUTION AFTER SUBMISSION */}
                        {testState.isSubmitted && (
                          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 md:p-5 space-y-2 animate-fadeIn font-mono">
                            <span className="text-[10px] text-teal-605 text-teal-600 font-bold tracking-widest uppercase flex items-center gap-1.5">
                              <CheckCircle className="w-4 h-4 text-teal-600" /> GEMINI CERTIFIED EXPLANATION
                            </span>
                            <div className="text-xs text-slate-600 leading-relaxed font-sans whitespace-pre-wrap">
                              {q.explanation}
                            </div>
                            
                            {/* Ask tutor custom doubt solver shortcut */}
                            <button
                              onClick={() => {
                                setChatInput(`Please explain this question further step-by-step: "${q.text}"\nCorrect Option was ${['A', 'B', 'C', 'D'][q.correctAnswerIndex]}.`);
                                setIsChatOpen(true);
                              }}
                              className="mt-3 py-1.5 px-3.5 bg-indigo-50 border border-indigo-200 text-indigo-600 hover:bg-slate-100 rounded text-[10px] uppercase font-bold transition flex items-center gap-1.5"
                            >
                              <MessageSquare className="w-3.5 h-3.5" /> Explain Topic in AI chat Box
                            </button>
                          </div>
                        )}

                        {/* Pagination control footer bar */}
                        <div className="flex justify-between items-center pt-2">
                          <button
                            disabled={testState.currentQuestionIndex === 0}
                            onClick={() => {
                              setTestState(prev => prev ? { ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 } : null);
                            }}
                            className="px-4 py-1.5 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600 disabled:opacity-40 transition"
                          >
                            Prev Question
                          </button>

                          {!testState.isSubmitted ? (
                            <button
                              onClick={submitTestEarly}
                              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow active:scale-95 transition"
                            >
                              Submit Paper
                            </button>
                          ) : (
                            <button
                              onClick={closeCompletedTestReport}
                              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow active:scale-95 transition"
                            >
                              Exit Diagnosis
                            </button>
                          )}

                          <button
                            disabled={testState.currentQuestionIndex === testState.questions.length - 1}
                            onClick={() => {
                              setTestState(prev => prev ? { ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 } : null);
                            }}
                            className="px-4 py-1.5 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600 disabled:opacity-40 transition"
                          >
                            Next Question
                          </button>
                        </div>

                      </div>
                    );
                  })()}

                </div>

                {/* VISUAL SCORECARD REPORT FOR THE CANDIDATE */}
                {testState.isSubmitted && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 space-y-5 shadow animate-scaleIn text-slate-800">
                    <div className="text-center space-y-1.5">
                      <span className="text-xs uppercase tracking-widest text-amber-500 font-bold font-mono">Mock Exam Results Report</span>
                      <h4 className="text-base font-black text-slate-800">Cumulative Performance Appraisal</h4>
                      <p className="text-slate-500 text-xs">Based on NCERT criteria with -1 penalty per wrong response.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center space-y-1">
                        <p className="text-xs text-slate-500 font-mono">Net Score Graded</p>
                        <h5 className="text-2xl font-black text-slate-800">
                          {testState.score} <span className="text-xs text-slate-400">/ {testState.questions.length * 4}</span>
                        </h5>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center space-y-1">
                        <p className="text-xs text-slate-500 font-mono">Correct Responses</p>
                        <h5 className="text-2xl font-black text-emerald-600">{testState.correctAnswersCount}</h5>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center space-y-1">
                        <p className="text-xs text-slate-500 font-mono">Incorrect responses</p>
                        <h5 className="text-2xl font-black text-rose-600">{testState.incorrectAnswersCount}</h5>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center space-y-1">
                        <p className="text-xs text-slate-500 font-mono">Unattempted count</p>
                        <h5 className="text-2xl font-black text-slate-500">{testState.unattemptedCount}</h5>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl text-center border border-slate-200 text-xs font-mono text-slate-500 flex flex-wrap gap-4 items-center justify-center">
                      <span>Percentage accuracy: {((testState.correctAnswersCount / (testState.questions.length - testState.unattemptedCount || 1)) * 100 || 0).toFixed(1)}%</span>
                      <span className="text-slate-300">|</span>
                      <span>Target percentile benchmark: ~98.5</span>
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        )}

      </main>

      {/* ==================================
          F. STETHOSCOPE AI FLOATING TUTOR BOX
          ================================== */}
      {/* Ask questions opens with a floating button at footer screen pages dashboard / formula */}
      {(['home', 'formulas', 'periodic', 'converter'].includes(activeTab)) && (
        <div className="fixed bottom-20 right-6 z-50">
          
          {/* Circular floating stethoscope chatbot trigger */}
          {!isChatOpen && (
            <button 
              onClick={() => setIsChatOpen(true)}
              className="bg-gradient-to-tr from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 active:scale-95 text-slate-950 font-bold p-3.5 rounded-full shadow-2xl transition-all duration-300 transform grow-0 hover:-rotate-12 flex items-center justify-center border border-white/20 group relative"
              title="Speak with AI Tutor Box"
            >
              <MessageSquare className="w-6 h-6 text-slate-950" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white w-2.5 h-2.5 rounded-full animate-ping" />
              
              {/* Tooltip glow label */}
              <span className="absolute right-14 bg-slate-900 border border-slate-700 text-white text-[10px] uppercase font-bold tracking-wider py-1 px-2.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition duration-200 shadow pointer-events-none">
                AI doubt Solver
              </span>
            </button>
          )}

          {/* Collapsible Chatbot Box Drawer */}
          {isChatOpen && (
            <div className="bg-slate-900 border border-slate-705 w-[330px] sm:w-[380px] h-[480px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scaleIn">
              
              {/* Tutor box header */}
              <div className="bg-slate-955 p-3.5 px-4 border-b border-slate-800 flex justify-between items-center bg-slate-900">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center border border-teal-500/30">
                    <Stethoscope className="w-4 h-4 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-white">Dr-Aspirant AI doubt Engine</h3>
                    <p className="text-[9px] text-teal-400/90 font-mono">PCM + PCB Extreme Tutor</p>
                  </div>
                </div>

                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat dialogue messages scroll feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-950/80">
                {chatMessages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'self-end ml-auto' : 'self-start mr-auto'}`}
                  >
                    <div className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-br-none' 
                        : 'bg-slate-900 text-slate-200 border border-slate-805 rounded-bl-none'
                    }`}>
                      {msg.content}
                    </div>
                    <span className="text-[8px] text-slate-500 self-end mt-1 font-mono">{msg.timestamp}</span>
                  </div>
                ))}

                {isChatLoading && (
                  <div className="flex items-center gap-2 bg-slate-900 border border-slate-850 p-3 rounded-2xl rounded-bl-none max-w-[80%] self-start animate-pulse">
                    <div className="flex space-x-1">
                      <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Tutor is solving calculations...</span>
                  </div>
                )}
                
                <div ref={chatBottomRef} />
              </div>

              {/* Chat submission footer input */}
              <form onSubmit={handleSendChatMessage} className="bg-slate-900 p-2.5 border-t border-slate-805 flex gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask physics, maths, botany problem..."
                  className="bg-slate-950 text-white rounded-xl px-3 py-2 text-xs grow outline-none border border-slate-800 focus:border-indigo-500"
                />
                <button 
                  type="submit"
                  disabled={!chatInput.trim() || isChatLoading}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold p-2.5 rounded-xl transition cursor-pointer disabled:opacity-40"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

            </div>
          )}

        </div>
      )}


      {/* 4. PERSISTENT SYSTEM BOTTOM CHROME BAR TAB BAR */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 py-2.5">
        <div className="max-w-2xl mx-auto px-6 flex justify-between items-center relative gap-2 sm:gap-4 select-none">
          
          <button 
            onClick={() => setActiveTab('periodic')}
            className={`flex flex-col items-center flex-1 transition-colors ${
              activeTab === 'periodic' ? 'text-teal-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Atom className="w-5.5 h-5.5" />
            <span className="text-[9px] pt-1 font-mono uppercase tracking-wider">3D table</span>
          </button>

          <button 
            onClick={() => setActiveTab('formulas')}
            className={`flex flex-col items-center flex-1 transition-colors ${
              activeTab === 'formulas' ? 'text-teal-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-5.5 h-5.5" />
            <span className="text-[9px] pt-1 font-mono uppercase tracking-wider">Formulas</span>
          </button>

          {/* HOME BUTTON: CIRCULAR shape centered directly between other button tabs as required */}
          <div className="relative -top-5 flex flex-col items-center flex-none">
            <button 
              onClick={() => setActiveTab('home')}
              id="circular-home-btn"
              className={`w-14 h-14 rounded-full bg-gradient-to-tr from-teal-500 to-indigo-500 hover:scale-105 active:scale-95 text-slate-950 shadow-2xl flex items-center justify-center transition border-[3.5px] border-slate-950 z-20 group relative`}
            >
              <Stethoscope className="w-6 h-6 stroke-[2]" />
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition duration-150" />
            </button>
            <span className="text-[9px] pt-1 text-teal-400/80 font-mono uppercase tracking-wider mt-1 font-bold">Home</span>
          </div>

          <button 
            onClick={() => setActiveTab('test')}
            className={`flex flex-col items-center flex-1 transition-colors ${
              activeTab === 'test' ? 'text-teal-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-5.5 h-5.5" />
            <span className="text-[9px] pt-1 font-mono uppercase tracking-wider">custom paper</span>
          </button>

          <button 
            onClick={() => setActiveTab('converter')}
            className={`flex flex-col items-center flex-1 transition-colors ${
              activeTab === 'converter' ? 'text-teal-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calculator className="w-5.5 h-5.5" />
            <span className="text-[9px] pt-1 font-mono uppercase tracking-wider">Converter</span>
          </button>

        </div>
      </nav>

    </div>
  );
}
