import React, { useEffect, useState } from 'react'
import QRAttendance from './QRAttendance'

const STORAGE_PREFIX = 'ilmminar_attendance_'
function todayKey(){
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  return `${STORAGE_PREFIX}${y}-${m}-${day}`;
}

export default function Attendance(){
  const defaultStudents = [
    {id:1,name:'فاطمہ',present:false},
    {id:2,name:'عائشہ',present:false},
    {id:3,name:'زینب',present:false}
  ]

  const [students, setStudents] = useState(defaultStudents)
  const [loadedKey, setLoadedKey] = useState(todayKey())
  const [status, setStatus] = useState('')

  useEffect(()=>{
    // load from localStorage for today's key
    const key = todayKey();
    setLoadedKey(key);
    const raw = localStorage.getItem(key);
    if(raw){
      try{
        const parsed = JSON.parse(raw);
        // basic validation
        if(Array.isArray(parsed)) setStudents(parsed);
      }catch(e){
        console.error('Failed to parse attendance from storage', e);
      }
    }
  },[])

  useEffect(()=>{
    // auto-save whenever students change
    try{
      localStorage.setItem(loadedKey, JSON.stringify(students));
    }catch(e){
      console.error('Failed to save attendance', e);
    }
  },[students, loadedKey])

  function togglePresent(id){
    setStudents(prev => prev.map(s => s.id===id?{...s,present:!s.present}:s))
  }

  function exportCSV(){
    const rows = [['id','name','present']].concat(
      students.map(s=>[s.id,s.name,s.present?'حاضر':'غائب'])
    );
    const csv = rows.map(r=>r.map(c=>"\"" + String(c).replace(/"/g,'""') + "\"").join(',')).join('\n');
    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance_'+loadedKey.replace(STORAGE_PREFIX,'')+'.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function saveToServer(){
    setStatus('Saving to server...');
    try{
      const date = loadedKey.replace(STORAGE_PREFIX,'');
      const res = await fetch(`http://localhost:4000/api/attendance/${date}`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ students })
      });
      const j = await res.json();
      if(res.ok) setStatus('Saved to server ✅');
      else setStatus('Server error: ' + (j.error || res.status));
    }catch(e){
      console.error(e);
      setStatus('Failed to connect to server');
    }
    setTimeout(()=>setStatus(''),3000);
  }

  async function loadFromServer(){
    setStatus('Loading from server...');
    try{
      const date = loadedKey.replace(STORAGE_PREFIX,'');
      const res = await fetch(`http://localhost:4000/api/attendance/${date}`);
      if(res.ok){
        const j = await res.json();
        if(j && j.data && Array.isArray(j.data)){
          setStudents(j.data);
          setStatus('Loaded from server ✅');
        }else if(j && j.data && j.data.students){
          setStudents(j.data.students);
          setStatus('Loaded from server ✅');
        }else{
          setStatus('No data on server for this date');
        }
      }else if(res.status===404){
        setStatus('No server record for this date');
      }else{
        const j = await res.json();
        setStatus('Server error: ' + (j.error || res.status));
      }
    }catch(e){
      console.error(e);
      setStatus('Failed to connect to server');
    }
    setTimeout(()=>setStatus(''),3000);
  }

  function clearToday(){
    if(confirm('کیا آپ واقعی آج کی حاضری صاف کرنا چاہتے ہیں؟')){
      localStorage.removeItem(loadedKey);
      setStudents(defaultStudents.map(s=>({...s, present:false})))
    }
  }

  return (
    <section className="card section rtl">
      <h3>روزانہ حاضری</h3>
      <div className="small">تاریخ: <strong>{loadedKey.replace(STORAGE_PREFIX,'')}</strong></div>
      <div className="small">آنے کا وقت: <strong>08:00 AM</strong></div>
      <div className="small">اسمبلی: <strong>ہاں</strong></div>
      <div className="small">پیریڈ دورانیہ: <strong>440 منٹ</strong></div>

      <table style={{width:'100%',marginTop:12,borderCollapse:'collapse'}}>
        <thead>
          <tr><th>نام</th><th>حاضر؟</th></tr>
        </thead>
        <tbody>
          {students.map(s=>(
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>
                <input type="checkbox" checked={s.present} onChange={()=>togglePresent(s.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{marginTop:12}}>
        <button className="btn" onClick={exportCSV}>CSV ایکسپورٹ (حاضر/غائب کے ساتھ)</button>
        <button className="btn" style={{background:'#16a34a',marginLeft:8}} onClick={saveToServer}>Save to Server</button>
        <button className="btn" style={{background:'#0ea5a4',marginLeft:8}} onClick={loadFromServer}>Load from Server</button>
        <button className="btn" style={{background:'#ef4444',marginLeft:8}} onClick={clearToday}>آج کی حاضری صاف کریں</button>
      </div>

      <div style={{marginTop:12, minHeight:24}} className="small">{status}</div>

      <div style={{marginTop:12}} className="small">ہر طالبہ کے لیے QR کوڈ (اختیاری):</div>
      <div style={{display:'flex',gap:12,marginTop:8,flexWrap:'wrap'}}>
        {students.map(s=> (
          <QRAttendance key={s.id} student={s} />
        ))}
      </div>
    </section>
  )
}
