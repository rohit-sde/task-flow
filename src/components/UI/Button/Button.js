import React from "react";
import classes from "./Button.module.scss";

const Button = (props) => {
    let className = [classes.Button];
    className.push(props.styleType ? classes[props.styleType] : "");
    className = className.join(" ");

    return (
        <button id={props.id} className={className} onClick={props.onClick}>
            {props.children}
        </button>
    );
};

export default Button;
