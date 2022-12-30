import React from 'react'
import { useField } from 'formik';

export default function TextInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <label className='flex text-white text-sm mt-4' htmlFor={props.id || props.name}>{label}</label>
      <input className="border px-2 bg-slate-500 text-white text-sm rounded my-1 outline-none h-[30px]" {...field} {...props} id={props.id || props.name} />
      {meta.touched && meta.error ? (
        <div className="text-red-400 text-sm">{meta.error}</div>
      ) : null}
    </>
  );
};

