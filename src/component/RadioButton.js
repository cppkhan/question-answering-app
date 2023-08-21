import React from 'react'

export default function RadioButton(props) {
  return (
   <div className="flex bg items-center">
<div
onClick={props.onSelect}
className={`${props.select ?'border-[8px]':'border-[0px]'} border-[#35b3b5] bg-[#eeeeee] rounded-full w-8 h-8 hover:bg-[#dbdbdb] cursor-pointer`}

/>
  <label htmlFor="radio-option-1" className="ml-2 text-gray-700">
    {props.LabelTitle}
  </label>
</div>

  )
}
