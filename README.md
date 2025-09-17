# Ilm-Minar Madrasah App (v1.4) with Server

## فیچرز
- فرنٹ اینڈ React ایپ (v1.3 فیچرز)
- سادہ Node.js + Express سرور جو حاضری کو `server/data/YYYY-MM-DD.json` میں محفوظ کرتا ہے
- فرنٹ اینڈ سے 'Save to Server' اور 'Load from Server' بٹن

## چلانے کا طریقہ (لوکل)
1. فرنٹ اینڈ:
   - `cd <project-folder>`
   - `npm install`
   - `npm run dev`  (vite default: http://localhost:5173)

2. سرور (ایک الگ ٹرمینل میں):
   - `cd server`
   - `npm install`
   - `npm start`  (سرور http://localhost:4000 پر سن کر رہے گا)

3. فرنٹ اینڈ میں "Save to Server" دبائیں — یہ آپ کی موجودہ حاضری سرور پر محفوظ کر دے گا۔
   - محفوظ فائل سرور کے `server/data/YYYY-MM-DD.json` میں بنے گی۔
4. "Load from Server" سے آپ سرور پر محفوظ شدہ ڈیٹا واپس لا سکتے ہیں۔

## نوٹس
- یہ سادہ ڈیمو ہے: پروڈکشن میں آپ کو authentication، HTTPS، اور ڈیٹا بیس چاہیئے ہوگا۔
- اگر آپ چاہیں تو میں MongoDB یا SQLite کے ساتھ سرور بھی بنا دوں گا۔
