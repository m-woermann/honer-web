/// <reference types="astro/client" />

interface Window {
  speakerConfigsMap: any;
  serverSpeakerConfigs: any[];
  imageData: string[];
  speakerData: {
    positioningData: any;
    speakerConfigs: any;
    images?: string[];
  };
}
