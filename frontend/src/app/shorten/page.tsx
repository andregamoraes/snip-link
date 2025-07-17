'use client'

import { useState } from 'react'
import axios from 'axios'
import { Link, Copy } from 'lucide-react';

export default function ShortenPage() {
  const [url, setUrl] = useState('');
  const [shortened, setShortened] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [isShortened, setIsShortened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidUrl = (input: string) => {
    try {
      new URL(input);
      return true;
    } catch (_) {
      return false;
    }
  }

  const handleShorten = () => {
     if (!isValidUrl(url)) {
      setError('Please enter a valid URL!');
      return;
    }

    setError('');

    setIsLoading(true);

    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/urls`, { original_url: url })
        .then((response) => {
            const shortUrl = `${process.env.NEXT_PUBLIC_API_URL}/${response.data.slug}`;

            setShortened(shortUrl);
            setCopied(false);
            setIsShortened(true);
        })
        .catch((error) => {
            if (error.response?.status === 429) {
                setError('Rate limit exceeded. Wait a moment...');
            } else {
                setError('Failed to shorten URL!');
            }
        })
        .finally(() => {
            setIsLoading(false)
        })
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortened);
    setCopied(true);

    setTimeout(() => {
        setCopied(false)
    }, 2000);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full border rounded-2xl shadow-lg p-8 bg-white">
        <h1 className="text-3xl flex items-center font-bold mb-6">URL Shortener <Link className="ml-2 w-6 h-6 text-gray-500" /></h1>
        <p className="text-gray-600 mb-4 mt-4">Enter the URL to shorten</p>

        <label className="block text-left text-sm font-medium text-gray-700 mb-1">
          URL
        </label>
        <input
          type="text"
          value={url}
          onChange={e => {
            setUrl(e.target.value)
            setIsShortened(false)
          }}
          placeholder="https://example.com/foo/bar"
          className={`w-full px-4 py-3 rounded-lg mb-4 border text-base ${error ? 'border-red-500' : 'border-gray-300'}`}
        />

       {error && <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 text-sm">{error}</div>}

        {isShortened && (
            <p className="text-sm text-gray-500 mb-2">
                Edit the input above to shorten a new one.
            </p>
        )}

        <button
          onClick={handleShorten}
          disabled={!url || isShortened || isLoading}
          className={`px-6 py-3 rounded-md text-sm font-medium transition ${
                !url || isShortened || isLoading
                ? 'bg-purple-200 text-white cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700 cursor-pointer'
            }`}
        >
          {isLoading ? 'Loading...' : 'Shorten'}
        </button>


        {shortened && (
          <div className="mt-6 text-left">
            <p className="text-green-600 italic mb-2">
              Success! Here's your short URL:
            </p>
            <div className="flex items-center justify-between py-2 rounded">
              <a
                href={shortened}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 underline truncate"
              >
                {shortened}
              </a>
              <button
                onClick={handleCopy}
                className="ml-4 px-3 py-1 border border-purple-600 text-purple-600 text-sm flex items-center rounded hover:bg-purple-100 cursor-pointer"
              >
                {!copied && <Copy className="w-4 h-4 mr-2" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
