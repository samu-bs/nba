/* ============================================================
   NBA Bar Mitzvah Trip — data layer
   ערכו כאן את הנתונים. כל הערכים שלא הוזמנו עדיין = "TBD".
   trip.html קורא את TRIP; planning.html קורא את META.
   ============================================================ */

const META = {
  title: "טיול בר מצווה NBA — חנוכה 2026",
  window: "4–12 בדצמבר 2026 (חנוכה)",
  travelers: "3 (יוסי + 2 בנים, 13 ו-15) · +הורה+ילד עדיין TBD",
  budget: "$3,000–5,000 לאדם (~$9,000–15,000 סה\"כ)",
  team: "ניו יורק ניקס",
  scheduleNote: "לוח ה-NBA הרשמי מתפרסם ~14–21 באוגוסט 2026. עד אז המשחקים והתאריכים המדויקים = TBD."
};

/* ---- סטטוס כללי של ההזמנות (לוח מחוונים בעמוד הבית) ---- */
const STATUS = [
  { item: "טיסות TLV↔NYC",            state: "TBD", note: "הצעה: Delta ישיר ~$854 לנוסע ($2,562 ל-3) — לאמת תאריכים/כבודה" },
  { item: "מלון ניו יורק",            state: "TBD", note: "מידטאון, קרוב ל-MSG" },
  { item: "מלון בוסטון",              state: "TBD", note: "1–2 לילות" },
  { item: "כרטיס קורטסייד (משחק 1)",   state: "TBD", note: "ייסגר אחרי פרסום הלוח (אוגוסט)" },
  { item: "כרטיסי 2 משחקים נוספים",    state: "TBD", note: "יציע תחתון" },
  { item: "חוויות על הפרקט / High-Five", state: "TBD", note: "מול מחלקות הקבוצות" },
  { item: "ESTA (×3)",                state: "TBD", note: "$21 לאדם — לפני הטיסות" },
  { item: "ביטוח נסיעות",             state: "TBD", note: "חובה — אין החזרים על כרטיסים" }
];

/* ---- מסלול יום-יום. fields ריקים מסומנים TBD בתצוגה ---- */
const TRIP = [
  {
    day:1, date:"4.12", weekday:"שישי", city:"ניו יורק", type:"הגעה",
    title:"נחיתה בניו יורק",
    flight:{ dir:"הלוך · TLV → NYC", airline:"Delta (ישירה)", flightNo:"TBD", dep:"TBD", arr:"TBD", pnr:"TBD", price:"$854 לנוסע · הלוך-חזור ($2,562 ל-3)", status:"TBD" },
    hotel:{ name:"TBD", area:"מידטאן מנהטן", checkin:"4.12", checkout:"8.12", nights:4, confirmation:"TBD", pricePerNight:"TBD", status:"TBD" },
    activities:["נחיתה, מעבר ביקורת גבולות (ESTA), הגעה למלון","התארגנות ומנוחה"],
    notes:"מומלץ לתאם נחיתה לפני כניסת שבת. ערב חנוכה ראשון — הדלקת נר ראשון."
  },
  {
    day:2, date:"5.12", weekday:"שבת", city:"ניו יורק", type:"חופשי",
    title:"יום התאקלמות במנהטן",
    hotel:{ name:"TBD", area:"מידטאן מנהטן", status:"TBD" },
    activities:["סיור רגלי קליל: טיימס סקוור, סנטרל פארק","חנות ה-NBA Store (5th Ave) — מרצ' וקיט-אאוט"],
    notes:"יום שבת — יום מנוחה/סיור ללא משחק. אפשר להתאים לפי שמירת שבת."
  },
  {
    day:3, date:"6.12", weekday:"ראשון", city:"ניו יורק", type:"משחק",
    title:"משחק ניקס @ Madison Square Garden",
    hotel:{ name:"TBD", area:"מידטאן מנהטן", status:"TBD" },
    game:{ tier:"יציע תחתון", matchup:"ניקס מול TBD", arena:"Madison Square Garden", datetime:"TBD", section:"TBD", seats:"TBD", price:"TBD", status:"TBD" },
    activities:["הגעה מוקדמת לאיצטדיון — ציד אוטוגרפים ליד כניסת השחקנים (90–120 ד' לפני)","אחרי המשחק — המתנה ליד יציאת השחקנים"],
    notes:"המשחק והיריבה ייקבעו אחרי פרסום הלוח. לוודא משחק בית של הניקס בחלון."
  },
  {
    day:4, date:"7.12", weekday:"שני", city:"ברוקלין", type:"קורטסייד",
    title:"🏀 קורטסייד — נטס מול ניקס @ Barclays Center",
    hotel:{ name:"TBD", area:"מידטאן מנהטן", status:"TBD" },
    game:{ tier:"קורטסייד (על הפרקט)", matchup:"נטס מול ניקס (יעד)", arena:"Barclays Center, ברוקלין", datetime:"TBD", section:"שורת פרקט", seats:"TBD", price:"$900–1,400 לאדם (TBD)", status:"TBD" },
    experience:{ name:"פס חימום / High-Five על יד הפרקט", provider:"Brooklyn Nets", status:"TBD" },
    activities:["צפייה בחימום מקרוב — קרבה מרבית לשחקני הניקס","פריטים לחתימה בהישג יד מהפרקט"],
    notes:"היעד: משחק נטס-נגד-ניקס כדי לראות את שחקני הניקס מגובה הפרקט. תלוי בלוח."
  },
  {
    day:5, date:"8.12", weekday:"שלישי", city:"מעבר לבוסטון", type:"מעבר",
    title:"מעבר לבוסטון (רכבת Amtrak)",
    transport:{ mode:"רכבת Amtrak / טיסה קצרה", route:"NYC → Boston", duration:"~4 שעות ברכבת", ref:"TBD", price:"TBD", status:"TBD" },
    hotel:{ name:"TBD", area:"בוסטון (קרוב ל-TD Garden)", checkin:"8.12", checkout:"10.12", nights:2, confirmation:"TBD", pricePerNight:"TBD", status:"TBD" },
    activities:["נסיעה לבוסטון, סידור במלון","ערב חופשי — Quincy Market / Faneuil Hall"],
    notes:"חלופה: לדלג על בוסטון ולהוסיף פילדלפיה (76ers). להחליט אחרי הלוח."
  },
  {
    day:6, date:"9.12", weekday:"רביעי", city:"בוסטון", type:"משחק",
    title:"סלטיקס @ TD Garden + High-Five Tunnel",
    hotel:{ name:"TBD", area:"בוסטון", status:"TBD" },
    game:{ tier:"יציע תחתון", matchup:"סלטיקס מול TBD", arena:"TD Garden, בוסטון", datetime:"TBD", section:"TBD", seats:"TBD", price:"TBD", status:"TBD" },
    experience:{ name:"High-Five Tunnel — הילדים על הפרקט, כף עם השחקנים אחרי המחצית", provider:"Boston Celtics (מחלקת קבוצות)", status:"TBD" },
    activities:["הפרקט המיתולוגי של הסלטיקס","חוויית מגע מובטחת לילדים (Tunnel)"],
    notes:"לתאם את חוויית ה-Tunnel מראש מול מחלקת הקבוצות של הסלטיקס."
  },
  {
    day:7, date:"10.12", weekday:"חמישי", city:"בוסטון → ניו יורק", type:"מעבר",
    title:"סיור בוסטון וחזרה לניו יורק",
    transport:{ mode:"רכבת Amtrak / טיסה קצרה", route:"Boston → NYC", duration:"~4 שעות", ref:"TBD", price:"TBD", status:"TBD" },
    hotel:{ name:"TBD", area:"מידטאן מנהטן", checkin:"10.12", checkout:"12.12", nights:2, confirmation:"TBD", pricePerNight:"TBD", status:"TBD" },
    activities:["בוקר: Freedom Trail / אוניברסיטת הרווארד","חזרה לניו יורק לערב"],
    notes:""
  },
  {
    day:8, date:"11.12", weekday:"שישי", city:"ניו יורק", type:"רזרבה",
    title:"יום רזרבה / קניות בניו יורק",
    hotel:{ name:"TBD", area:"מידטאן מנהטן", status:"TBD" },
    game:{ tier:"אופציונלי", matchup:"משחק רזרבי (ניקס/נטס) — TBD", arena:"TBD", datetime:"TBD", section:"TBD", seats:"TBD", price:"TBD", status:"TBD (אופציונלי)" },
    activities:["משחק רביעי אופציונלי אם יש בלוח","קניות: Fifth Avenue / SoHo, אטרקציה (Top of the Rock)"],
    notes:"יום שישי — להתארגן לפני כניסת שבת."
  },
  {
    day:9, date:"12.12", weekday:"שבת", city:"טיסה חזרה", type:"חזרה",
    title:"טיסה חזרה לישראל",
    flight:{ dir:"חזור · NYC → TLV", airline:"Delta (ישירה)", flightNo:"TBD", dep:"TBD", arr:"TBD (יום למחרת)", pnr:"TBD", price:"כלול בהלוך-חזור ($854 לנוסע)", status:"TBD" },
    activities:["פינוי מלון (שמירת מזוודות אם הטיסה בערב)","נסיעה לשדה התעופה (JFK/EWR)"],
    notes:"טיסת מוצ\"ש — תלוי בזמינות. לאמת שעת המראה."
  }
];
