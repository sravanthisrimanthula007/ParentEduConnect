const API_BASE = "http://localhost:8080/api";
let authToken = null;
let apiPredictions = {};

let students = [
  {
    id: "sameed",
    name: "Sameed Khan",
    roll: "08",
    className: "10",
    section: "A",
    parent: "Aamir Khan",
    contact: "+91 98765 43210",
    attendance: [92, 89, 86, 84, 82, 78],
    subjects: {
      Mathematics: [72, 74, 77, 79, 81, 82],
      Science: [86, 85, 84, 88, 89, 91],
      English: [78, 80, 82, 81, 83, 85],
      Social: [69, 73, 76, 74, 77, 79],
      Computer: [91, 93, 94, 95, 96, 96]
    },
    grade: "A",
    rankPrediction: 9,
    improvement: 7,
    risk: "Medium",
    weakSubject: "Mathematics",
    passProbability: 94,
    behaviorScore: 78,
    assignmentCompletion: 86,
    participation: 74,
    achievements: [
      ["Science Expo", "Second prize in robotics prototype"],
      ["Sports Day", "100m relay team finalist"],
      ["Coding Sprint", "Certificate of excellence"]
    ],
    complaints: [
      ["May 28", "Late submission in Mathematics assignment", "Moderate"],
      ["Apr 18", "Talkative during lab instructions", "Low"],
      ["Mar 07", "Improved class participation noted", "Positive"]
    ]
  },
  {
    id: "aisha",
    name: "Aisha Rahman",
    roll: "14",
    className: "9",
    section: "B",
    parent: "Nadia Rahman",
    contact: "+91 98765 43890",
    attendance: [96, 95, 94, 93, 91, 92],
    subjects: {
      Mathematics: [88, 90, 91, 92, 94, 95],
      Science: [82, 83, 86, 87, 88, 90],
      English: [91, 92, 93, 92, 94, 95],
      Social: [84, 85, 86, 88, 88, 89],
      Computer: [93, 94, 95, 96, 97, 98]
    },
    grade: "A+",
    rankPrediction: 3,
    improvement: 9,
    risk: "Low",
    weakSubject: "Science",
    passProbability: 99,
    behaviorScore: 94,
    assignmentCompletion: 98,
    participation: 91,
    achievements: [
      ["Debate League", "Best speaker award"],
      ["Math Olympiad", "School round winner"],
      ["Art Fest", "Digital poster certificate"]
    ],
    complaints: [
      ["May 12", "Consistent homework submission", "Positive"],
      ["Apr 04", "Helped classmates during project work", "Positive"]
    ]
  }
];

const state = {
  studentId: students[0].id,
  view: "parent",
  subject: "Mathematics",
  role: null,
  language: "en",
  lastChatContext: ""
};

const demoUsers = {
  parent: { email: "parent@demo.edu", password: "parent123", view: "parent" },
  teacher: { email: "teacher@demo.edu", password: "teacher123", view: "teacher" },
  admin: { email: "admin@demo.edu", password: "admin123", view: "admin" }
};

const $ = (selector) => document.querySelector(selector);
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const monthNames = {
  en: { Jan: "Jan", Feb: "Feb", Mar: "Mar", Apr: "Apr", May: "May", Jun: "Jun" },
  hi: { Jan: "जन", Feb: "फर", Mar: "मार्च", Apr: "अप्रै", May: "मई", Jun: "जून" },
  te: { Jan: "జన", Feb: "ఫిబ్ర", Mar: "మార్చి", Apr: "ఏప్రి", May: "మే", Jun: "జూన్" },
  ta: { Jan: "ஜன", Feb: "பிப்", Mar: "மார்", Apr: "ஏப்", May: "மே", Jun: "ஜூன்" }
};
let schoolStats = {
  totalStudents: 1248,
  teachers: 96,
  attendancePercent: 88,
  riskAlerts: 142,
  present: 1098,
  absent: 150,
  pass: 1086,
  fail: 162
};

let loginAudits = [
  { name: "Aisha Rahman Parent", role: "parent", time: "04 Jun 2026, 12:42 PM", device: "Chrome / Windows", status: "Success" },
  { name: "Mr. Ravi Kumar", role: "teacher", time: "04 Jun 2026, 12:38 PM", device: "Edge / Windows", status: "Success" },
  { name: "Admin Office", role: "admin", time: "04 Jun 2026, 12:31 PM", device: "Chrome / Windows", status: "Success" },
  { name: "Unknown Parent Login", role: "parent", time: "04 Jun 2026, 12:18 PM", device: "Mobile / Android", status: "Failed" },
  { name: "Sameed Khan Parent", role: "parent", time: "04 Jun 2026, 11:57 AM", device: "Safari / iPhone", status: "Success" }
];

let activeSessions = [
  { name: "Admin Office", role: "admin", since: "12:31 PM", location: "School office", status: "Active" },
  { name: "Mr. Ravi Kumar", role: "teacher", since: "12:38 PM", location: "Class 10-A", status: "Active" },
  { name: "Aisha Rahman Parent", role: "parent", since: "12:42 PM", location: "Home network", status: "Active" }
];

const accountStats = [
  { label: "Admin accounts", value: 4, status: "Enabled" },
  { label: "Teacher accounts", value: 96, status: "Enabled" },
  { label: "Parent accounts", value: 1184, status: "Enabled" },
  { label: "Locked accounts", value: 7, status: "Review" }
];

const copy = {
  en: {
    roleNames: { parent: "Parent", teacher: "Teacher", admin: "Admin" },
    nav: { parent: "Parent Dashboard", teacher: "Teacher Console", admin: "Admin Analytics", profile: "Student Profile" },
    smartWorkspace: "Smart monitoring workspace",
    risk: "Risk",
    student: "Student",
    language: "Language",
    theme: "Switch Theme",
    logout: "Logout",
    botTitle: "AI Chatbot",
    botSubtitle: "Personalized academic guide",
    botPlaceholder: "Ask about marks, attendance, complaints...",
    send: "Send",
    quickWeak: "Weak subject",
    quickPredict: "Predict math",
    quickComplaints: "Complaints",
    freshChat: "Fresh chat started for {context}. Ask about attendance, weak subjects, predictions, complaints, or improvement suggestions.",
    aiSummary: "AI prediction summary",
    headline: "{name} needs the most support in {subject}",
    summary: "Attendance average is {attendance}%, assignment completion is {assignments}%, and AI pass probability is {pass}%.",
    predictedNext: "Predicted next exam score",
    currentAverage: "Current marks average",
    schoolGrade: "School grade",
    rank: "Predicted class rank",
    improvement: "Improvement rate",
    passFail: "Pass / Fail Estimate",
    totalAttendance: "Total Present / Absent",
    pass: "Pass",
    fail: "Fail",
    present: "Present",
    absent: "Absent",
    answerAttendanceDown: "Attendance decreased by {delta} points, mainly from missed days in the last two months. A weekly attendance target of 90% is recommended.",
    answerAttendanceStable: "Attendance is stable at {attendance}%. Keep the current routine.",
    answerWeak: "{subject} needs improvement. Focus on error review, assignment completion, and short daily practice before the next exam.",
    answerPredict: "The AI estimate for {subject} is {score}%, using previous marks, attendance, assignments, behavior, and participation.",
    answerComplaint: "Latest teacher note from {date}: {note}. Severity: {severity}.",
    answerDefault: "{name} has {pass}% pass probability, {attendance}% attendance, and grade {grade}. The strongest next action is improving {subject}."
  },
  hi: {
    roleNames: { parent: "अभिभावक", teacher: "शिक्षक", admin: "एडमिन" },
    nav: { parent: "अभिभावक डैशबोर्ड", teacher: "शिक्षक कंसोल", admin: "एडमिन एनालिटिक्स", profile: "छात्र प्रोफाइल" },
    smartWorkspace: "स्मार्ट मॉनिटरिंग कार्यक्षेत्र",
    risk: "जोखिम",
    student: "छात्र",
    language: "भाषा",
    theme: "थीम बदलें",
    logout: "लॉगआउट",
    botTitle: "AI चैटबॉट",
    botSubtitle: "व्यक्तिगत शैक्षणिक मार्गदर्शक",
    botPlaceholder: "अंक, उपस्थिति, शिकायतें पूछें...",
    send: "भेजें",
    quickWeak: "कमजोर विषय",
    quickPredict: "गणित अनुमान",
    quickComplaints: "शिकायतें",
    freshChat: "{context} के लिए नई चैट शुरू हुई। उपस्थिति, कमजोर विषय, अनुमान या सुझाव पूछें।",
    aiSummary: "AI अनुमान सारांश",
    headline: "{name} को {subject} में सबसे अधिक सहायता चाहिए",
    summary: "औसत उपस्थिति {attendance}%, असाइनमेंट पूर्णता {assignments}%, और पास संभावना {pass}% है।",
    predictedNext: "अगली परीक्षा का अनुमानित अंक",
    currentAverage: "वर्तमान अंक औसत",
    schoolGrade: "स्कूल ग्रेड",
    rank: "अनुमानित कक्षा रैंक",
    improvement: "सुधार दर",
    passFail: "पास / फेल अनुमान",
    totalAttendance: "कुल उपस्थित / अनुपस्थित",
    pass: "पास",
    fail: "फेल",
    present: "उपस्थित",
    absent: "अनुपस्थित",
    answerAttendanceDown: "उपस्थिति {delta} अंक कम हुई है। पिछले दो महीनों में अनुपस्थिति मुख्य कारण है। 90% साप्ताहिक लक्ष्य रखें।",
    answerAttendanceStable: "उपस्थिति {attendance}% पर स्थिर है। यही दिनचर्या जारी रखें।",
    answerWeak: "{subject} में सुधार चाहिए। गलतियों की समीक्षा, असाइनमेंट और रोज छोटी प्रैक्टिस करें।",
    answerPredict: "{subject} के लिए AI अनुमान {score}% है, जो पिछले अंक, उपस्थिति और व्यवहार पर आधारित है।",
    answerComplaint: "{date} की नवीनतम शिक्षक टिप्पणी: {note}. गंभीरता: {severity}.",
    answerDefault: "{name} की पास संभावना {pass}%, उपस्थिति {attendance}%, और ग्रेड {grade} है। सबसे जरूरी सुधार {subject} में है।"
  },
  te: {
    roleNames: { parent: "తల్లి/తండ్రి", teacher: "ఉపాధ్యాయుడు", admin: "అడ్మిన్" },
    nav: { parent: "తల్లిదండ్రుల డ్యాష్‌బోర్డ్", teacher: "ఉపాధ్యాయుల కన్సోల్", admin: "అడ్మిన్ విశ్లేషణలు", profile: "విద్యార్థి ప్రొఫైల్" },
    smartWorkspace: "స్మార్ట్ మానిటరింగ్ వర్క్‌స్పేస్",
    risk: "రిస్క్",
    student: "విద్యార్థి",
    language: "భాష",
    theme: "థీమ్ మార్చండి",
    logout: "లాగౌట్",
    botTitle: "AI చాట్‌బాట్",
    botSubtitle: "వ్యక్తిగత విద్యా మార్గదర్శి",
    botPlaceholder: "మార్కులు, హాజరు, ఫిర్యాదులు అడగండి...",
    send: "పంపు",
    quickWeak: "బలహీన విషయం",
    quickPredict: "గణితం అంచనా",
    quickComplaints: "ఫిర్యాదులు",
    freshChat: "{context} కోసం కొత్త చాట్ ప్రారంభమైంది. హాజరు, బలహీన విషయాలు, అంచనాలు లేదా సూచనలు అడగండి.",
    aiSummary: "AI అంచనా సారాంశం",
    headline: "{name} కు {subject} లో ఎక్కువ సహాయం అవసరం",
    summary: "సగటు హాజరు {attendance}%, అసైన్‌మెంట్ పూర్తి {assignments}%, పాస్ అవకాశం {pass}%.",
    predictedNext: "తదుపరి పరీక్ష అంచనా మార్కు",
    currentAverage: "ప్రస్తుత మార్కుల సగటు",
    schoolGrade: "స్కూల్ గ్రేడ్",
    rank: "అంచనా తరగతి ర్యాంక్",
    improvement: "మెరుగుదల రేటు",
    passFail: "పాస్ / ఫెయిల్ అంచనా",
    totalAttendance: "మొత్తం హాజరు / గైర్హాజరు",
    pass: "పాస్",
    fail: "ఫెయిల్",
    present: "హాజరు",
    absent: "గైర్హాజరు",
    answerAttendanceDown: "హాజరు {delta} పాయింట్లు తగ్గింది. గత రెండు నెలల గైర్హాజరు ప్రధాన కారణం. వారానికి 90% లక్ష్యం పెట్టండి.",
    answerAttendanceStable: "హాజరు {attendance}% వద్ద స్థిరంగా ఉంది. ఇదే పద్ధతి కొనసాగించండి.",
    answerWeak: "{subject} లో మెరుగుదల అవసరం. తప్పులను సమీక్షించి, అసైన్‌మెంట్ పూర్తి చేసి, రోజూ చిన్న ప్రాక్టీస్ చేయండి.",
    answerPredict: "{subject} కోసం AI అంచనా {score}%. ఇది పాత మార్కులు, హాజరు, ప్రవర్తన ఆధారంగా ఉంది.",
    answerComplaint: "{date} తాజా ఉపాధ్యాయుడి గమనిక: {note}. తీవ్రత: {severity}.",
    answerDefault: "{name} పాస్ అవకాశం {pass}%, హాజరు {attendance}%, గ్రేడ్ {grade}. ముఖ్యంగా {subject} మెరుగుపరచాలి."
  },
  ta: {
    roleNames: { parent: "பெற்றோர்", teacher: "ஆசிரியர்", admin: "நிர்வாகி" },
    nav: { parent: "பெற்றோர் டாஷ்போர்டு", teacher: "ஆசிரியர் கன்சோல்", admin: "நிர்வாக பகுப்பாய்வு", profile: "மாணவர் சுயவிவரம்" },
    smartWorkspace: "ஸ்மார்ட் கண்காணிப்பு பணிமனை",
    risk: "ஆபத்து",
    student: "மாணவர்",
    language: "மொழி",
    theme: "தீம் மாற்று",
    logout: "வெளியேறு",
    botTitle: "AI சாட்பாட்",
    botSubtitle: "தனிப்பட்ட கல்வி வழிகாட்டி",
    botPlaceholder: "மதிப்பெண், வருகை, புகார் கேளுங்கள்...",
    send: "அனுப்பு",
    quickWeak: "பலவீன பாடம்",
    quickPredict: "கணித கணிப்பு",
    quickComplaints: "புகார்கள்",
    freshChat: "{context} க்கான புதிய உரையாடல் தொடங்கியது. வருகை, பலவீன பாடம், கணிப்பு அல்லது பரிந்துரைகள் கேளுங்கள்.",
    aiSummary: "AI கணிப்பு சுருக்கம்",
    headline: "{name} க்கு {subject} பாடத்தில் அதிக உதவி தேவை",
    summary: "சராசரி வருகை {attendance}%, பணிகள் நிறைவு {assignments}%, பாஸ் வாய்ப்பு {pass}%.",
    predictedNext: "அடுத்த தேர்வு கணிக்கப்பட்ட மதிப்பெண்",
    currentAverage: "தற்போதைய மதிப்பெண் சராசரி",
    schoolGrade: "பள்ளி தரம்",
    rank: "கணிக்கப்பட்ட வகுப்பு ரேங்க்",
    improvement: "முன்னேற்ற விகிதம்",
    passFail: "பாஸ் / ஃபெயில் கணிப்பு",
    totalAttendance: "மொத்த வருகை / வராதவர்",
    pass: "பாஸ்",
    fail: "ஃபெயில்",
    present: "வருகை",
    absent: "வரவில்லை",
    answerAttendanceDown: "வருகை {delta} புள்ளிகள் குறைந்துள்ளது. கடந்த இரண்டு மாத வராத நாட்கள் முக்கிய காரணம். வார இலக்கு 90% ஆக வைத்துக்கொள்ளவும்.",
    answerAttendanceStable: "வருகை {attendance}% ஆக நிலையாக உள்ளது. இதே பழக்கத்தை தொடரவும்.",
    answerWeak: "{subject} பாடத்தில் முன்னேற்றம் தேவை. தவறுகளைப் பார்த்து, பணிகளை முடித்து, தினமும் குறுகிய பயிற்சி செய்யவும்.",
    answerPredict: "{subject} பாடத்திற்கான AI கணிப்பு {score}%. இது முந்தைய மதிப்பெண், வருகை, நடத்தை அடிப்படையில் உள்ளது.",
    answerComplaint: "{date} சமீபத்திய ஆசிரியர் குறிப்பு: {note}. தீவிரம்: {severity}.",
    answerDefault: "{name} பாஸ் வாய்ப்பு {pass}%, வருகை {attendance}%, தரம் {grade}. முக்கிய முன்னேற்றம் {subject} பாடத்தில் தேவை."
  }
};

const extraCopy = {
  en: {
    login: "Login",
    accessPortal: "Access Portal",
    loginHeroTitle: "Secure academic monitoring for every role.",
    loginHeroText: "Choose a demo role to enter the AI dashboard for parents, teachers, or school administrators.",
    role: "Role",
    email: "Email",
    password: "Password",
    loginButton: "Login",
    demo: "Demo",
    invalidLogin: "Invalid {role} credentials. Use the demo login shown for this role.",
    loggedOut: "Logged out. Choose a role to continue.",
    brandSubtitle: "AI Academic Analytics",
    marksProgression: "Marks progression",
    performanceGrowth: "Performance Growth",
    attendance: "Attendance",
    monthlyTrend: "Monthly Trend",
    subjectHeatmap: "Subject heatmap",
    strengthAnalysis: "Strength Analysis",
    aiInsights: "AI insights",
    predictionPanel: "Prediction Panel",
    behavior: "Behavior",
    complaintsRemarks: "Complaints & Remarks",
    achievements: "Achievements",
    achievementsTitle: "Certificates, Sports & Competitions",
    bulkUpload: "Bulk upload",
    academicRecordEntry: "Academic Record Entry",
    riskAlerts: "Risk alerts",
    studentsAttention: "Students Requiring Attention",
    classAnalytics: "Class analytics",
    performanceSpread: "Performance Spread",
    predictionResult: "Prediction result",
    systemAnalytics: "System analytics",
    schoolReport: "School Performance Report",
    totalStudents: "Total Students",
    teachers: "Teachers",
    schoolAttendance: "School Attendance",
    aiRiskAlerts: "AI Risk Alerts",
    subjectInput: "Subject",
    marksInput: "Marks",
    attendanceInput: "Attendance %",
    excellentBehavior: "Excellent behavior",
    needsAttention: "Needs attention",
    complaintRaised: "Complaint raised",
    queueUpdate: "Queue Update",
    low: "Low",
    medium: "Medium",
    high: "High",
    excellent: "Excellent",
    schoolAverage: "School average",
    classLabel: "Class",
    noticeSubject: "{subject} score requires attention before the next unit test.",
    noticeAttendanceDown: "Attendance trend is decreasing this term.",
    noticeAttendanceStable: "Attendance trend is stable this term.",
    noticeExam: "Upcoming exam reminder: Semester assessment starts next week.",
    noticePositive: "New positive teacher remark available.",
    noticeComplaint: "Recent complaint requires parent acknowledgement.",
    predictedMarks: "Predicted marks",
    weakSubject: "Weak subject",
    riskScore: "Risk score",
    recommendation: "Recommendation",
    predictedMarksText: "{subject} next exam estimate is {score}%.",
    weakSubjectText: "{subject} has the slowest growth trend and needs weekly practice.",
    riskScoreText: "{risk} academic risk based on attendance, marks, behavior, and assignments.",
    recommendationText: "Target two revision sessions, complete pending assignments, and review the last three {subject} mistakes.",
    contact: "Contact",
    roll: "Roll",
    aiPrediction: "AI Prediction",
    behaviorScore: "Behavior Score",
    assignmentCompletion: "Assignment Completion",
    participation: "Participation",
    average: "average",
    inSubject: "in {subject}",
    quickWeakPrompt: "Which subject needs improvement?",
    quickPredictPrompt: "Predict next mathematics exam score",
    quickComplaintsPrompt: "Show recent teacher complaints",
    studentTracking: "Student tracking",
    studentMonitoring: "Student Performance Monitoring",
    activeLogins: "Active logins",
    liveSessions: "Live Sessions",
    userControls: "User controls",
    accountStatus: "Account Status",
    loginAudit: "Login audit",
    recentLoginHistory: "Recent Login History",
    name: "Name",
    classText: "Class",
    marksAverage: "Marks Average",
    predictedScore: "Predicted Score",
    status: "Status",
    lastLogin: "Last Login",
    roleText: "Role",
    time: "Time",
    device: "Device",
    since: "Since",
    location: "Location",
    success: "Success",
    failed: "Failed",
    active: "Active",
    enabled: "Enabled",
    review: "Review",
    onTrack: "On Track",
    watch: "Watch",
    adminAccounts: "Admin accounts",
    teacherAccounts: "Teacher accounts",
    parentAccounts: "Parent accounts",
    lockedAccounts: "Locked accounts"
  },
  hi: {
    login: "लॉगिन",
    accessPortal: "एक्सेस पोर्टल",
    loginHeroTitle: "हर भूमिका के लिए सुरक्षित शैक्षणिक निगरानी।",
    loginHeroText: "अभिभावक, शिक्षक या एडमिन AI डैशबोर्ड में जाने के लिए डेमो भूमिका चुनें।",
    role: "भूमिका",
    email: "ईमेल",
    password: "पासवर्ड",
    loginButton: "लॉगिन",
    demo: "डेमो",
    invalidLogin: "{role} की जानकारी गलत है। इस भूमिका के लिए दिखाया गया डेमो लॉगिन इस्तेमाल करें।",
    loggedOut: "लॉगआउट हो गया। जारी रखने के लिए भूमिका चुनें।",
    brandSubtitle: "AI शैक्षणिक विश्लेषण",
    marksProgression: "अंकों की प्रगति",
    performanceGrowth: "प्रदर्शन वृद्धि",
    attendance: "उपस्थिति",
    monthlyTrend: "मासिक रुझान",
    subjectHeatmap: "विषय हीटमैप",
    strengthAnalysis: "क्षमता विश्लेषण",
    aiInsights: "AI जानकारी",
    predictionPanel: "अनुमान पैनल",
    behavior: "व्यवहार",
    complaintsRemarks: "शिकायतें और टिप्पणियां",
    achievements: "उपलब्धियां",
    achievementsTitle: "प्रमाणपत्र, खेल और प्रतियोगिताएं",
    bulkUpload: "बल्क अपलोड",
    academicRecordEntry: "शैक्षणिक रिकॉर्ड एंट्री",
    riskAlerts: "जोखिम अलर्ट",
    studentsAttention: "ध्यान देने योग्य छात्र",
    classAnalytics: "कक्षा विश्लेषण",
    performanceSpread: "प्रदर्शन वितरण",
    predictionResult: "अनुमान परिणाम",
    systemAnalytics: "सिस्टम विश्लेषण",
    schoolReport: "स्कूल प्रदर्शन रिपोर्ट",
    totalStudents: "कुल छात्र",
    teachers: "शिक्षक",
    schoolAttendance: "स्कूल उपस्थिति",
    aiRiskAlerts: "AI जोखिम अलर्ट",
    subjectInput: "विषय",
    marksInput: "अंक",
    attendanceInput: "उपस्थिति %",
    excellentBehavior: "उत्कृष्ट व्यवहार",
    needsAttention: "ध्यान चाहिए",
    complaintRaised: "शिकायत दर्ज",
    queueUpdate: "अपडेट जोड़ें",
    low: "कम",
    medium: "मध्यम",
    high: "उच्च",
    excellent: "उत्कृष्ट",
    schoolAverage: "स्कूल औसत",
    classLabel: "कक्षा",
    noticeSubject: "{subject} के अंक पर अगली परीक्षा से पहले ध्यान चाहिए।",
    noticeAttendanceDown: "इस सत्र में उपस्थिति घट रही है।",
    noticeAttendanceStable: "इस सत्र में उपस्थिति स्थिर है।",
    noticeExam: "आगामी परीक्षा सूचना: सेमेस्टर मूल्यांकन अगले सप्ताह शुरू होगा।",
    noticePositive: "नई सकारात्मक शिक्षक टिप्पणी उपलब्ध है।",
    noticeComplaint: "हाल की शिकायत पर अभिभावक की स्वीकृति चाहिए।",
    predictedMarks: "अनुमानित अंक",
    weakSubject: "कमजोर विषय",
    riskScore: "जोखिम स्कोर",
    recommendation: "सुझाव",
    predictedMarksText: "{subject} की अगली परीक्षा का अनुमान {score}% है।",
    weakSubjectText: "{subject} में वृद्धि सबसे धीमी है और साप्ताहिक अभ्यास चाहिए।",
    riskScoreText: "उपस्थिति, अंक, व्यवहार और असाइनमेंट के आधार पर {risk} शैक्षणिक जोखिम।",
    recommendationText: "दो रिवीजन सत्र करें, अधूरे असाइनमेंट पूरे करें, और {subject} की पिछली तीन गलतियां देखें।",
    contact: "संपर्क",
    roll: "रोल नंबर",
    aiPrediction: "AI अनुमान",
    behaviorScore: "व्यवहार स्कोर",
    assignmentCompletion: "असाइनमेंट पूर्णता",
    participation: "भागीदारी",
    average: "औसत",
    inSubject: "{subject} में",
    quickWeakPrompt: "कौन सा विषय सुधार चाहता है?",
    quickPredictPrompt: "अगले गणित परीक्षा अंक का अनुमान लगाएं",
    quickComplaintsPrompt: "हाल की शिक्षक शिकायतें दिखाएं",
    studentTracking: "छात्र ट्रैकिंग",
    studentMonitoring: "छात्र प्रदर्शन निगरानी",
    activeLogins: "सक्रिय लॉगिन",
    liveSessions: "लाइव सेशन",
    userControls: "यूजर नियंत्रण",
    accountStatus: "खाता स्थिति",
    loginAudit: "लॉगिन ऑडिट",
    recentLoginHistory: "हाल का लॉगिन इतिहास",
    name: "नाम",
    classText: "कक्षा",
    marksAverage: "अंक औसत",
    predictedScore: "अनुमानित अंक",
    status: "स्थिति",
    lastLogin: "अंतिम लॉगिन",
    roleText: "भूमिका",
    time: "समय",
    device: "डिवाइस",
    since: "से",
    location: "स्थान",
    success: "सफल",
    failed: "असफल",
    active: "सक्रिय",
    enabled: "सक्षम",
    review: "समीक्षा",
    onTrack: "सही दिशा",
    watch: "निगरानी",
    adminAccounts: "एडमिन खाते",
    teacherAccounts: "शिक्षक खाते",
    parentAccounts: "अभिभावक खाते",
    lockedAccounts: "लॉक खाते"
  },
  te: {
    login: "లాగిన్",
    accessPortal: "యాక్సెస్ పోర్టల్",
    loginHeroTitle: "ప్రతి పాత్రకు సురక్షిత విద్యా పర్యవేక్షణ.",
    loginHeroText: "తల్లిదండ్రులు, ఉపాధ్యాయులు లేదా అడ్మిన్ AI డ్యాష్‌బోర్డ్‌కి వెళ్లడానికి డెమో పాత్రను ఎంచుకోండి.",
    role: "పాత్ర",
    email: "ఈమెయిల్",
    password: "పాస్‌వర్డ్",
    loginButton: "లాగిన్",
    demo: "డెమో",
    invalidLogin: "{role} వివరాలు సరైనవి కావు. ఈ పాత్రకు చూపిన డెమో లాగిన్ ఉపయోగించండి.",
    loggedOut: "లాగౌట్ అయ్యారు. కొనసాగడానికి పాత్రను ఎంచుకోండి.",
    brandSubtitle: "AI విద్యా విశ్లేషణలు",
    marksProgression: "మార్కుల పురోగతి",
    performanceGrowth: "పనితీరు వృద్ధి",
    attendance: "హాజరు",
    monthlyTrend: "నెలవారీ ధోరణి",
    subjectHeatmap: "విషయ హీట్‌మ్యాప్",
    strengthAnalysis: "బలం విశ్లేషణ",
    aiInsights: "AI సమాచారం",
    predictionPanel: "అంచనా ప్యానెల్",
    behavior: "ప్రవర్తన",
    complaintsRemarks: "ఫిర్యాదులు మరియు వ్యాఖ్యలు",
    achievements: "విజయాలు",
    achievementsTitle: "సర్టిఫికెట్లు, క్రీడలు మరియు పోటీలు",
    bulkUpload: "బల్క్ అప్‌లోడ్",
    academicRecordEntry: "విద్యా రికార్డు ఎంట్రీ",
    riskAlerts: "రిస్క్ అలర్ట్స్",
    studentsAttention: "గమనించాల్సిన విద్యార్థులు",
    classAnalytics: "తరగతి విశ్లేషణ",
    performanceSpread: "పనితీరు పంపిణీ",
    predictionResult: "అంచనా ఫలితం",
    systemAnalytics: "సిస్టమ్ విశ్లేషణ",
    schoolReport: "స్కూల్ పనితీరు నివేదిక",
    totalStudents: "మొత్తం విద్యార్థులు",
    teachers: "ఉపాధ్యాయులు",
    schoolAttendance: "స్కూల్ హాజరు",
    aiRiskAlerts: "AI రిస్క్ అలర్ట్స్",
    subjectInput: "విషయం",
    marksInput: "మార్కులు",
    attendanceInput: "హాజరు %",
    excellentBehavior: "అద్భుత ప్రవర్తన",
    needsAttention: "శ్రద్ధ అవసరం",
    complaintRaised: "ఫిర్యాదు నమోదు",
    queueUpdate: "అప్‌డేట్ జోడించు",
    low: "తక్కువ",
    medium: "మధ్యస్థం",
    high: "ఎక్కువ",
    excellent: "అద్భుతం",
    schoolAverage: "స్కూల్ సగటు",
    classLabel: "తరగతి",
    noticeSubject: "తదుపరి యూనిట్ టెస్ట్ ముందు {subject} మార్కులపై శ్రద్ధ అవసరం.",
    noticeAttendanceDown: "ఈ టర్మ్‌లో హాజరు తగ్గుతోంది.",
    noticeAttendanceStable: "ఈ టర్మ్‌లో హాజరు స్థిరంగా ఉంది.",
    noticeExam: "రాబోయే పరీక్ష గుర్తు: సెమిస్టర్ అసెస్‌మెంట్ వచ్చే వారం ప్రారంభమవుతుంది.",
    noticePositive: "కొత్త సానుకూల ఉపాధ్యాయ వ్యాఖ్య అందుబాటులో ఉంది.",
    noticeComplaint: "ఇటీవలి ఫిర్యాదుకు తల్లిదండ్రుల గుర్తింపు అవసరం.",
    predictedMarks: "అంచనా మార్కులు",
    weakSubject: "బలహీన విషయం",
    riskScore: "రిస్క్ స్కోర్",
    recommendation: "సూచన",
    predictedMarksText: "{subject} తదుపరి పరీక్ష అంచనా {score}%.",
    weakSubjectText: "{subject} లో వృద్ధి నెమ్మదిగా ఉంది, వారానికి ప్రాక్టీస్ అవసరం.",
    riskScoreText: "హాజరు, మార్కులు, ప్రవర్తన, అసైన్‌మెంట్ ఆధారంగా {risk} విద్యా రిస్క్.",
    recommendationText: "రెండు రివిజన్ సెషన్లు చేయండి, పెండింగ్ అసైన్‌మెంట్ పూర్తి చేయండి, {subject} లో గత మూడు తప్పులు చూడండి.",
    contact: "సంప్రదింపు",
    roll: "రోల్ నంబర్",
    aiPrediction: "AI అంచనా",
    behaviorScore: "ప్రవర్తన స్కోర్",
    assignmentCompletion: "అసైన్‌మెంట్ పూర్తి",
    participation: "పాల్గొనడం",
    average: "సగటు",
    inSubject: "{subject} లో",
    quickWeakPrompt: "ఏ విషయం మెరుగుపరచాలి?",
    quickPredictPrompt: "తదుపరి గణితం పరీక్ష స్కోర్ అంచనా వేయండి",
    quickComplaintsPrompt: "ఇటీవలి ఉపాధ్యాయ ఫిర్యాదులు చూపండి",
    studentTracking: "విద్యార్థి ట్రాకింగ్",
    studentMonitoring: "విద్యార్థి పనితీరు పర్యవేక్షణ",
    activeLogins: "సక్రియ లాగిన్లు",
    liveSessions: "లైవ్ సెషన్లు",
    userControls: "యూజర్ నియంత్రణలు",
    accountStatus: "ఖాతా స్థితి",
    loginAudit: "లాగిన్ ఆడిట్",
    recentLoginHistory: "ఇటీవలి లాగిన్ చరిత్ర",
    name: "పేరు",
    classText: "తరగతి",
    marksAverage: "మార్కుల సగటు",
    predictedScore: "అంచనా స్కోర్",
    status: "స్థితి",
    lastLogin: "చివరి లాగిన్",
    roleText: "పాత్ర",
    time: "సమయం",
    device: "డివైస్",
    since: "నుండి",
    location: "స్థానం",
    success: "విజయం",
    failed: "విఫలం",
    active: "సక్రియం",
    enabled: "ఎనేబుల్",
    review: "సమీక్ష",
    onTrack: "సరైన దారి",
    watch: "పర్యవేక్షణ",
    adminAccounts: "అడ్మిన్ ఖాతాలు",
    teacherAccounts: "ఉపాధ్యాయ ఖాతాలు",
    parentAccounts: "తల్లిదండ్రుల ఖాతాలు",
    lockedAccounts: "లాక్ అయిన ఖాతాలు"
  },
  ta: {
    login: "உள்நுழைவு",
    accessPortal: "அணுகல் போர்டல்",
    loginHeroTitle: "ஒவ்வொரு பங்கிற்கும் பாதுகாப்பான கல்வி கண்காணிப்பு.",
    loginHeroText: "பெற்றோர், ஆசிரியர் அல்லது நிர்வாகி AI டாஷ்போர்டுக்கு செல்ல டெமோ பங்கைத் தேர்ந்தெடுக்கவும்.",
    role: "பங்கு",
    email: "மின்னஞ்சல்",
    password: "கடவுச்சொல்",
    loginButton: "உள்நுழை",
    demo: "டெமோ",
    invalidLogin: "{role} விவரங்கள் தவறாக உள்ளன. இந்த பங்கிற்கான டெமோ உள்நுழைவைப் பயன்படுத்தவும்.",
    loggedOut: "வெளியேறிவிட்டீர்கள். தொடர ஒரு பங்கைத் தேர்ந்தெடுக்கவும்.",
    brandSubtitle: "AI கல்வி பகுப்பாய்வு",
    marksProgression: "மதிப்பெண் முன்னேற்றம்",
    performanceGrowth: "செயல்திறன் வளர்ச்சி",
    attendance: "வருகை",
    monthlyTrend: "மாதாந்திர போக்கு",
    subjectHeatmap: "பாட ஹீட்மேப்",
    strengthAnalysis: "வலிமை பகுப்பாய்வு",
    aiInsights: "AI தகவல்கள்",
    predictionPanel: "கணிப்பு பலகம்",
    behavior: "நடத்தை",
    complaintsRemarks: "புகார்கள் மற்றும் குறிப்புகள்",
    achievements: "சாதனைகள்",
    achievementsTitle: "சான்றிதழ்கள், விளையாட்டு மற்றும் போட்டிகள்",
    bulkUpload: "மொத்த பதிவேற்றம்",
    academicRecordEntry: "கல்வி பதிவு உள்ளீடு",
    riskAlerts: "ஆபத்து எச்சரிக்கைகள்",
    studentsAttention: "கவனம் தேவைப்படும் மாணவர்கள்",
    classAnalytics: "வகுப்பு பகுப்பாய்வு",
    performanceSpread: "செயல்திறன் பரவல்",
    predictionResult: "கணிப்பு முடிவு",
    systemAnalytics: "சிஸ்டம் பகுப்பாய்வு",
    schoolReport: "பள்ளி செயல்திறன் அறிக்கை",
    totalStudents: "மொத்த மாணவர்கள்",
    teachers: "ஆசிரியர்கள்",
    schoolAttendance: "பள்ளி வருகை",
    aiRiskAlerts: "AI ஆபத்து எச்சரிக்கைகள்",
    subjectInput: "பாடம்",
    marksInput: "மதிப்பெண்",
    attendanceInput: "வருகை %",
    excellentBehavior: "சிறந்த நடத்தை",
    needsAttention: "கவனம் தேவை",
    complaintRaised: "புகார் பதிவு",
    queueUpdate: "புதுப்பிப்பை சேர்",
    low: "குறைவு",
    medium: "நடுத்தரம்",
    high: "அதிகம்",
    excellent: "சிறந்தது",
    schoolAverage: "பள்ளி சராசரி",
    classLabel: "வகுப்பு",
    noticeSubject: "அடுத்த தேர்வுக்கு முன் {subject} மதிப்பெண்ணில் கவனம் தேவை.",
    noticeAttendanceDown: "இந்த பருவத்தில் வருகை குறைகிறது.",
    noticeAttendanceStable: "இந்த பருவத்தில் வருகை நிலையாக உள்ளது.",
    noticeExam: "வரவிருக்கும் தேர்வு நினைவூட்டல்: செமஸ்டர் மதிப்பீடு அடுத்த வாரம் தொடங்கும்.",
    noticePositive: "புதிய நேர்மறை ஆசிரியர் குறிப்பு உள்ளது.",
    noticeComplaint: "சமீபத்திய புகாருக்கு பெற்றோர் ஒப்புதல் தேவை.",
    predictedMarks: "கணிக்கப்பட்ட மதிப்பெண்",
    weakSubject: "பலவீன பாடம்",
    riskScore: "ஆபத்து மதிப்பெண்",
    recommendation: "பரிந்துரை",
    predictedMarksText: "{subject} அடுத்த தேர்வு கணிப்பு {score}%.",
    weakSubjectText: "{subject} வளர்ச்சி மெதுவாக உள்ளது, வாராந்திர பயிற்சி தேவை.",
    riskScoreText: "வருகை, மதிப்பெண், நடத்தை மற்றும் பணிகளின் அடிப்படையில் {risk} கல்வி ஆபத்து.",
    recommendationText: "இரண்டு மறுபயிற்சி அமர்வுகள் செய்யவும், நிலுவை பணிகளை முடிக்கவும், {subject} இல் கடைசி மூன்று தவறுகளைப் பார்க்கவும்.",
    contact: "தொடர்பு",
    roll: "ரோல் எண்",
    aiPrediction: "AI கணிப்பு",
    behaviorScore: "நடத்தை மதிப்பெண்",
    assignmentCompletion: "பணி நிறைவு",
    participation: "பங்கேற்பு",
    average: "சராசரி",
    inSubject: "{subject} இல்",
    quickWeakPrompt: "எந்த பாடம் மேம்பாடு தேவை?",
    quickPredictPrompt: "அடுத்த கணித தேர்வு மதிப்பெண் கணிக்கவும்",
    quickComplaintsPrompt: "சமீபத்திய ஆசிரியர் புகார்களை காட்டு",
    studentTracking: "மாணவர் கண்காணிப்பு",
    studentMonitoring: "மாணவர் செயல்திறன் கண்காணிப்பு",
    activeLogins: "செயலில் உள்ள உள்நுழைவுகள்",
    liveSessions: "நேரடி அமர்வுகள்",
    userControls: "பயனர் கட்டுப்பாடுகள்",
    accountStatus: "கணக்கு நிலை",
    loginAudit: "உள்நுழைவு ஆய்வு",
    recentLoginHistory: "சமீபத்திய உள்நுழைவு வரலாறு",
    name: "பெயர்",
    classText: "வகுப்பு",
    marksAverage: "மதிப்பெண் சராசரி",
    predictedScore: "கணிக்கப்பட்ட மதிப்பெண்",
    status: "நிலை",
    lastLogin: "கடைசி உள்நுழைவு",
    roleText: "பங்கு",
    time: "நேரம்",
    device: "சாதனம்",
    since: "முதல்",
    location: "இடம்",
    success: "வெற்றி",
    failed: "தோல்வி",
    active: "செயலில்",
    enabled: "இயக்கத்தில்",
    review: "மதிப்பாய்வு",
    onTrack: "சரியான பாதை",
    watch: "கவனிக்கவும்",
    adminAccounts: "நிர்வாக கணக்குகள்",
    teacherAccounts: "ஆசிரியர் கணக்குகள்",
    parentAccounts: "பெற்றோர் கணக்குகள்",
    lockedAccounts: "பூட்டப்பட்ட கணக்குகள்"
  }
};

Object.keys(extraCopy).forEach((language) => Object.assign(copy[language], extraCopy[language]));

const subjectNames = {
  en: { Mathematics: "Mathematics", Science: "Science", English: "English", Social: "Social", Computer: "Computer" },
  hi: { Mathematics: "गणित", Science: "विज्ञान", English: "अंग्रेजी", Social: "सामाजिक", Computer: "कंप्यूटर" },
  te: { Mathematics: "గణితం", Science: "సైన్స్", English: "ఇంగ్లీష్", Social: "సోషల్", Computer: "కంప్యూటర్" },
  ta: { Mathematics: "கணிதம்", Science: "அறிவியல்", English: "ஆங்கிலம்", Social: "சமூக அறிவியல்", Computer: "கணினி" }
};

const phraseNames = {
  hi: {
    "Late submission in Mathematics assignment": "गणित असाइनमेंट देर से जमा किया",
    "Talkative during lab instructions": "लैब निर्देशों के दौरान अधिक बातचीत",
    "Improved class participation noted": "कक्षा भागीदारी में सुधार देखा गया",
    "Consistent homework submission": "होमवर्क नियमित रूप से जमा किया",
    "Helped classmates during project work": "प्रोजेक्ट कार्य में सहपाठियों की मदद की",
    "Positive": "सकारात्मक",
    "Moderate": "मध्यम",
    "Medium": "मध्यम",
    "Low": "कम",
    "Science Expo": "विज्ञान प्रदर्शनी",
    "Sports Day": "खेल दिवस",
    "Coding Sprint": "कोडिंग स्प्रिंट",
    "Debate League": "वाद-विवाद लीग",
    "Math Olympiad": "गणित ओलंपियाड",
    "Art Fest": "कला उत्सव",
    "Second prize in robotics prototype": "रोबोटिक्स प्रोटोटाइप में दूसरा पुरस्कार",
    "100m relay team finalist": "100 मीटर रिले टीम फाइनलिस्ट",
    "Certificate of excellence": "उत्कृष्टता प्रमाणपत्र",
    "Best speaker award": "सर्वश्रेष्ठ वक्ता पुरस्कार",
    "School round winner": "स्कूल राउंड विजेता",
    "Digital poster certificate": "डिजिटल पोस्टर प्रमाणपत्र"
  },
  te: {
    "Late submission in Mathematics assignment": "గణితం అసైన్‌మెంట్ ఆలస్యంగా సమర్పించారు",
    "Talkative during lab instructions": "ల్యాబ్ సూచనల సమయంలో ఎక్కువగా మాట్లాడారు",
    "Improved class participation noted": "తరగతి పాల్గొనడంలో మెరుగుదల కనిపించింది",
    "Consistent homework submission": "హోంవర్క్‌ను క్రమంగా సమర్పించారు",
    "Helped classmates during project work": "ప్రాజెక్ట్ పనిలో సహపాఠులకు సహాయం చేశారు",
    "Positive": "సానుకూలం",
    "Moderate": "మధ్యస్థం",
    "Medium": "మధ్యస్థం",
    "Low": "తక్కువ",
    "Science Expo": "సైన్స్ ఎక్స్‌పో",
    "Sports Day": "క్రీడా దినోత్సవం",
    "Coding Sprint": "కోడింగ్ స్ప్రింట్",
    "Debate League": "డిబేట్ లీగ్",
    "Math Olympiad": "గణిత ఒలింపియాడ్",
    "Art Fest": "కళా ఉత్సవం",
    "Second prize in robotics prototype": "రోబోటిక్స్ ప్రోటోటైప్‌లో రెండవ బహుమతి",
    "100m relay team finalist": "100మీ రిలే టీమ్ ఫైనలిస్ట్",
    "Certificate of excellence": "ఉత్తమత సర్టిఫికేట్",
    "Best speaker award": "ఉత్తమ వక్త అవార్డు",
    "School round winner": "స్కూల్ రౌండ్ విజేత",
    "Digital poster certificate": "డిజిటల్ పోస్టర్ సర్టిఫికేట్"
  },
  ta: {
    "Late submission in Mathematics assignment": "கணிதப் பணியை தாமதமாக சமர்ப்பித்தார்",
    "Talkative during lab instructions": "லேப் வழிமுறைகளின் போது அதிகமாக பேசினார்",
    "Improved class participation noted": "வகுப்பு பங்கேற்பு மேம்பட்டது",
    "Consistent homework submission": "வீட்டுப்பாடத்தை தொடர்ந்து சமர்ப்பித்தார்",
    "Helped classmates during project work": "திட்டப் பணியில் நண்பர்களுக்கு உதவினார்",
    "Positive": "நேர்மறை",
    "Moderate": "நடுத்தரம்",
    "Medium": "நடுத்தரம்",
    "Low": "குறைவு",
    "Science Expo": "அறிவியல் கண்காட்சி",
    "Sports Day": "விளையாட்டு நாள்",
    "Coding Sprint": "கோடிங் ஸ்பிரிண்ட்",
    "Debate League": "விவாத லீக்",
    "Math Olympiad": "கணித ஒலிம்பியாட்",
    "Art Fest": "கலை விழா",
    "Second prize in robotics prototype": "ரோபாட்டிக்ஸ் மாதிரியில் இரண்டாம் பரிசு",
    "100m relay team finalist": "100மீ ரிலே அணி இறுதிப்போட்டி",
    "Certificate of excellence": "சிறப்புச் சான்றிதழ்",
    "Best speaker award": "சிறந்த பேச்சாளர் விருது",
    "School round winner": "பள்ளி சுற்று வெற்றியாளர்",
    "Digital poster certificate": "டிஜிட்டல் போஸ்டர் சான்றிதழ்"
  }
};

async function apiFetch(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (authToken) headers["X-Auth-Token"] = authToken;
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || `HTTP ${response.status}`);
  }
  if (response.status === 204) return null;
  return response.json();
}

function mapStudentFromApi(student) {
  return {
    id: student.id,
    name: student.name,
    roll: student.roll,
    className: student.className,
    section: student.section,
    parent: student.parent,
    contact: student.contact,
    attendance: student.attendance,
    subjects: student.subjects,
    grade: student.grade,
    rankPrediction: student.rankPrediction,
    improvement: student.improvement,
    risk: student.risk,
    weakSubject: student.weakSubject,
    passProbability: student.passProbability,
    behaviorScore: student.behaviorScore,
    assignmentCompletion: student.assignmentCompletion,
    participation: student.participation,
    achievements: student.achievements,
    complaints: student.complaints
  };
}

async function loadStudentsFromApi() {
  const data = await apiFetch("/students");
  if (data?.length) {
    students.length = 0;
    students.push(...data.map(mapStudentFromApi));
  }
}

async function loadAdminData() {
  if (!authToken) return;
  try {
    const stats = await apiFetch("/admin/stats");
    schoolStats = {
      totalStudents: stats.totalStudents,
      teachers: stats.teachers,
      attendancePercent: stats.attendancePercent,
      riskAlerts: stats.riskAlerts,
      present: stats.present,
      absent: stats.absent,
      pass: stats.pass,
      fail: stats.fail
    };
    const audits = await apiFetch("/admin/login-audits");
    loginAudits = audits.map((entry) => ({
      name: entry.userName,
      role: entry.role,
      time: entry.logTime,
      device: entry.device,
      status: entry.status
    }));
    const sessions = await apiFetch("/admin/sessions");
    activeSessions = sessions.map((session) => ({
      name: session.userName,
      role: session.role,
      since: session.since,
      location: session.location,
      status: session.status
    }));
  } catch {
    // keep local fallback data
  }
}

async function loadPredictions() {
  if (!authToken) return;
  try {
    apiPredictions = await apiFetch(`/predictions/${state.studentId}?subject=${encodeURIComponent(state.subject)}`);
  } catch {
    apiPredictions = {};
  }
}

function currentStudent() {
  return students.find((student) => student.id === state.studentId);
}

function predictedScore(student, subject = state.subject) {
  const marks = student.subjects[subject];
  const trend = marks[marks.length - 1] - marks[0];
  const attendanceInfluence = (average(student.attendance) - 85) * 0.18;
  const behaviorInfluence = (student.behaviorScore - 75) * 0.08;
  return Math.min(100, Math.round(marks.at(-1) + trend * 0.15 + attendanceInfluence + behaviorInfluence));
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function t(key, params = {}) {
  const value = key.split(".").reduce((entry, part) => entry?.[part], copy[state.language]) || key;
  return Object.entries(params).reduce((text, [name, replacement]) => {
    return text.replaceAll(`{${name}}`, replacement);
  }, value);
}

function subjectLabel(subject) {
  return subjectNames[state.language]?.[subject] || subject;
}

function phrase(value) {
  return phraseNames[state.language]?.[value] || value;
}

function dateLabel(value) {
  return value.replace(/Jan|Feb|Mar|Apr|May|Jun/g, (month) => monthNames[state.language]?.[month] || month);
}

function init() {
  document.body.classList.remove("authenticated");
  $("#loginForm").addEventListener("submit", handleLogin);
  $("#roleSelect").addEventListener("change", fillDemoCredentials);
  $("#logoutButton").addEventListener("click", logout);
  $("#loginLanguageSelect").addEventListener("change", (event) => {
    state.language = event.target.value;
    $("#languageSelect").value = state.language;
    document.documentElement.lang = state.language;
    render();
    fillDemoCredentials();
    resetChat(true);
  });
  $("#languageSelect").addEventListener("change", (event) => {
    state.language = event.target.value;
    $("#loginLanguageSelect").value = state.language;
    document.documentElement.lang = state.language;
    render();
    fillDemoCredentials();
    resetChat(true);
  });
  fillDemoCredentials();

  const select = $("#studentSelect");
  select.innerHTML = students.map((student) => `<option value="${student.id}">${student.name}</option>`).join("");
  select.addEventListener("change", async (event) => {
    state.studentId = event.target.value;
    state.subject = Object.keys(currentStudent().subjects)[0];
    await loadPredictions();
    render();
    resetChat();
  });

  $(".nav-stack").addEventListener("click", (event) => {
    if (!event.target.matches(".nav-item")) return;
    state.view = event.target.dataset.view;
    render();
    resetChat();
  });

  $("#subjectFilter").addEventListener("change", async (event) => {
    state.subject = event.target.value;
    await loadPredictions();
    renderCharts();
    renderPredictions();
  });

  $("#themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    renderCharts();
  });
  $("#notifyButton").addEventListener("click", () => $("#notificationTray").classList.toggle("hidden"));
  $("#chatForm").addEventListener("submit", handleChat);
  document.querySelectorAll(".quick-prompts button").forEach((button) => {
    button.addEventListener("click", () => addQuickPrompt(button.dataset.intent));
  });

  const teacherForm = document.querySelector(".teacher-form");
  if (teacherForm) {
    teacherForm.addEventListener("submit", handleTeacherUpdate);
    const queueBtn = teacherForm.querySelector("button");
    if (queueBtn) queueBtn.type = "submit";
  }

  render();
}

function fillDemoCredentials() {
  const role = $("#roleSelect").value;
  const user = demoUsers[role];
  $("#loginEmail").value = user.email;
  $("#loginPassword").value = user.password;
  $("#loginHint").textContent = `${t("demo")}: ${user.email} / ${user.password}`;
}

async function handleLogin(event) {
  event.preventDefault();
  const role = $("#roleSelect").value;
  const email = $("#loginEmail").value.trim();
  const password = $("#loginPassword").value;
  state.language = $("#loginLanguageSelect").value;

  try {
    const result = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, role, language: state.language })
    });
    authToken = result.token;
    state.role = result.role;
    state.view = result.view;
    await loadStudentsFromApi();
    if (result.studentId) state.studentId = result.studentId;
    else if (students.length) state.studentId = students[0].id;
    await loadAdminData();
    await loadPredictions();
    document.body.classList.add("authenticated");
    document.body.classList.toggle("admin-mode", role === "admin");
    render();
    resetChat(true);
    $("#loginHint").textContent = `${t("demo")}: connected to MySQL backend`;
    return;
  } catch {
    const user = demoUsers[role];
    if (email !== user.email || password !== user.password) {
      $("#loginHint").textContent = t("invalidLogin", { role: t(`roleNames.${role}`) });
      return;
    }
    authToken = null;
    state.role = role;
    state.view = user.view;
    document.body.classList.add("authenticated");
    document.body.classList.toggle("admin-mode", role === "admin");
    render();
    resetChat(true);
  }
}

async function logout() {
  if (authToken) {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {
      // ignore logout errors
    }
  }
  authToken = null;
  apiPredictions = {};
  state.role = null;
  state.view = "parent";
  document.body.classList.remove("authenticated");
  document.body.classList.remove("admin-mode");
  $("#notificationTray").classList.add("hidden");
  $("#loginHint").textContent = t("loggedOut");
  $("#chatMessages").innerHTML = "";
}

function render() {
  renderLanguage();
  renderStudent();
  renderViews();
  renderMetrics();
  renderCharts();
  renderHeatmap();
  renderPredictions();
  renderAchievements();
  renderBehavior();
  renderNotifications();
  renderTeacherAdmin();
  renderAdminControlRoom();
  renderProfile();
}

function renderLanguage() {
  document.querySelector(".login-visual .eyebrow").textContent = "Parent Edu Connect";
  document.querySelector(".login-visual h1").textContent = t("loginHeroTitle");
  document.querySelector(".login-visual p:last-child").textContent = t("loginHeroText");
  document.querySelector(".login-card .eyebrow").textContent = t("login");
  document.querySelector(".login-card h2").textContent = t("accessPortal");
  document.querySelector("label[for='roleSelect']").textContent = t("role");
  document.querySelector("label[for='loginLanguageSelect']").textContent = t("language");
  document.querySelector("label[for='loginEmail']").textContent = t("email");
  document.querySelector("label[for='loginPassword']").textContent = t("password");
  document.querySelector(".login-card button").textContent = t("loginButton");
  $("#roleSelect").options[0].textContent = t("roleNames.parent");
  $("#roleSelect").options[1].textContent = t("roleNames.teacher");
  $("#roleSelect").options[2].textContent = t("roleNames.admin");
  $(".brand small").textContent = t("brandSubtitle");
  $(".student-switcher label[for='studentSelect']").textContent = t("student");
  $(".language-switcher label").textContent = t("language");
  $("#themeToggle").textContent = t("theme");
  $("#logoutButton").textContent = t("logout");
  $(".topbar .eyebrow").textContent = t("smartWorkspace");
  $(".chat-header strong").textContent = t("botTitle");
  $(".chat-header small").textContent = t("botSubtitle");
  $("#chatInput").placeholder = t("botPlaceholder");
  $(".chat-form button").textContent = t("send");
  const quickButtons = document.querySelectorAll(".quick-prompts button");
  quickButtons[0].textContent = t("quickWeak");
  quickButtons[1].textContent = t("quickPredict");
  quickButtons[2].textContent = t("quickComplaints");
  document.querySelector(".nav-item[data-view='parent']").textContent = t("nav.parent");
  document.querySelector(".nav-item[data-view='teacher']").textContent = t("nav.teacher");
  document.querySelector(".nav-item[data-view='admin']").textContent = t("nav.admin");
  document.querySelector(".nav-item[data-view='profile']").textContent = t("nav.profile");
  setPanelText("#parentView .dashboard-grid > article:nth-child(1)", "marksProgression", "performanceGrowth");
  setPanelText("#parentView .dashboard-grid > article:nth-child(2)", "attendance", "monthlyTrend");
  setPanelText("#parentView .dashboard-grid > article:nth-child(3)", "subjectHeatmap", "strengthAnalysis");
  setPanelText("#parentView .dashboard-grid > article:nth-child(4)", "aiInsights", "predictionPanel");
  setPanelText("#parentView .dashboard-grid > article:nth-child(5)", "behavior", "complaintsRemarks");
  setPanelText("#parentView .dashboard-grid > article:nth-child(6)", "achievements", "achievementsTitle");
  setPanelText("#teacherView .section-grid > article:nth-child(1)", "bulkUpload", "academicRecordEntry");
  setPanelText("#teacherView .section-grid > article:nth-child(2)", "riskAlerts", "studentsAttention");
  setPanelText("#teacherView .section-grid > article:nth-child(3)", "classAnalytics", "performanceSpread");
  setPanelText("#teacherView .section-grid > article:nth-child(4)", "predictionResult", "passFail");
  setPanelText("#adminView .dashboard-grid > article:nth-child(1)", "systemAnalytics", "schoolReport");
  setPanelText("#adminView .dashboard-grid > article:nth-child(2)", "predictionResult", "passFail");
  setPanelText("#adminView .dashboard-grid > article:nth-child(3)", "attendance", "totalAttendance");
  setPanelText("#adminView .dashboard-grid > article:nth-child(4)", "studentTracking", "studentMonitoring");
  setPanelText("#adminView .dashboard-grid > article:nth-child(5)", "activeLogins", "liveSessions");
  setPanelText("#adminView .dashboard-grid > article:nth-child(6)", "userControls", "accountStatus");
  setPanelText("#adminView .dashboard-grid > article:nth-child(7)", "loginAudit", "recentLoginHistory");
  const teacherInputs = document.querySelectorAll(".teacher-form input");
  teacherInputs[0].placeholder = t("subjectInput");
  teacherInputs[1].placeholder = t("marksInput");
  teacherInputs[2].placeholder = t("attendanceInput");
  const behaviorSelect = document.querySelector(".teacher-form select");
  behaviorSelect.options[0].textContent = t("excellentBehavior");
  behaviorSelect.options[1].textContent = t("needsAttention");
  behaviorSelect.options[2].textContent = t("complaintRaised");
  document.querySelector(".teacher-form button").textContent = t("queueUpdate");
}

function setPanelText(selector, eyebrowKey, titleKey) {
  const panel = document.querySelector(selector);
  if (!panel) return;
  const eyebrow = panel.querySelector(".eyebrow");
  const heading = panel.querySelector("h3");
  if (eyebrow) eyebrow.textContent = t(eyebrowKey);
  if (heading) heading.textContent = t(titleKey);
}

function renderViews() {
  if (!canAccessView(state.view)) {
    state.view = demoUsers[state.role || "parent"].view;
  }
  document.querySelectorAll(".nav-item").forEach((item) => {
    const view = item.dataset.view;
    const allowed = canAccessView(view);
    item.hidden = !allowed;
    item.classList.toggle("active", view === state.view);
  });
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active-view"));
  $(`#${state.view}View`).classList.add("active-view");
  $("#pageTitle").textContent = document.querySelector(`.nav-item[data-view="${state.view}"]`).textContent;
}

function canAccessView(view) {
  if (!state.role) return view === "parent";
  if (state.role === "admin") return ["admin", "profile"].includes(view);
  if (state.role === "teacher") return ["teacher", "profile"].includes(view);
  return ["parent", "profile"].includes(view);
}

function renderStudent() {
  const student = currentStudent();
  const subjects = Object.keys(student.subjects);
  $("#subjectFilter").innerHTML = subjects.map((subject) => `<option value="${subject}">${subjectLabel(subject)}</option>`).join("");
  $("#subjectFilter").value = state.subject;
  document.querySelector("#parentView .hero-panel .eyebrow").textContent = t("aiSummary");
  $("#studentHeadline").textContent = t("headline", { name: student.name, subject: subjectLabel(student.weakSubject) });
  $("#studentSummary").textContent = t("summary", {
    attendance: Math.round(average(student.attendance)),
    assignments: student.assignmentCompletion,
    pass: student.passProbability
  });
  $("#nextScore").textContent = apiPredictions.predictedScore ?? predictedScore(student);
  document.querySelector(".hero-metric small").textContent = t("predictedNext");
  $("#riskBadge").textContent = `${t("risk")}: ${phrase(student.risk)}`;
}

function renderMetrics() {
  const student = currentStudent();
  const cards = [
    [`${Math.round(average(Object.values(student.subjects).map((marks) => marks.at(-1))))}%`, t("currentAverage")],
    [student.grade, t("schoolGrade")],
    [`#${student.rankPrediction}`, t("rank")],
    [`+${student.improvement}%`, t("improvement")]
  ];
  $("#metricGrid").innerHTML = cards.map(([value, label]) => `<article class="metric-card"><span>${value}</span><small>${label}</small></article>`).join("");
}

function renderCharts() {
  const student = currentStudent();
  const translatedMonths = months.map((month) => monthNames[state.language]?.[month] || month);
  drawLineChart($("#marksChart"), translatedMonths, student.subjects[state.subject], varColor("--accent-3"), `${subjectLabel(state.subject)} ${t("marksInput")}`);
  drawLineChart($("#attendanceChart"), translatedMonths, student.attendance, varColor("--accent"), t("attendance"));
  drawBarChart($("#classChart"), [t("low"), t("medium"), t("high"), t("excellent")], [8, 16, 21, 12], varColor("--accent"));
  drawLineChart($("#schoolChart"), ["6", "7", "8", "9", "10"].map((level) => `${t("classLabel")} ${level}`), [76, 81, 79, 84, 87], varColor("--accent-2"), t("schoolAverage"));
  drawPieChart($("#passFailChart"), [t("pass"), t("fail")], [schoolStats.pass, schoolStats.fail], [varColor("--accent"), varColor("--accent-2")]);
  drawPieChart($("#teacherPassFailChart"), [t("pass"), t("fail")], [46, 8], [varColor("--accent"), varColor("--accent-2")]);
  drawBarChart($("#totalAttendanceChart"), [t("present"), t("absent")], [schoolStats.present, schoolStats.absent], varColor("--accent-3"));
}

function renderHeatmap() {
  const student = currentStudent();
  $("#heatmap").innerHTML = Object.entries(student.subjects).map(([subject, marks]) => {
    const score = marks.at(-1);
    const color = score >= 90 ? "var(--accent)" : score >= 80 ? "var(--accent-3)" : score >= 70 ? "var(--warn)" : "var(--accent-2)";
    return `<div class="heat-cell" style="background:${color}">${subjectLabel(subject)}<br>${score}%</div>`;
  }).join("");
}

function renderPredictions() {
  const student = currentStudent();
  const insights = [
    [t("predictedMarks"), t("predictedMarksText", { subject: subjectLabel(state.subject), score: predictedScore(student) })],
    [t("weakSubject"), t("weakSubjectText", { subject: subjectLabel(student.weakSubject) })],
    [t("riskScore"), t("riskScoreText", { risk: phrase(student.risk) })],
    [t("recommendation"), t("recommendationText", { subject: subjectLabel(student.weakSubject) })]
  ];
  $("#predictionList").innerHTML = insights.map(([title, text]) => `<div class="insight"><strong>${title}</strong><span>${text}</span></div>`).join("");
}

function renderAchievements() {
  $("#achievementGrid").innerHTML = currentStudent().achievements
    .map(([title, text]) => `<div class="achievement"><strong>${phrase(title)}</strong><span>${phrase(text)}</span></div>`)
    .join("");
}

function renderBehavior() {
  $("#behaviorTimeline").innerHTML = currentStudent().complaints
    .map(([date, text, severity]) => `<div class="timeline-item"><strong>${dateLabel(date)} - ${phrase(severity)}</strong><span>${phrase(text)}</span></div>`)
    .join("");
}

function renderNotifications() {
  const student = currentStudent();
  const notices = [
    t("noticeSubject", { subject: subjectLabel(student.weakSubject) }),
    t(student.attendance.at(-1) < student.attendance[0] ? "noticeAttendanceDown" : "noticeAttendanceStable"),
    t("noticeExam"),
    student.complaints[0][2] === "Positive" ? t("noticePositive") : t("noticeComplaint")
  ];
  $("#notificationTray").innerHTML = notices.map((notice) => `<div class="notice">${notice}</div>`).join("");
}

function renderTeacherAdmin() {
  const alerts = students.map((student) => {
    return [student.name, `${phrase(student.risk)} ${t("risk")} - ${t("weakSubject")}: ${subjectLabel(student.weakSubject)} - ${t("attendance")}: ${Math.round(average(student.attendance))}%`];
  });
  $("#teacherAlerts").innerHTML = alerts.map(([title, text]) => `<div class="insight"><strong>${title}</strong><span>${text}</span></div>`).join("");
  const adminCards = [
    [schoolStats.totalStudents.toLocaleString("en-IN"), t("totalStudents")],
    [schoolStats.teachers, t("teachers")],
    [`${schoolStats.attendancePercent}%`, t("schoolAttendance")],
    [schoolStats.riskAlerts, t("aiRiskAlerts")]
  ];
  $(".admin-metrics").innerHTML = adminCards
    .map(([value, label]) => `<article class="metric-card"><span>${value}</span><small>${label}</small></article>`)
    .join("");
}

function renderAdminControlRoom() {
  const studentRows = students.map((student) => {
    const averageMarks = Math.round(average(Object.values(student.subjects).map((marks) => marks.at(-1))));
    const statusClass = student.risk === "Low" ? "" : "warning";
    const statusText = student.risk === "Low" ? t("onTrack") : t("watch");
    return `
      <tr>
        <td>${student.name}</td>
        <td>${student.className}-${student.section}</td>
        <td>${averageMarks}%</td>
        <td>${predictedScore(student, student.weakSubject)}%</td>
        <td>${subjectLabel(student.weakSubject)}</td>
        <td><span class="status-pill ${statusClass}">${statusText}</span></td>
      </tr>
    `;
  }).join("");

  $("#adminStudentTracker").innerHTML = `
    <table>
      <thead>
        <tr>
          <th>${t("name")}</th>
          <th>${t("classText")}</th>
          <th>${t("marksAverage")}</th>
          <th>${t("predictedScore")}</th>
          <th>${t("weakSubject")}</th>
          <th>${t("status")}</th>
        </tr>
      </thead>
      <tbody>${studentRows}</tbody>
    </table>
  `;

  $("#activeSessions").innerHTML = activeSessions.map((session) => `
    <div class="session-card">
      <strong>${session.name}<span class="status-pill">${t("active")}</span></strong>
      <span>${t("roleText")}: ${t(`roleNames.${session.role}`)}</span>
      <span>${t("since")}: ${session.since}</span>
      <span>${t("location")}: ${session.location}</span>
    </div>
  `).join("");

  $("#accountStatus").innerHTML = accountStats.map((item) => {
    const labelMap = {
      "Admin accounts": t("adminAccounts"),
      "Teacher accounts": t("teacherAccounts"),
      "Parent accounts": t("parentAccounts"),
      "Locked accounts": t("lockedAccounts")
    };
    const statusKey = item.status === "Review" ? "review" : "enabled";
    const statusClass = item.status === "Review" ? "warning" : "";
    return `
      <div class="session-card">
        <strong>${labelMap[item.label]}<span>${item.value}</span></strong>
        <span class="status-pill ${statusClass}">${t(statusKey)}</span>
      </div>
    `;
  }).join("");

  const auditRows = loginAudits.map((entry) => {
    const statusClass = entry.status === "Failed" ? "danger" : "";
    const statusText = entry.status === "Failed" ? t("failed") : t("success");
    return `
      <tr>
        <td>${entry.name}</td>
        <td>${t(`roleNames.${entry.role}`)}</td>
        <td>${entry.time}</td>
        <td>${entry.device}</td>
        <td><span class="status-pill ${statusClass}">${statusText}</span></td>
      </tr>
    `;
  }).join("");

  $("#loginAuditTable").innerHTML = `
    <table>
      <thead>
        <tr>
          <th>${t("name")}</th>
          <th>${t("roleText")}</th>
          <th>${t("time")}</th>
          <th>${t("device")}</th>
          <th>${t("status")}</th>
        </tr>
      </thead>
      <tbody>${auditRows}</tbody>
    </table>
  `;
}

function renderProfile() {
  const student = currentStudent();
  $("#profileAvatar").textContent = student.name.split(" ").map((part) => part[0]).join("");
  $("#profileName").textContent = student.name;
  document.querySelector("#profileView .eyebrow").textContent = t("nav.profile");
  $("#profileMeta").textContent = `${t("roll")} ${student.roll} - ${t("classLabel")} ${student.className}-${student.section} - ${t("roleNames.parent")}: ${student.parent}`;
  const rows = [
    [t("contact"), student.contact],
    [t("attendance"), `${Math.round(average(student.attendance))}% ${t("average")}`],
    [t("aiPrediction"), `${predictedScore(student)}% ${t("inSubject", { subject: subjectLabel(state.subject) })}`],
    [t("behaviorScore"), `${student.behaviorScore}/100`],
    [t("assignmentCompletion"), `${student.assignmentCompletion}%`],
    [t("participation"), `${student.participation}%`]
  ];
  $("#profileDetails").innerHTML = rows.map(([label, value]) => `<div class="profile-row"><strong>${label}</strong><p>${value}</p></div>`).join("");
}

function handleChat(event) {
  event.preventDefault();
  const input = $("#chatInput");
  addChat(input.value, true);
  input.value = "";
}

function resetChat(force = false) {
  if (state.role === "admin") {
    $("#chatMessages").innerHTML = "";
    return;
  }
  const student = currentStudent();
  const role = state.role ? t(`roleNames.${state.role}`) : t("roleNames.parent");
  const context = `${role} - ${student.name} - ${document.querySelector(`.nav-item[data-view="${state.view}"]`)?.textContent || ""}`;
  if (!force && state.lastChatContext === context && $("#chatMessages").children.length) return;
  state.lastChatContext = context;
  $("#chatMessages").innerHTML = "";
  addBotMessage(t("freshChat", { context }));
}

function addChat(text, fromUser = false) {
  if (!text.trim()) return;
  if (fromUser) addUserMessage(text);
  if (authToken) {
    apiFetch("/chat", {
      method: "POST",
      body: JSON.stringify({
        studentId: state.studentId,
        subject: state.subject,
        question: text,
        language: state.language
      })
    })
      .then((result) => addBotMessage(result.answer))
      .catch(() => setTimeout(() => addBotMessage(answerQuestion(text)), 180));
  } else {
    setTimeout(() => addBotMessage(answerQuestion(text)), 180);
  }
}

function addQuickPrompt(intent) {
  const promptByIntent = {
    weak: t("quickWeakPrompt"),
    predict: t("quickPredictPrompt"),
    complaints: t("quickComplaintsPrompt")
  };
  addChat(promptByIntent[intent], true);
}

async function handleTeacherUpdate(event) {
  event.preventDefault();
  const inputs = document.querySelectorAll(".teacher-form input");
  const subject = inputs[0].value.trim();
  const marks = parseInt(inputs[1].value, 10);
  const attendancePct = parseInt(inputs[2].value, 10);
  const behaviorSelect = document.querySelector(".teacher-form select");
  const behaviorNote = behaviorSelect?.value;

  if (!authToken) {
    addBotMessage("Login required to save records to MySQL.");
    return;
  }

  try {
    const result = await apiFetch("/records", {
      method: "POST",
      body: JSON.stringify({
        studentId: state.studentId,
        subject: subject || state.subject,
        marks: Number.isFinite(marks) ? marks : null,
        attendance: Number.isFinite(attendancePct) ? attendancePct : null,
        behaviorNote: behaviorNote && behaviorNote !== "Excellent behavior" ? behaviorNote : null
      })
    });
    if (result?.student) {
      const index = students.findIndex((s) => s.id === result.student.id);
      const mapped = mapStudentFromApi(result.student);
      if (index >= 0) students[index] = mapped;
      else students.push(mapped);
    }
    await loadPredictions();
    render();
    addBotMessage("Academic record saved to MySQL database.");
  } catch {
    addBotMessage("Could not save record. Ensure Java backend and MySQL are running.");
  }
}

function addUserMessage(text) {
  $("#chatMessages").insertAdjacentHTML("beforeend", `<div class="message user">${escapeHtml(text)}</div>`);
  scrollChat();
}

function addBotMessage(text) {
  $("#chatMessages").insertAdjacentHTML("beforeend", `<div class="message">${escapeHtml(text)}</div>`);
  scrollChat();
}

function answerQuestion(question) {
  const student = currentStudent();
  const q = question.toLowerCase();
  if (q === "attendance" || q.includes("attendance") || q.includes("उपस्थिति") || q.includes("హాజరు") || q.includes("வருகை")) {
    const delta = student.attendance.at(-1) - student.attendance[0];
    return delta < 0
      ? t("answerAttendanceDown", { delta: Math.abs(delta) })
      : t("answerAttendanceStable", { attendance: Math.round(average(student.attendance)) });
  }
  if (q === "weak" || q.includes("weak") || q.includes("improvement") || q.includes("कमजोर") || q.includes("सुधार") || q.includes("బలహీన") || q.includes("మెరుగ") || q.includes("பலவீன") || q.includes("மேம்பாடு")) {
    return t("answerWeak", { subject: subjectLabel(student.weakSubject) });
  }
  if (q === "predict" || q.includes("predict") || q.includes("score") || q.includes("marks") || q.includes("अनुमान") || q.includes("अंक") || q.includes("అంచనా") || q.includes("మార్క") || q.includes("கணிப்பு") || q.includes("மதிப்பெண்")) {
    return t("answerPredict", { subject: subjectLabel(state.subject), score: predictedScore(student) });
  }
  if (q === "complaints" || q.includes("complaint") || q.includes("remark") || q.includes("शिकायत") || q.includes("टिप्पणी") || q.includes("ఫిర్యాదు") || q.includes("గమనిక") || q.includes("புகார்") || q.includes("குறிப்பு")) {
    const latest = student.complaints[0];
    return t("answerComplaint", { date: dateLabel(latest[0]), note: phrase(latest[1]), severity: phrase(latest[2]) });
  }
  return t("answerDefault", {
    name: student.name,
    pass: student.passProbability,
    attendance: Math.round(average(student.attendance)),
    grade: student.grade,
    subject: subjectLabel(student.weakSubject)
  });
}

function drawLineChart(canvas, labels, values, color, label) {
  const ctx = setupCanvas(canvas);
  const { width, height } = canvas;
  const pad = 34;
  const min = Math.min(...values) - 5;
  const max = Math.max(...values) + 5;
  ctx.clearRect(0, 0, width, height);
  drawGrid(ctx, width, height, pad);
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.beginPath();
  values.forEach((value, index) => {
    const x = pad + (index / (values.length - 1)) * (width - pad * 2);
    const y = height - pad - ((value - min) / (max - min)) * (height - pad * 2);
    index ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  });
  ctx.stroke();
  values.forEach((value, index) => {
    const x = pad + (index / (values.length - 1)) * (width - pad * 2);
    const y = height - pad - ((value - min) / (max - min)) * (height - pad * 2);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = varColor("--muted");
    ctx.fillText(labels[index], x - 12, height - 9);
  });
  ctx.fillStyle = varColor("--muted");
  ctx.fillText(label, pad, 18);
}

function drawBarChart(canvas, labels, values, color) {
  const ctx = setupCanvas(canvas);
  const { width, height } = canvas;
  const pad = 34;
  const max = Math.max(...values) + 4;
  const barWidth = (width - pad * 2) / values.length - 16;
  ctx.clearRect(0, 0, width, height);
  drawGrid(ctx, width, height, pad);
  values.forEach((value, index) => {
    const x = pad + index * (barWidth + 16) + 8;
    const barHeight = (value / max) * (height - pad * 2);
    ctx.fillStyle = color;
    ctx.fillRect(x, height - pad - barHeight, barWidth, barHeight);
    ctx.fillStyle = varColor("--muted");
    ctx.fillText(labels[index], x, height - 9);
  });
}

function drawPieChart(canvas, labels, values, colors) {
  const ctx = setupCanvas(canvas);
  const { width, height } = canvas;
  const total = values.reduce((sum, value) => sum + value, 0);
  const radius = Math.min(width, height) * 0.28;
  const centerX = width * 0.36;
  const centerY = height * 0.52;
  let start = -Math.PI / 2;
  ctx.clearRect(0, 0, width, height);

  values.forEach((value, index) => {
    const angle = (value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, start, start + angle);
    ctx.closePath();
    ctx.fillStyle = colors[index];
    ctx.fill();
    start += angle;
  });

  ctx.font = "13px system-ui";
  labels.forEach((label, index) => {
    const y = 52 + index * 34;
    const percent = Math.round((values[index] / total) * 100);
    ctx.fillStyle = colors[index];
    ctx.fillRect(width * 0.66, y - 12, 14, 14);
    ctx.fillStyle = varColor("--text");
    ctx.fillText(`${label}: ${values[index]} (${percent}%)`, width * 0.66 + 22, y);
  });
}

function drawGrid(ctx, width, height, pad) {
  ctx.strokeStyle = varColor("--line");
  ctx.lineWidth = 1;
  ctx.font = "12px system-ui";
  for (let i = 0; i < 4; i += 1) {
    const y = pad + i * ((height - pad * 2) / 3);
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(width - pad, y);
    ctx.stroke();
  }
}

function setupCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(280, Math.floor(rect.width));
  canvas.height = Number(canvas.getAttribute("height"));
  return canvas.getContext("2d");
}

function varColor(name) {
  return getComputedStyle(document.body).getPropertyValue(name).trim();
}

function scrollChat() {
  const messages = $("#chatMessages");
  messages.scrollTop = messages.scrollHeight;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

window.addEventListener("resize", renderCharts);
  document.addEventListener("DOMContentLoaded", init);
