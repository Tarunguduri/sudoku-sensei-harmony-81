
import React, { useState, createContext, useContext, useEffect } from 'react';
import { Languages } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { useToast } from '@/hooks/use-toast';

// Define available languages
export type Language = 'english' | 'japanese' | 'telugu' | 'hindi';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
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
    congrats: "Congratulations",
    congratulations: "Congratulations",
    completed: "You've completed",
    youveCompleted: "You've completed",
    level: "Level",
    time: "Time",
    hintsUsed: "Hints Used",
    back: "Back",
    hint: "Hint",
    left: "left",
    shuffle: "Shuffle",
    shuffleLimit: "Shuffle Limit Reached",
    shuffleLimitReached: "Shuffle Limit Reached",
    shuffleLimitMessage: "You've used all available shuffles for this level",
    boardShuffled: "Board Shuffled",
    boardShuffledMessage: "The board has been shuffled. Shuffles remaining: {remaining}",
    hintUsed: "Hint Used",
    hintUsedMessage: "The correct value for this cell is {value}. {remaining} hints remaining.",
    hintNotAvailable: "Hint Not Available",
    hintNotAvailableMessage: "Hints can only be used on empty or user-filled cells",
    solutionNotAvailable: "Solution is not available",
    hintValueNotAvailable: "Could not determine the correct value for this cell",
    fixedCellMessage: "This cell cannot be modified",
    noCellSelectedMessage: "Please select a cell on the grid first",
    selectCellMessage: "Please select a cell to receive a hint",
    hintLimitMessage: "You've used all available hints for this level",
    beginner: "Beginner",
    novice: "Novice",
    intermediate: "Intermediate", 
    skilled: "Skilled",
    expert: "Expert",
    master: "Master",
    puzzleNotFound: "Puzzle Not Found",
    puzzleNotFoundMessage: "Could not load puzzle for {difficulty} level {level}",
    errorLoadingPuzzle: "Error Loading Puzzle",
    errorLoadingPuzzleMessage: "An error occurred while loading the puzzle",
    completedAllPuzzles: "You've completed all available puzzles!"
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
    congratulations: "おめでとう！",
    completed: "完了しました",
    youveCompleted: "あなたは完了しました",
    level: "レベル",
    time: "時間",
    hintsUsed: "使用したヒント",
    back: "戻る",
    hint: "ヒント",
    left: "残り",
    shuffle: "シャッフル",
    shuffleLimit: "シャッフル制限に達しました",
    shuffleLimitReached: "シャッフル制限に達しました",
    shuffleLimitMessage: "このレベルで使用可能なシャッフルをすべて使用しました",
    boardShuffled: "ボードがシャッフルされました",
    boardShuffledMessage: "ボードがシャッフルされました。残りのシャッフル：{remaining}",
    hintUsed: "ヒントが使用されました",
    hintUsedMessage: "このセルの正しい値は{value}です。{remaining}ヒント残り。",
    hintNotAvailable: "ヒントは利用できません",
    hintNotAvailableMessage: "ヒントは空のセルまたはユーザーが入力したセルでのみ使用できます",
    solutionNotAvailable: "解決策は利用できません",
    hintValueNotAvailable: "このセルの正しい値を決定できませんでした",
    fixedCellMessage: "このセルは変更できません",
    noCellSelectedMessage: "まずグリッド上のセルを選択してください",
    selectCellMessage: "ヒントを受け取るセルを選択してください",
    hintLimitMessage: "このレベルで使用可能なヒントをすべて使用しました",
    beginner: "初心者",
    novice: "新人",
    intermediate: "中級", 
    skilled: "熟練",
    expert: "エキスパート",
    master: "マスター",
    puzzleNotFound: "パズルが見つかりません",
    puzzleNotFoundMessage: "{difficulty}レベル{level}のパズルを読み込めませんでした",
    errorLoadingPuzzle: "パズルの読み込みエラー",
    errorLoadingPuzzleMessage: "パズルの読み込み中にエラーが発生しました",
    completedAllPuzzles: "すべてのパズルを完了しました！"
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
    congratulations: "అభినందనలు!",
    completed: "మీరు పూర్తి చేసారు",
    youveCompleted: "మీరు పూర్తి చేసారు",
    level: "స్థాయి",
    time: "సమయం",
    hintsUsed: "ఉపయోగించిన సూచనలు",
    back: "వెనుకకు",
    hint: "సూచన",
    left: "మిగిలింది",
    shuffle: "షఫుల్",
    shuffleLimit: "షఫుల్ పరిమితికి చేరుకుంది",
    shuffleLimitReached: "షఫుల్ పరిమితికి చేరుకుంది",
    shuffleLimitMessage: "మీరు ఈ స్థాయి కోసం అందుబాటులో ఉన్న అన్ని షఫుల్‌లను ఉపయోగించారు",
    boardShuffled: "బోర్డు షఫుల్ చేయబడింది",
    boardShuffledMessage: "బోర్డు షఫుల్ చేయబడింది. మిగిలిన షఫుల్స్: {remaining}",
    hintUsed: "సూచన ఉపయోగించబడింది",
    hintUsedMessage: "ఈ సెల్ కోసం సరైన విలువ {value}. {remaining} సూచనలు మిగిలి ఉన్నాయి.",
    hintNotAvailable: "సూచన అందుబాటులో లేదు",
    hintNotAvailableMessage: "సూచనలు ఖాళీ లేదా వినియోగదారు నింపిన సెల్‌లలో మాత్రమే ఉపయోగించవచ్చు",
    solutionNotAvailable: "పరిష్కారం అందుబాటులో లేదు",
    hintValueNotAvailable: "ఈ సెల్ కోసం సరైన విలువను నిర్ధారించలేకపోయింది",
    fixedCellMessage: "ఈ సెల్‌ను సవరించలేరు",
    noCellSelectedMessage: "దయచేసి ముందుగా గ్రిడ్‌లో సెల్‌ను ఎంచుకోండి",
    selectCellMessage: "సూచన పొందడానికి సెల్‌ను ఎంచుకోండి",
    hintLimitMessage: "మీరు ఈ స్థాయి కోసం అందుబాటులో ఉన్న అన్ని సూచనలను ఉపయోగించారు",
    beginner: "ప్రారంభకుడు",
    novice: "కొత్తవాడు",
    intermediate: "మధ్యస్థం", 
    skilled: "నైపుణ్యం",
    expert: "నిపుణుడు",
    master: "మాస్టర్",
    puzzleNotFound: "పజిల్ కనుగొనబడలేదు",
    puzzleNotFoundMessage: "{difficulty} స్థాయి {level} కోసం పజిల్‌ను లోడ్ చేయలేకపోయాము",
    errorLoadingPuzzle: "పజిల్ లోడింగ్ ఎర్రర్",
    errorLoadingPuzzleMessage: "పజిల్‌ను లోడ్ చేయడంలో లోపం సంభవించింది",
    completedAllPuzzles: "మీరు అందుబాటులో ఉన్న పజిల్‌లన్నింటినీ పూర్తి చేసారు!"
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
    congratulations: "बधाई हो!",
    completed: "आपने पूरा कर लिया है",
    youveCompleted: "आपने पूरा कर लिया है",
    level: "स्तर",
    time: "समय",
    hintsUsed: "उपयोग किए गए संकेत",
    back: "वापस",
    hint: "संकेत",
    left: "शेष",
    shuffle: "शफल",
    shuffleLimit: "शफल सीमा तक पहुंच गया",
    shuffleLimitReached: "शफल सीमा तक पहुंच गया",
    shuffleLimitMessage: "आपने इस स्तर के लिए सभी उपलब्ध शफल का उपयोग कर लिया है",
    boardShuffled: "बोर्ड शफल किया गया",
    boardShuffledMessage: "बोर्ड शफल किया गया है। शेष शफल: {remaining}",
    hintUsed: "संकेत का उपयोग किया गया",
    hintUsedMessage: "इस सेल के लिए सही मूल्य {value} है। {remaining} संकेत शेष।",
    hintNotAvailable: "संकेत उपलब्ध नहीं है",
    hintNotAvailableMessage: "संकेत केवल खाली या उपयोगकर्ता-भरे सेल पर उपयोग किए जा सकते हैं",
    solutionNotAvailable: "समाधान उपलब्ध नहीं है",
    hintValueNotAvailable: "इस सेल के लिए सही मूल्य निर्धारित नहीं किया जा सका",
    fixedCellMessage: "इस सेल को संशोधित नहीं किया जा सकता",
    noCellSelectedMessage: "कृपया पहले ग्रिड पर एक सेल का चयन करें",
    selectCellMessage: "संकेत प्राप्त करने के लिए एक सेल का चयन करें",
    hintLimitMessage: "आपने इस स्तर के लिए सभी उपलब्ध संकेतों का उपयोग कर लिया है",
    beginner: "शुरुआती",
    novice: "नौसिखिया",
    intermediate: "मध्यवर्ती", 
    skilled: "कुशल",
    expert: "विशेषज्ञ",
    master: "मास्टर",
    puzzleNotFound: "पहेली नहीं मिली",
    puzzleNotFoundMessage: "{difficulty} स्तर {level} के लिए पहेली लोड नहीं की जा सकी",
    errorLoadingPuzzle: "पहेली लोड करने में त्रुटि",
    errorLoadingPuzzleMessage: "पहेली लोड करते समय एक त्रुटि हुई",
    completedAllPuzzles: "आपने सभी उपलब्ध पहेलियां पूरी कर ली हैं!"
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
  const t = (key: string, params?: Record<string, string | number>): string => {
    let text = translations[language][key] || key;
    
    // Replace parameters if provided
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{${param}}`, String(value));
      });
    }
    
    return text;
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
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as Language;
    setLanguage(newLang);
    toast({
      title: t('language') + ' ' + t('settings'),
      description: `${e.target.options[e.target.selectedIndex].text}`,
    });
  };

  return (
    <GlassCard className="w-full animate-scale-in" style={{ animationDelay }}>
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Languages className="w-5 h-5 mr-2 text-indigo-500 dark:text-indigo-400" />
        {t('language')}
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
