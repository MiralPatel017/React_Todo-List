// eslint-disable-next-line no-unused-vars
import React from 'react'

import { useState } from "react"

const ChangetextFunction = () => {
    const [message, satMsg] = useState("Change text from the Function Components ...")


    return (
        <div>
            <h1 className="text-[25px]">
                {message}
            </h1>

            <button className="w-[120px] mt-5 bg-black text-white py-2 rounded-[20px]"
                onClick={
                    () => satMsg("You Clicked on the Button ....")
                }>
                Click me !
            </button>
        </div>
    )
}

export default ChangetextFunction