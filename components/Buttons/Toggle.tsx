"use client";

export default function Toggle({ isChecked, handleOnchange, isDisabled }: any) {
    return (
        <>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleOnchange}
                    disabled={isDisabled}
                    className="h-6 w-11 rounded-full bg-gray-200 transition-colors duration-200 checked:bg-blue-500 cursor-pointer"
                />
                <span className="slider"></span>
            </label>
        </>
    )
}