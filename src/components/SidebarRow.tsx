import Image from 'next/image'
import React from 'react'

export default function SidebarRow({src, Icon, title }: any) {
  return (
    <div className='flex items-center space-x-2 p-4 hover:bg-gray-200 rounded-xl cursor-pointer'>
        {src && (
            <Image 
                className='rounded-full'
                src={src}
                alt="Profile Img"
                width={30}
                height={30}
            />
        )}

        {Icon && (
            <Icon className="h-8 w-8 text-blue-500" />
        )}
        <p className='hidden sm:inline-flex font-medium'>{title}</p>
    </div>
  )
}
