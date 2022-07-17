import React from 'react'
import './BackBtn.css'

export default function BackBtn({ onClick }){
    return(
        <button onClick={onClick} className="back-btn">Back</button>
    )
}