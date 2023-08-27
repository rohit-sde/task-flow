import React, { useEffect, useState } from "react";
import classes from "./WaitLoader.module.scss";

const WaitLoader = (props) => {
    const [dots, setDots] = useState("");
    const { message = "Submitting Data." } = props;

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDots((dots) => {
                if (dots.length >= 3) {
                    return ".";
                } else {
                    return dots + ".";
                }
            });
        }, 800);

        return () => {
            clearInterval(intervalId);
        };
    }, []);
    return (
        <div className={classes.WaitLoader}>
            <div className="backdrop"></div>
            <div className="loaderCon">
                <div className={classes.loader}>
                    <span className="base">
                        <span className="left">
                            <span />
                        </span>
                        <span className="right">
                            <span />
                        </span>
                        <span className="text">
                            <span>Wait</span>
                            <span>{dots}</span>
                        </span>
                    </span>
                </div>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default WaitLoader;
