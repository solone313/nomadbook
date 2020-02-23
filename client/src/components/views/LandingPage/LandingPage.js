import React from 'react'
import { FaCode } from "react-icons/fa";

function LandingPage() {
    return (
        <>
        <div className="app">
            <FaCode style={{ fontSize: '4rem' }} /><br />
            <span style={{ fontSize: '2rem' }}>서비스 개발중입니다..!</span>
        </div>
        <div style={{ float:'right' }}>Thanks For Using This Boiler Plate by John Ahn</div>
        </>
    )
}

export default LandingPage
