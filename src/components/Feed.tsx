import React from 'react'
import InputBox from './InputBox'
import Posts from './Posts'
import Stories from './Stories'

export default function Feed() {
  return (
    <div className='flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-4 overflow-y-auto scrollbar-hide'>
        <div className='mx-auto max-w-md md:max-w-lg lg:max-w-2xl'>
            <Stories />
            <InputBox />
            <Posts />
        </div>
    </div>
  )
}
