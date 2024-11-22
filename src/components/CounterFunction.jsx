// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import ChangetextFunction from './ChangetextFunction'
const CounterFunction = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <div>
                You Clicked <b> {count} </b> times on the Button from Function Component ....
            </div>

            <button className='bg-black text-white w-[120px] h-[40px] rounded-[20px] mt-5' 
            onClick={() => setCount(count + 1)}>
                Click Me!
            </button>
            <ChangetextFunction/>
        </div>
    );
}

export default CounterFunction;