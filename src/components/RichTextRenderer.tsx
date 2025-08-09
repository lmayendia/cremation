import React from 'react';
import { RichTextContent } from '@/types';

interface RichTextRendererProps {
  content: RichTextContent | string;
  className?: string;
  as?: 'span' | 'p' | 'div';
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content, className = "", as = 'span' }) => {
  const Element = as;

  // Handle legacy string content
  if (typeof content === 'string') {
    return <Element className={className} dangerouslySetInnerHTML={{ __html: content }} />;
  }

  // Handle structured rich text content
  switch (content.type) {
    case 'html':
      return (
        <Element 
          className={className} 
          dangerouslySetInnerHTML={{ __html: content.content }} 
        />
      );
    
    case 'markdown':
      // You could add a markdown parser here like 'react-markdown'
      // For now, just render as plain text
      return <Element className={className}>{content.content}</Element>;
    
    case 'plain':
    default:
      return <Element className={className}>{content.content}</Element>;
  }
};

export default RichTextRenderer; 