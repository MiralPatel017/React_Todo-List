import React from 'react'
import ChildFunction from './ChildFunction'

const ParentFunction = () => {
    const [message] = React.useState('Parent Function')

    const alertFunction = () => {
        alert(`Hello From ${message}`)
    }

    return (
        <div className='text-center'>
            <h1>
                {/* {message} */}
                hello It&apos;s Parent Function
            </h1>

            {/* <button className='bg-black text-white w-[120px] h-[30px] rounded-[20px]'
                onClick={alertFunction}>click me</button> */}

            <ChildFunction  parentfunctionHandler = {alertFunction}/>
        </div>
    )
}

export default ParentFunction