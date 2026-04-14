import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    home: "Home", reports: "Market Reports", marketplace: "Marketplace", dashboard: "Dashboard",
    welcome: "Welcome", terminalAccess: "Terminal Access", intelligenceDashboard: "Market Intelligence Dashboard",
    liveData: "Live Data Sync", logout: "Logout", login: "Login", signUp: "Sign Up", profile: "My Profile",
    searchPlaceholder: "Search commodities, reports...", cmdK: "Press Cmd + K to search",
    heroBadge: "India's #1 Agri-Commodity Intelligence Platform",
    heroTitle1: "Leaders in India's", heroTitle2: "Fertilizer & Agri", heroTitle3: "Market Intelligence",
    heroDesc: "KRISHICOM is India's premier commodity intelligence platform delivering real-time price benchmarks, regional market reports, and data dashboards.",
    exploreMkt: "Explore Marketplace", mktReportsArr: "Market Reports →",
    statesCov: "States Covered", commsTracked: "Commodities Tracked", clients: "Clients",
    kipexLive: "KIPEX Index — Live", urea: "Urea (MRP India)", dap: "DAP (Standard)", mop: "MOP (White)",
    perBag: "/bag", capped: "Capped", syncing: "Syncing with 42 Mandi data points... Intelligence active.",
    mktFeatures: "Market Features", bringing: "Bringing", transIntel: "Transparency & Intelligence",
    missionTxt: "KRISHICOM provides end-to-end B2B solutions for India's complex fertilizer ecosystem through high-precision data benchmarks.",
    indiaFirst: "India-First Intelligence", sevenYrs: "7+ Years Historical Data", policyIntel: "Policy Intelligence Unit",
    createAcct: "Create Account", welcomeBack: "Welcome Back",
    joinIndia: "Join India's leading B2B platform.", signInAccess: "Sign in to access your intelligence dashboard.",
    identityRole: "Identity Role", IamBuyer: "I am a Buyer", IamSeller: "I am a Seller",
    fullName: "Full Name", company: "Company", emailAddress: "Email Address", password: "Password",
    logInBtn: "Log In", signUpAs: "Sign Up as", alreadyHave: "Already have an account? ", newTo: "New to KRISHICOM? ",
    logInHere: "Log In here", createAnAcct: "Create an Account",
    userConf: "User Configuration", my: "My", prof: "Profile", settings: "Settings",
    manageAuth: "Manage your authorized credentials mapping to KRISHICOM Intelligence.",
    secRef: "Security Role Matrix", auth: "Authentication", workspaceComp: "Workspace / Company",
    emailAtlas: "Email Address (Atlas ID)", masterPass: "Master Password",
    leaveBlank: "(Leave blank to keep unchanged)", execOver: "Executing Override...",
    updateRecs: "Update Records Object", appSettings: "App Settings", soundHaptics: "Sound Haptics",
    playSubtle: "Play subtle click sounds", needHelp: "Need Help?", contactOur: "Contact our Intelligence Unit for support or API access.",
    contactSupport: "Contact Support",
    dashDesc: "Global parity trends and domestic price benchmarks for Q2 2026.",
    ureaCfr: "Urea CFR India", quarterly: "Quarterly", dapStd: "DAP Standard", monthly: "Monthly",
    mopWhite: "MOP White", mktStability: "Market Stability", importParity: "Import Parity Benchmark (H1 2026)",
    syncMat: "Synchronizing intelligence matrices...",
    mktIntelligence: "Market Intelligence", krishicomReports: "KRISHICOM Reports",
    expertDriven: "Expert-driven insights into India's fertilizer and agri-chemical industry architecture.",
    decrypting: "Decrypting intelligence reports...", syncFailure: "Intelligence Sync Failure:",
    premiumTier: "Premium Tier", fullAnalytic: "Full analytical depth requires an authorized KRISHICOM account.",
    authorizeAccess: "Authorize Access", downloadPdf: "Download Intelligence PDF"
  },
  hi: {
    home: "होम", reports: "मार्केट रिपोर्ट्स", marketplace: "मार्केटप्लेस", dashboard: "डैशबोर्ड",
    welcome: "स्वागत है", terminalAccess: "टर्मिनल एक्सेस", intelligenceDashboard: "मार्केट इंटेलिजेंस डैशबोर्ड",
    liveData: "लाइव डेटा सिंक", logout: "लॉगआउट", login: "लॉगिन", signUp: "साइन अप", profile: "मेरी प्रोफाइल",
    searchPlaceholder: "वस्तुएं, रिपोर्ट खोजें...", cmdK: "खोजने के लिए Cmd + K दबाएं",
    heroBadge: "भारत का नंबर 1 कृषि-कमोडिटी इंटेलिजेंस प्लेटफॉर्म",
    heroTitle1: "भारत के अग्रणी", heroTitle2: "उर्वरक एवं कृषि", heroTitle3: "मार्केट इंटेलिजेंस",
    heroDesc: "कृषीकॉम भारत का प्रमुख कमोडिटी इंटेलिजेंस प्लेटफॉर्म है जो रीयल-टाइम मूल्य बेंचमार्क, क्षेत्रीय बाजार रिपोर्ट और डेटा डैशबोर्ड प्रदान करता है।",
    exploreMkt: "मार्केटप्लेस देखें", mktReportsArr: "मार्केट रिपोर्ट्स →",
    statesCov: "कवर किए गए राज्य", commsTracked: "ट्रैक की गई वस्तुएं", clients: "ग्राहक",
    kipexLive: "KIPEX इंडेक्स — लाइव", urea: "यूरिया (एमआरपी भारत)", dap: "डीएपी (स्टैंडर्ड)", mop: "एमओपी (सफ़ेद)",
    perBag: "/बैग", capped: "सीमित", syncing: "42 मंडी डेटा पॉइंट्स के साथ सिंक हो रहा है... इंटेलिजेंस सक्रिय।",
    mktFeatures: "बाजार की विशेषताएं", bringing: "ला रहे हैं", transIntel: "पारदर्शिता और बुद्धिमत्ता",
    missionTxt: "कृषीकॉम उच्च-सटीक डेटा बेंचमार्क के माध्यम से भारत के जटिल उर्वरक पारिस्थितिकी तंत्र के लिए एंड-टू-एंड बी2बी समाधान प्रदान करता है।",
    indiaFirst: "भारत-प्रथम बुद्धिमत्ता", sevenYrs: "7+ वर्षों का ऐतिहासिक डेटा", policyIntel: "नीति इंटेलिजेंस यूनिट",
    createAcct: "खाता बनाएं", welcomeBack: "वापसी पर स्वागत है",
    joinIndia: "भारत के अग्रणी B2B प्लेटफॉर्म से जुड़ें।", signInAccess: "अपने इंटेलिजेंस डैशबोर्ड तक पहुंचने के लिए साइन इन करें।",
    identityRole: "पहचान भूमिका", IamBuyer: "मैं एक खरीदार हूं", IamSeller: "मैं एक विक्रेता हूं",
    fullName: "पूरा नाम", company: "कंपनी", emailAddress: "ईमेल पता", password: "पासवर्ड",
    logInBtn: "लॉग इन करें", signUpAs: "साइन अप करें: ", alreadyHave: "क्या आपके पास पहले से एक खाता है? ", newTo: "कृषीकॉम पर नए हैं? ",
    logInHere: "यहाँ लॉग इन करें", createAnAcct: "एक खाता बनाएं",
    userConf: "उपयोगकर्ता कॉन्फ़िगरेशन", my: "मेरी", prof: "प्रोफ़ाइल", settings: "सेटिंग्स",
    manageAuth: "कृषीकॉम इंटेलिजेंस में अपनी अधिकृत साख प्रबंधित करें।",
    secRef: "सुरक्षा भूमिका मैट्रिक्स", auth: "प्रमाणीकरण", workspaceComp: "कार्यक्षेत्र / कंपनी",
    emailAtlas: "ईमेल पता (एटलस आईडी)", masterPass: "मास्टर पासवर्ड",
    leaveBlank: "(अपरिवर्तित रखने के लिए खाली छोड़ दें)", execOver: "अद्यतन किया जा रहा है...",
    updateRecs: "रिकॉर्ड्स अद्यतन करें", appSettings: "ऐप सेटिंग्स", soundHaptics: "साउंड हैप्टिक्स",
    playSubtle: "क्लिक ध्वनियाँ चलाएं", needHelp: "मदद चाहिए?", contactOur: "समर्थन या API पहुंच के लिए हमारी इंटेलिजेंस यूनिट से संपर्क करें।",
    contactSupport: "समर्थन से संपर्क करें",
    dashDesc: "Q2 2026 के लिए वैश्विक समानता प्रवृत्तियां और घरेलू मूल्य बेंचमार्क।",
    ureaCfr: "यूरिया सीएफआर भारत", quarterly: "त्रैमासिक", dapStd: "डीएपी मानक", monthly: "मासिक",
    mopWhite: "एमओपी सफेद", mktStability: "बाजार स्थिरता", importParity: "आयात समानता बेंचमार्क (H1 2026)",
    syncMat: "इंटेलिजेंस मैट्रिक्स का सिंक्रनाइज़ेशन...",
    mktIntelligence: "मार्केट इंटेलिजेंस", krishicomReports: "कृषीकॉम रिपोर्ट्स",
    expertDriven: "भारत के उर्वरक और कृषि-रसायन उद्योग वास्तुकला में विशेषज्ञ-संचालित अंतर्दृष्टि।",
    decrypting: "इंटेलिजेंस रिपोर्ट डिक्रिप्ट हो रही है...", syncFailure: "इंटेलिजेंस सिंक विफलता:",
    premiumTier: "प्रीमियम टियर", fullAnalytic: "पूर्ण विश्लेषणात्मक गहराई के लिए अधिकृत कृषीकॉम खाते की आवश्यकता होती है।",
    authorizeAccess: "एक्सेस अधिकृत करें", downloadPdf: "इंटेलिजेंस पीडीएफ डाउनलोड करें"
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('klang') || 'en');

  useEffect(() => {
    localStorage.setItem('klang', lang);
  }, [lang]);

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
