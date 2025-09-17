import React from 'react'
import Logo from './Logo'

export default function Header(){
  return (
    <header className="card header-row rtl">
      <div>
        <h1 style={{margin:0}}>مدرسۃ لبنات الاسلامیہ - مچھی پول</h1>
        <div className="small">مھتمم: عائشۃ صدیقۃ — حافظ: مفتی محمد شعیب خان آلائی</div>
      </div>
      <Logo />
    </header>
  )
}
