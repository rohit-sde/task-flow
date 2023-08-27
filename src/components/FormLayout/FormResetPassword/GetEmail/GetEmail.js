import React, { forwardRef } from "react";
import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";

const GetEmail = (props, refObj) => {
    return (
        <form>
            <Input
                label="Email"
                attr={{
                    id: "getEmail",
                    name: "getEmail",
                    type: "email",
                    value: "",
                    autoComplete: "off",
                    autoFocus: true,
                    onChange: emailHandler,
                    args_on_change: [props.messageStateHook],
                }}
                ref={refObj}
                refSet="emailRef"
            />
            <Button id="sendOTP" onClick={props.onClick}>
                Send OTP
            </Button>
        </form>
    );
};

const emailHandler = (e, setValue, setError, messageStateHook) => {
    setValue(e.target.value);
    const [message, setMessage] = messageStateHook;
    if (message !== "") {
        setMessage({ text: "", show: 0, error: 0 });
    }
};

export default forwardRef(GetEmail);
