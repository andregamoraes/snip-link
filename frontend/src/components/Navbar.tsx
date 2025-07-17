'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Shorten', href: '/shorten' },
  { name: 'Dashboard', href: '/dashboard' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            SnipLink
        </div>

        <ul className="flex gap-6 text-sm font-medium text-gray-700">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  'hover:text-purple-600 transition',
                  pathname === link.href && 'text-purple-600 font-semibold'
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
