/* -- Credit for this features goes to Florin Pop https://www.youtube.com/watch?v=AbRgaY0khPM  -- */

import { useState } from 'react';
import "./ProgressBar.css";
export default function ProgressBar({ done }) {
    const [style, setStyle] = useState({})
    
    setTimeout(() => {
        const newStyle = {
            opacity: 1,
            width: `${done}%`
        }
        setStyle(newStyle);
    }, 1000);

    return (
        <div className="progress">
            <div className="progress-done" style={style}>
                {done}%
            </div>
        </div>
    )

}