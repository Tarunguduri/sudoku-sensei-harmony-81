
import React from 'react';
import { Camera, Upload } from 'lucide-react';
import CustomButton from '@/components/CustomButton';
import GlassCard from '@/components/GlassCard';

interface ImageInputOptionsProps {
  handleCaptureImage: () => void;
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUploadImage: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const ImageInputOptions: React.FC<ImageInputOptionsProps> = ({
  handleCaptureImage,
  handleFileSelect,
  handleUploadImage,
  fileInputRef
}) => {
  return (
    <GlassCard className="w-full mb-4 sm:mb-6 animate-scale-in" style={{ animationDelay: '300ms' }}>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <CustomButton 
          variant="outline" 
          Icon={Camera} 
          fullWidth
          onClick={handleCaptureImage}
        >
          Take Photo
        </CustomButton>
        
        <CustomButton 
          variant="outline" 
          Icon={Upload} 
          fullWidth
          onClick={handleUploadImage}
        >
          Upload Image
        </CustomButton>
        <input 
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
        />
      </div>
      
      <div className="text-center text-sm text-muted-foreground mb-2">
        or input numbers manually on the grid below
      </div>
    </GlassCard>
  );
};

export default ImageInputOptions;
