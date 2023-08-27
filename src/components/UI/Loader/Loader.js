import React from "react";
import classes from "./Loader.module.scss";

const Loader = (props) => {
    let cls = [classes.Loader];
    if (props.debug) cls.push(classes.Debug);
    return (
        <div className={cls.join(" ")}>
            <div className={`${classes.SquareContainer} ${classes.Common}`}>
                <div
                    className={`${classes.Square1} ${classes.Common} ${classes.SquareCommon}`}
                >
                    &nbsp;
                </div>
                <div
                    className={`${classes.Square2} ${classes.Common} ${classes.SquareCommon}`}
                >
                    &nbsp;
                </div>
                <div
                    className={`${classes.Square3} ${classes.Common} ${classes.SquareCommon}`}
                >
                    &nbsp;
                </div>
                <div
                    className={`${classes.Square4} ${classes.Common} ${classes.SquareCommon}`}
                >
                    &nbsp;
                </div>
                <div
                    className={`${classes.Square5} ${classes.Common} ${classes.SquareCommon}`}
                >
                    &nbsp;
                </div>
            </div>
        </div>
    );
};

export default Loader;
