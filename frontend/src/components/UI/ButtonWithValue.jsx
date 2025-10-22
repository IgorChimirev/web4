import React from "react";
import MyButton from "./MyButton";

export const ButtonWithValue = (props) => {

    return (
        <MyButton {...props}>
            {props.name}={props.value}
        </MyButton>
    );
}