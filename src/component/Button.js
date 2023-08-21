import React from 'react'

export default function Button(props) {
  return (
    <div>
           <button className={`${props.width}  m-2  ${props.hoverBgColor}  rounded-md text-${props?.textColor?props?.textColor:"white"} ${props.bgColor} px-5 py-5 ${props?.style} text-[#ffffff]`} onClick={props.onClick}>{props.title}</button>

    </div>
  )
}
