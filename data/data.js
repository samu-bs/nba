/* ============================================================
   NBA Bar Mitzvah Trip — data layer
   עודכן: 25 באוגוסט 2026
   סטטוס: הטיסות והכרטיסים ל-3 משחקים נרכשו ושולמו.
   TRIP  → trip.html | META/STATUS/PURCHASES/BUDGET → index.html + planning.html
   ============================================================ */

const META = {
  title: "טיול בר מצווה NBA — קריסמס 2026",
  window: "20–28 בדצמבר 2026 (9 ימים, 8 לילות) · נחיתה בארץ 29.12",
  travelers: "3 — יוסי + איתן + סמואל. סופי: ההורה והילד הנוספים לא מצטרפים.",
  budget: "יעד מקורי: $3,000–5,000 לאדם · תחזית מעודכנת: ~$6,150 לאדם ללא אוכל",
  team: "ניו יורק ניקס",
  scheduleNote: "הלוח פורסם, התאריכים שונו מחנוכה לקריסמס, והטיסות + 3 מתוך 4 המשחקים כבר שולמו. נותר: כרטיסי Barclays ל-21.12, מלון, רכבת לפילדלפיה, ESTA וביטוח."
};

/* ---- סטטוס כללי של ההזמנות ---- */
const STATUS = [
  { item: "טיסות TLV↔JFK (Delta)",        state: "שולם", note: "DL249 ב-20.12 · DL234 ב-28.12 · אישור GQRZUG · $1,403 לנוסע" },
  { item: "כרטיסים 23.12 — 76ers מול יוסטון", state: "שולם", note: "Xfinity Mobile Arena · Lower Level 102, שורות 19–20 · $2,929.92 ל-3" },
  { item: "כרטיסים 25.12 — ניקס מול ספרס", state: "שולם", note: "MSG · Section 208 Row 21 · $2,764.14 ל-3 (SeatGeek 6P2-56932QP)" },
  { item: "כרטיסים 27.12 — ניקס מול נטס",  state: "שולם", note: "MSG · Section 419 Row 6 · $1,565.76 ל-3 (MemberDeals 158908103)" },
  { item: "כרטיסים 21.12 — נטס מול פורטלנד", state: "TBD", note: "⚠️ ההחלטה הפתוחה: קורטסייד (~$700–1,500) או יציע תחתון ליד מנהרת השחקנים (~$126–200)" },
  { item: "Pre-Game Pass ב-Barclays",     state: "TBD", note: "$75 לאדם · נמכר ליחידים · יוצא למכירה רק ~9–23 בנובמבר. תזכורת!" },
  { item: "מלון ניו יורק (8 לילות)",      state: "TBD", note: "20–28.12 · חדר ל-3 · שבוע קריסמס = שיא מחירים. להזמין עם ביטול חינם" },
  { item: "רכבת Amtrak ל-פילדלפיה",       state: "TBD", note: "23.12 הלוך-חזור · ~$100 לאדם · אחרון חזרה 23:40" },
  { item: "סיור ב-MSG (22.12)",           state: "TBD", note: "$48 מבוגר / $43 ילד · יום ללא משחק = חדר ההלבשה של הניקס פתוח" },
  { item: "ESTA (×3)",                    state: "TBD", note: "$21 לאדם · רק דרך esta.cbp.dhs.gov · להגיש עכשיו" },
  { item: "ביטוח נסיעות",                 state: "TBD", note: "חובה — כרטיסי המשחקים ללא החזר" }
];

/* ---- מה כבר שולם בפועל ---- */
const PURCHASES = [
  { cat:"טיסות", item:"Delta DL249/DL234 — TLV⇄JFK, 3 נוסעים",
    detail:"אישור GQRZUG · U הלוך / G חזור (Premium Select) · שניהם Refundable",
    date:"15.8.2026", unit:"$1,403.00 × 3", total:4209.00,
    note:"הוחלף מהתאריכים המקוריים בחנוכה. שולם $1,236 ECredit + $167 מזומן לנוסע." },
  { cat:"כרטיסי משחק", item:"25.12 · ניקס מול סן אנטוניו @ MSG (קריסמס)",
    detail:"Section 208 Row 21 · 12:00 · SeatGeek הזמנה 6P2-56932QP",
    date:"17.8.2026", unit:"$786.00 + $135.38 עמלה × 3", total:2764.14,
    note:"רמה 200 — בדיוק המהלך החוסך שתוכנן (במקום יציע תחתון ב-$1,173+)." },
  { cat:"כרטיסי משחק", item:"27.12 · ניקס מול ברוקלין נטס @ MSG (דרבי)",
    detail:"Section 419 Row 6 · 18:00 · MemberDeals",
    date:"17.8.2026", unit:"$521.92 × 3", total:1565.76,
    note:"רמה 400 (יציע עליון) — חסך ~$255 לכרטיס מול היציע התחתון." },
  { cat:"כרטיסי משחק", item:"23.12 · 76ers מול יוסטון רוקטס @ Xfinity Mobile Arena",
    detail:"Lower Level 102 — Row 20 ×2 ($879.20) + Row 19 ×1 ($1,171.52) · 19:30 · MemberDeals 158908103",
    date:"22.8.2026", unit:"ממוצע $976.64 לכרטיס", total:2929.92,
    note:"⚠️ הרבה מעל ההערכה ($150–250 לכרטיס). הכרטיס השלישי הוא Zone Seating — המושב המדויק לא מובטח, והמושבים מפוצלים בין שתי שורות." }
];

/* ---- תקציב: שולם מול צפוי (לאדם) ---- */
const BUDGET = {
  paidPerPerson: 3822.94,
  paidTotal: 11468.82,
  rows: [
    { item:"✈️ טיסות", paid:"$1,403", left:"—", note:"שולם במלואו" },
    { item:"🎟️ 3 משחקים (23/25/27.12)", paid:"$2,419.94", left:"—", note:"שולם במלואו, ללא החזר" },
    { item:"🏀 21.12 Barclays + Pre-Game Pass", paid:"—", left:"$200–275 · או $775–1,575 עם קורטסייד", note:"ההחלטה הפתוחה היחידה בעלת משמעות תקציבית" },
    { item:"🏨 מלון 8 לילות (חדר ל-3)", paid:"—", left:"$1,330–1,600", note:"מידטאון בשבוע קריסמס. Penn/Hudson Yards/LIC יחסכו ~$270" },
    { item:"🚆 תחבורה + Amtrak לפילדלפיה", paid:"—", left:"~$280", note:"" },
    { item:"🗽 אטרקציות (כולל סיור MSG)", paid:"—", left:"~$220", note:"" },
    { item:"📄 ESTA + ביטוח", paid:"—", left:"~$120", note:"" },
    { item:"🍔 אוכל", paid:"—", left:"$700–900", note:"לא נכלל בסיכום 'ללא אוכל'" }
  ],
  forecastNoFood: "~$6,150 לאדם (מסלול יציע תחתון) · ~$7,150 עם קורטסייד",
  forecastWithFood: "~$6,950 לאדם · ~$7,950 עם קורטסייד",
  vsTarget: "חריגה של ~$1,150–2,150 לאדם מהיעד המקורי ($3,000–5,000). הסיבה: היעד נבנה על תמחור חנוכה/עונה שקטה, לפני שהתברר שהניקס בכלל לא משחקים בבית אז.",
  vsNbaTrips: "NBATrips מבקשים ~$7,000 לאדם על טיול דומה. במסלול יציע תחתון אנחנו עדיין זולים בכ-$850; עם קורטסייד אנחנו כבר בערך באותו מחיר."
};

/* ---- מסלול יום-יום ----
   הערה: המשתנים כאן מוגדרים ב-const, ולכן אינם נחשפים אוטומטית על window.
   בסוף הקובץ יש חשיפה מפורשת כדי שכל דף יוכל לגשת אליהם בשתי הדרכים. */

const TRIP = [
  {
    day:1, date:"20.12", weekday:"ראשון", city:"ניו יורק", type:"הגעה", seg:"נחיתה",
    title:"נחיתה בניו יורק",
    flight:{ dir:"הלוך · TLV → JFK", airline:"Delta (ישירה, A330-900neo)", flightNo:"DL0249", dep:"11:05 מנתב\"ג, טרמינל 3", arr:"16:44 ב-JFK, טרמינל 4 (12ש' 39ד')", pnr:"GQRZUG", price:"$1,403 לנוסע · $4,209 ל-3", status:"שולם" },
    hotel:{ name:"TBD", area:"מנהטן", checkin:"20.12", checkout:"28.12", nights:8, confirmation:"TBD", pricePerNight:"TBD", status:"TBD" },
    sched:[
      { time:"08:00", txt:"הגעה לנתב\"ג — טרמינל 3, צ'ק-אין Delta", kind:"move" },
      { time:"11:05", txt:"המראה · DL0249 ישירה לניו יורק (12 שעות 39 דקות)", kind:"flight" },
      { time:"16:44", txt:"נחיתה ב-JFK, טרמינל 4", kind:"flight" },
      { time:"17:00", txt:"ביקורת גבולות (ESTA) ואיסוף מזוודות", kind:"move" },
      { time:"18:30", txt:"נסיעה למלון במנהטן — ~50–70 דקות בשעת עומס", kind:"move" },
      { time:"20:00", txt:"צ'ק-אין, ארוחת ערב קרובה ושינה מוקדמת", kind:"free" }
    ],
    activities:["ביקורת גבולות (ESTA), איסוף מזוודות, נסיעה למלון","ערב רגוע — היפטרות מהג'ט-לג לפני משחק מחר"],
    notes:"שווה להזמין העברה מ-JFK מראש — שבוע קריסמס = תורי מוניות ארוכים."
  },
  {
    day:2, date:"21.12", weekday:"שני", city:"ברוקלין", type:"משחק", seg:"ברוקלין + מנהטן",
    title:"נטס מול פורטלנד @ Barclays Center — משחק הקרבה לשחקנים",
    hotel:{ name:"TBD", area:"מנהטן", status:"TBD" },
    game:{ tier:"קורטסייד או יציע תחתון (סקשן 3/16) — טרם הוחלט", matchup:"ברוקלין נטס מול פורטלנד טרייל בלייזרס", arena:"Barclays Center, ברוקלין", datetime:"שני 21.12, 19:30", section:"TBD", seats:"TBD", price:"TBD — קורטסייד ~$700–1,500 · יציע תחתון ~$126–200", status:"TBD" },
    experience:{ name:"Pre-Game Pass — כניסה 1.5 שעות לפני הפתיחה הרגילה, מאחורי הקלעים, וצפייה בחימום של שתי הקבוצות ממושבי צד הפרקט", provider:"Barclays Center (Ticketmaster, נמכר ליחידים — $75 לאדם)", status:"TBD" },
    sched:[
      { time:"10:00", txt:"בוקר חופשי במנהטן — NBA Store בשדרה החמישית", kind:"free" },
      { time:"15:30", txt:"נסיעה לברוקלין — סאבוויי קווים 2/3 עד Atlantic Ave–Barclays, ~35 דקות", kind:"move" },
      { time:"16:30", txt:"🎟️ Pre-Game Pass — כניסה מוקדמת וסיור מאחורי הקלעים", kind:"ticket" },
      { time:"17:00", txt:"צפייה בחימום של שתי הקבוצות ממושבי צד הפרקט — הרגע הכי קרוב לשחקנים בטיול", kind:"ticket" },
      { time:"18:00", txt:"פתיחת שערים רגילה · מנהרות השחקנים ליד סקשנים 3 ו-16", kind:"free" },
      { time:"19:30", txt:"🏀 טיפ-אוף — נטס מול פורטלנד טרייל בלייזרס", kind:"game" },
      { time:"22:00", txt:"סיום המשחק, חזרה למנהטן", kind:"move" }
    ],
    activities:["להגיע מוקדם — ה-Pre-Game Pass הוא הרגע הכי קרוב לשחקנים בכל הטיול","מדיניות Barclays: בקשות אוטוגרף רק מהמושב שלכם"],
    notes:"⚠️ ה-Pre-Game Pass יוצא למכירה רק 4–6 שבועות מראש (~9–23 בנובמבר) — לבדוק שבועית מ-9.11. זה גם המשחק הזול בטיול, ולכן המקום הנכון לשדרג מושבים."
  },
  {
    day:3, date:"22.12", weekday:"שלישי", city:"ניו יורק", type:"חופשי", seg:"ברוקלין + מנהטן",
    title:"סיור ב-Madison Square Garden + מנהטן",
    hotel:{ name:"TBD", area:"מנהטן", status:"TBD" },
    experience:{ name:"MSG All Access Tour — כולל חדר ההלבשה של הניקס", provider:"Madison Square Garden · $48 מבוגר / $43 ילד", status:"TBD" },
    sched:[
      { time:"10:00", txt:"🏟️ סיור MSG All Access — כולל חדר ההלבשה של הניקס", kind:"ticket" },
      { time:"12:00", txt:"NBA Store בשדרה החמישית", kind:"free" },
      { time:"13:30", txt:"ארוחת צהריים", kind:"free" },
      { time:"15:00", txt:"טיימס סקוור / Top of the Rock / סנטרל פארק", kind:"free" },
      { time:"19:00", txt:"ערב חופשי", kind:"free" }
    ],
    activities:["סיור MSG בבוקר — דווקא ביום ללא משחק, כי רק אז חדר ההלבשה של הניקס פתוח לקהל"],
    notes:"זה היום היחיד בטיול שבו סיור ה-MSG עובד. 25.12 ו-27.12 הם ימי משחק, ו-23.12 אנחנו בפילדלפיה."
  },
  {
    day:4, date:"23.12", weekday:"רביעי", city:"פילדלפיה", type:"משחק", seg:"פילדלפיה",
    title:"טיול יום לפילדלפיה — 76ers מול יוסטון רוקטס",
    transport:{ mode:"רכבת Amtrak, הלוך-חזור", route:"Penn Station ⇄ 30th Street", duration:"~1 שעה 21 דקות לכל כיוון", ref:"TBD", price:"~$100 לאדם (TBD)", status:"TBD" },
    hotel:{ name:"TBD", area:"חוזרים ללינה במנהטן — אין החלפת מלון", status:"TBD" },
    game:{ tier:"יציע תחתון — Lower Level 102", matchup:"יוסטון רוקטס מול פילדלפיה 76ers", arena:"Xfinity Mobile Arena (Wells Fargo Center לשעבר), פילדלפיה", datetime:"רביעי 23.12, 19:30 (שידור ארצי ב-Prime Video)", section:"Lower Level 102 — שורה 20 (×2) ושורה 19 (×1)", seats:"3 — מפוצלים בין שתי שורות סמוכות", price:"$2,929.92 ל-3 (ממוצע $976.64 לכרטיס)", status:"שולם" },
    sched:[
      { time:"08:30", txt:"יציאה ל-Penn Station (המלון נשאר — אין צ'ק-אאוט)", kind:"move" },
      { time:"09:00", txt:"🚆 רכבת Amtrak לפילדלפיה", kind:"move" },
      { time:"10:21", txt:"הגעה ל-30th Street Station", kind:"move" },
      { time:"11:00", txt:"פעמון החירות ו-Independence Hall", kind:"free" },
      { time:"13:00", txt:"Reading Terminal Market — צ'יזסטייק", kind:"free" },
      { time:"15:00", txt:"מדרגות רוקי ומוזיאון האמנות", kind:"free" },
      { time:"18:00", txt:"קו Broad Street לתחנת NRG — ~20–25 דקות", kind:"move" },
      { time:"19:30", txt:"🏀 טיפ-אוף — 76ers מול יוסטון רוקטס · Lower Level 102", kind:"game" },
      { time:"22:00", txt:"סיום המשחק, חזרה לתחנת 30th Street", kind:"move" },
      { time:"23:40", txt:"🚆 הרכבת האחרונה חזרה לניו יורק", kind:"move" },
      { time:"01:00", txt:"הגעה למלון במנהטן", kind:"move" }
    ],
    activities:["רכבת בוקר · פעמון החירות, Independence Hall, Reading Terminal Market, מדרגות רוקי"],
    notes:"⚠️ הרכבת האחרונה יוצאת 23:40 — עובד, אבל בלי מרווח אם המשחק מתארך. חלופה רגועה: לינה בפילדלפיה (~$200) וחזרה בצהרי 24.12. שידור ארצי — לאמת את שעת הפתיחה בנובמבר."
  },
  {
    day:5, date:"24.12", weekday:"חמישי", city:"ניו יורק", type:"חופשי", seg:"שבוע הקריסמס",
    title:"ערב חג המולד בניו יורק",
    hotel:{ name:"TBD", area:"מנהטן", status:"TBD" },
    sched:[
      { time:"10:30", txt:"עץ חג המולד ברוקפלר סנטר", kind:"free" },
      { time:"12:00", txt:"חלונות הראווה בשדרה החמישית", kind:"free" },
      { time:"15:00", txt:"גשר ברוקלין ודאמבו", kind:"free" },
      { time:"19:00", txt:"ערב מוקדם — מחר משחק בצהריים ואחריו כניסת שבת", kind:"free" }
    ],
    activities:["העיר בשיאה: עץ רוקפלר, חלונות ראווה בחמישית, גשר ברוקלין"],
    notes:"אם ישנים בפילדלפיה בלילה של 23.12 — חוזרים לניו יורק בצהריים והיום הזה מתקצר."
  },
  {
    day:6, date:"25.12", weekday:"שישי", city:"ניו יורק", type:"משחק", seg:"שבוע הקריסמס",
    title:"🎄 ניקס מול סן אנטוניו ספרס @ MSG — משחק הקריסמס",
    hotel:{ name:"TBD", area:"מנהטן", status:"TBD" },
    game:{ tier:"רמה 200", matchup:"סן אנטוניו ספרס מול ניו יורק ניקס — רימאץ' גמר 2026", arena:"Madison Square Garden", datetime:"שישי 25.12, 12:00 (מסתיים ~14:30)", section:"Section 208, Row 21", seats:"3 יחד", price:"$2,764.14 ל-3 ($921.38 לכרטיס כולל עמלה)", status:"שולם" },
    sched:[
      { time:"09:30", txt:"יציאה ל-MSG", kind:"move" },
      { time:"10:00", txt:"הגעה מוקדמת — כניסת השחקנים לאיצטדיון, 90–120 דקות לפני", kind:"ticket" },
      { time:"11:00", txt:"פתיחת שערים · Section 208 Row 21", kind:"ticket" },
      { time:"12:00", txt:"🏀 טיפ-אוף — ניקס מול ספרס, רימאץ' גמר 2026", kind:"game" },
      { time:"14:30", txt:"סיום המשחק", kind:"game" },
      { time:"15:00", txt:"חזרה למלון", kind:"move" },
      { time:"16:15", txt:"כניסת שבת", kind:"free" }
    ],
    activities:["האווירה במשחק קריסמס ב-MSG היא האירוע הגדול של העונה"],
    notes:"⚠️ כניסת שבת ~16:15. המשחק מסתיים ~14:30 — מספיק זמן, אבל בלי לשוטט אחרי. שידור ארצי (ABC/ESPN) — לאמת את השעה בנובמבר."
  },
  {
    day:7, date:"26.12", weekday:"שבת", city:"ניו יורק", type:"חופשי", seg:"שבוע הקריסמס",
    title:"שבת — יום מנוחה",
    hotel:{ name:"TBD", area:"מנהטן", status:"TBD" },
    sched:[
      { time:"כל היום", txt:"יום מנוחה במנהטן", kind:"free" },
      { time:"17:25", txt:"צאת שבת", kind:"free" },
      { time:"19:00", txt:"ערב חופשי — ארוחה בעיר", kind:"free" }
    ],
    activities:["יום מנוחה במנהטן"],
    notes:"משחק הנטס מול פליקנס ב-Barclays ב-18:00 אינו ריאלי — צאת שבת ב-17:25 ועוד ~45 דקות נסיעה."
  },
  {
    day:8, date:"27.12", weekday:"ראשון", city:"ניו יורק", type:"משחק", seg:"שבוע הקריסמס",
    title:"🗽 דרבי ניו יורק — ניקס מול נטס @ MSG",
    hotel:{ name:"TBD", area:"מנהטן", status:"TBD" },
    game:{ tier:"רמה 400 (יציע עליון)", matchup:"ברוקלין נטס מול ניו יורק ניקס", arena:"Madison Square Garden", datetime:"ראשון 27.12, 18:00", section:"Section 419, Row 6", seats:"3 יחד", price:"$1,565.76 ל-3 ($521.92 לכרטיס)", status:"שולם" },
    sched:[
      { time:"10:00", txt:"בוקר חופשי — מוזיאון / קניות", kind:"free" },
      { time:"16:30", txt:"יציאה ל-MSG", kind:"move" },
      { time:"17:00", txt:"פתיחת שערים · Section 419 Row 6", kind:"ticket" },
      { time:"18:00", txt:"🏀 טיפ-אוף — דרבי ניו יורק, ניקס מול נטס", kind:"game" },
      { time:"20:30", txt:"סיום המשחק — הערב האחרון בעיר", kind:"free" }
    ],
    activities:["דרבי העיר — האווירה הכי רועשת ב-MSG"],
    notes:"היציע העליון ב-MSG תלול אבל האווירה מצוינת. זה המשחק שבו נחסך הכי הרבה כסף בלי לוותר על משחק."
  },
  {
    day:9, date:"28.12", weekday:"שני", city:"ניו יורק → טיסה", type:"חזרה", seg:"חזרה",
    title:"יום מלא בניו יורק וטיסה לילית הביתה",
    flight:{ dir:"חזור · JFK → TLV", airline:"Delta (ישירה, A330-900neo) · Premium Select", flightNo:"DL0234", dep:"23:55 מ-JFK טרמינל 4", arr:"17:30 בנתב\"ג ביום שלישי 29.12 (10ש' 35ד')", pnr:"GQRZUG", price:"כלול בכרטיס הלוך-חזור", status:"שולם" },
    hotel:{ name:"TBD", area:"צ'ק-אאוט בבוקר · אחסון מזוודות במלון", status:"TBD" },
    sched:[
      { time:"11:00", txt:"צ'ק-אאוט ואחסון מזוודות במלון", kind:"move" },
      { time:"12:00", txt:"יום אחרון בעיר — אטרקציה אחרונה וקניות", kind:"free" },
      { time:"18:00", txt:"ארוחת פרידה", kind:"free" },
      { time:"20:30", txt:"איסוף מזוודות ונסיעה ל-JFK", kind:"move" },
      { time:"21:30", txt:"צ'ק-אין בטרמינל 4", kind:"move" },
      { time:"23:55", txt:"המראה · DL0234 ישירה, Premium Select", kind:"flight" },
      { time:"17:30", txt:"נחיתה בנתב\"ג — יום שלישי 29.12", kind:"flight" }
    ],
    activities:["בזכות הטיסה הלילית — יום מלא בעיר לפני היציאה"],
    notes:"טיסת חזור לילית = יום שלם נוסף בניו יורק. סה\"כ ימי לימודים שהוחסרו: 8 (20–24 ו-27–29 בדצמבר)."
  }
];

/* ---- חשיפה מפורשת ל-window (const אינו נצמד ל-window מעצמו) ---- */
if (typeof window !== 'undefined') {
  window.META = META; window.STATUS = STATUS; window.PURCHASES = PURCHASES;
  window.BUDGET = BUDGET; window.TRIP = TRIP;
}
