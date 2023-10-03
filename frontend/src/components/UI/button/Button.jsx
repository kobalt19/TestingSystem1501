import React from 'react';
import cl from './Button.module.css';


const Button = React.forwardRef(({children, ...args}, ref) =>
{
    return (
        <button className={cl.MyButton} ref={ref} {...args}>{children}</button>
    )
});


export default Button;
