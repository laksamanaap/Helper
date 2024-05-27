import { Span } from 'next/dist/trace';
import React from 'react';

interface InputFormProps {
    label?: string;
    type: string;
    id: string;
    htmlFor: string;
    placeholder?: string;
    width?: string;
    value: string;
    important?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputForm({
    label,
    type,
    id,
    htmlFor,
    placeholder,
    width,
    value,
    important,
    onChange
}: InputFormProps) {
    return (
        <div className={`mb-5 ${width === 'half' && 'w-1/2'}`}>
            {label && (
                <label htmlFor={htmlFor} className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-black">
                    {label} {important === true && (<span className='text-red-500 font-semibold'>*</span>)}
                </label>
            )}
            <input
                type={type}
                id={id}
                className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
                required
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
