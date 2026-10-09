// data/stories.ts
export interface Story {
  id: string;
  name: string;
  title: string;
  subtitle?: string;
  image: string; // Unsplash image or thumbnail
  videoUrl?: string; // Add your video path here later
}

export const STORIES_DATA = {
  // Far Left Card
  farLeft: {
    id: "1",
    name: "माधवी यादव",
    title: "1000+",
    subtitle: "मरीजों ने सर्जरी से बचने का यह तरीका चुना",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    videoUrl:'https://in.pinterest.com/pin/326581410506442519/'
  },
  
  // Left Column (Stacked)
  leftColumn: [
    {
      id: "2",
      name: "अमेलिया",
      title: "ग्लूकोमा का रामबाण इलाज!",
      subtitle: "AFRICA से INDIA आकर मिला फायदा",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: "3",
      name: "अंजुमे",
      title: "स्पेन से आईं",
      subtitle: "आँखों के आयुर्वेदिक उपचार के लिए।",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600",
    },
  ],

  // Featured Center Card
  centerFeatured: {
    id: "4",
    name: "डॉ. महेंद्र सिंह बासु",
    title: "आंखों की सभी बीमारियां ठीक करें डॉ. बासु के साथ!",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
  },

  // Right Column (Stacked)
  rightColumn: [
    {
      id: "5",
      name: "मोहम्मद दिलशाद",
      title: "मैक्युलर डिजनरेशन में सुधार संभव है?",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: "6",
      name: "सुमन",
      title: "आँख में खुजली और सर में दर्द होता है?",
      subtitle: "DR. BASU EYE CARE CENTRE के ट्रीटमेंट से मिला स्थायी लाभ",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
    },
  ],

  // Far Right Card
  farRight: {
    id: "7",
    name: "वीर सिंह यादव",
    title: "10 साल",
    subtitle: "का ग्लूकोमा ठीक? असली मरीज की कहानी",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
  },
};