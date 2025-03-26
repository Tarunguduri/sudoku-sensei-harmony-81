
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from '@/components/Logo';
import CustomButton from '@/components/CustomButton';

const SettingsHeader: React.FC = () => {
  return (
    <header className="flex justify-between items-center mb-6 z-10">
      <Link to="/">
        <CustomButton variant="ghost" size="sm" Icon={ArrowLeft}>
          Back
        </CustomButton>
      </Link>
      <Logo size="sm" />
    </header>
  );
};

export default SettingsHeader;
