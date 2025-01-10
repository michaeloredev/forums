import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <container className='flex justify-center align-between mt-4'>
        <div className="flex p-8">
            <Link href='/'>Welcome</Link>
        </div>
        <div className="flex p-8">
            <Link href='/pages/golf'>Golf</Link>
        </div>
        <div className="flex p-8">
        <Link href='/pages/hoa'>HOA</Link>
        </div>
    </container>
  )
}
