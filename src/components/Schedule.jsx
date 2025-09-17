import React from 'react'

export default function Schedule(){
  const today = {
    surah: 'سورہ الفاتحہ',
    hadith: 'حضرت احمد سے ایک منتخب حدیث',
    dua: 'دعائے طالب علم',
    qaida: 'نورانی قاعدہ - سبق 3',
    subject: 'صرف ونحو کا اجراء'
  }

  return (
    <section className="card section rtl">
      <h3>آج کا نصاب</h3>
      <div className="small">سورت: <strong>{today.surah}</strong></div>
      <div className="small">حدیث: <strong>{today.hadith}</strong></div>
      <div className="small">دعا: <strong>{today.dua}</strong></div>
      <div className="small">نورانی قاعدہ: <strong>{today.qaida}</strong></div>
      <div className="small">خاص توجہ: <strong>{today.subject}</strong></div>
    </section>
  )
}
