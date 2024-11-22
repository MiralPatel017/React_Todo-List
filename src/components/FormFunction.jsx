import React from "react";

const FormFunction = () => {
    const [Username, setUsername] = React.useState("");
    const [Addrass, setAddrass] = React.useState("");
    const [Gender, setGender] = React.useState("Male");

    const onSubmitHandler = (e) => {
        e.preventDefault(); // Prevent page reload
        alert(`Username : ${Username} \n Address : ${Addrass} \n Gender : ${Gender}`);
        // The state remains unchanged, so the form retains the data
    };

    return (
        <div className="">
            <button
                className="mx-[150px] my-5 text-white bg-black text-center w-[150px] h-[40px] rounded-[20px]"
                disabled
            >
                Function Form
            </button>

            <form className="" onSubmit={onSubmitHandler}>
                {/* Username */}
                <div className="mt-2">
                  
                    <label className="mx-2">Username :-</label>
                    <input
                        type="text"
                        value={Username}
                        className="border border-black rounded"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/* Text Area */}
                <div className="mt-2">
                    <label className="mx-4">Address :-</label>
                    <textarea
                        value={Addrass}
                        onChange={(e) => setAddrass(e.target.value)}
                        className="border border-black rounded"
                    />
                </div>

                {/* Select */}
                <div className="mt-2">
                    <label className="mx-5">Gender :-</label>
                    <select
                        className="bg-black text-white p-1 rounded"
                        value={Gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="mt-2">
                    <button
                        className="bg-black text-white w-[120px] h-[30px] rounded-[20px] mx-20"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormFunction;
