/* eslint-disable no-unused-vars */
import React from 'react'

const EventhandlerFunction = () => {

  const [message, setMessage] = React.useState('Welcome to Event handler from Function Component')

  const functionHandler = () => {
    setMessage('Bye to Event handler from Function Component')
    // this.functionHandler.bind
  }

  return (
    <div className='text-center'>

      <div>
        {message}
      </div>

      <button className='bg-black text-white w-[120px] h-[40px] rounded-[20px] mt-5'
    onClick={functionHandler}>
        Click me
      </button>

    </div>
  )
}

export default EventhandlerFunction