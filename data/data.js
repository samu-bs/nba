/* ============================================================
   NBA Bar Mitzvah Trip — data layer
   עודכן: 26 באוקטובר 2026 — נסגרו: כרטיסי 21.12 בברקליס (קבוצה של 10), מלון NoMo SoHo בניו יורק,
   רכבת Amtrak לפילדלפיה הלוך-חזור, ומלון Holiday Inn Express בפילדלפיה (לילה 23→24.12).
   + באיזו אפליקציה נמצא כל כרטיס משחק (שדה wallet) · תוקן מספר הזמנה שגוי ל-27.12.
   TRIP  → trip.html | META/STATUS/PURCHASES/BUDGET → index.html + planning.html
   ============================================================ */

const META = {
  title: "טיול בר מצווה NBA — קריסמס 2026",
  window: "20–28 בדצמבר 2026 (9 ימים, 8 לילות) · נחיתה בארץ 29.12",
  travelers: "3 — יוסי + איתן + סמואל. ב-21.12 (ברקליס) וב-23–24.12 (פילדלפיה) מצטרפים 3 זוגות חברים (אב + בן) — 9 בסך הכל. בניו יורק יש להם סידור לינה משלהם.",
  budget: "יעד מקורי: $3,000–5,000 לאדם · שולם/הוזמן: $5,349 לאדם · תחזית: ~$6,000 לאדם ללא אוכל",
  team: "ניו יורק ניקס",
  scheduleNote: "כל ארבעת המשחקים, הטיסות, שני המלונות והרכבת לפילדלפיה סגורים. נותר: Pre-Game Pass (יוצא למכירה ~9–23.11), סיור MSG, ESTA, ביטוח — ולתקן את כרטיס הרכבת של איתן ואת שם האורח במלונות."
};

/* ---- סטטוס כללי של ההזמנות ---- */
const STATUS = [
  { item: "טיסות TLV↔JFK (Delta)",        state: "שולם", note: "DL249 ב-20.12 · DL234 ב-28.12 · אישור GQRZUG · $1,403 לנוסע" },
  { item: "כרטיסים 21.12 — נטס מול פורטלנד", state: "שולם", note: "Barclays · Section 16 Row 11, מושבים 1–10 (ליד מנהרת השחקנים) · 10 כרטיסים דרך Group Sales (Ricky Hauser, 718-942-9567) · $92 לכרטיס, $920 סה״כ · החלק שלנו $276 · ללא החזר · 📱 בטלפון: Brooklyn Nets App → Tickets → Manage My Tickets → View My Tickets ✓ התקבל. ⚠️ לברר עם Ricky אם 10 הכרטיסים פותחים חוויית ילדים, ומה עושים עם הכרטיס העשירי" },
  { item: "כרטיסים 23.12 — 76ers מול יוסטון", state: "שולם", note: "Xfinity Mobile Arena · Lower Level 102, שורות 19–20 · $2,929.92 ל-3 (MemberDeals 158908103) · 📱 טרם נמסר — יגיע מייל העברה מהספק המקורי עד 22.12. ⚠️ 6 החברים צריכים כרטיסים משלהם — לתאם ישיבה ליד סקשן 102" },
  { item: "כרטיסים 25.12 — ניקס מול ספרס", state: "שולם", note: "MSG · Section 208 Row 21 · $2,764.14 ל-3 (SeatGeek 6P2-56932QP) · 📱 הועבר ב-9.10 לחשבון Ticketmaster/MSG 121033183 — אפליקציית Knicks & Rangers (לא באפליקציית SeatGeek) · מושבים 22–24 ✓" },
  { item: "כרטיסים 27.12 — ניקס מול נטס",  state: "שולם", note: "MSG · Section 419 Row 6 · $1,565.76 ל-3 (MemberDeals 158004133) · 📱 טרם נמסר — מועד אחרון 26.12 (!), צפוי להגיע לחשבון Ticketmaster/MSG. אם לא הגיע עד אמצע דצמבר — MemberDeals 833-751-7120" },
  { item: "מלון ניו יורק — NoMo SoHo (8 לילות)", state: "הוזמן", note: "9 Crosby St, סוהו · 20–28.12 · Double Deluxe, 2 מיטות · אישור Booking 6692267425 · $4,382.50, מתוכם Booking.com משלמים $276.06 → $4,106.44 עלינו · ביטול חינם עד 18.12 · פיקדון מוחזר $150 ללילה (עד $1,050) בצ׳ק-אין · ⚠️ רשום על שם דליה — לשנות שם אורח ליוסי" },
  { item: "רכבת Amtrak לפילדלפיה",         state: "הוזמן", note: "הזמנה 4DB750 · Keystone 643 ב-23.12 09:28→10:50 · Keystone 644 ב-24.12 09:45→11:05 · 3 מושבי Coach · ללא שינויים, 30% דמי ביטול · ⚠️ איתן רשום כ-CHILD (תעריף לגילאי 2–12 בלבד) — להסדיר מול Amtrak" },
  { item: "מלון פילדלפיה (לילה 23→24.12)", state: "הוזמן", note: "Holiday Inn Express Philadelphia-Midtown, 1305 Walnut · אישור Booking 6426025068 · 4 חדרים, 9 אורחים, ארוחת בוקר כלולה · $822.33 סה״כ, החדר שלנו (2 קווין) $196.85 · תשלום במלון · ביטול חינם עד 22.12 16:00 · ⚠️ כל 4 החדרים על שם דליה — לעדכן שמות אורחים" },
  { item: "Pre-Game Pass ב-Barclays",     state: "TBD", note: "$75 לאדם · נמכר ליחידים · יוצא למכירה רק ~9–23 בנובמבר — לבדוק שבועית מ-9.11. 26.10: לא נמצא ב-Ticketmaster — נשלחה בקשה ל-Ricky לעזור לרכוש דרך Group Sales, ממתינים לתשובה" },
  { item: "⚪ אופציה: 26.12 — נטס מול פליקנס", state: "TBD", note: "Barclays, מוצ\"ש 18:00. יציע תחתון ~$150–400 לאדם. להחליט בנובמבר" },
  { item: "Independence Hall — כרטיסים מתוזמנים", state: "TBD", note: "23.12 ~15:15 · 9 כרטיסים · recreation.gov, $1 לכרטיס" },
  { item: "⚪ חוויית קבוצה של הסיקסרס (High-Five Tunnel וכו׳)", state: "TBD", note: "מינימום 10 אנשים — אנחנו 9. לפנות ל-Group Sales ולשאול אם רכישת 10 כרטיסים דרכם פותחת את החוויה" },
  { item: "סיור ב-MSG (22.12)",           state: "TBD", note: "$48 מבוגר / $43 ילד · יום ללא משחק = חדר ההלבשה של הניקס פתוח" },
  { item: "🍽️ 24.12 ערב חג המולד — ארוחה ל-9", state: "TBD", note: "★ להזמין עכשיו. מומלץ Carmine's Times Square (212-221-3800), 19:00, סגנון משפחתי. חלופות: Benihana W 56th · Fogo de Chão W 53rd · Rubirosa (טופס קבוצות 8–22). 9 = בטלפון/מייל, לא אונליין. לשאול: תפריט חג קבוע? פיקדון? ביטול?" },
  { item: "🍽️ 28.12 ארוחת חגיגת בר מצווה (3)", state: "TBD", note: "Keens Steakhouse, 18:00 · Resy/אתר · לציין Bar Mitzvah" },
  { item: "🍽️ 25.12 צ'יינה טאון (3)", state: "TBD", note: "~20:15 · Wu's Wonton King / Congee Village / Nom Wah · להזמין ~2–3 שבועות מראש — הערב העמוס בשנה" },
  { item: "⛸️ / 🏙️ / 🕯️ כרטיסים מתוזמנים", state: "TBD", note: "Wollman Rink 25.12 ~15:30 · אמפייר סטייט 25.12 ~18:45 · 9/11 Museum 26.12 10:00 · Intrepid 27.12 10:30 · Edge 22.12 (אופציונלי) — לקנות בתחילת דצמבר" },
  { item: "⚪ Radio City Christmas Spectacular (22.12 ערב)", state: "TBD", note: "אופציה · ~90 דק' · מ-$55 · עונה 4.11.26–4.1.27" },
  { item: "ESTA (×3)",                    state: "TBD", note: "$21 לאדם · רק דרך esta.cbp.dhs.gov · להגיש עכשיו" },
  { item: "ביטוח נסיעות",                 state: "TBD", note: "חובה — כרטיסי המשחקים ללא החזר" }
];

/* ---- מה כבר שולם / הוזמן בפועל (החלק של 3 הנוסעים שלנו בלבד) ---- */
const PURCHASES = [
  { cat:"טיסות", item:"Delta DL249/DL234 — TLV⇄JFK, 3 נוסעים",
    detail:"אישור GQRZUG · U הלוך / G חזור (Premium Select) · שניהם Refundable",
    date:"15.8.2026", unit:"$1,403.00 × 3", total:4209.00,
    note:"הוחלף מהתאריכים המקוריים בחנוכה. שולם $1,236 ECredit + $167 מזומן לנוסע." },
  { cat:"כרטיסי משחק", item:"21.12 · נטס מול פורטלנד @ Barclays Center",
    detail:"Section 16 Row 11, מושבים 1–10 · 19:30 · Brooklyn Nets Group Sales (Ricky Hauser) · Account 78307421 · 📱 Brooklyn Nets App",
    date:"25.10.2026", unit:"$92.00 × 3 (מתוך 10 כרטיסים, $920)", total:276.00,
    note:"נקנו 10 כרטיסים לקבוצה של 9 (אנחנו + 3 זוגות החברים) — החברים מחזירים $552, והכרטיס העשירי ($92) פתוח. סקשן 16 = ליד מנהרת השחקנים, ושם מותר לבקש אוטוגרפים מהמושב. ללא החזר." },
  { cat:"כרטיסי משחק", item:"23.12 · 76ers מול יוסטון רוקטס @ Xfinity Mobile Arena",
    detail:"Lower Level 102 — Row 20 ×2 ($879.20) + Row 19 ×1 ($1,171.52) · 19:30 · MemberDeals 158908103 · 📱 יימסר עד 22.12",
    date:"22.8.2026", unit:"ממוצע $976.64 לכרטיס", total:2929.92,
    note:"⚠️ הרבה מעל ההערכה ($150–250 לכרטיס). הכרטיס השלישי הוא Zone Seating — המושב המדויק לא מובטח, והמושבים מפוצלים בין שתי שורות." },
  { cat:"כרטיסי משחק", item:"25.12 · ניקס מול סן אנטוניו @ MSG (קריסמס)",
    detail:"Section 208 Row 21 · 12:00 · SeatGeek הזמנה 6P2-56932QP · 📱 Ticketmaster / אפליקציית MSG (מושבים 22–24)",
    date:"17.8.2026", unit:"$786.00 + $135.38 עמלה × 3", total:2764.14,
    note:"רמה 200 — בדיוק המהלך החוסך שתוכנן (במקום יציע תחתון ב-$1,173+)." },
  { cat:"כרטיסי משחק", item:"27.12 · ניקס מול ברוקלין נטס @ MSG (דרבי)",
    detail:"Section 419 Row 6 · 18:00 · MemberDeals 158004133 · 📱 יימסר עד 26.12",
    date:"17.8.2026", unit:"$521.92 × 3", total:1565.76,
    note:"רמה 400 (יציע עליון) — חסך ~$255 לכרטיס מול היציע התחתון." },
  { cat:"מלון", item:"NoMo SoHo, ניו יורק — 8 לילות (20–28.12)",
    detail:"9 Crosby St, סוהו · Double Deluxe, 2 מיטות · Booking.com 6692267425 · צ׳ק-אין 16:00 / צ׳ק-אאוט 11:00 · ללא ארוחת בוקר",
    date:"אוקטובר 2026", unit:"$4,382.50 פחות $276.06 ש-Booking.com משלמים · ~$513 ללילה", total:4106.44,
    note:"כולל מס 14.75%, Resort fee $43 ללילה ומס עירוני. ביטול חינם עד יומיים לפני ההגעה. פיקדון מוחזר $150 ללילה (עד $1,050) בצ׳ק-אין — לא נכלל בסכום. ⚠️ רשום על שם דליה." },
  { cat:"מלון", item:"Holiday Inn Express Philadelphia-Midtown — לילה 23→24.12",
    detail:"1305 Walnut St · Booking.com 6426025068 · החדר שלנו: Standard 2 Queen · ארוחת בוקר כלולה · תשלום במלון",
    date:"אוקטובר 2026", unit:"חדר אחד מתוך 4 ($822.33 לכל 4)", total:196.85,
    note:"3 החדרים האחרים (King, $208.49 כל אחד) של זוגות החברים. ביטול חינם עד 22.12 16:00." }
];

/* ---- תקציב: שולם מול צפוי (לאדם) ---- */
const BUDGET = {
  paidPerPerson: 5349.37,
  paidTotal: 16048.11,
  rows: [
    { item:"✈️ טיסות", paid:"$1,403", left:"—", note:"שולם במלואו" },
    { item:"🎟️ 4 משחקים (21/23/25/27.12)", paid:"$2,511.94", left:"—", note:"שולם במלואו, ללא החזר. 21.12 = יציע תחתון בסקשן 16 — ירדה אפשרות הקורטסייד" },
    { item:"🏨 מלון NoMo SoHo, 8 לילות", paid:"$1,368.81", left:"—", note:"הוזמן · נמוך מהטווח שתוכנן ($1,330–1,600)" },
    { item:"🛏️ לילה בפילדלפיה (23→24.12)", paid:"$65.62", left:"—", note:"הוזמן · החדר שלנו $196.85" },
    { item:"🚆 Amtrak לפילדלפיה", paid:"הוזמן", left:"~$80", note:"המחיר לא מופיע בכרטיס — להשלים מהקבלה" },
    { item:"🏀 Pre-Game Pass", paid:"—", left:"$75", note:"יוצא למכירה ~9–23.11" },
    { item:"🚕 תחבורה מקומית + העברות JFK", paid:"—", left:"~$150", note:"סאבוויי, אובר בפילדלפיה, הלוך-חזור לשדה" },
    { item:"🗽 אטרקציות (כולל סיור MSG)", paid:"—", left:"~$220", note:"" },
    { item:"📄 ESTA + ביטוח", paid:"—", left:"~$120", note:"" },
    { item:"🍔 אוכל", paid:"—", left:"$700–900", note:"לא נכלל בסיכום 'ללא אוכל'" }
  ],
  forecastNoFood: "~$6,000 לאדם (שולם/הוזמן $5,349 + ~$650 שנותרו)",
  forecastWithFood: "~$6,700–6,900 לאדם · +$150–400 אם מוסיפים את משחק 26.12",
  vsTarget: "חריגה של ~$1,000 לאדם מתקרת היעד המקורי ($5,000) ללא אוכל. הסיבה: היעד נבנה על תמחור חנוכה/עונה שקטה, לפני שהתברר שהניקס בכלל לא משחקים בבית אז. הוויתור על קורטסייד והמלון בסוהו צמצמו את הפער.",
  vsNbaTrips: "NBATrips מבקשים ~$7,000 לאדם על טיול דומה (ללא אוכל). אנחנו בכ-$1,000 לאדם זולים יותר — עם טיסה ישירה, מלון בסוהו ופרטיות מלאה."
};

/* ---- מסלול יום-יום ----
   הערה: המשתנים כאן מוגדרים ב-const, ולכן אינם נחשפים אוטומטית על window.
   בסוף הקובץ יש חשיפה מפורשת כדי שכל דף יוכל לגשת אליהם בשתי הדרכים. */

const HOTEL_NY = { name:"NoMo SoHo", area:"9 Crosby St, סוהו · ליד Canal St (A/C/E, N/Q/R/W, 6) ו-Broadway–Lafayette (B/D/F/M)", status:"הוזמן" };

const TRIP = [
  {
    day:1, date:"20.12", weekday:"ראשון", city:"ניו יורק", type:"הגעה", seg:"נחיתה",
    title:"נחיתה בניו יורק",
    flight:{ dir:"הלוך · TLV → JFK", airline:"Delta (ישירה, A330-900neo)", flightNo:"DL0249", dep:"11:05 מנתב\"ג, טרמינל 3", arr:"16:44 ב-JFK, טרמינל 4 (12ש' 39ד')", pnr:"GQRZUG", price:"$1,403 לנוסע · $4,209 ל-3", status:"שולם" },
    hotel:{ name:"NoMo SoHo", area:"9 Crosby St, סוהו, מנהטן · Double Deluxe, 2 מיטות", checkin:"20.12 מ-16:00", checkout:"28.12 עד 11:00", nights:8, confirmation:"Booking.com 6692267425", pricePerNight:"~$513 נטו ($4,106.44 ל-8 לילות)", status:"הוזמן" },
    dining:{ meal:"ערב: Prince Street Pizza (פרוסת פפרוני מרובעת המפורסמת) — או Joe's Pizza בברודוויי", book:"לא צריך — עומדים בתור, זז מהר", status:"לא נדרש" },
    sched:[
      { time:"08:00", txt:"הגעה לנתב\"ג — טרמינל 3, צ'ק-אין Delta", kind:"move" },
      { time:"11:05", txt:"המראה · DL0249 ישירה לניו יורק (12 שעות 39 דקות)", kind:"flight" },
      { time:"16:44", txt:"נחיתה ב-JFK, טרמינל 4", kind:"flight" },
      { time:"17:00", txt:"ביקורת גבולות (ESTA) ואיסוף מזוודות", kind:"move" },
      { time:"18:30", txt:"נסיעה ל-NoMo SoHo — ~50–70 דקות בשעת עומס", kind:"move" },
      { time:"19:45", txt:"🏨 צ'ק-אין ב-NoMo SoHo (פיקדון מוחזר $150 ללילה בכרטיס אשראי)", kind:"free" },
      { time:"20:15", txt:"🍕 פרוסה ראשונה בניו יורק — Prince Street Pizza (27 Prince St, 5 דק' הליכה) · בלי הזמנה", kind:"food" },
      { time:"21:00", txt:"הליכה קצרה ברחובות סוהו המוארים ושינה — מחר משחק", kind:"free" }
    ],
    activities:["נחיתה, צ'ק-אין, פיצה ניו-יורקית ליד המלון", "ערב קצר — ג'ט-לג לפני משחק מחר"],
    notes:"⚠️ ההזמנה ב-NoMo רשומה על שם דליה — לעדכן את שם האורח ליוסי לפני הנסיעה (בצ'ק-אין נדרשים תעודה מזהה וכרטיס אשראי של האורח). שווה להזמין העברה מ-JFK מראש — שבוע קריסמס = תורי מוניות ארוכים."
  },
  {
    day:2, date:"21.12", weekday:"שני", city:"ברוקלין", type:"משחק", seg:"ברוקלין + מנהטן",
    title:"נטס מול פורטלנד @ Barclays Center — עם 3 זוגות החברים",
    hotel:HOTEL_NY,
    game:{ tier:"יציע תחתון — Section 16, ליד מנהרת השחקנים", matchup:"ברוקלין נטס מול פורטלנד טרייל בלייזרס", arena:"Barclays Center, ברוקלין", datetime:"שני 21.12, 19:30", section:"Section 16, Row 11", seats:"מושבים 1–10 יחד — 9 אנשים (אנחנו + 3 זוגות אב+בן) + כרטיס פנוי", price:"$92 לכרטיס · $920 ל-10 · החלק שלנו $276", status:"שולם", wallet:"Brooklyn Nets App → Tickets → Manage My Tickets → View My Tickets (התחברות עם benshushanster@gmail.com) · ✓ התקבל 26.10" },
    experience:{ name:"Pre-Game Pass — כניסה 1.5 שעות לפני הפתיחה הרגילה, מאחורי הקלעים, וצפייה בחימום של שתי הקבוצות ממושבי צד הפרקט", provider:"Barclays Center (Ticketmaster, נמכר ליחידים — $75 לאדם) · או דרך Ricky Hauser ב-Group Sales", status:"TBD" },
    dining:{ meal:"צהריים: Katz's Delicatessen · ערב: אוכל באולם (Barclays) — אין זמן לארוחה לפני, אם נכנסים עם ה-Pre-Game Pass", book:"Katz's — בלי הזמנה, לשמור על הכרטיס שמקבלים בכניסה (משלמים לפיו ביציאה)", status:"לא נדרש" },
    sched:[
      { time:"09:30", txt:"בוקר רגוע — בייגל ב-Black Seed / קפה בסוהו", kind:"food" },
      { time:"10:30", txt:"🛍️ סיבוב סניקרס וכדורסל בסוהו (הכול ברגל מהמלון): Nike SoHo (529 Broadway) · Kith (337 Lafayette) · adidas Broadway · Apple SoHo", kind:"shop" },
      { time:"12:30", txt:"🥪 Katz's Delicatessen — סנדוויץ' הפסטרמה הכי מפורסם בעיר (205 E Houston, 15 דק' הליכה) · בלי הזמנה", kind:"food" },
      { time:"14:00", txt:"חזרה למלון למנוחה — ג'ט-לג + ערב ארוך", kind:"free" },
      { time:"15:45", txt:"נסיעה לברוקלין — B/D מ-Broadway–Lafayette עד Atlantic Av–Barclays, ~20 דקות", kind:"move" },
      { time:"16:30", txt:"🎟️ Pre-Game Pass — כניסה מוקדמת וסיור מאחורי הקלעים (אם נרכש)", kind:"ticket" },
      { time:"17:00", txt:"צפייה בחימום של שתי הקבוצות ממושבי צד הפרקט — הרגע הכי קרוב לשחקנים בטיול", kind:"ticket" },
      { time:"18:00", txt:"פתיחת שערים רגילה · מפגש עם החברים · 🌭 ארוחת ערב באולם · Section 16 Row 11", kind:"food" },
      { time:"19:30", txt:"🏀 טיפ-אוף — נטס מול פורטלנד טרייל בלייזרס", kind:"game" },
      { time:"22:00", txt:"סיום המשחק, B/D חזרה לסוהו", kind:"move" }
    ],
    activities:["בוקר קניות סניקרס בסוהו + Katz's", "9 אנשים יחד בשורה אחת, ליד מנהרת השחקנים — מדיניות Barclays: אוטוגרפים רק מהמושב, וסקשן 16 הוא בדיוק המקום"],
    notes:"⚠️ ה-Pre-Game Pass יוצא למכירה רק 4–6 שבועות מראש (~9–23 בנובמבר) — לבדוק שבועית מ-9.11. ⚪ לשאול את Ricky Hauser (Group Sales, 718-942-9567): האם 10 הכרטיסים פותחים חוויית ילדים (High Five Tunnel וכו׳), ברכת בר מצווה על המסך, ואם אפשר לצרף את ה-Pre-Game Pass לקבוצה. הכרטיסים ללא החזר."
  },
  {
    day:3, date:"22.12", weekday:"שלישי", city:"ניו יורק", type:"חופשי", seg:"ברוקלין + מנהטן",
    title:"סיור ב-Madison Square Garden + מנהטן",
    hotel:HOTEL_NY,
    experience:{ name:"MSG All Access Tour — כולל חדר ההלבשה של הניקס", provider:"Madison Square Garden · $48 מבוגר / $43 ילד", status:"TBD" },
    dining:{ meal:"צהריים: Chelsea Market · ערב: מידטאון קליל", book:"לא צריך", status:"לא נדרש" },
    sched:[
      { time:"09:30", txt:"A/C/E מ-Canal St ל-34th St–Penn Station, ~10 דקות", kind:"move" },
      { time:"10:00", txt:"🏟️ סיור MSG All Access — כולל חדר ההלבשה של הניקס", kind:"ticket" },
      { time:"11:30", txt:"הליכה ל-Hudson Yards (10 דק') — ה-Vessel ותצפית Edge (מרפסת זכוכית בקומה 100)", kind:"free" },
      { time:"12:30", txt:"ה-High Line — פארק על מסילת רכבת ישנה, הליכה דרומה", kind:"free" },
      { time:"13:30", txt:"🍜 Chelsea Market — שוק אוכל מקורה, כל אחד בוחר (Los Tacos No.1, Very Fresh Noodles)", kind:"food" },
      { time:"15:00", txt:"🛍️ NBA Store (545 Fifth Ave) — חולצות, כדורים, מזכרות בר מצווה", kind:"shop" },
      { time:"16:30", txt:"🎄 חלונות הראווה בשדרה החמישית + עץ רוקפלר + מגלשת הקרח — ביום חול, הרבה פחות צפוף מערב החג", kind:"free" },
      { time:"17:00", txt:"✨ מופע האורות על חזית Saks (כל כמה דקות אחרי החשכה, אם פועל השנה) · קתדרלת סנט פטריק ממול", kind:"free" },
      { time:"18:00", txt:"🍔 ארוחת ערב במידטאון — Shake Shack / Los Tacos / Ellen's Stardust Diner (מלצרים שרים, בלי הזמנה)", kind:"food" },
      { time:"19:30", txt:"⚪ אופציה: Christmas Spectacular של הרוקטס ב-Radio City (~90 דק', מ-$55) — או חזרה מוקדמת", kind:"ticket" },
      { time:"21:30", txt:"חזרה למלון — לארוז תיק קטן לפילדלפיה", kind:"free" }
    ],
    activities:["סיור MSG בבוקר — רק ביום ללא משחק חדר ההלבשה של הניקס פתוח", "Hudson Yards, High Line, Chelsea Market, NBA Store", "עץ רוקפלר ו-Saks היום — ביום חול, לפני העומס של ערב החג"],
    notes:"זה היום היחיד בטיול שבו סיור ה-MSG עובד. 25.12 ו-27.12 הם ימי משחק, ו-23.12 אנחנו בפילדלפיה."
  },
  {
    day:4, date:"23.12", weekday:"רביעי", city:"פילדלפיה", type:"משחק", seg:"פילדלפיה",
    title:"פילדלפיה — 76ers מול יוסטון רוקטס + לינה (עם 3 זוגות חברים)",
    transport:{ mode:"רכבת Amtrak Keystone — הלוך 643 ב-23.12, חזור 644 ב-24.12", route:"Moynihan Train Hall (מול Penn Station) ⇄ 30th Street Station", duration:"09:28→10:50 · חזור 09:45→11:05", ref:"Amtrak 4DB750 · 3 מושבי Coach", price:"⚠️ המחיר לא מופיע בכרטיס — להשלים", status:"הוזמן" },
    hotel:{ name:"Holiday Inn Express Philadelphia-Midtown", area:"1305 Walnut St, מרכז העיר · בלוק מקו Broad Street לאולם · ארוחת בוקר כלולה", checkin:"23.12 מ-15:00", checkout:"24.12 עד 11:00", nights:1, confirmation:"Booking.com 6426025068", pricePerNight:"$196.85 החדר שלנו (2 קווין) · $822.33 ל-4 החדרים", status:"הוזמן" },
    game:{ tier:"יציע תחתון — Lower Level 102", matchup:"יוסטון רוקטס מול פילדלפיה 76ers", arena:"Xfinity Mobile Arena (Wells Fargo Center לשעבר), פילדלפיה", datetime:"רביעי 23.12, 19:30 (שידור ארצי ב-Prime Video)", section:"Lower Level 102 — שורה 20 (×2) ושורה 19 (×1)", seats:"3 — מפוצלים בין שתי שורות סמוכות", price:"$2,929.92 ל-3 (ממוצע $976.64 לכרטיס)", status:"שולם", wallet:"MemberDeals 158908103 — טרם נמסר. יגיע מייל העברה מהספק המקורי (כנראה Ticketmaster / אפליקציית הסיקסרס) עד 22.12" },
    dining:{ meal:"צהריים: Reading Terminal Market — צ'יזסטייק / DiNic's (סנדוויץ' חזיר צלוי), 9 אנשים מסתדרים בדוכנים · ערב: Chickie's & Pete's באולם (ה-Crabfries המפורסמים)", book:"לא צריך — שוק ודוכנים", status:"לא נדרש" },
    sched:[
      { time:"08:20", txt:"יציאה מהמלון עם תיק קטן — המזוודות נשארות ב-NoMo · A/C/E מ-Canal St ל-34th St", kind:"move" },
      { time:"08:55", txt:"הגעה ל-Moynihan Train Hall (מול Penn Station, שדרה 8) — 30 דקות לפני", kind:"move" },
      { time:"09:28", txt:"🚆 Amtrak Keystone 643 לפילדלפיה", kind:"move" },
      { time:"10:50", txt:"הגעה ל-30th Street · 2 אובר XL למלון (או SEPTA Regional Rail חינם עד Jefferson — כלול בכרטיס)", kind:"move" },
      { time:"11:20", txt:"🛏️ השארת תיקים בשמירת ציוד ב-Holiday Inn Express (צ׳ק-אין רק מ-15:00)", kind:"free" },
      { time:"11:45", txt:"🥊 מדרגות רוקי ופסל רוקי — מוזיאון האמנות (אובר קצר)", kind:"free" },
      { time:"12:30", txt:"הליכה בשדרת בן פרנקלין → LOVE Park, כפר חג המולד ובניין העירייה", kind:"free" },
      { time:"13:30", txt:"🥪 Reading Terminal Market — צ׳יזסטייק / DiNic׳s", kind:"food" },
      { time:"14:45", txt:"🔔 פעמון החירות (חינם, בלי כרטיס)", kind:"free" },
      { time:"15:15", txt:"Independence Hall — סיור מתוזמן (כרטיסים ל-9 מראש)", kind:"ticket" },
      { time:"16:30", txt:"צ׳ק-אין במלון ומנוחה", kind:"free" },
      { time:"18:00", txt:"Broad Street Line מתחנת Walnut-Locust לתחנת NRG, ~15 דקות — בלי תיקים", kind:"move" },
      { time:"18:45", txt:"🍟 ארוחת ערב באולם — Chickie's & Pete's (Crabfries)", kind:"food" },
      { time:"19:30", txt:"🏀 טיפ-אוף — 76ers מול יוסטון רוקטס · Lower Level 102", kind:"game" },
      { time:"22:00", txt:"סיום המשחק, Broad Street Line חזרה למלון ולינה", kind:"move" }
    ],
    activities:["חצי יום בפילדלפיה עם החברים: רוקי, LOVE Park וכפר חג המולד, Reading Terminal, פעמון החירות ו-Independence Hall","לינה במרכז העיר — המשחק בלי לחץ של רכבת אחרונה"],
    notes:"⚠️ כרטיס הרכבת של איתן הונפק בתעריף CHILD — באמטרק זה לגילאי 2–12 בלבד, והכרטיס כולל תנאי 'ללא שינויים'. להתקשר ל-Amtrak (1-800-USA-RAIL) ולהסדיר לפני הנסיעה. ⚠️ לוודא שהחברים על אותן רכבות (643/644) — ההזמנה שלנו ל-3 בלבד. ⚠️ חדרי המלון על שם דליה — לעדכן שמות. מדיניות תיקים באולם: אסור תרמיל גב; מותר תיק עד 14×14×6 אינץ׳ — הולכים למשחק בלי תיקים. 6 החברים צריכים כרטיסים משלהם, קרוב לסקשן 102. שידור ארצי — לאמת את שעת הפתיחה בנובמבר."
  },
  {
    day:5, date:"24.12", weekday:"חמישי", city:"ניו יורק", type:"חופשי", seg:"שבוע הקריסמס",
    title:"חזרה מפילדלפיה, מוזיאון וערב חג המולד בעיר",
    hotel:HOTEL_NY,
    dining:{ meal:"★ Carmine's Times Square (200 W 44th St) — איטלקי בסגנון משפחתי: כל מגש לשלושה-ארבעה, מושלם ל-9 עם נערים. חלופות: Benihana (W 56th St, טפניאקי — השף מבשל מול השולחן) · Fogo de Chão (W 53rd St, בשרים ברזילאי, פתוח בערב החג) · Rubirosa (נוליטה, 5 דק' מהמלון — תוכנית קבוצות 8–22 בסגנון משפחתי)", book:"להזמין עכשיו. 9 עובר את מגבלת ההזמנה באונליין ברוב המקומות — לבקש בטלפון/מייל (Carmine's: 212-221-3800). לבקש 19:00, לשאול על תפריט חג קבוע, פיקדון ותנאי ביטול", status:"TBD" },
    sched:[
      { time:"07:30", txt:"ארוחת בוקר במלון בפילדלפיה (כלולה, 6:30–10:30)", kind:"food" },
      { time:"08:50", txt:"צ'ק-אאוט ואובר ל-30th Street", kind:"move" },
      { time:"09:45", txt:"🚆 Amtrak Keystone 644 חזרה לניו יורק — יחד עם החברים", kind:"move" },
      { time:"11:05", txt:"הגעה ל-Moynihan · ישר למוזיאון עם התיקים הקטנים (יש מלתחה) — C מ-Penn Station ל-81st St, ~15 דק'", kind:"move" },
      { time:"11:30", txt:"🦖 מוזיאון הטבע (AMNH) — דינוזאורים, הלוויתן הכחול · נסגר מוקדם היום (לאמת שעה)", kind:"ticket" },
      { time:"12:30", txt:"🥯 צהריים בקפיטריה של המוזיאון או Shake Shack ב-Columbus Ave ממול", kind:"food" },
      { time:"14:30", txt:"הליכה דרך סנטרל פארק דרומה (Bethesda Fountain, Bow Bridge) עד The Plaza", kind:"free" },
      { time:"15:30", txt:"🛍️ קניות אחרונות לפני החג — FAO Schwarz (רוקפלר), חלונות Bergdorf · החנויות נסגרות ~18:00 היום", kind:"shop" },
      { time:"16:45", txt:"Bryant Park Winter Village — דוכנים ומשטח החלקה · ספריית ניו יורק (האריות)", kind:"free" },
      { time:"17:45", txt:"טיימס סקוור בתאורת החג", kind:"free" },
      { time:"19:00", txt:"🍽️ ארוחת ערב חג המולד — 9 אנשים · מומלץ: Carmine's Times Square (מגשים משפחתיים ענקיים) · להזמין עכשיו", kind:"food" },
      { time:"21:00", txt:"🎄 הליכה לעץ רוקפלר בלילה (~10 דק') — הרגע הקלאסי של ערב חג המולד", kind:"free" },
      { time:"22:00", txt:"חזרה לסוהו — A/C/E או N/R/W", kind:"move" }
    ],
    activities:["בוקר: רכבת חזרה עם החברים · צהריים: מוזיאון הטבע וסנטרל פארק", "ערב: קניות לפני הסגירה, טיימס סקוור, ארוחה של 9 ועץ רוקפלר בלילה"],
    notes:"⚠️ ערב חג המולד: החנויות נסגרות ~18:00 והמוזיאונים מוקדם — לאמת שעות AMNH בדצמבר. ★ הארוחה ל-9 היא הדבר היחיד ביום שחייב הזמנה עכשיו: 9 סועדים בערב החג = טלפון/מייל, לא אונליין. עץ רוקפלר צפוף מאוד בערב החג — ראינו אותו ב-22.12 בנחת, הערב רק עוברים לידו אחרי הארוחה."
  },
  {
    day:6, date:"25.12", weekday:"שישי", city:"ניו יורק", type:"משחק", seg:"שבוע הקריסמס",
    title:"🎄 ניקס מול סן אנטוניו ספרס @ MSG — משחק הקריסמס",
    hotel:HOTEL_NY,
    game:{ tier:"רמה 200", matchup:"סן אנטוניו ספרס מול ניו יורק ניקס — רימאץ' גמר 2026", arena:"Madison Square Garden", datetime:"שישי 25.12, 12:00 (מסתיים ~14:30)", section:"Section 208, Row 21", seats:"3 יחד", price:"$2,764.14 ל-3 ($921.38 לכרטיס כולל עמלה)", status:"שולם", wallet:"Ticketmaster / אפליקציית Knicks & Rangers של MSG — חשבון 121033183 (לא באפליקציית SeatGeek) · מושבים 22–24 · ✓ הועבר 9.10" },
    dining:{ meal:"ערב: צ'יינה טאון — Wu's Wonton King (שולחנות עגולים, BYOB) / Congee Village / Nom Wah Tea Parlor (דים סאם, הוותיק בעיר)", book:"להזמין 2–3 שבועות מראש — 25.12 הוא הערב העמוס ביותר של השנה בצ'יינה טאון. בלי הזמנה: ללכת מוקדם (~17:00) או לצפות לתור", status:"TBD" },
    sched:[
      { time:"09:30", txt:"יציאה ל-MSG — A/C/E מ-Canal St, ~10 דקות", kind:"move" },
      { time:"10:00", txt:"הגעה מוקדמת — כניסת השחקנים לאיצטדיון, 90–120 דקות לפני", kind:"ticket" },
      { time:"11:00", txt:"פתיחת שערים · Section 208 Row 21 · 🌭 אוכל באולם", kind:"food" },
      { time:"12:00", txt:"🏀 טיפ-אוף — ניקס מול ספרס, רימאץ' גמר 2026", kind:"game" },
      { time:"14:30", txt:"סיום המשחק — ומכאן כל היום פנוי", kind:"game" },
      { time:"15:30", txt:"⛸️ החלקה על הקרח ב-Wollman Rink בסנטרל פארק (להזמין סלוט מראש)", kind:"ticket" },
      { time:"17:30", txt:"הליכה דרומה בשדרה החמישית → טיימס סקוור אחרי רדת החשכה", kind:"free" },
      { time:"18:45", txt:"🏙️ אמפייר סטייט בילדינג בלילה (פתוח בחג — לאמת שעות)", kind:"ticket" },
      { time:"20:15", txt:"🥟 ארוחת ערב בצ'יינה טאון — 10 דק' הליכה מהמלון, המסורת היהודית-ניו-יורקית של חג המולד", kind:"food" }
    ],
    activities:["משחק הקריסמס ב-MSG — האירוע הגדול של העונה", "אחר הצהריים: החלקה, טיימס סקוור, אמפייר סטייט, ערב בצ'יינה טאון"],
    notes:"⚠️ ב-25.12 כמעט כל המוזיאונים בניו יורק סגורים (מטרופוליטן, MoMA, מוזיאון הטבע, 9/11) — לכן היום בנוי סביב אטרקציות שפתוחות בחג. שידור ארצי (ABC/ESPN) — לאמת את שעת המשחק בנובמבר."
  },
  {
    day:7, date:"26.12", weekday:"שבת", city:"דאונטאון + ברוקלין", type:"חופשי", seg:"שבוע הקריסמס",
    title:"דאונטאון וברוקלין — היום שכל המוזיאונים חוזרים להיפתח",
    hotel:HOTEL_NY,
    dining:{ meal:"צהריים: Hudson Eats · ערב: Juliana's (פיצה בתנור פחם, מתחת לגשר ברוקלין) או Time Out Market DUMBO (מתחם — כל אחד בוחר)", book:"Juliana's — הזמנה דרך האתר/Resy כשנפתחת (בד\"כ שבועיים מראש). Time Out Market — בלי הזמנה", status:"TBD" },
    sched:[
      { time:"09:30", txt:"יציאה לדאונטאון — ~15 דקות מסוהו", kind:"move" },
      { time:"10:00", txt:"🕯️ אנדרטת ומוזיאון 9/11 (כרטיסים מתוזמנים מראש) + ה-Oculus", kind:"ticket" },
      { time:"12:30", txt:"🛍️ Century 21 (Cortlandt St, מול האנדרטה) — מבצעי אחרי-חג מתחילים היום · וול סטריט והפר המזנק", kind:"shop" },
      { time:"13:30", txt:"🍔 צהריים ב-Hudson Eats (Brookfield Place) — מתחם אוכל עם נוף לנהר", kind:"food" },
      { time:"14:30", txt:"⛴️ מעבורת סטטן איילנד מ-Whitehall — חינם, עוברת ליד פסל החירות", kind:"free" },
      { time:"16:00", txt:"🌉 חציית גשר ברוקלין ברגל לדאמבו — שקיעה מול קו הרקיע", kind:"free" },
      { time:"17:00", txt:"תמונה ב-Washington St (גשר מנהטן במסגרת) · Jane's Carousel", kind:"free" },
      { time:"18:00", txt:"⚪ אופציה: משחק נטס מול ניו אורלינס פליקנס ב-Barclays (10 דקות מדאמבו) — טרם הוחלט", kind:"ticket" },
      { time:"19:00", txt:"🍕 Juliana's Pizza מתחת לגשר / Time Out Market DUMBO — וחזרה לסוהו (F מ-York St)", kind:"food" }
    ],
    activities:["9/11, וול סטריט, פסל החירות מהמעבורת, גשר ברוקלין ודאמבו — היום הכי 'ניו יורק' בטיול", "יום ראשון של מבצעי אחרי-החג"],
    notes:"⚪ אופציה פתוחה: נטס מול פליקנס ב-Barclays ב-18:00 — יציע תחתון ~$150–400 לאדם, מוצ\"ש יקר יותר ממשחק אמצע שבוע. להחליט בנובמבר."
  },
  {
    day:8, date:"27.12", weekday:"ראשון", city:"ניו יורק", type:"משחק", seg:"שבוע הקריסמס",
    title:"🗽 דרבי ניו יורק — ניקס מול נטס @ MSG",
    hotel:HOTEL_NY,
    game:{ tier:"רמה 400 (יציע עליון)", matchup:"ברוקלין נטס מול ניו יורק ניקס", arena:"Madison Square Garden", datetime:"ראשון 27.12, 18:00", section:"Section 419, Row 6", seats:"3 יחד", price:"$1,565.76 ל-3 ($521.92 לכרטיס)", status:"שולם", wallet:"MemberDeals 158004133 — טרם נמסר, מועד אחרון 26.12. צפוי להגיע לחשבון Ticketmaster/MSG (כמו 25.12)" },
    dining:{ meal:"בוקר: Sadelle's / Jack's Wife Freda · ערב: אחרי המשחק NY Pizza Suprema מול MSG", book:"Sadelle's — מומלץ Resy שבוע מראש (סופ\"ש). השאר בלי הזמנה", status:"TBD" },
    sched:[
      { time:"09:30", txt:"🥞 ארוחת בוקר בסוהו — Jack's Wife Freda / Sadelle's", kind:"food" },
      { time:"10:30", txt:"✈️ Intrepid Museum — נושאת מטוסים, מעבורת החלל Enterprise, צוללת וקונקורד (W 46th St, ~3 שעות)", kind:"ticket" },
      { time:"13:30", txt:"🌮 צהריים ב-Hell's Kitchen (שדרה 9) — 5 דק' מהאינטרפיד", kind:"food" },
      { time:"14:30", txt:"חזרה למלון למנוחה", kind:"free" },
      { time:"16:30", txt:"יציאה ל-MSG — A/C/E מ-Canal St", kind:"move" },
      { time:"17:00", txt:"פתיחת שערים · Section 419 Row 6 · 🌭 אוכל באולם", kind:"food" },
      { time:"18:00", txt:"🏀 טיפ-אוף — דרבי ניו יורק, ניקס מול נטס", kind:"game" },
      { time:"20:30", txt:"סיום המשחק — פרוסה ב-NY Pizza Suprema (שדרה 8, מול המדיסון) וחזרה למלון", kind:"food" }
    ],
    activities:["בוקר באינטרפיד — המוזיאון הכי 'נערים' בעיר", "דרבי העיר — האווירה הכי רועשת ב-MSG"],
    notes:"היציע העליון ב-MSG תלול אבל האווירה מצוינת. זה המשחק שבו נחסך הכי הרבה כסף בלי לוותר על משחק."
  },
  {
    day:9, date:"28.12", weekday:"שני", city:"ניו יורק → טיסה", type:"חזרה", seg:"חזרה",
    title:"יום מלא בניו יורק וטיסה לילית הביתה",
    flight:{ dir:"חזור · JFK → TLV", airline:"Delta (ישירה, A330-900neo) · Premium Select", flightNo:"DL0234", dep:"23:55 מ-JFK טרמינל 4", arr:"17:30 בנתב\"ג ביום שלישי 29.12 (10ש' 35ד')", pnr:"GQRZUG", price:"כלול בכרטיס הלוך-חזור", status:"שולם" },
    hotel:{ name:"NoMo SoHo", area:"צ'ק-אאוט עד 11:00 · אחסון מזוודות במלון", status:"הוזמן" },
    dining:{ meal:"★ Keens Steakhouse (72 W 36th St, מאז 1885 — אלפי מקטרות על התקרה, אווירה של אירוע) · חלופה: Carmine's אם לא הייתם שם ב-24.12", book:"להזמין עכשיו לשעה 18:00 (אונליין/Resy עד 12 איש). לציין 'Bar Mitzvah celebration' — הרבה מסעדות מוסיפות קינוח עם נר", status:"TBD" },
    sched:[
      { time:"08:00", txt:"צ'ק-אאוט מ-NoMo SoHo, אחסון מזוודות ובדיקה שהפיקדון שוחרר", kind:"move" },
      { time:"09:00", txt:"🛍️ אופציה A — Woodbury Common Premium Outlets: אוטובוס מ-Port Authority (~1:15 לכיוון) · ~250 חנויות מותגים במחירי אאוטלט", kind:"shop" },
      { time:"09:00", txt:"🗽 אופציה B — יום מנהטן: Top of the Rock / Summit One Vanderbilt · Grand Central · Macy's Herald Square", kind:"shop" },
      { time:"16:30", txt:"חזרה לעיר (באופציה A — אוטובוס לא אחרי ~15:30, פקקי שבוע החגים)", kind:"move" },
      { time:"18:00", txt:"🎉 ארוחת חגיגת בר המצווה והפרידה — מומלץ: Keens Steakhouse (W 36th St)", kind:"food" },
      { time:"20:15", txt:"איסוף מזוודות מהמלון ונסיעה ל-JFK (~60–75 דקות בערב)", kind:"move" },
      { time:"21:30", txt:"צ'ק-אין בטרמינל 4", kind:"move" },
      { time:"23:55", txt:"המראה · DL0234 ישירה, Premium Select", kind:"flight" },
      { time:"17:30", txt:"נחיתה בנתב\"ג — יום שלישי 29.12", kind:"flight" }
    ],
    activities:["יום קניות אחרון — אאוטלט או מנהטן", "ארוחת חגיגה לבר המצווה לפני הטיסה"],
    notes:"טיסת חזור לילית = יום שלם נוסף בניו יורק. סה\"כ ימי לימודים שהוחסרו: 8 (20–24 ו-27–29 בדצמבר)."
  }
];

/* ---- חשיפה מפורשת ל-window (const אינו נצמד ל-window מעצמו) ---- */
if (typeof window !== 'undefined') {
  window.META = META; window.STATUS = STATUS; window.PURCHASES = PURCHASES;
  window.BUDGET = BUDGET; window.TRIP = TRIP;
}
