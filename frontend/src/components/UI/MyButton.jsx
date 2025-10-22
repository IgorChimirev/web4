import React from 'react';
import { Button } from 'primereact/button';

const MyButton = props => {
    return (
        <Button
            className="my_button"
            {...props}
            style={{
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontWeight: '500',
                transition: 'all 0.2s ease-in-out',
                background: '#3b82f6',
                ...props.style
            }}
        >
            {props.children}
        </Button>
    );
};

export default MyButton;