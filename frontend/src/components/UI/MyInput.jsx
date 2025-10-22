import React from 'react';

const MyInput = props => {
    return (
        <input
            {...props}
            style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                transition: 'border-color 0.2s',
                outline: 'none',
                ...props.style
            }}
            onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                props.onFocus?.(e);
            }}
            onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                props.onBlur?.(e);
            }}
        >
            {props.children}
        </input>
    );
};

export default MyInput;