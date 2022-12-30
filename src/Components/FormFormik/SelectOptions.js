import styled from '@emotion/styled';
import { useField } from 'formik';
import React from 'react'


const StyledErrorMessage = styled.div`
  font-size: 12px;
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }
`;
export default function MySelect({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <label className='flex text-white text-sm mt-2' htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} className="w-[193px] bg-slate-500 text-white px-1 text-sm h-[25px] rounded my-1 border" />
      {meta.touched && meta.error ? (
        <StyledErrorMessage className='text-red-500'>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );

}
