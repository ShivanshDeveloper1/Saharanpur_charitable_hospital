
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
    img:string;
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
    description:
      "Expert care for bones, joints, and orthopedic surgery in Saharanpur. Your trusted partner for better movement and a healthier life.",
    discount: "20% OFF",
    images: [
      "https://plus.unsplash.com/premium_photo-1681967162693-4ad328adef4f?q=80&w=1152&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1624716472114-a7c5f18ac832?q=80&w=1172&auto=format&fit=crop",
    ],
    tags: ["Joint Replacement", "Arthroscopy", "Spine Care"],
    doctor: {
      name: "Dr. Samarthya Gupta, MD",
      title: "Senior Consultant Surgeon & Director of Adult Reconstruction",
      qualification: "American Board of Orthopaedic Surgery (ABOS) Certified",
      experience: "18+ Years Subspecialized Joint Surgery",
      philosophy:
        "Dedicated to restoring natural biomechanics and pain-free mobility through precision-guided surgical techniques.",
      image: "/doctors/samarthya_gupta_orthopedic_surgeon.webp",
      badge: "CHIEF SURGEON",
    },
    problems: [
      {
        id: "01",
        slug: "knee-pain-arthritis",
        track: "Reconstructive",
        title: "Knee Pain & Arthritis",
        description:
          "Advanced cartilage restoration and total knee arthroscopy procedures.",
        img: "https://plus.unsplash.com/premium_photo-1681967162693-4ad328adef4f?q=80&w=1152&auto=format&fit=crop",
        symptoms: [
          "Pain while walking or climbing stairs",
          "Stiffness after sitting or resting",
          "Swelling around the knee",
          "Reduced flexibility",
          "Difficulty bending or straightening the leg",
        ],
        content: [
          {
            heading: "What Is Knee Pain and Arthritis?",
            body: "Knee pain can affect people of different ages and may develop due to an injury, overuse, inflammation, or age-related changes in the joint. Knee osteoarthritis occurs when the protective cartilage in the joint gradually wears down, which may cause pain, stiffness, swelling, and difficulty with everyday movements.",
          },
          {
            heading: "Common Causes of Knee Pain",
            body: "Knee discomfort may be associated with osteoarthritis, ligament injuries, meniscus tears, tendon problems, previous trauma, or repetitive strain. Identifying the underlying cause is important because treatment depends on the type and severity of the condition.",
          },
          {
            heading: "Symptoms You Should Not Ignore",
            body: "A knee that becomes suddenly swollen, severely painful, hot, or red, particularly with fever, needs prompt medical assessment. Do not wait for pain to become unbearable before seeking a consultation.",
          },
          {
            heading: "How Is Knee Arthritis Diagnosed?",
            body: "An orthopedic specialist may review your symptoms, medical history, walking pattern, and knee movement. Depending on the findings, X-rays or other imaging tests may be recommended to assess joint changes, fractures, or soft-tissue injuries.",
          },
          {
            heading: "Knee Pain Treatment Options",
            body: "Treatment depends on the diagnosis and severity of symptoms. Options may include activity modification, prescribed medication, physiotherapy, suitable exercises, or selected injections. When severe arthritis continues to limit daily activities despite appropriate non-surgical treatment, knee replacement surgery may be considered after an orthopedic evaluation.",
          },
          {
            heading: "When Should You Consult an Orthopedic Doctor?",
            body: "Consider an orthopedic consultation if knee pain persists, swelling repeatedly occurs, movement becomes restricted, or walking and daily activities are affected. Early assessment can help identify the cause and guide an appropriate treatment plan.",
          },
        ],
      },
      {
        id: "02",
        slug: "ligament-tears",
        track: "Sports Injury",
        title: "Ligament Tears (ACL/PCL)",
        description:
          "Minimally invasive arthroscopic reconstruction for high mobility.",
        img: "https://plus.unsplash.com/premium_photo-1681967162693-4ad328adef4f?q=80&w=1152&auto=format&fit=crop",
        symptoms: [
          "A popping sound at the time of injury",
          "Rapid swelling within the first few hours",
          "Knee feeling unstable or giving way",
          "Difficulty putting full weight on the leg",
          "Limited range of motion",
        ],
        content: [
          {
            heading: "Sports Trauma & Instability",
            body: "Ligament ruptures from athletic trauma or sudden pivoting destabilize the knee joint, risking long-term meniscus damage if left untreated.",
          },
          {
            heading: "Minimally Invasive Arthroscopy",
            body: "Using high-definition fiber-optic cameras and precision graft fixation, we reconstruct torn ligaments with minimal scarring and rapid functional recovery.",
          },
          {
            heading: "Rehabilitation After Surgery",
            body: "Recovery is a structured process. Guided physiotherapy starts early to restore motion, rebuild thigh strength, and retrain balance so you can return to your activity safely.",
          },
        ],
      },
      {
        id: "03",
        slug: "chronic-back-pain",
        track: "Spine Health",
        title: "Chronic Back Pain",
        description:
          "Comprehensive spinal decompression and targeted pain management.",
        img: "https://plus.unsplash.com/premium_photo-1681967162693-4ad328adef4f?q=80&w=1152&auto=format&fit=crop",
        symptoms: [
          "Lower back pain lasting more than a few weeks",
          "Pain radiating down the leg",
          "Numbness or tingling in the feet",
          "Pain that worsens after sitting or standing for long periods",
          "Weakness in the leg",
        ],
        content: [
          {
            heading: "Spinal Pathology & Nerve Compression",
            body: "Chronic lower back pain frequently stems from disc herniation, spinal stenosis, or degenerative facet joint arthritis pressing against spinal nerves.",
          },
          {
            heading: "Comprehensive Decompression Care",
            body: "We offer customized therapeutic regimens, image-guided epidural injections, and advanced microscopic spine decompression surgeries for permanent relief.",
          },
          {
            heading: "Lifestyle and Prevention",
            body: "Posture correction, core strengthening, weight management, and ergonomic changes at work can reduce strain on the spine and lower the chance of recurring pain.",
          },
        ],
      },
      {
        id: "04",
        slug: "hip-shoulder-pain",
        track: "Joint Care",
        title: "Hip & Shoulder Joint Pain",
        description:
          "Accurate diagnosis and treatment for hip and shoulder conditions.",
        img: "https://images.unsplash.com/photo-1624716472114-a7c5f18ac832?q=80&w=1172&auto=format&fit=crop",
        symptoms: [
          "Pain in the groin, hip, or buttock",
          "Shoulder pain when lifting the arm",
          "Night pain that disturbs sleep",
          "Stiffness that limits daily tasks",
          "Clicking, catching, or locking sensation",
        ],
        content: [
          {
            heading: "Why Hip and Shoulder Pain Develops",
            body: "Hip pain may come from arthritis, cartilage damage, or hip impingement. Shoulder pain is often linked to rotator cuff tears, frozen shoulder, or repetitive overhead movement.",
          },
          {
            heading: "Non-Surgical Management",
            body: "Most patients improve with a combination of physiotherapy, anti-inflammatory medication, activity changes, and targeted injections before any surgery is considered.",
          },
          {
            heading: "Advanced Surgical Options",
            body: "When conservative care is not enough, minimally invasive arthroscopic procedures and joint replacement surgery can restore comfortable movement with a carefully planned recovery.",
          },
        ],
      },
    ],
    why: {
      title: "Why Choose Our Orthopedic Unit",
      subtitle: "Expert joint and bone care, planned around your recovery",
      points: [
        "Subspecialized surgeons with over 18 years of joint surgery experience",
        "Minimally invasive techniques for faster recovery and less scarring",
        "Complete care from diagnosis and imaging to rehabilitation",
        "Personalized treatment plans, with non-surgical options considered first",
      ],
    },
    steps: {
      title: "3 Easy Steps to Start Your Recovery",
      items: [
        {
          title: "Book Your Appointment Online",
          description:
            "Choose a convenient date and time using the form on this page.",
        },
        {
          title: "Consult Your Orthopedic Specialist",
          description:
            "Our specialist reviews your history, examines your joint, and recommends the right tests.",
        },
        {
          title: "Start Your Personalized Treatment",
          description:
            "Receive a clear plan that may include therapy, medication, or surgery, with follow-up support.",
        },
      ],
    },
    testimonials: [
      {
        name: "Rajesh K.",
        location: "Saharanpur",
        rating: 5,
        text: "I had knee pain for almost two years and could barely climb stairs. The doctor explained every option clearly and I am now walking comfortably again.",
      },
      {
        name: "Sunita M.",
        location: "Saharanpur",
        rating: 5,
        text: "The team was caring and patient. My back pain has improved a lot after the treatment plan and physiotherapy sessions.",
      },
      {
        name: "Amit S.",
        location: "Haridwar",
        rating: 5,
        text: "After my ligament injury, the arthroscopic surgery was smooth and the recovery guidance was excellent. I got back to playing cricket.",
      },
    ],
    faqs: [
      {
        question: "What orthopedic problems do you treat?",
        answer:
          "We provide care for knee pain, arthritis, fractures, sports injuries, joint problems, and other bone-related conditions.",
      },
      {
        question: "When should I consult an orthopedic doctor?",
        answer:
          "You should consider consulting if you have persistent joint pain, swelling, difficulty walking, or restricted movement.",
      },
      {
        question: "When might I need joint replacement surgery?",
        answer:
          "Joint replacement may be considered when severe joint damage causes persistent pain and limits daily activities despite appropriate non-surgical treatment.",
      },
      {
        question: "How can I get treatment for a sports injury?",
        answer:
          "An orthopedic consultation can help assess your injury and determine whether you need rest, rehabilitation, medication, or a surgical procedure.",
      },
    ],
  },
  {
    id: 2,
    slug: "gynecology",
    title: "Gynecology",
    subtitle: "Maternity & Women's Wellness",
    description:
      "Specialized, compassionate care for women's health, wellness, and maternity services across all life stages.",
    discount: "15% OFF",
    images: [
      "https://plus.unsplash.com/premium_photo-1702598564277-0984e20bafb7?q=80&w=1136&auto=format&fit=crop",
      "https://plus.unsplash.com/premium_photo-1661606400554-a2055d50ee08?q=80&w=1169&auto=format&fit=crop",
    ],
    tags: ["Maternity", "PCOS Care", "Laparoscopy"],
    doctor: {
      name: "Dr. Ananya Sharma, MS",
      title: "Senior Consultant Obstetrician & Gynecologist",
      qualification: "AIIMS New Delhi Gold Medalist | DNB OB-GYN",
      experience: "15+ Years Clinical Practice",
      philosophy:
        "Empowering women's health with safe, evidence-based maternity and minimally invasive gynecological treatments.",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop",
      badge: "SENIOR CONSULTANT",
    },
    problems: [
      {
        id: "01",
        slug: "high-risk-pregnancy",
        track: "Maternity",
        title: "High-Risk Pregnancy",
        description:
          "Continuous fetal monitoring and specialized maternal care support.",
        img: "https://plus.unsplash.com/premium_photo-1702598564277-0984e20bafb7?q=80&w=1136&auto=format&fit=crop",
        symptoms: [
          "Blood pressure that rises during pregnancy",
          "Gestational diabetes diagnosis",
          "Reduced or unusual baby movements",
          "Swelling of face or hands with headache",
          "Bleeding or severe abdominal pain",
        ],
        content: [
          {
            heading: "Managing High-Risk Pregnancies",
            body: "High-risk pregnancies require intensive clinical monitoring due to maternal health conditions, gestational diabetes, hypertension, or multiple gestations.",
          },
          {
            heading: "Comprehensive Antenatal Support",
            body: "Our unit provides state-of-the-art ultrasound diagnostics, continuous fetal surveillance, and expert obstetric intervention to ensure safe deliveries.",
          },
          {
            heading: "Planning Your Delivery",
            body: "Every high-risk case gets an individual delivery plan, including the safest place and timing for birth and a team ready for any complication.",
          },
        ],
      },
      {
        id: "02",
        slug: "pcos-pcod",
        track: "Endocrinology",
        title: "PCOS / PCOD Management",
        description:
          "Holistic hormonal balance and lifestyle correction protocols.",
        img: "https://plus.unsplash.com/premium_photo-1661606400554-a2055d50ee08?q=80&w=1169&auto=format&fit=crop",
        symptoms: [
          "Irregular or missed periods",
          "Excess facial or body hair",
          "Acne and oily skin",
          "Weight gain or difficulty losing weight",
          "Difficulty conceiving",
        ],
        content: [
          {
            heading: "Understanding PCOS Symptoms",
            body: "Polycystic Ovary Syndrome creates hormonal imbalances that disrupt menstrual regularity, metabolic health, and fertility.",
          },
          {
            heading: "Targeted Wellness Protocols",
            body: "We combine medical management, insulin-sensitizing therapies, and personalized nutritional guidance to restore metabolic harmony.",
          },
          {
            heading: "Long-Term Health Matters",
            body: "PCOS is linked with diabetes and heart risk factors over time. Regular screening and lifestyle support help protect your health beyond your cycle.",
          },
        ],
      },
      {
        id: "03",
        slug: "fibroids-ovarian-cysts",
        track: "Gynecological Care",
        title: "Fibroids & Ovarian Cysts",
        description:
          "Assessment and treatment planning for uterine fibroids and ovarian cysts.",
        img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop",
        symptoms: [
          "Heavy or prolonged menstrual bleeding",
          "Pelvic pressure or fullness",
          "Frequent urination",
          "Lower back ache",
          "Pain during intercourse",
        ],
        content: [
          {
            heading: "Pelvic Growths & Discomfort",
            body: "Uterine fibroids and benign ovarian masses can cause pelvic pressure, heavy menstrual bleeding, and lower back aches.",
          },
          {
            heading: "Advanced Uterine Preservation",
            body: "We utilize medical therapies and minimally invasive laparoscopic myomectomies or cystectomies to preserve fertility and eliminate pain.",
          },
          {
            heading: "Monitoring Over Time",
            body: "Many small fibroids and cysts never need surgery. Ultrasound follow-ups help us decide when action is needed.",
          },
        ],
      },
      {
        id: "04",
        slug: "pregnancy-care",
        track: "Maternity",
        title: "Pregnancy Care",
        description:
          "Antenatal checkups, pregnancy monitoring, and guidance throughout pregnancy.",
        img: "https://plus.unsplash.com/premium_photo-1702598564277-0984e20bafb7?q=80&w=1136&auto=format&fit=crop",
        symptoms: [
          "A missed period or positive home test",
          "Morning sickness that is severe or lasting",
          "Spotting or bleeding",
          "Pain in the lower abdomen",
          "Fluid leaking from the vagina",
        ],
        content: [
          {
            heading: "Complete Antenatal Journey",
            body: "Regular clinical evaluations during pregnancy track fetal growth, screen for gestational complications, and prepare mothers for childbirth.",
          },
          {
            heading: "Holistic Delivery Preparation",
            body: "From nutritional counseling to birth plan creation, we support expectant mothers through every single trimester.",
          },
          {
            heading: "Postnatal Care",
            body: "Checkups after delivery look at your recovery, feeding support, and emotional well-being, so you are never left alone with new questions.",
          },
        ],
      },
    ],
    why: {
      title: "Why Choose Our Women's Health Unit",
      subtitle: "Compassionate, evidence-based care at every life stage",
      points: [
        "AIIMS-trained specialist with over 15 years of clinical practice",
        "State-of-the-art ultrasound and continuous fetal monitoring",
        "Minimally invasive laparoscopic options for gynecological conditions",
        "Private, respectful consultations that respect your choices",
      ],
    },
    steps: {
      title: "3 Easy Steps",
      items: [
        {
          title: "Fix Your Appointment Online",
          description:
            "Pick a date and time that suits you using the booking form.",
        },
        {
          title: "Consult With Your Specialist",
          description:
            "Discuss your symptoms, history, and goals in a comfortable setting.",
        },
        {
          title: "Get a Personalized Care Plan",
          description:
            "Receive treatment, tests, or antenatal schedules tailored to you.",
        },
      ],
    },
    testimonials: [
      {
        name: "Priya R.",
        location: "Saharanpur",
        rating: 5,
        text: "Dr. Ananya explained my PCOS reports in simple language. My cycles became regular within a few months of the plan.",
      },
      {
        name: "Neha T.",
        location: "Muzaffarnagar",
        rating: 5,
        text: "My pregnancy was high-risk, but the monitoring was thorough and I felt safe throughout. Thank you to the whole team.",
      },
      {
        name: "Kavita S.",
        location: "Saharanpur",
        rating: 5,
        text: "The laparoscopic treatment for my fibroids was quick and I recovered faster than I expected. Very professional staff.",
      },
    ],
    faqs: [
      {
        question: "What conditions does a gynecologist treat?",
        answer:
          "A gynecologist provides care for menstrual problems, PCOS, ovarian cysts, fibroids, reproductive health concerns, and pregnancy-related needs.",
      },
      {
        question: "When should I visit a gynecologist?",
        answer:
          "Consider an appointment for irregular or painful periods, unusual bleeding, pelvic pain, pregnancy planning, or routine reproductive health checkups.",
      },
      {
        question: "What is PCOS or PCOD?",
        answer:
          "PCOS is a hormonal condition that may affect menstrual cycles, ovulation, skin, and fertility. A doctor can assess your symptoms and recommend an appropriate management plan.",
      },
      {
        question: "When should I start pregnancy checkups?",
        answer:
          "Arrange a prenatal appointment as soon as you know you are pregnant. Your doctor will advise you on the appropriate schedule of checkups and tests.",
      },
      {
        question: "Can menstrual irregularities be treated?",
        answer:
          "Yes. Treatment depends on the underlying cause, which may involve hormonal changes, PCOS, thyroid conditions, or other health factors.",
      },
    ],
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
   {
    id: "01",
    slug: "vaccination-schedules",
    track: "Immunization",
    title: "Vaccination Schedules",
    description:
      "Complete WHO-compliant immunization tracking and administration.",
    img: "https://plus.unsplash.com/premium_photo-1681967162693-4ad328adef4f?q=80&w=1152&auto=format&fit=crop",
    symptoms: [
      "Missed or delayed vaccine doses",
      "Mild fever after a vaccination",
      "Swelling or redness at the injection site",
      "Unsure which vaccines are due for your child's age",
      "Preparing for school or travel requirements",
    ],
    content: [
      {
        heading: "Why Childhood Vaccination Matters",
        body: "Vaccines help protect infants and children from serious infectious diseases such as measles, polio, hepatitis B, diphtheria, tetanus, and whooping cough. Timely immunization also helps protect other children in the community who are too young or unable to be vaccinated.",
      },
      {
        heading: "Which Vaccines Does My Child Need?",
        body: "The vaccines recommended depend on your child's age and the national immunization schedule. Your pediatrician can review your child's vaccination card and explain which doses are due now and which are coming next.",
      },
      {
        heading: "What If a Dose Was Missed?",
        body: "A missed or delayed dose does not always mean starting again. In most cases your pediatrician can arrange a catch-up schedule. Contact the clinic as soon as you notice a missed dose.",
      },
      {
        heading: "Common Reactions After Vaccination",
        body: "Mild fever, fussiness, or soreness at the injection site is common for a day or two. Seek medical advice if the fever is high or lasts longer, if your child is unusually drowsy, cries inconsolably, or you notice breathing difficulty, swelling of the face, or a rash.",
      },
      {
        heading: "Keeping a Vaccination Record",
        body: "Keep your child's immunization card safe and bring it to every visit. A complete record is often needed for school admission, travel, and future medical care.",
      },
    ],
    
    
  },
  {
    id: "02",
    slug: "asthma-allergies",
    track: "Respiratory",
    title: "Asthma & Allergies",
    description: "Pediatric pulmonary care and allergy management.",
    img: "https://plus.unsplash.com/premium_photo-1681967162693-4ad328adef4f?q=80&w=1152&auto=format&fit=crop",
    symptoms: [
      "Wheezing or a whistling sound while breathing",
      "Cough that is worse at night or after play",
      "Shortness of breath or fast breathing",
      "Frequent sneezing, runny nose, or itchy eyes",
      "Skin rashes or hives after certain foods or dust",
    ],
    content: [
      {
        heading: "What Are Childhood Asthma and Allergies?",
        body: "Asthma is a long-term condition in which the airways become inflamed and narrow, making breathing difficult. Allergies occur when the body reacts strongly to things such as dust, pollen, pets, or certain foods. The two often occur together in children.",
      },
      {
        heading: "Common Triggers",
        body: "Dust mites, smoke, air pollution, pollen, pets, cold air, viral infections, and strong smells can trigger symptoms. Identifying your child's triggers is an important step in controlling the condition.",
      },
      {
        heading: "Warning Signs That Need Urgent Care",
        body: "Seek immediate medical help if your child is struggling to breathe, cannot speak or feed comfortably, has bluish lips, or the rescue inhaler does not give relief. Swelling of the lips or face after eating something is also an emergency.",
      },
      {
        heading: "How Is It Diagnosed?",
        body: "A pediatrician will ask about symptoms, triggers, and family history, and examine your child's chest. Depending on age and findings, breathing tests, allergy tests, or chest X-rays may be advised.",
      },
      {
        heading: "Treatment and Daily Management",
        body: "Treatment may include reliever and controller inhalers, nebulization, allergy medicines, and avoiding known triggers. Most children do well with a written asthma action plan, correct inhaler technique, and regular follow-up.",
      },
      {
        heading: "When Should You Consult a Pediatrician?",
        body: "Book a visit if your child coughs or wheezes repeatedly, gets breathless with play, or has frequent night-time cough. Early assessment helps prevent serious flare-ups.",
      },
    ],
  },
  {
    id: "03",
    slug: "newborn-health",
    track: "Newborn Care",
    title: "Newborn Health",
    description:
      "Health assessments, feeding guidance, and monitoring during early infancy.",
    img: "https://plus.unsplash.com/premium_photo-1681967162693-4ad328adef4f?q=80&w=1152&auto=format&fit=crop",
    symptoms: [
      "Yellowish skin or eyes (jaundice)",
      "Poor feeding or difficulty latching",
      "Fever or unusually low body temperature",
      "Excessive crying or colic",
      "Slow weight gain",
    ],
    content: [
      {
        heading: "The First Weeks Matter",
        body: "The first few weeks of life are a period of rapid adjustment. Regular newborn checkups help make sure your baby is feeding well, gaining weight, and developing normally.",
      },
      {
        heading: "Feeding and Weight Gain",
        body: "Most newborns feed frequently, often 8 to 12 times a day. A pediatrician can check latching, milk intake, and weight gain, and guide you if feeding is difficult.",
      },
      {
        heading: "Newborn Jaundice",
        body: "Mild yellowing of the skin is common in the first week. It is usually harmless, but jaundice that appears early, spreads quickly, or lasts longer needs a doctor's assessment and may need a blood test.",
      },
      {
        heading: "Danger Signs in a Newborn",
        body: "Take your baby to a doctor immediately for fever, refusal to feed, very sleepy or limp behavior, fast or difficult breathing, vomiting everything, or fewer wet diapers than usual.",
      },
      {
        heading: "Support for New Parents",
        body: "Colic, sleep patterns, cord care, and bathing are common worries. Your pediatrician can answer your questions so you feel more confident caring for your baby at home.",
      },
    ],
  },
  {
    id: "04",
    slug: "growth-monitoring",
    track: "Growth & Development",
    title: "Growth Monitoring",
    description:
      "Regular assessment of height, weight, and developmental milestones.",
    img: "https://plus.unsplash.com/premium_photo-1681967162693-4ad328adef4f?q=80&w=1152&auto=format&fit=crop",
    symptoms: [
      "Height or weight much lower or higher than other children of the same age",
      "Delayed sitting, walking, or talking",
      "Poor appetite or fussy eating",
      "Frequent illness",
      "Difficulty with learning, attention, or behavior",
    ],
    content: [
      {
        heading: "What Is Growth Monitoring?",
        body: "Growth monitoring means regularly measuring your child's height, weight, and head size and plotting them on standard growth charts. It shows whether your child is growing steadily over time.",
      },
      {
        heading: "Developmental Milestones",
        body: "Milestones such as smiling, sitting, walking, speaking, and playing with others show how a child is developing. Every child learns at their own pace, but large delays should be assessed.",
      },
      {
        heading: "Causes of Slow Growth",
        body: "Slow growth may be linked to poor nutrition, frequent infections, hormonal or thyroid problems, chronic illness, or family patterns. Finding the cause guides the right treatment.",
      },
      {
        heading: "Nutrition for Healthy Growth",
        body: "A balanced diet with enough protein, iron, calcium, and vitamins supports growth. Your pediatrician can suggest age-appropriate foods and supplements only when they are needed.",
      },
      {
        heading: "When Should You Consult a Pediatrician?",
        body: "Consult a doctor if your child has stopped gaining weight, seems to have lost skills they previously had, or is not meeting milestones for their age. Early support often makes a big difference.",
      },
    ],
  },
    ],

    why: {
  title: "Why Choose Our Pediatric Care",
  subtitle: "Gentle, expert care for every stage of childhood",
  points: [
    "Experienced pediatrician and neonatologist with 14+ years of child care",
    "Complete immunization and growth monitoring under one roof",
    "Kid-friendly, comforting environment",
    "Clear guidance for parents at every visit",
  ],
},
steps: {
  title: "3 Easy Steps to Your Child's Care",
  items: [
    { title: "Book Your Appointment Online", description: "Choose a convenient date and time using the form on this page." },
    { title: "Consult Your Pediatrician", description: "The doctor examines your child and reviews their history." },
    { title: "Follow the Care Plan", description: "Receive clear guidance, treatment, and follow-up visits." },
  ],
},
testimonials: [],
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
     {
    id: "01",
    slug: "diabetes-blood-pressure",
    track: "Metabolic",
    title: "Diabetes & Blood Pressure",
    description: "Structured monitoring and medication management.",
    img: "https://plus.unsplash.com/premium_photo-1681967162693-4ad328adef4f?q=80&w=1152&auto=format&fit=crop",
    symptoms: [
      "Increased thirst and frequent urination",
      "Unexplained tiredness or weight loss",
      "Blurred vision",
      "Headaches or dizziness",
      "Slow-healing wounds or tingling in the feet",
    ],
    content: [
      {
        heading: "What Are Diabetes and High Blood Pressure?",
        body: "Diabetes is a condition in which blood sugar stays higher than normal. High blood pressure (hypertension) means the force of blood against artery walls is consistently too high. Both often cause no symptoms early on, which is why regular checks matter.",
      },
      {
        heading: "Why Control Matters",
        body: "Long-term uncontrolled sugar or blood pressure can damage the heart, kidneys, eyes, and nerves, and raise the risk of stroke and heart attack. Good control greatly lowers these risks.",
      },
      {
        heading: "Symptoms You Should Not Ignore",
        body: "Very high thirst with vomiting, confusion, severe headache, chest pain, sudden weakness on one side, or difficulty speaking needs emergency care. Do not wait for symptoms before getting checked.",
      },
      {
        heading: "How Are They Diagnosed and Monitored?",
        body: "Diagnosis usually involves blood pressure readings and blood tests such as fasting sugar and HbA1c. Regular monitoring of sugar, blood pressure, kidney function, and cholesterol helps your doctor adjust treatment.",
      },
      {
        heading: "Treatment and Lifestyle Management",
        body: "Care may include prescribed medicines, a balanced diet, regular physical activity, weight management, reduced salt, and quitting tobacco. Take medicines as prescribed and do not stop them without your doctor's advice.",
      },
      {
        heading: "When Should You Consult a Physician?",
        body: "See a doctor if you have a family history of diabetes or hypertension, repeatedly high home readings, or symptoms such as excess thirst and tiredness. Regular follow-up is key to long-term control.",
      },
    ],
    
  },
  {
    id: "02",
    slug: "fever-infections",
    track: "Acute Care",
    title: "Fever & Infections",
    description: "Rapid diagnostic panels and targeted recovery therapies.",
    img: "https://plus.unsplash.com/premium_photo-1681967162693-4ad328adef4f?q=80&w=1152&auto=format&fit=crop",
    symptoms: [
      "Fever with chills or sweating",
      "Body ache and severe fatigue",
      "Cough, sore throat, or runny nose",
      "Vomiting, loose motions, or stomach pain",
      "Rash or pain behind the eyes",
    ],
    content: [
      {
        heading: "Understanding Fever",
        body: "Fever is the body's response to an infection or inflammation. It can be caused by viral infections, bacterial infections, or vector-borne illnesses such as dengue, malaria, and typhoid.",
      },
      {
        heading: "Common Causes",
        body: "Seasonal flu, throat and chest infections, urinary infections, stomach infections, and mosquito-borne diseases are among the common causes. The cause decides the treatment, so avoid starting antibiotics on your own.",
      },
      {
        heading: "Warning Signs That Need Prompt Care",
        body: "Seek urgent medical help for fever lasting more than three days, very high fever, confusion, severe headache with neck stiffness, breathing difficulty, persistent vomiting, bleeding, or signs of dehydration.",
      },
      {
        heading: "How Is the Cause Found?",
        body: "Your doctor will examine you and may advise tests such as a complete blood count, malaria and dengue tests, urine tests, or chest X-ray to find the cause of the fever.",
      },
      {
        heading: "Treatment and Recovery",
        body: "Treatment may include fever medicines, fluids, rest, and targeted therapy such as antibiotics only when needed. Some patients who cannot drink enough may need intravenous fluids.",
      },
    ],
  },
  {
    id: "03",
    slug: "routine-health-checkups",
    track: "Preventative Health",
    title: "Routine Health Checkups",
    description:
      "Health assessments and screening recommendations based on your age and risk factors.",
    img: "https://plus.unsplash.com/premium_photo-1681967162693-4ad328adef4f?q=80&w=1152&auto=format&fit=crop",
    symptoms: [
      "No recent health checkup in the last year",
      "Family history of diabetes, heart disease, or cancer",
      "Age 40 or above",
      "Smoking, obesity, or a sedentary lifestyle",
      "Needing a medical check for work or travel",
    ],
    content: [
      {
        heading: "Why Regular Checkups Matter",
        body: "Many conditions such as high blood pressure, diabetes, and high cholesterol do not cause symptoms in the early stages. Regular checkups can detect them early, when they are easiest to manage.",
      },
      {
        heading: "What a Checkup May Include",
        body: "A routine checkup usually includes a physical examination, blood pressure, weight and BMI, and blood tests for sugar, cholesterol, kidney, liver, and thyroid function. Other tests such as ECG may be added based on your age and risk.",
      },
      {
        heading: "Screening Based on Your Age and Risk",
        body: "The tests you need depend on your age, gender, family history, and lifestyle. Your physician will recommend a suitable screening plan rather than a one-size-fits-all package.",
      },
      {
        heading: "How Often Should You Get Checked?",
        body: "Many healthy adults benefit from a yearly checkup, while people with existing conditions may need more frequent follow-up. Your doctor can suggest a schedule that fits you.",
      },
      {
        heading: "Preparing for Your Checkup",
        body: "Follow any fasting instructions given by the clinic, carry earlier reports and a list of your medicines, and note any symptoms you want to discuss.",
      },
    ],
  },
  {
    id: "04",
    slug: "thyroid-cholesterol",
    track: "Chronic Care",
    title: "Thyroid & Cholesterol Management",
    description:
      "Clinical evaluation and ongoing monitoring of thyroid function and cholesterol levels.",
    img: "https://plus.unsplash.com/premium_photo-1681967162693-4ad328adef4f?q=80&w=1152&auto=format&fit=crop",
    symptoms: [
      "Unexplained weight gain or weight loss",
      "Tiredness, feeling cold, or feeling too hot",
      "Hair fall or dry skin",
      "Swelling in the neck",
      "Palpitations or irregular periods",
    ],
    content: [
      {
        heading: "What Do the Thyroid and Cholesterol Do?",
        body: "The thyroid gland produces hormones that control metabolism, energy, and heart rate. Cholesterol is a type of fat in the blood; high levels of LDL (bad) cholesterol can build up in the arteries over time.",
      },
      {
        heading: "Thyroid Problems",
        body: "An underactive thyroid (hypothyroidism) can cause tiredness, weight gain, and feeling cold. An overactive thyroid (hyperthyroidism) can cause weight loss, sweating, and fast heartbeat. A simple blood test can detect both.",
      },
      {
        heading: "High Cholesterol",
        body: "High cholesterol usually causes no symptoms but increases the risk of heart disease and stroke. A lipid profile blood test shows your cholesterol levels and helps your doctor assess your heart risk.",
      },
      {
        heading: "Treatment Options",
        body: "Thyroid conditions are commonly managed with daily medication and regular blood tests. High cholesterol is managed with diet, exercise, and, where needed, cholesterol-lowering medicines chosen by your doctor.",
      },
      {
        heading: "Long-Term Monitoring",
        body: "Both conditions need follow-up tests to make sure treatment is working. Do not change or stop your medicines without medical advice.",
      },
    ],
  },
    ],
     why: {
    title: "Why Choose Our Physician Care",
    subtitle: "Complete primary care, planned around your long-term health",
    points: [
      "Senior internal medicine specialist with over 20 years of clinical experience",
      "One doctor for acute illnesses and long-term conditions like diabetes and hypertension",
      "Evidence-based screening tailored to your age and risk factors",
      "Clear explanations and regular follow-up so you stay in control of your health",
    ],
  },
  steps: {
    title: "3 Easy Steps to Better Health",
    items: [
      {
        title: "Book Your Appointment Online",
        description:
          "Choose a convenient date and time using the form on this page.",
      },
      {
        title: "Consult Your Physician",
        description:
          "Your doctor reviews your symptoms and history, examines you, and advises the right tests.",
      },
      {
        title: "Follow Your Care Plan",
        description:
          "Receive a clear plan with medication, lifestyle guidance, and follow-up visits.",
      },
    ],
  },
  testimonials: [], // add real patient reviews here
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
    {
    id: "01",
    slug: "hernia-gallstones",
    track: "Abdominal",
    title: "Hernia & Gallstones",
    description: "Advanced single-incision laparoscopic corrections.",
    img: "https://plus.unsplash.com/premium_photo-1681967162693-4ad328adef4f?q=80&w=1152&auto=format&fit=crop",
    symptoms: [
      "A bulge or lump in the groin or abdomen",
      "Discomfort that increases when coughing or lifting",
      "Pain in the upper right abdomen after fatty meals",
      "Nausea or vomiting",
      "Bloating or indigestion",
    ],
    content: [
      {
        heading: "What Are a Hernia and Gallstones?",
        body: "A hernia occurs when an organ or tissue pushes through a weak area of the abdominal wall, forming a bulge. Gallstones are hard deposits that form in the gallbladder and may cause pain or blockage.",
      },
      {
        heading: "Common Causes and Risk Factors",
        body: "Hernias may be linked to heavy lifting, chronic cough, constipation, obesity, or previous surgery. Gallstones are more common with obesity, rapid weight loss, a family history, and in women.",
      },
      {
        heading: "Symptoms You Should Not Ignore",
        body: "A hernia that becomes hard, tender, or cannot be pushed back, especially with vomiting, needs emergency care. Severe abdominal pain with fever or yellowing of the eyes with gallstones also needs urgent attention.",
      },
      {
        heading: "How Are They Diagnosed?",
        body: "A surgeon examines the area and may advise an ultrasound scan. Gallstones are commonly confirmed on ultrasound, and hernias are often diagnosed on examination.",
      },
      {
        heading: "Treatment Options",
        body: "Hernias are generally treated with surgical repair, which may be done by open or laparoscopic methods, often using a mesh. Gallstones that cause symptoms are commonly treated by laparoscopic removal of the gallbladder. Suitability depends on your condition.",
      },
      {
        heading: "When Should You Consult a Surgeon?",
        body: "Consult a surgeon if you notice a new or growing lump, repeated pain after meals, or discomfort that interferes with daily life. Early assessment can prevent complications.",
      },
    ],
   
  },
  {
    id: "02",
    slug: "piles-fissures",
    track: "Proctology",
    title: "Piles & Fissures",
    description:
      "Evaluation and surgical treatment of piles, fissures, and related anorectal conditions.",
    img: "https://plus.unsplash.com/premium_photo-1681967162693-4ad328adef4f?q=80&w=1152&auto=format&fit=crop",
    symptoms: [
      "Bright red blood while passing stool",
      "Pain during or after bowel movements",
      "Itching or irritation around the anus",
      "A lump or swelling near the anus",
      "Constipation or straining",
    ],
    content: [
      {
        heading: "What Are Piles and Fissures?",
        body: "Piles (hemorrhoids) are swollen blood vessels in or around the anus that can cause bleeding and discomfort. An anal fissure is a small tear in the lining of the anus that causes sharp pain during bowel movements.",
      },
      {
        heading: "Common Causes",
        body: "Constipation, straining, a low-fiber diet, sitting for long periods, pregnancy, and chronic diarrhea can contribute. Improving bowel habits is often the first step in treatment.",
      },
      {
        heading: "Do Not Ignore Rectal Bleeding",
        body: "Bleeding while passing stool should always be checked by a doctor. Although piles are a common cause, other conditions need to be ruled out, especially if bleeding persists or you notice a change in bowel habits.",
      },
      {
        heading: "How Are They Diagnosed?",
        body: "A doctor will take your history and do a gentle examination. In some cases a short scope examination or other tests may be advised.",
      },
      {
        heading: "Treatment Options",
        body: "Early or mild cases often improve with a high-fiber diet, plenty of water, and prescribed medicines or creams. When symptoms persist or are advanced, procedures such as banding, laser treatment, or surgery may be considered by your surgeon.",
      },
      {
        heading: "When Should You Consult a Surgeon?",
        body: "Consult a doctor if you have bleeding, ongoing pain, a lump near the anus, or symptoms that do not improve with simple measures. There is no need to feel embarrassed; these conditions are very common and treatable.",
      },
    ],
  },
  {
    id: "03",
    slug: "appendicitis",
    track: "Laparoscopy",
    title: "Appendicitis",
    description:
      "Evaluation and surgical treatment planning for appendicitis, including laparoscopic approaches when appropriate.",
    img: "https://plus.unsplash.com/premium_photo-1681967162693-4ad328adef4f?q=80&w=1152&auto=format&fit=crop",
    symptoms: [
      "Pain starting near the navel and moving to the lower right abdomen",
      "Loss of appetite",
      "Nausea or vomiting",
      "Low-grade fever",
      "Pain that worsens with movement or coughing",
    ],
    content: [
      {
        heading: "What Is Appendicitis?",
        body: "Appendicitis is inflammation of the appendix, a small pouch attached to the large intestine. It usually needs prompt medical attention because the appendix can burst if left untreated.",
      },
      {
        heading: "Symptoms to Watch For",
        body: "Typical symptoms include abdominal pain that starts around the navel and shifts to the lower right side, along with loss of appetite, nausea, and fever. Pain can become severe within hours.",
      },
      {
        heading: "Why Is It an Emergency?",
        body: "If the appendix bursts, infection can spread inside the abdomen and become life-threatening. Do not wait or self-medicate with painkillers if you suspect appendicitis; go to a hospital promptly.",
      },
      {
        heading: "How Is It Diagnosed?",
        body: "A surgeon examines the abdomen and may order blood tests and an ultrasound or CT scan to confirm the diagnosis and rule out other causes of abdominal pain.",
      },
      {
        heading: "Treatment Options",
        body: "Appendicitis is most often treated by removing the appendix (appendectomy). This may be done by laparoscopic (keyhole) or open surgery depending on the case. Your surgeon will advise the best approach.",
      },
      {
        heading: "Recovery After Surgery",
        body: "Recovery time varies with the type of surgery and how advanced the infection was. Your surgeon will give instructions on diet, wound care, activity, and follow-up.",
      },
    ],
  },
  {
    id: "04",
    slug: "gallbladder-surgery",
    track: "Abdominal Surgery",
    title: "Gallbladder Surgery",
    description:
      "Assessment and treatment options for symptomatic gallstones and gallbladder conditions.",
    img: "https://plus.unsplash.com/premium_photo-1681967162693-4ad328adef4f?q=80&w=1152&auto=format&fit=crop",
    symptoms: [
      "Sudden pain in the upper right or middle abdomen",
      "Pain spreading to the back or right shoulder",
      "Nausea and vomiting after meals",
      "Fever with abdominal pain",
      "Yellowing of the skin or eyes",
    ],
    content: [
      {
        heading: "What Does the Gallbladder Do?",
        body: "The gallbladder stores bile, a fluid that helps digest fats. When stones form or the gallbladder becomes inflamed, it can cause episodes of pain and digestive problems.",
      },
      {
        heading: "When Is Surgery Needed?",
        body: "Surgery is usually considered when gallstones cause repeated pain, inflammation (cholecystitis), infection, or complications such as blockage of the bile duct. Not all gallstones need surgery; stones without symptoms are often only monitored.",
      },
      {
        heading: "Symptoms You Should Not Ignore",
        body: "Severe constant abdominal pain, fever with chills, or yellowing of the skin and eyes needs urgent medical assessment, as these can signal a serious gallbladder or bile duct problem.",
      },
      {
        heading: "Laparoscopic Gallbladder Removal",
        body: "The most common operation is laparoscopic cholecystectomy, done through small incisions with a camera. Compared with open surgery, it generally involves smaller scars and a shorter hospital stay, though suitability depends on the patient.",
      },
      {
        heading: "Life After Gallbladder Removal",
        body: "Most people return to normal activities and eating after recovery. Your surgeon will advise on diet, wound care, and when to resume work and exercise.",
      },
    ],
  },
    ],
       why: {
    title: "Why Choose Our Surgical Unit",
    subtitle: "Safe, modern surgery with a focus on faster recovery",
    points: [
      "Senior surgeon with over 16 years of surgical experience and FRCS qualification",
      "Minimally invasive laparoscopic options where appropriate",
      "Clear advice on whether you need surgery or can be treated without it",
      "Complete care from diagnosis and surgery to follow-up",
    ],
  },
  steps: {
    title: "3 Easy Steps to Your Treatment",
    items: [
      {
        title: "Book Your Appointment Online",
        description:
          "Choose a convenient date and time using the form on this page.",
      },
      {
        title: "Consult Your Surgeon",
        description:
          "Your surgeon examines you, reviews your reports, and advises the tests you need.",
      },
      {
        title: "Plan Your Treatment",
        description:
          "Receive a clear plan with treatment options, timing, and recovery guidance.",
      },
    ],
  },
  testimonials: [], // add real patient reviews here
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
    {
    id: "01",
    slug: "kidney-stones",
    track: "Endourology",
    title: "Kidney Stones (RIRS/PCNL)",
    description:
      "Laser-assisted stone treatment through minimally invasive techniques.",
    img: "https://plus.unsplash.com/premium_photo-1681967162693-4ad328adef4f?q=80&w=1152&auto=format&fit=crop",
    symptoms: [
      "Severe pain in the side or back that comes in waves",
      "Pain that spreads to the lower abdomen or groin",
      "Blood in the urine",
      "Nausea or vomiting",
      "Burning or frequent urination",
    ],
    content: [
      {
        heading: "What Are Kidney Stones?",
        body: "Kidney stones are hard mineral deposits that form inside the kidneys. They may stay in the kidney or travel down the urinary tract, causing pain, bleeding, or blockage.",
      },
      {
        heading: "Common Causes",
        body: "Not drinking enough water, a diet high in salt or certain foods, family history, some medical conditions, and repeated urinary infections can all contribute to stone formation.",
      },
      {
        heading: "Symptoms You Should Not Ignore",
        body: "Severe pain with fever or chills, vomiting that does not stop, or being unable to pass urine needs urgent medical attention, as it may signal infection or blockage.",
      },
      {
        heading: "How Are Kidney Stones Diagnosed?",
        body: "A urologist reviews your symptoms and may advise urine tests, an ultrasound, or a CT scan to find the size and location of the stone.",
      },
      {
        heading: "Treatment Options",
        body: "Small stones may pass with fluids and medicines. Larger or troublesome stones may need procedures such as shock wave lithotripsy, RIRS (retrograde intrarenal surgery) using a flexible scope and laser, or PCNL (percutaneous nephrolithotomy) for large stones. Your urologist will advise what suits you.",
      },
      {
        heading: "Preventing Stones from Coming Back",
        body: "Drinking plenty of water, limiting salt, and following dietary advice based on your stone type can lower the chance of recurrence. Follow-up tests may be advised.",
      },
    ],
    
  },
  {
    id: "02",
    slug: "bph-prostate-health",
    track: "Prostate",
    title: "BPH & Prostate Health",
    description:
      "Evaluation and treatment options for benign prostate enlargement.",
    img: "https://plus.unsplash.com/premium_photo-1681967162693-4ad328adef4f?q=80&w=1152&auto=format&fit=crop",
    symptoms: [
      "Weak or slow urine stream",
      "Needing to urinate often, especially at night",
      "Feeling the bladder is not completely empty",
      "Difficulty starting urination",
      "Sudden urge to urinate",
    ],
    content: [
      {
        heading: "What Is BPH?",
        body: "Benign prostatic hyperplasia (BPH) is a non-cancerous enlargement of the prostate gland that commonly occurs as men get older. It can press on the urine pipe and cause urinary symptoms.",
      },
      {
        heading: "Why Does It Matter?",
        body: "Untreated BPH can lead to repeated urinary infections, bladder stones, or the sudden inability to pass urine. Treating symptoms early improves comfort and protects the bladder and kidneys.",
      },
      {
        heading: "When to Seek Urgent Care",
        body: "If you cannot pass urine at all, have severe lower abdominal pain, or see blood in the urine with fever, get medical help immediately.",
      },
      {
        heading: "How Is BPH Evaluated?",
        body: "A urologist will ask about symptoms and examine you. Tests may include urine tests, a PSA blood test, an ultrasound, and a urine flow test.",
      },
      {
        heading: "Treatment Options",
        body: "Treatment depends on how much the symptoms bother you. Options include lifestyle changes, medicines to relax the prostate or reduce its size, and surgical procedures such as TURP or laser enucleation when medicines are not enough.",
      },
    ],
  },
  {
    id: "03",
    slug: "urinary-tract-problems",
    track: "Urinary Health",
    title: "Urinary Tract Problems",
    description:
      "Evaluation of urinary discomfort, frequent urination, and other urinary symptoms.",
    img: "https://plus.unsplash.com/premium_photo-1681967162693-4ad328adef4f?q=80&w=1152&auto=format&fit=crop",
    symptoms: [
      "Burning sensation while urinating",
      "Frequent or urgent need to urinate",
      "Cloudy or foul-smelling urine",
      "Lower abdominal or pelvic pain",
      "Blood in the urine",
    ],
    content: [
      {
        heading: "What Are Urinary Tract Problems?",
        body: "These include infections of the bladder or kidneys, bladder irritation, difficulty passing urine, and other conditions affecting how urine is stored and passed.",
      },
      {
        heading: "Common Causes",
        body: "Bacterial infection is a common cause. Others include kidney stones, an enlarged prostate, narrowing of the urine pipe, diabetes, and not drinking enough fluids.",
      },
      {
        heading: "Symptoms You Should Not Ignore",
        body: "Fever with chills, pain in the back or side, vomiting, or blood in the urine needs prompt assessment, as the infection may have reached the kidneys.",
      },
      {
        heading: "How Is the Cause Found?",
        body: "A urologist may order a urine test and culture, blood tests, an ultrasound, or other tests to find the cause, especially if infections keep coming back.",
      },
      {
        heading: "Treatment and Prevention",
        body: "Infections are usually treated with antibiotics chosen after testing. Drinking enough water, not holding urine for long, and treating underlying causes help prevent recurrence.",
      },
    ],
  },
  {
    id: "04",
    slug: "prostate-enlargement",
    track: "Men’s Health",
    title: "Prostate Enlargement",
    description:
      "Assessment and management options for urinary symptoms associated with an enlarged prostate.",
    img: "https://plus.unsplash.com/premium_photo-1681967162693-4ad328adef4f?q=80&w=1152&auto=format&fit=crop",
    symptoms: [
      "Waking up several times at night to urinate",
      "Urine stream that stops and starts",
      "Dribbling after urinating",
      "Straining to pass urine",
      "Repeated urinary infections",
    ],
    content: [
      {
        heading: "Understanding Prostate Enlargement",
        body: "The prostate gland sits below the bladder and surrounds the urine pipe. As it grows with age, it can narrow the pipe and make urination difficult.",
      },
      {
        heading: "Who Is at Risk?",
        body: "Prostate enlargement is very common in men over 50 and becomes more common with age. A family history may also increase the chance of developing symptoms.",
      },
      {
        heading: "Diagnostic Evaluation",
        body: "Evaluation may include a symptom score, physical examination, urine test, PSA blood test, ultrasound, and a urine flow test. A PSA test is discussed with your doctor along with its benefits and limits.",
      },
      {
        heading: "Management Options",
        body: "Mild symptoms may be managed with lifestyle changes such as reducing evening fluids and caffeine. Medicines are commonly used for moderate symptoms, and surgery such as TURP or laser procedures may be considered when other treatment is not enough.",
      },
      {
        heading: "When Should You Consult a Urologist?",
        body: "See a urologist if urinary symptoms affect your sleep or daily life, you have repeated infections, or you notice blood in the urine. Inability to pass urine is an emergency.",
      },
    ],
  },
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
  