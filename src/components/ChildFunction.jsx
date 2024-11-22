// eslint-disable-next-line no-unused-vars
import React from 'react'

function ChildFunction (props){
  return (
    <div>
        <div>
            
            <button className='bg-black text-white w-[120px] h-[30px] rounded-[20px]'
                // eslint-disable-next-line react/prop-types
                onClick={() => props.parentfctionHandler()}>click me</button>
        </div>
    </div>
  )
}

export default ChildFunction