import { useField } from 'formik';
import React from 'react'

export default function Checkbox({ children, ...props }) {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="flex text-white">
        <input {...field} {...props} type="checkbox" className='mr-2' />
        <span className='text-sm'>
          {children}
        </span>
      </label>
      {meta.touched && meta.error ? (
        <div className="text-red-400 text-sm">{meta.error}</div>
      ) : null}
    </>
  );
}
