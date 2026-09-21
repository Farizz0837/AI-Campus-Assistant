import {
  CAMPUS_NAME,
  TIMETABLE_DATA,
  COURSES_DATA,
  LECTURERS_DATA,
  MAP_LOCATIONS,
  LIBRARY_DATA,
  HOSTEL_DATA,
  CAFETERIA_DATA,
  EVENTS_DATA,
  CALENDAR_DATA,
  EXAM_DATA,
  EXAM_RULES,
  STUDENT_SERVICES_DATA,
  EMERGENCY_CONTACTS,
  FAQ_DATA,
} from '../src/data/campusData';

export const SYSTEM_INSTRUCTION = `You are the official AI Campus Assistant for ${CAMPUS_NAME}.
Your sole duty is to be a virtual campus helper that answers university and campus-related questions for university/college students.

CRITICAL RULES & BOUNDARIES:
1. SCOPE RESTRICTION:
   - Focus ONLY on campus-related information (${CAMPUS_NAME}, courses, subjects, timetables, lecturers, rooms, hostel, library, campus map locations, events, academic calendar, exams, student services, cafeteria, emergency contacts, fees, student cards).
   - If a student asks something UNRELATED to campus (e.g., general world trivia, general coding homework, personal advice, movies, pop culture, politics, cooking recipes outside cafeteria), politely decline and state:
     "I am your AI Campus Assistant designed specifically for campus-related questions at ${CAMPUS_NAME}. I can help you with timetables, courses, lecturers, hostel, library, exams, campus locations, cafeteria, and student services. How can I help you with your university needs today?"

2. NO HALLUCINATION / DO NOT INVENT INFORMATION:
   - You MUST rely STRICTLY and EXCLUSIVELY on the verified Campus Knowledge Base provided below.
   - You must NOT invent dates, office numbers, course codes, rules, or contact numbers.
   - If the exact information is not available in the campus database, you MUST respond verbatim or equivalent:
     "I don't have this information in my campus database yet. Please contact the relevant campus department for the latest information."

3. TONE AND FORMATTING:
   - Friendly, clear, concise, and structured.
   - Use Markdown formatting: bullet points, bold key terms (e.g. building names, times, emails, phone numbers).
   - For directions or room locations, specify the building code and level clearly.

4. KNOWLEDGE BASE:
${JSON.stringify(
  {
    university: CAMPUS_NAME,
    timetable: TIMETABLE_DATA,
    courses: COURSES_DATA,
    lecturers: LECTURERS_DATA,
    mapLocations: MAP_LOCATIONS,
    library: LIBRARY_DATA,
    hostel: HOSTEL_DATA,
    cafeteria: CAFETERIA_DATA,
    events: EVENTS_DATA,
    academicCalendar: CALENDAR_DATA,
    examinations: {
      schedule: EXAM_DATA,
      conductRules: EXAM_RULES,
    },
    studentServices: STUDENT_SERVICES_DATA,
    emergencyContacts: EMERGENCY_CONTACTS,
    frequentlyAskedQuestions: FAQ_DATA,
  },
  null,
  2
)}
`;

/**
 * Intelligent local matcher fallback for when Gemini API key is not configured or in offline preview
 */
export function queryLocalKnowledgeBase(userQuery: string): string {
  const query = userQuery.toLowerCase().trim();

  // Check if query is unrelated to campus
  const campusKeywords = [
    'campus', 'university', 'college', 'library', 'lab', 'computer', 'hostel',
    'room', 'dorm', 'curfew', 'cafeteria', 'food', 'canteen', 'eat', 'timetable',
    'schedule', 'class', 'lecture', 'tutorial', 'course', 'subject', 'lecturer',
    'prof', 'doctor', 'dr.', 'exam', 'examination', 'calendar', 'semester', 'trimester',
    'fee', 'bursar', 'pay', 'tuition', 'card', 'matric', 'surau', 'prayer', 'parking',
    'clinic', 'doctor', 'medical', 'emergency', 'warden', 'security', 'counseling',
    'event', 'hackathon', 'career', 'wifi', 'wi-fi', 'sports', 'gym', 'map', 'building',
    'location', 'where', 'when', 'who', 'contact', 'office', 'cs101', 'cs201', 'db102',
    'se205', 'ai301', 'net201', 'cyb302', 'web102', 'mat103', 'cs304', 'help', 'hi',
    'hello', 'hey', 'good morning', 'good afternoon', 'what can you do'
  ];

  const hasCampusKeyword = campusKeywords.some((kw) => query.includes(kw));

  if (!hasCampusKeyword && query.length > 5) {
    return "I am your AI Campus Assistant designed specifically for campus-related questions at MetroTech University. I can help you with timetables, courses, lecturers, hostel, library, exams, campus locations, cafeteria, and student services. How can I help you with your university needs today?";
  }

  // Greetings
  if (
    query === 'hi' ||
    query === 'hello' ||
    query.startsWith('hello') ||
    query.startsWith('hi ') ||
    query.includes('what can you do')
  ) {
    return `Hi! 👋 I'm your AI Campus Assistant for **${CAMPUS_NAME}**.\n\nI can help you with:\n• **Timetables** & class schedules\n• **Courses** & syllabi\n• **Lecturers** & office hours\n• **Hostel** rules & check-in\n• **Library** hours & facilities\n• **Campus locations** & interactive map\n• **Cafeteria** & food stalls\n• **Events & announcements**\n• **Academic calendar** & semester dates\n• **Exams** & hall venues\n• **Student services** (fee payments, lost student card, health clinic, IT)\n\nAsk me anything about your campus!`;
  }

  // Library questions
  if (query.includes('library') || query.includes('book') || query.includes('borrow')) {
    if (query.includes('close') || query.includes('hour') || query.includes('time') || query.includes('open')) {
      return `**${LIBRARY_DATA.name} Opening Hours:**\n\n• **Weekdays (Mon - Fri):** 8:00 AM - 10:00 PM\n• **Weekends (Sat - Sun):** 9:00 AM - 5:00 PM\n• **Exam Periods:** **24/7 Study Access** on Levels 1 & 2\n\n📍 **Location:** ${LIBRARY_DATA.location}\n📞 **Contact:** ${LIBRARY_DATA.contacts.phone} | ${LIBRARY_DATA.contacts.email}`;
    }
    if (query.includes('rule') || query.includes('food') || query.includes('silence')) {
      return `**Library Rules & Policies:**\n\n${LIBRARY_DATA.rules.map((r) => `• ${r}`).join('\n')}`;
    }
    if (query.includes('discussion') || query.includes('room') || query.includes('facil')) {
      return `**Library Facilities & Discussion Rooms:**\n\n• **Group Discussion Rooms:** 12 Rooms (Seats 4-8 persons), 55" presentation displays & whiteboards. Book via Student Portal up to 3 days in advance.\n• **Silent Study Pods:** 350 individual carrels on Levels 3 & 4 with acoustic dividers.\n• **PC & Printing Lab:** 80 workstations with SPSS, MATLAB, Python & cloud printing.\n• **Lending Policy:** Undergraduates can borrow up to 6 books for 14 days (renewable online).`;
    }
  }

  // Computer lab / Labs
  if (query.includes('computer lab') || query.includes('lab') || query.includes('laboratory')) {
    return `**Computer Laboratories & Facilities:**\n\n• **Location:** **Block C (Computing & Technology Wing)**\n• **Levels:**\n  - **Level 2:** Computer Labs 1, 2, and 3 (General Computing & Database Labs)\n  - **Level 3:** Network & Security Lab and Mobile Dev Studio\n  - **Level 4:** AI Innovation Hub and Cloud Computing Suite\n• **Operating Hours:** Mon - Fri: 8:00 AM - 8:00 PM\n• **Access Requirement:** Tap your valid student matriculation card at the door turnstiles.`;
  }

  // Fees / Tuition
  if (query.includes('fee') || query.includes('pay') || query.includes('bursar') || query.includes('tuition')) {
    return `**Where and How to Pay College Fees:**\n\n1. **Online via Student Portal (Recommended):**\n   - Log in to \`portal.campus.edu.my\` > **Finance** > **Make Payment**.\n   - Supports FPX Online Banking, Credit/Debit Card, or JomPAY (**Biller Code: 99881**).\n2. **Physical Bursar Counters:**\n   - **Location:** Block A (Chancellery), Level 1, Bursar Counters 1-4.\n   - **Hours:** Monday to Friday, 8:30 AM - 4:30 PM (Cashless payments only).\n3. **Scholarship / PTPTN / MARA:**\n   - Submit sponsorship guarantee letters to Counter 4.\n\n*Note: Payments must be completed by Week 4 of the trimester to prevent portal suspension.*`;
  }

  // Lost student card
  if (query.includes('lost') && (query.includes('card') || query.includes('matric'))) {
    return `**What to do if you lose your Student Card:**\n\n1. **Step 1 (Block Card Access):** Immediately report the loss to Campus Security hotline (**+603-8990-9999**) or deactivate it via the Student Portal to protect your account.\n2. **Step 2 (Pay Replacement Fee):** Pay the **RM 30.00** replacement fee on the Student Portal under *Services > Card Replacement* or at the Bursar Counter in Block A.\n3. **Step 3 (Instant Reprint):** Go to **Academic Registry (Block A, Room 102)** with your payment receipt and an IC or Passport. Your new smartcard will be printed on the spot within 10 minutes.\n4. **Hostel & Door Sync:** Access to your hostel gate and lab turnstiles will sync automatically within 1 hour.`;
  }

  // Hostel questions
  if (query.includes('hostel') || query.includes('dorm') || query.includes('curfew') || query.includes('mahsuri') || query.includes('kasturi')) {
    if (query.includes('rule') || query.includes('curfew') || query.includes('guest') || query.includes('cook')) {
      return `**Hostel Rules & Regulations:**\n\n${HOSTEL_DATA.rules.map((r) => `• ${r}`).join('\n')}\n\n📞 **Hostel Emergency Wardens:**\n• Female Residence (Mahsuri): +603-8990-1122\n• Male Residence (Kasturi): +603-8990-1123`;
    }
    if (query.includes('check in') || query.includes('check-in') || query.includes('register') || query.includes('deposit')) {
      return `**Hostel Check-In Information:**\n\n• **Hours:** Mon - Fri 9:00 AM - 4:30 PM at the assigned block College Management Office.\n• **Required Documents:**\n  - Student Matric Card / Offer Letter\n  - Proof of Hostel Fee Payment\n  - Signed Accommodation Undertaking Agreement\n  - 2 Passport photos\n  - Refundable key/card deposit: **RM 50.00**\n• **Process:** Report to Ground Floor Office, verify inventory, collect RFID keycard and Wi-Fi login.`;
    }
    return `**Hostel Accommodation at ${CAMPUS_NAME}:**\n\n• **Mahsuri Residential College (Block A):** Female Undergraduates (10 floors, 800 capacity). Warden: +603-8990-1122\n• **Kasturi Residential College (Block B):** Male Undergraduates (12 floors, 950 capacity). Warden: +603-8990-1123\n• **Room Types:** Twin Sharing (RM 950/sem) & Single Air-conditioned (RM 1,800/sem).\n• **Curfew:** 11:30 PM daily.\n• **Facilities:** 24/7 coin laundry, floor pantries with microwave/induction, gym, surau, and student lounge.`;
  }

  // Cafeteria / Food
  if (query.includes('cafeteria') || query.includes('canteen') || query.includes('food') || query.includes('eat') || query.includes('lunch') || query.includes('dinner')) {
    return `**Campus Cafeteria & Dining Options:**\n\n1. **Central Food Court (Block C Ground Floor):**\n   - **Hours:** 7:30 AM - 8:30 PM (Mon - Sat)\n   - **Stalls:** Nasi Kandar & Melayu Asli (Nasi Lemak RM 7), The Wok & Noodles (RM 6-8.50), Western Grill (Chicken Chop RM 9.50), Green Oasis (Vegetarian/Vegan RM 5), Seoul Bowl (Korean Chicken RM 8.50).\n   - **Facilities:** 500+ seats, 100% cashless (DuitNow QR/Card), free filtered water refill.\n\n2. **Garden Bistro & Library Coffee Lounge (Block L):**\n   - **Hours:** 8:00 AM - 9:00 PM (Mon - Fri)\n   - **Highlights:** Fresh espresso, iced lattes, artisan bakery pastries, quiet laptop study tables.\n\n3. **Kolej Late Night Cafe (Hostel Block A):**\n   - **Hours:** 5:00 PM - 11:30 PM daily for supper, burger Ramly & Teh Tarik.`;
  }

  // Semester / Academic Calendar
  if (query.includes('semester end') || query.includes('exam period') || query.includes('break') || query.includes('calendar') || query.includes('holiday')) {
    return `**Key Academic Calendar Dates (Trimester 1, 2026/2027):**\n\n• **Course Add/Drop Deadline:** September 21, 2026 (5:00 PM)\n• **Midterm Break:** October 19 - October 23, 2026\n• **Course Withdrawal ("W") Deadline:** November 6, 2026\n• **Study & Revision Week:** November 30 - December 4, 2026\n• **Final Examinations Period:** **December 7 - December 18, 2026**\n• **Semester Ends:** **December 18, 2026**\n• **Vacation:** December 19, 2026 - January 10, 2027\n• **CGPA Results Release:** January 4, 2027 on Student Portal`;
  }

  // Courses offered
  if (query.includes('courses offered') || query.includes('what courses') || query.includes('course list') || query.includes('subjects offered')) {
    return `**Undergraduate Courses Offered by the Faculty:**\n\n1. **CS101** - Introduction to Computer Science (3 Cr) | Dr. Sarah Jenkins\n2. **CS201** - Data Structures & Algorithms (4 Cr) | Dr. Sarah Jenkins\n3. **DB102** - Database Systems & Management (3 Cr) | Prof. Michael Wong\n4. **SE205** - Software Engineering Principles (3 Cr) | Assoc. Prof. David Miller\n5. **AI301** - Artificial Intelligence & Machine Learning (4 Cr) | Dr. Elena Rostova\n6. **NET201** - Computer Networks & Security (3 Cr) | Ts. Kevin Tan\n7. **CYB302** - Cybersecurity Fundamentals (3 Cr) | Ts. Kevin Tan\n8. **WEB102** - Full-Stack Web Development (3 Cr) | Ms. Nadia Farhan\n9. **MAT103** - Discrete Mathematics & Statistics (3 Cr) | Dr. Aisha Rahman\n10. **CS304** - Cloud Computing & Distributed Systems (3 Cr) | Prof. Michael Wong\n\n*You can view full course descriptions and prerequisites in the **Courses** tab.*`;
  }

  // Specific Lecturer queries
  const matchedLec = LECTURERS_DATA.find((l) =>
    query.includes(l.name.toLowerCase()) ||
    l.subjects.some((s) => query.includes(s.toLowerCase().split(':')[0].trim()))
  );
  if (matchedLec) {
    return `**Lecturer Profile: ${matchedLec.name}**\n\n• **Title & Dept:** ${matchedLec.title} (${matchedLec.department})\n• **Subjects Taught:** ${matchedLec.subjects.join(', ')}\n• **Office:** ${matchedLec.office}\n• **Email:** [${matchedLec.email}](mailto:${matchedLec.email})\n• **Office Hours:** ${matchedLec.officeHours}\n• **Telephone:** ${matchedLec.phone}`;
  }

  // Generic Lecturer question
  if (query.includes('lecturer') || query.includes('professor') || query.includes('who teaches')) {
    return `**Faculty Lecturers Directory:**\n\n• **Dr. Sarah Jenkins** (CS101, CS201) - Office: Block B, Room B-412 | Consultation: Tue & Thu 2:00 PM - 4:30 PM\n• **Prof. Michael Wong** (DB102, CS304) - Office: Block B, Room B-318 | Consultation: Mon & Wed 10:00 AM - 12:00 PM\n• **Assoc. Prof. David Miller** (SE205, SE308) - Office: Block B, Room B-225 | Consultation: Wed 1:00 PM - 4:00 PM\n• **Dr. Elena Rostova** (AI301) - Office: Block C, Room C-402 | Consultation: Tue 2:00 PM - 5:00 PM\n• **Ts. Kevin Tan** (NET201, CYB302) - Office: Block C, Room C-312 | Consultation: Thu 10:00 AM - 1:00 PM\n• **Ms. Nadia Farhan** (WEB102, SE205 UX) - Office: Block D, Room D-204 | Consultation: Fri 9:30 AM - 12:00 PM\n• **Dr. Aisha Rahman** (MAT103) - Office: Block A, Room A-309 | Consultation: Mon & Thu 2:00 PM - 4:00 PM\n\n*Check the **Lecturers** tab to browse complete faculty contact cards.*`;
  }

  // Timetable
  if (query.includes('timetable') || query.includes('schedule') || query.includes('monday') || query.includes('tuesday') || query.includes('wednesday') || query.includes('thursday') || query.includes('friday')) {
    return `**Class Timetable Overview:**\n\n• **Monday:**\n  - 08:30 AM: CS201 Data Structures (LT-2, Block B)\n  - 11:00 AM: DB102 Database Lab (CL-3, Block C)\n  - 02:00 PM: SE205 Software Engineering (Room B-304)\n• **Tuesday:**\n  - 09:00 AM: AI301 AI & ML (AI Hub, Block C Level 4)\n  - 11:30 AM: NET201 Networks Lab (Block C Level 3)\n  - 02:30 PM: WEB102 Web Dev Lab (CL-5, Block C)\n• **Wednesday:**\n  - 08:30 AM: CYB302 Cybersecurity (LT-1, Block B)\n  - 11:00 AM: CS201 Tutorial (Seminar Room 4, Block B)\n• **Thursday:**\n  - 09:00 AM: CS304 Cloud Computing Lab (Block C Level 4)\n  - 02:00 PM: MAT103 Linear Algebra (LT-3, Block B)\n• **Friday:**\n  - 08:30 AM: CS101 Ethics in Computing (Auditorium 2, Block A)\n\n*Click on the **Timetable** tab in the sidebar to view day-by-day filterable slots!*`;
  }

  // Map / Building / Where is
  if (query.includes('where is') || query.includes('map') || query.includes('location') || query.includes('surau') || query.includes('parking') || query.includes('clinic')) {
    if (query.includes('surau') || query.includes('prayer')) {
      return `**Campus Surau (Pusat Islam Al-Falah):**\n\n📍 **Location:** Surau Complex (Near Block S and Block A Chancellery).\n• Features segregated male (Ground) & female (Level 1) ablution and prayer spaces.\n• Open daily from 5:00 AM to 10:30 PM. Friday prayers (Solat Jumaat) conducted weekly.`;
    }
    if (query.includes('parking')) {
      return `**Campus Parking Zones:**\n\n• **Zone P1 & P2 (Student North Parking):** Multi-tier parking for student cars and motorcycles (requires semester parking sticker).\n• **Zone P3 (Visitor & Staff South Parking):** Located opposite the Chancellery Main Gate (Touch n Go / Debit card payment).\n• **Hours:** Student parking accessible 24/7 via barrier card tap.`;
    }
    if (query.includes('clinic') || query.includes('medical') || query.includes('health') || query.includes('doctor')) {
      return `**University Health Clinic:**\n\n📍 **Location:** Block S Ground Floor (Next to Student Concourse)\n🕒 **Hours:** Monday to Friday: 8:00 AM - 6:00 PM | Saturday: 8:30 AM - 1:00 PM\n📞 **Emergency Ambulance Extension:** 9992 (or call +603-8990-3333)\n• Free basic consultations and pharmacy prescriptions for registered students with valid matric card.`;
    }
    return `**Campus Key Landmarks:**\n\n• **Block A:** Chancellery, Registry, Admissions & Bursar Fee Counters\n• **Block B:** Academic Complex, Lecture Theatres (LT-1, LT-2, LT-3), Computing Faculty Offices\n• **Block C:** Computing Labs (CL 1-6), Network Lab, AI Innovation Hub\n• **Block L:** Tun Abdul Razak Central Library & Garden Coffee Bistro\n• **Block S:** Student Services Hub, Health Clinic, Counseling Center\n• **Residential Colleges:** Mahsuri Hall (Female) & Kasturi Hall (Male)\n• **Food:** Central Food Court (Block C Ground Floor)\n\n*Check the **Campus Map** tab to interact with our clickable campus map!*`;
  }

  // Emergency
  if (query.includes('emergency') || query.includes('police') || query.includes('security') || query.includes('ambulance') || query.includes('fire')) {
    return `🚨 **EMERGENCY CONTACTS (24/7 HOTLINES):**\n\n• **Campus Security Control Room:** **+603-8990-9999** or **+603-8990-9991**\n• **Campus Ambulance & Medical Responders:** **+603-8990-9992**\n• **Fire & Occupational Safety (OSH):** **+603-8990-9995**\n• **Female Hostel Warden on Duty:** **+603-8990-1122**\n• **Male Hostel Warden on Duty:** **+603-8990-1123**\n• **Mental Health & Counseling Crisis Line:** **+603-8990-8800**\n• **National Emergency Hotline:** **999**`;
  }

  // Default strictly conforming response if info is missing
  return "I don't have this information in my campus database yet. Please contact the relevant campus department for the latest information.";
}
