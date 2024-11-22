import React from 'react'

const CountRefFunction = () => {

    const [count, setCount] = React.useState(0)

    const countIncRef = React.useRef(0)
    const countResRef = React.useRef(0)
    const countDecRef = React.useRef(0)

    // increment
    const increment = () => {
        setCount(count + 1)
        countIncRef.current += 1
    }

    // decrement
    const decrement = () => {
        setCount(count - 1)
        countDecRef.current += 1
    }

    // reset
    const reset = () => {
        setCount(0)
        countResRef.current += 1
    }

return (
    <div className='text-center text-yellow-600 bg-gradient-to-r from-slate-900  via-purple-950 to-slate-900 h-screen'>

        <h1 className='text-[30px] pt-6'>
            Counter app using React useRef()
        </h1>

        <button className='text-[35px] mt-5' disabled>
            {count}
        </button>

        <div className='mt-5'>

            {/* increment */}
            <button className='text-[18px] mx-10 border-yellow-600 border p-2 rounded-lg w-[120px] cursor-default'
                onClick={increment}>
                Increment
            </button>

            {/* Reset */}
            <button className='text-[18px] mx-10 border rounded-lg w-[100px] p-2 border-yellow-600 cursor-default'
                onClick={reset}>
                Reset
            </button>

            {/* decrement */}
            <button className='text-[18px] mx-10 border w-[130px] rounded-lg p-2 pb-2 border-yellow-600 cursor-default'
                onClick={decrement}>
                Decrement
            </button>
        </div>

        <div className='mt-8 mx-[36%]'>

            <table className='w-[300px] border-yellow-600 border '>

                <thead className=''>
                    <th className='py-[10px]'>
                        Button
                        <hr className='border border-yellow-600 ml-[10px] w-[200px] my-1 mt-2 mb-4' />
                    </th>
                    <th className='py-[10px]'>
                        Count
                        <hr className='border border-yellow-600 mr-[10px] w-[200px] my-1 mb-4 mt-2' />
                    </th>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Increment

                            <hr className='border border-yellow-600 ml-[10px] w-[200px] my-1 mt-2 mb-4' />
                        </td>

                        <td>
                            {/* count */}
                            {countIncRef.current}

                            <hr className='border border-yellow-600 mr-[10px] w-[200px] my-1 mb-4 mt-2' />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Reset

                            <hr className='border border-yellow-600 ml-[10px] w-[200px] my-1 mt-2 mb-4' />
                        </td>

                        <td>
                            {/* reset */}
                            {countResRef.current}

                            <hr className='border border-yellow-600 mr-[10px] w-[200px] my-1 mb-4 mt-2' />

                        </td>
                    </tr>

                    <tr>
                        <td>
                            Decrement

                            <hr className='border border-yellow-600 ml-[10px] w-[200px] my-1 mt-2 mb-4' />
                        </td>

                        <td className='mb-[10p]'>
                            {/* decrement */}
                           {countDecRef.current}

                            <hr className='border border-yellow-600 mr-[10px] w-[200px] my-1 mb-4 mt-2' />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
)
}

export default CountRefFunction