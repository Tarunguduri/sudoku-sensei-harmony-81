
import React, { useState, createContext, useContext, useEffect } from 'react';
import { Languages } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { useToast } from '@/hooks/use-toast';

// Define available languages
export type Language = 'english' | 'japanese' | 'telugu' | 'hindi';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Define translations
const translations: Record<Language, Record<string, string>> = {
  english: {
    settings: "Settings",
    appearance: "Appearance",
    language: "Language",
    sound: "Sound Settings",
    darkMode: "Dark Mode",
    about: "About",
    enableSounds: "Enable Sounds",
    backgroundMusic: "Background Music",
    volume: "Volume",
    playMusic: "Play Music",
    pauseMusic: "Pause Music",
    hintsRemaining: "Hints Remaining",
    nextLevel: "Next Level",
    menu: "Menu",
    selectCell: "Select a cell to receive a hint",
    hintLimit: "You've used all available hints for this level",
    fixedCell: "This cell cannot be modified",
    noCellSelected: "Please select a cell on the grid first",
    congrats: "Congratulations!",
    completed: "You've completed"
  },
  japanese: {
    settings: "設定",
    appearance: "外観",
    language: "言語",
    sound: "サウンド設定",
    darkMode: "ダークモード",
    about: "について",
    enableSounds: "サウンドを有効にする",
    backgroundMusic: "バックグラウンドミュージック",
    volume: "音量",
    playMusic: "音楽を再生する",
    pauseMusic: "音楽を一時停止する",
    hintsRemaining: "残りのヒント",
    nextLevel: "次のレベル",
    menu: "メニュー",
    selectCell: "ヒントを受け取るセルを選択してください",
    hintLimit: "このレベルで使用可能なヒントをすべて使用しました",
    fixedCell: "このセルは変更できません",
    noCellSelected: "まずグリッド上のセルを選択してください",
    congrats: "おめでとう！",
    completed: "完了しました"
  },
  telugu: {
    settings: "సెట్టింగ్‌లు",
    appearance: "రూపం",
    language: "భాష",
    sound: "శబ్ద సెట్టింగ్‌లు",
    darkMode: "డార్క్ మోడ్",
    about: "గురించి",
    enableSounds: "శబ్దాలను ప్రారంభించు",
    backgroundMusic: "నేపథ్య సంగీతం",
    volume: "వాల్యూమ్",
    playMusic: "సంగీతాన్ని ప్లే చేయండి",
    pauseMusic: "సంగీతాన్ని పాజ్ చేయండి",
    hintsRemaining: "మిగిలిన సూచనలు",
    nextLevel: "తదుపరి స్థాయి",
    menu: "మెనూ",
    selectCell: "సూచన పొందడానికి సెల్‌ను ఎంచుకోండి",
    hintLimit: "మీరు ఈ స్థాయి కోసం అందుబాటులో ఉన్న అన్ని సూచనలను ఉపయోగించారు",
    fixedCell: "ఈ సెల్‌ను సవరించలేరు",
    noCellSelected: "దయచేసి ముందుగా గ్రిడ్‌లో సెల్‌ను ఎంచుకోండి",
    congrats: "అభినందనలు!",
    completed: "మీరు పూర్తి చేసారు"
  },
  hindi: {
    settings: "सेटिंग्स",
    appearance: "उपस्थिति",
    language: "भाषा",
    sound: "ध्वनि सेटिंग्स",
    darkMode: "डार्क मोड",
    about: "के बारे में",
    enableSounds: "ध्वनियां सक्षम करें",
    backgroundMusic: "पृष्ठभूमि संगीत",
    volume: "वॉल्यूम",
    playMusic: "संगीत बजाएं",
    pauseMusic: "संगीत रोकें",
    hintsRemaining: "शेष संकेत",
    nextLevel: "अगला स्तर",
    menu: "मेनू",
    selectCell: "संकेत प्राप्त करने के लिए एक सेल का चयन करें",
    hintLimit: "आपने इस स्तर के लिए सभी उपलब्ध संकेतों का उपयोग कर लिया है",
    fixedCell: "इस सेल को संशोधित नहीं किया जा सकता",
    noCellSelected: "कृपया पहले ग्रिड पर एक सेल का चयन करें",
    congrats: "बधाई हो!",
    completed: "आपने पूरा कर लिया है"
  }
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'english';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

interface LanguageSettingsProps {
  animationDelay?: string;
}

const LanguageSettings: React.FC<LanguageSettingsProps> = ({ animationDelay = '500ms' }) => {
  const { toast } = useToast();
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'english';
  });

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    localStorage.setItem('language', e.target.value);
    toast({
      title: 'Language Updated',
      description: `Language set to ${e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)}`,
    });
    // Reload the page to apply language changes
    window.location.reload();
  };

  return (
    <GlassCard className="w-full animate-scale-in" style={{ animationDelay }}>
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Languages className="w-5 h-5 mr-2 text-indigo-500 dark:text-indigo-400" />
        Language
      </h2>
      
      <select
        value={language}
        onChange={handleLanguageChange}
        className="w-full px-4 py-2 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-ink-700 focus:outline-none focus:ring-2 focus:ring-sakura-500 dark:text-white"
      >
        <option value="english">English</option>
        <option value="japanese">日本語 (Japanese)</option>
        <option value="telugu">తెలుగు (Telugu)</option>
        <option value="hindi">हिन्दी (Hindi)</option>
      </select>
    </GlassCard>
  );
};

export default LanguageSettings;
