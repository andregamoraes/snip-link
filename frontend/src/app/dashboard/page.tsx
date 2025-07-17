'use client';

import { useEffect, useState } from 'react';
import { BarChart } from 'lucide-react';
import axios from 'axios';

interface MostVisitedUrl {
  urlId: string;
  slug: string;
  originalUrl: string;
  visitCount: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DashboardPage() {
  const [data, setData] = useState<{ total: number; top: MostVisitedUrl[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/url-visits`)
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-2">
        <BarChart className="w-6 h-6 text-purple-600" />
        URL Visit Dashboard
      </h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          <div className="mb-10 text-center">
            <span className="text-5xl font-extrabold text-purple-600">
              {data?.total ?? 0}
            </span>
            <p className="text-lg text-gray-600">Total visits tracked</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Top 5 Most Visited URLs</h2>
            <ul className="divide-y divide-gray-200">
              {data?.top.map((url) => (
                <li key={url.urlId} className="py-4 flex items-start justify-between">
                  <div>
                    <p className="text-purple-700 font-medium text-sm mb-1">
                      {`${API_BASE_URL}/${url.slug}`}
                    </p>
                    <p className="text-gray-600 text-sm">{url.originalUrl}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    {url.visitCount} visits
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
