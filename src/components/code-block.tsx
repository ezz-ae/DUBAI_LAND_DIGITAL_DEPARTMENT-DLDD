
'use client';

import React, { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    try {
      let result;
      if (hljs.getLanguage(language)) {
        result = hljs.highlight(code, { language, ignoreIllegals: true });
      } else {
        // Fallback to plaintext if the language is not registered
        result = hljs.highlight(code, { language: 'plaintext', ignoreIllegals: true });
      }
      setHighlightedCode(result.value);
    } catch (error) {
      console.error(`Highlighting failed for language ${language}:`, error);
      // Fallback to plaintext on any error
      const result = hljs.highlight(code, { language: 'plaintext', ignoreIllegals: true });
      setHighlightedCode(result.value);
    }
  }, [code, language]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getLanguageDisplayName = (lang: string) => {
    const langMap: { [key: string]: string } = {
        solidity: 'Solidity',
        python: 'Python',
        shell: 'Shell',
        bash: 'Bash',
        plaintext: 'Text',
        ebram: 'EBRAM'
    };
    return langMap[lang.toLowerCase()] || lang;
  }

  return (
    <div className="relative my-4 rounded-lg bg-[#0d1117] border">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <span className="text-xs font-semibold text-gray-400">{getLanguageDisplayName(language)}</span>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={copyToClipboard}>
          {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-gray-400" />}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code
          className={cn('hljs', `language-${language}`)}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
}
