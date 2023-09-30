import React from 'react';
import ExploreSharpIcon from '@mui/icons-material/ExploreSharp';


interface PageTitleProps {
  text: string;
  className?: string
}

const PageTitle: React.FC<PageTitleProps> = ({ text, className }) => {
  return (
    <h1 className={`w-full text-xl md:text-2xl font-bold text-emerald-800 mb-8 flex items-center ${className}`}>
      <ExploreSharpIcon className='mr-2'/>
      {text}
    </h1>
  );
}

export default PageTitle;
