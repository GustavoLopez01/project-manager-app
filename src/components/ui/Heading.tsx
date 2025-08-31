import { ReactNode } from 'react';

export default function Heading({ children }: { children: ReactNode }) {
  return (
    <h1 className="w-full text-black font-bold text-2xl">
      { children }
    </h1>
  )
}
