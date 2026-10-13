
import { Bone, User, Baby, Stethoscope, Activity } from 'lucide-react';

export interface ServiceItem {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  discount: string;
  icon: any;
  images: string[];
  tags: string[];
  doctor: {
    name: string;
    title: string;
    qualification: string;
    experience: string;
    philosophy: string;
    image: string;
    badge: string;
  };
  problems: {
    id: string;
    track: string;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const servicesData: ServiceItem[] = [
  {
    id: 1,
    slug: "orthopedics",
    title: "Orthopedics",
    subtitle: "Advanced Orthopedic Care",
    description: "Expert care for bones, joints, and orthopedic surgery in Saharanpur. Your trusted partner for better movement and a healthier life.",
    discount: "20% OFF",
    icon: Bone,
    images: [
      'https://plus.unsplash.com/premium_photo-1681967162693-4ad328adef4f?q=80&w=1152&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1624716472114-a7c5f18ac832?q=80&w=1172&auto=format&fit=crop'
    ],
    tags: ["Joint Replacement", "Arthroscopy", "Spine Care"],
    doctor: {
      name: "Dr. Samarthya Gupta, MD",
      title: "Senior Consultant Surgeon & Director of Adult Reconstruction",
      qualification: "American Board of Orthopaedic Surgery (ABOS) Certified",
      experience: "18+ Years Subspecialized Joint Surgery",
      philosophy: "Dedicated to restoring natural biomechanics and pain-free mobility through precision-guided surgical techniques.",
      image: "/doctors/samarthya_gupta_orthopedic surgen.webp",
      badge: "CHIEF SURGEON"
    },
    problems: [
      { id: '01', track: 'Reconstructive', title: 'Knee Pain & Arthritis', description: 'Advanced cartilage restoration and total knee arthroscopy procedures.' },
      { id: '02', track: 'Sports Injury', title: 'Ligament Tears (ACL/PCL)', description: 'Minimally invasive arthroscopic reconstruction for high mobility.' },
      { id: '03', track: 'Spine Health', title: 'Chronic Back Pain', description: 'Comprehensive spinal decompression and targeted pain management.' }
    ],
    faqs: [
      {
        question: "What orthopedic problems do you treat?",
        answer: "We provide care for knee pain, arthritis, fractures, sports injuries, joint problems, and other bone-related conditions."
      },
      {
        question: "When should I consult an orthopedic doctor?",
        answer: "You should consider consulting if you have persistent joint pain, swelling, difficulty walking, or restricted movement."
      },
      {
        question: "When might I need joint replacement surgery?",
        answer: "Joint replacement may be considered when severe joint damage causes persistent pain and limits daily activities despite appropriate non-surgical treatment."
      },
      {
        question: "How can I get treatment for a sports injury?",
        answer: "An orthopedic consultation can help assess your injury and determine whether you need rest, rehabilitation, medication, or a surgical procedure."
      }
    ]
  },
  {
    id: 2,
    slug: "gynecology",
    title: "Gynecology",
    subtitle: "Maternity & Women's Wellness",
    description: "Specialized, compassionate care for women's health, wellness, and maternity services across all life stages.",
    discount: "15% OFF",
    icon: User,
    images: [
      'https://plus.unsplash.com/premium_photo-1702598564277-0984e20bafb7?q=80&w=1136&auto=format&fit=crop',
      'https://plus.unsplash.com/premium_photo-1661606400554-a2055d50ee08?q=80&w=1169&auto=format&fit=crop'
    ],
    tags: ["Maternity", "PCOS Care", "Laparoscopy"],
    doctor: {
      name: "Dr. Ananya Sharma, MS",
      title: "Senior Consultant Obstetrician & Gynecologist",
      qualification: "AIIMS New Delhi Gold Medalist // DNB OB-GYN",
      experience: "15+ Years Clinical Practice",
      philosophy: "Empowering women's health with safe, evidence-based maternity and minimally invasive gynecological treatments.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop",
      badge: "SENIOR CONSULTANT"
    },
    problems: [
      { id: '01', track: 'Maternity', title: 'High-Risk Pregnancy', description: 'Continuous fetal monitoring and specialized maternal care support.' },
      { id: '02', track: 'Endocrinology', title: 'PCOS / PCOD Management', description: 'Holistic hormonal balance and lifestyle correction protocols.' },
     
      { id: '04', track: 'Gynecological Care', title: 'Fibroids & Ovarian Cysts', description: 'Assessment and treatment planning for uterine fibroids and ovarian cysts.' },
      { id: '05', track: 'Maternity', title: 'Pregnancy Care', description: 'Antenatal checkups, pregnancy monitoring, and guidance throughout pregnancy.' }
    ],
    faqs: [
      {
        question: "What conditions does a gynecologist treat?",
        answer: "A gynecologist provides care for menstrual problems, PCOS, ovarian cysts, fibroids, reproductive health concerns, and pregnancy-related needs."
      },
      {
        question: "When should I visit a gynecologist?",
        answer: "Consider an appointment for irregular or painful periods, unusual bleeding, pelvic pain, pregnancy planning, or routine reproductive health checkups."
      },
      {
        question: "What is PCOS or PCOD?",
        answer: "PCOS is a hormonal condition that may affect menstrual cycles, ovulation, skin, and fertility. A doctor can assess your symptoms and recommend an appropriate management plan."
      },
      {
        question: "When should I start pregnancy checkups?",
        answer: "Arrange a prenatal appointment as soon as you know you are pregnant. Your doctor will advise you on the appropriate schedule of checkups and tests."
      },
      {
        question: "Can menstrual irregularities be treated?",
        answer: "Yes. Treatment depends on the underlying cause, which may involve hormonal changes, PCOS, thyroid conditions, or other health factors."
      }
    ]
  },
  {
    id: 3,
    slug: "pediatrics",
    title: "Pediatrics",
    subtitle: "Child Healthcare & Immunization",
    description: "Expert medical care tailored for infants, children, and adolescents in a kid-friendly, comforting environment.",
    discount: "Free Consultation",
    icon: Baby,
    images: [
      'https://plus.unsplash.com/premium_photo-1666299880508-bffece864e96?q=80&w=1171&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1632053002928-1919605ee6f7?q=80&w=1178&auto=format&fit=crop'
    ],
    tags: ["Vaccination", "Newborn Care", "Growth Monitoring"],
    doctor: {
      name: "Dr. Rajesh Verma, MD",
      title: "Chief Consultant Pediatrician & Neonatologist",
      qualification: "MD Pediatrics (PGI Chandigarh)",
      experience: "14+ Years Child Care",
      philosophy: "Gentle, compassionate healthcare ensuring every child grows up healthy, strong, and resilient.",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop",
      badge: "HEAD OF PEDIATRICS"
    },
    problems: [
      { id: '01', track: 'Immunization', title: 'Vaccination Schedules', description: 'Complete WHO-compliant immunization tracking and administration.' },
      { id: '02', track: 'Respiratory', title: 'Asthma & Allergies', description: 'Pediatric pulmonary care and allergy management.' },
      { id: '03', track: 'Newborn Care', title: 'Newborn Health', description: 'Health assessments, feeding guidance, and monitoring during early infancy.' },
      { id: '04', track: 'Growth & Development', title: 'Growth Monitoring', description: 'Regular assessment of height, weight, and developmental milestones.' },
      { id: '05', track: 'Child Health', title: 'Common Childhood Illnesses', description: 'Medical evaluation for fever, cough, infections, and other common childhood concerns.' }
    ],
    faqs: [
      {
        question: "When should I take my child to a pediatrician?",
        answer: "Schedule regular wellness visits and seek medical advice for persistent fever, feeding difficulties, breathing problems, unusual lethargy, or other concerning symptoms."
      },
      {
        question: "Why are childhood vaccinations important?",
        answer: "Vaccinations help protect children against serious infectious diseases. Follow the immunization schedule recommended by your pediatrician."
      },
      {
        question: "How often should my child's growth be checked?",
        answer: "Growth is commonly reviewed during routine pediatric visits. Your doctor can recommend visit intervals based on your child's age and individual needs."
      },
      {
        question: "When should a newborn have their first checkup?",
        answer: "Arrange follow-up care according to your maternity team's discharge instructions, typically within the first few days after birth."
      },
      {
        question: "Can children with asthma play and exercise?",
        answer: "Many children with asthma can participate in normal activities when their condition is appropriately managed. A pediatrician can help develop an individual care plan."
      }
    ]
  },
  {
    id: 4,
    slug: "general-physician",
    title: "General Physician",
    subtitle: "Primary Care & Preventative Health",
    description: "Primary care, comprehensive health screenings, and preventative medicine for chronic and acute illnesses.",
    discount: "10% OFF",
    icon: Stethoscope,
    images: [
      'https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?q=80&w=1170&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1170&auto=format&fit=crop'
    ],
    tags: ["Diabetes Care", "Hypertension", "Health Screening"],
    doctor: {
      name: "Dr. Alok Mittal, MD",
      title: "Senior Internal Medicine Specialist",
      qualification: "MBBS, MD - Internal Medicine",
      experience: "20+ Years Clinical Experience",
      philosophy: "Early diagnosis and comprehensive lifestyle management for long-term chronic wellness.",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=1000&auto=format&fit=crop",
      badge: "INTERNAL MEDICINE"
    },
    problems: [
      { id: '01', track: 'Metabolic', title: 'Diabetes & Blood Pressure', description: 'Structured monitoring and medication management.' },
      { id: '02', track: 'Preventative', title: 'Fever & Infections', description: 'Rapid diagnostic panels and targeted recovery therapies.' },
      { id: '03', track: 'Preventative Health', title: 'Routine Health Checkups', description: 'Health assessments and screening recommendations based on your age and risk factors.' },
      { id: '04', track: 'Respiratory Health', title: 'Cough, Cold & Flu', description: 'Evaluation and treatment guidance for common respiratory illnesses.' },
      { id: '05', track: 'Chronic Care', title: 'Thyroid & Cholesterol Management', description: 'Clinical evaluation and ongoing monitoring of thyroid function and cholesterol levels.' }
    ],
    faqs: [
      {
        question: "What conditions does a general physician treat?",
        answer: "A general physician can evaluate common illnesses, fever, infections, diabetes, high blood pressure, and many other routine health concerns."
      },
      {
        question: "When should I consult a general physician?",
        answer: "Consult a physician for persistent symptoms, recurring illnesses, chronic condition management, or preventive health advice."
      },
      {
        question: "How often should I get a health checkup?",
        answer: "The recommended frequency depends on your age, medical history, risk factors, and existing conditions. Your physician can suggest a suitable schedule."
      },
      {
        question: "Can a general physician help manage diabetes?",
        answer: "Yes. A physician can help monitor blood glucose, review medications, recommend lifestyle changes, and arrange additional care when needed."
      },
      {
        question: "Should I see a doctor for high blood pressure?",
        answer: "Yes. Repeatedly elevated readings should be assessed by a healthcare professional to determine whether monitoring, lifestyle changes, or medication is needed."
      }
    ]
  },
  {
    id: 5,
    slug: "general-surgery",
    title: "General Surgery",
    subtitle: "Minimally Invasive Procedures",
    description: "Advanced surgical procedures utilizing state-of-the-art minimally invasive and laparoscopic techniques.",
    discount: "20% OFF",
    icon: Activity,
    images: [
      'https://images.unsplash.com/photo-1619901399360-9c8a7d4e68ec?q=80&w=1170&auto=format&fit=crop',
      'https://plus.unsplash.com/premium_photo-1664304348972-8deac29e27c8?q=80&w=1016&auto=format&fit=crop'
    ],
    tags: ["Laparoscopy", "Hernia Repair", "Appendectomy"],
    doctor: {
      name: "Dr. Vikram Malhotra, MS, FRCS",
      title: "Chief Laparoscopic & General Surgeon",
      qualification: "MS General Surgery, FRCS (Edinburgh)",
      experience: "16+ Years Surgical Excellence",
      philosophy: "Precision surgery with minimal scars and rapid patient mobilization.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
      badge: "LEAD SURGEON"
    },
    problems: [
      { id: '01', track: 'Abdominal', title: 'Hernia & Gallstones', description: 'Advanced single-incision laparoscopic corrections.' },
      { id: '02', track: 'Proctology', title: 'Piles & Fissures', description: 'Pain-free laser surgical treatments with immediate discharge.' },
      { id: '03', track: 'Laparoscopy', title: 'Appendicitis', description: 'Evaluation and surgical treatment planning for appendicitis, including laparoscopic approaches when appropriate.' },
      { id: '04', track: 'Abdominal Surgery', title: 'Gallbladder Surgery', description: 'Assessment and treatment options for symptomatic gallstones and gallbladder conditions.' },
      { id: '05', track: 'Soft Tissue', title: 'Lumps & Cysts', description: 'Clinical evaluation and removal of selected benign lumps and cysts when indicated.' }
    ],
    faqs: [
      {
        question: "What conditions can a general surgeon treat?",
        answer: "General surgeons assess and treat conditions such as hernias, gallstones, appendicitis, selected skin lumps, and certain anorectal conditions."
      },
      {
        question: "What is laparoscopic surgery?",
        answer: "Laparoscopic surgery uses small incisions and a camera to perform certain operations. Suitability depends on the condition and the patient's health."
      },
      {
        question: "How long does recovery from surgery take?",
        answer: "Recovery depends on the procedure, your overall health, and whether complications occur. Your surgeon will provide procedure-specific recovery instructions."
      },
      {
        question: "When should a hernia be checked by a surgeon?",
        answer: "A new or enlarging lump, discomfort, or pain near the abdomen or groin should be evaluated. Sudden severe pain, vomiting, or a firm, tender hernia requires emergency assessment."
      },
      {
        question: "Do all gallstones require surgery?",
        answer: "Not all gallstones need surgery. Treatment depends on symptoms, complications, and clinical findings, which your surgeon can assess."
      }
    ]
  },
  {
    id: 6,
    slug: "urology",
    title: "Urology",
    subtitle: "Advanced Urological Care",
    description: "Specialized urological treatments utilizing minimally invasive endoscopic and laser stone removal technologies.",
    discount: "15% OFF",
    icon: Activity,
    images: [
      'https://images.unsplash.com/photo-1559757175-9e351c9a1301?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559757175-0828e13882ed?w=600&auto=format&fit=crop'
    ],
    tags: ["Kidney Stones", "Prostate Care", "Laser Surgery"],
    doctor: {
      name: "Dr. Puneet Singhal, M.Ch",
      title: "Consultant Urologist & Transplant Surgeon",
      qualification: "MS Surgery, M.Ch Urology (AIIMS)",
      experience: "12+ Years Urological Care",
      philosophy: "Advanced laser solutions for kidney stones and prostate health with painless recovery.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
      badge: "UROLOGY SPECIALIST"
    },
    problems: [
      { id: '01', track: 'Endourology', title: 'Kidney Stones (RIRS/PCNL)', description: 'Laser fragmentation with zero incision and same-day discharge.' },
      { id: '02', track: 'Prostate', title: 'BPH & Prostate Health', description: 'Advanced TURP and laser prostate enucleation.' },
      { id: '03', track: 'Urinary Health', title: 'Urinary Tract Problems', description: 'Evaluation of urinary discomfort, frequent urination, and other urinary symptoms.' },
      { id: '04', track: 'Men’s Health', title: 'Prostate Enlargement', description: 'Assessment and management options for urinary symptoms associated with an enlarged prostate.' },
      { id: '05', track: 'Urological Surgery', title: 'Bladder & Urinary Conditions', description: 'Diagnostic evaluation and treatment planning for selected bladder and urinary tract conditions.' }
    ],
    faqs: [
      {
        question: "What conditions does a urologist treat?",
        answer: "Urologists treat conditions involving the urinary tract and male reproductive system, including kidney stones, prostate problems, and urinary difficulties."
      },
      {
        question: "What are the common symptoms of kidney stones?",
        answer: "Symptoms may include severe pain in the side or back, blood in the urine, nausea, or painful urination. Severe pain with fever or difficulty passing urine requires urgent medical attention."
      },
      {
        question: "Do all kidney stones require surgery?",
        answer: "No. Treatment depends on the stone's size, location, symptoms, and complications. Some stones pass naturally, while others need medical or procedural treatment."
      },
      {
        question: "What is an enlarged prostate?",
        answer: "Benign prostate enlargement can cause frequent urination, a weak urine stream, or difficulty emptying the bladder. A urologist can assess symptoms and discuss treatment options."
      },
      {
        question: "When should I consult a urologist?",
        answer: "Consider a consultation for recurring urinary symptoms, blood in the urine, suspected kidney stones, or persistent difficulty passing urine. Inability to urinate requires urgent medical care."
      }
    ]
  }
];

export function getServiceBySlug(slug: string) {
  return servicesData.find((s) => s.slug === slug) || servicesData[0];
}
