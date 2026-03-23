/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from "react";
import { Brain, Send, Sparkles, RotateCcw, Trophy, Loader2 } from "lucide-react";
import { getQuizQuestions, getFieldDescriptions, QuizQuestion } from '@/lib/api';

export default function QuizPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [quizId, setQuizId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const fieldDescs = getFieldDescriptions();

  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'გამარჯობა! მე ვარ შენი AI კარიერული მრჩეველი. მითხარი, რა საგნები მოგწონს სკოლაში ან რა გიტაცებს თავისუფალ დროს?' }
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    getQuizQuestions()
      .then((data) => {
        setQuestions(data.questions);
        setQuizId(data.id);
      })
      .catch(() => setQuestions([]))
      .finally(() => setLoading(false));
  }, []);


  const handleAnswer = async (field: string, points: number) => {
    const newScores = { ...scores, [field]: (scores[field] || 0) + points };
    setScores(newScores);
    
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      setFinished(true);
      // Submit result to backend
      if (quizId) {
        const totalScore = Object.values(newScores).reduce((a, b) => a + b, 0);
        const success = await import('@/lib/api').then(m => m.submitQuizResult(totalScore, quizId));
        console.log('Quiz submission success:', success);
      }
    }
  };

  const getTopFields = () => Object.entries(scores).sort(([, a], [, b]) => b - a).slice(0, 3).map(([field]) => field);
  const restart = () => { setCurrentQ(0); setScores({}); setFinished(false); setStarted(false); };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    const userQ = input.toLowerCase();
    setTimeout(() => {
      let response = 'საინტერესო კითხვაა! გირჩევ გააკეთო კარიერის ტესტი მარცხენა პანელში.';
      if (userQ.includes('ფიზიკ')) response = 'ფიზიკა შესანიშნავი არჩევანია! გირჩევ: ბაკალავრიატი ფიზიკაში → მაგისტრატურა → PhD. საქართველოში თსუ, ილიაუნი გთავაზობს პროგრამებს.';
      else if (userQ.includes('ბიოლოგ') || userQ.includes('მედიცინ')) response = 'ბიოლოგია ფართო სფეროა! გენეტიკა, ნეირობიოლოგია, ეკოლოგია — ბიოინფორმატიკა განსაკუთრებით მოთხოვნადია.';
      else if (userQ.includes('პროგრამ') || userQ.includes('კომპიუტ')) response = 'IT სფერო ძალიან მოთხოვნადია! გირჩევ: ბაკალავრიატი CS-ში → სპეციალიზაცია (AI/ML, Data Science).';
      setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    }, 1000);
    setInput("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-surface/70 border border-foreground/10 p-8 rounded-3xl flex flex-col">
        <div className="w-16 h-16 bg-primary-purple/20 rounded-2xl flex items-center justify-center mb-6 text-primary-purple">
          <Brain size={32} />
        </div>
        <h2 className="text-3xl font-bold mb-4 cosmic-heading">კარიერის ტესტი</h2>

        {!started ? (
          <div className="flex-1 flex flex-col justify-between">
            <p className="text-foreground/80 leading-relaxed">უპასუხე {questions.length} კითხვას და აღმოაჩინე შენთვის შესაფერისი სფეროები.</p>
            <button onClick={() => setStarted(true)} className="w-full py-4 bg-accent-cyan text-primary-dark font-semibold rounded-xl hover:bg-cyan-400 transition-colors mt-6">ტესტის დაწყება</button>
          </div>
        ) : finished ? (
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-6 text-accent-gold"><Trophy size={28} /><h3 className="text-xl font-bold">შედეგი</h3></div>
            <p className="text-foreground/80 mb-6">რეკომენდებული სფეროები:</p>
            <div className="space-y-4 flex-1">
              {getTopFields().map((field, i) => {
                const desc = fieldDescs[field]; if (!desc) return null;
                return (
                  <div key={field} className={`p-4 rounded-xl border ${i === 0 ? 'bg-accent-cyan/15 border-accent-cyan/40' : 'bg-surface-light border-foreground/10'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-accent-cyan">#{i + 1}</span>
                      <span className="font-bold text-foreground">{desc.name_ka}</span>
                      <span className="text-xs text-foreground/50">({desc.name_en})</span>
                    </div>
                    <p className="text-sm text-foreground/60 mt-1">{desc.description}</p>
                  </div>
                );
              })}
            </div>
            <button onClick={restart} className="w-full py-3 bg-surface-light text-foreground font-medium rounded-xl hover:bg-surface transition-colors mt-6 flex items-center justify-center gap-2">
              <RotateCcw size={16} /> თავიდან დაწყება
            </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <div className="text-sm text-foreground/50 mb-2">{currentQ + 1} / {questions.length}</div>
            <div className="w-full bg-foreground/10 rounded-full h-1.5 mb-6">
              <div className="bg-accent-cyan h-1.5 rounded-full transition-all" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-6">{questions[currentQ]?.text}</h3>
            <div className="space-y-3 flex-1">
              {questions[currentQ]?.options?.map((opt: any, i: number) => (
                <button key={i} onClick={() => handleAnswer(opt.field, opt.points)}
                  className="w-full p-4 bg-surface-light rounded-xl border border-foreground/10 cursor-pointer hover:border-accent-cyan hover:bg-accent-cyan/10 transition-all text-left flex items-center gap-3">
                  <span className="text-accent-cyan font-bold">{String.fromCharCode(65 + i)}.</span>
                  <span className="text-foreground">{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-surface border border-foreground/10 p-6 rounded-3xl flex flex-col h-[650px] shadow-[0_0_50px_rgba(79,143,255,0.08)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-blue/8 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-foreground/10 relative z-10">
          <Sparkles className="text-accent-gold" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">AI კარიერული მრჩეველი</h2>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 relative z-10">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' ? 'bg-primary-blue text-white rounded-br-none' : 'bg-surface-light text-foreground rounded-bl-none border border-foreground/10'
              }`}>{msg.text}</div>
            </div>
          ))}
        </div>
        <div className="relative z-10">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="ჰკითხე მრჩეველს..." className="w-full bg-surface-light border border-foreground/15 rounded-xl px-4 py-4 pr-12 text-sm text-foreground focus:outline-none focus:border-accent-cyan transition-colors" />
          <button onClick={handleSend} className="absolute right-2 top-2 bottom-2 aspect-square bg-primary-blue hover:bg-blue-500 rounded-lg flex items-center justify-center text-white transition-colors">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}