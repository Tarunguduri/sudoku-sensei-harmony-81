
import React from 'react';
import SakuraBackground from '@/components/SakuraBackground';
import AnimatedTitle from '@/components/AnimatedTitle';
import { useIsMobile } from '@/hooks/use-mobile';
import SettingsHeader from '@/components/settings/SettingsHeader';
import SoundSettings from '@/components/settings/SoundSettings';
import AppearanceSettings from '@/components/settings/AppearanceSettings';
import LanguageSettings from '@/components/settings/LanguageSettings';
import AboutSettings from '@/components/settings/AboutSettings';

const Settings = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col p-6 overflow-hidden bg-gradient-to-b from-stone-50 to-pink-50 dark:from-ink-900 dark:to-ink-800">
      <SakuraBackground petalsCount={16} showTree={true} />
      
      <SettingsHeader />
      
      <AnimatedTitle
        className="mb-6 z-10"
        subtitle="Customize your experience"
        delay={200}
      >
        Settings
      </AnimatedTitle>
      
      <div className="flex flex-col items-center max-w-md mx-auto w-full space-y-6 z-10 pb-8">
        <SoundSettings animationDelay="300ms" />
        <AppearanceSettings animationDelay="400ms" />
        <LanguageSettings animationDelay="500ms" />
        <AboutSettings animationDelay="600ms" />
      </div>
    </div>
  );
};

export default Settings;
