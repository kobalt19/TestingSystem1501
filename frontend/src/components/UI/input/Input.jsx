import React from 'react';
import cl from './Input.module.css';


const Input = React.forwardRef(({text, ...args}, ref) =>
{
    return (
        <input className={cl.MyInput} ref={ref} value={text} type="text" {...args}/>
    )
});


export default Input;
