import React from "react";

interface AuthButtonProps {
    className?: string | null;
    text?: string | null
    onClick?: React.MouseEventHandler<HTMLParagraphElement>
  }
  
  const LabelMessage: React.FC<AuthButtonProps> = ({ className,text, onClick}) => {
    return (
        <p
        className={`${className}`}
        onClick={onClick}
        >
            {text}
        </p>
    )
  }
  
  export default LabelMessage