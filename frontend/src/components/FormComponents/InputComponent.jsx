import React from 'react';
import { Controller, Control } from 'react-hook-form';

function FormInputComponent({ label, type, name, control, ...props }) {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={name} className="mb-[4px] flex">
                    <h4 className="text-[12px] font-medium text-black">{label}</h4>
                    {props?.required && label && <span className="text-[12px]	text-red">*</span>}
                </label>
            )}

            <div>
                <Controller
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <input
                            {...field}
                            type={type}
                            id={name}
                            name={name}
                            accept={props?.accept}
                            placeholder={props?.placeholder}
                            className={`${props?.error ? 'border-[#B22B2B] bg-[#ffdada]' : 'border-[#E4E4E4] bg-white'
                                } w-full  rounded-[4px] border-[1px] px-[10px]   py-[12px] text-[16px] font-[400]  text-black placeholder:text-[14px] placeholder:text-[##B2B3B4] focus:outline-[#E4E4E4]`}
                        />
                    )}
                />
                <span
                    className={`m-[4px] text-[12px] ${props?.error ? 'text-[#B22B2B]' : 'text-transparent'}`}
                >
                    {props?.error ? props?.error : 'no error'}
                </span>
            </div>
        </div>
    );
}

export default FormInputComponent;
