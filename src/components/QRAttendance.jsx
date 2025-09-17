import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export default function QRAttendance({student}){
  const [dataUrl, setDataUrl] = useState(null)

  useEffect(()=>{
    const payload = JSON.stringify({id: student.id, name: student.name, school: 'علم مینار'});
    QRCode.toDataURL(payload, {width:160})
      .then(url => setDataUrl(url))
      .catch(err => console.error(err));
  },[student])

  return (
    <div style={{width:160,textAlign:'center',background:'#fff',padding:8,borderRadius:8}}>
      <div style={{fontSize:14,marginBottom:6}}>{student.name}</div>
      {dataUrl ? <img src={dataUrl} alt={`QR-${student.name}`} style={{width:140,height:140}} /> : <div>Generating...</div>}
      <div style={{marginTop:6}} className="small">QR برائے حاضری</div>
    </div>
  )
}
