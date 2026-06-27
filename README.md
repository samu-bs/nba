# 🏀 NBA Bar Mitzvah Trip — Hanukkah 2026

תכנון ואתר לטיול בר מצווה סביב משחקי NBA על החוף המזרחי (4–12 בדצמבר 2026), בעברית (RTL).
3 נוסעים (יוסי + 2 בנים, 13 ו-15) · ניו יורק + בוסטון · 3 משחקים, מתוכם **אחד קורטסייד** · מפגש עם השחקנים בלב הטיול.

## 🌐 האתר
פתח את **`site/index.html`** (בית + סטטוס הזמנות). שני חלקים:

- **`site/planning.html`** — תכנון והחלטות: בחירת החלון, אסטרטגיית מפגש שחקנים, השוואת מחירי קורטסייד, תקציב, ציר זמן.
- **`site/trip.html`** — תוכנית הטיול יום-אחר-יום (4–12.12), עם מלון, טיסות, כרטיסים וחוויות. כל מה שטרם הוזמן מסומן **TBD**.

## 📁 מבנה
```
index.html        — הפניה לאתר (לנוחות GitHub Pages)
/site/            — אתר ה-HTML (RTL, רספונסיבי): index, planning, trip
/data/            — data.js: META, STATUS, TRIP (ערכו כאן את הנתונים)
CLAUDE.md         — מדריך הפרויקט
תוכנית-טיול-בר-מצווה-NBA.md — מסמך התכנון ב-Markdown
```
התוכן של המסלול נערך בקובץ **`data/data.js`** — שנו ערכי `"TBD"` לפרטים האמיתיים ככל שמזמינים, והאתר יתעדכן אוטומטית (כולל סטטוס ✓).

## 🚀 פרסום ב-GitHub Pages
1. ליצור ריפו ב-GitHub (לדוגמה `nba-bar-mitzvah`) ולהריץ:
   ```bash
   git remote add origin git@github.com:<user>/nba-bar-mitzvah.git
   git push -u origin main
   ```
2. ב-GitHub: **Settings → Pages → Source: Deploy from a branch → Branch: `main` / root**.
3. האתר יתפרסם ב-`https://<user>.github.io/nba-bar-mitzvah/` (ה-`index.html` בשורש מפנה ל-`site/`).

> מסמך עבודה. הפרטים המדויקים (משחקים/תאריכים) ייסגרו אחרי פרסום לוח ה-NBA הרשמי, ~14–21 באוגוסט 2026.
