import React from "react";
import FormLogin from "./FormLogin/FormLogin";
import FormSignup from "./FormSignup/FormSignup";
import FormResetPassword from "./FormResetPassword/FormResetPassword";
import FormVerifyEmail from "./FormVerifyEmail/FormVerifyEmail";
import classes from "./FormLayout.module.scss";
import logo from "./logo-transparent-192x192.png";
import textImage from "./task-cutive.JPG";

const FormLayout = (props) => {
    let clsNames = [classes.FormLayout];
    props.formType === "Login" && clsNames.push(classes[props.formType]);
    props.formType === "Signup" && clsNames.push(classes[props.formType]);
    props.formType === "ResetPassword" &&
        clsNames.push(classes[props.formType]);
    props.formType === "VerifyEmail" && clsNames.push(classes[props.formType]);
    clsNames = clsNames.join(" ");
    // console.log(logo)

    return (
        <div className={clsNames}>
            <div className={classes.Logo}>
                <div style={{ backgroundImage: `url(${logo})` }}></div>
            </div>
            {/* Font Family used: https://fonts.google.com/specimen/Akronim */}
            <div
                className={classes.taskCutiveImage}
                style={{ backgroundImage: `url("${textImage}")` }}
            ></div>
            <hr />
            <div>
                {props.formType === "Login" && (
                    <FormLogin loginData={props.loginData} />
                )}
                {props.formType === "Signup" && (
                    <FormSignup loginData={props.loginData} />
                )}
                {props.formType === "ResetPassword" && (
                    <FormResetPassword loginData={props.loginData} />
                )}
                {props.formType === "VerifyEmail" && (
                    <FormVerifyEmail loginData={props.loginData} />
                )}
            </div>
            {/* <div>{Array.from({length: 10}, (v, i) => <p key={i*i}>{i}</p>)}</div> */}
        </div>
    );
};

export default FormLayout;
