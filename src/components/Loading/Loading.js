import React from "react";
import Loader from "../UI/Loader/Loader";
import classes from "./Loading.module.scss";
import image from "./logo-512x512.png";

const Loading = (props) => {
    return (
        <div className={classes.Loading}>
            <div className={classes.Card}>
                <div
                    className={classes.Image}
                    style={{
                        backgroundImage: `url(${image})`,
                    }}
                />
                <div className={classes.Text}>Task Cutive</div>
                <Loader />
            </div>
        </div>
    );
};

export default Loading;
