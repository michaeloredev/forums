import React from 'react';
import GolfForm from './golf-form';
import GolfForum from './golf-forum';

export default function GolfPage() {
  return(
<div className='flex flex-col w-full'>
  <GolfForm />
  <GolfForum />
</div>
)
}
