import React from "react";
import classes from "./Date.module.scss";
import { IconContext } from "react-icons";
import { HiFlag } from "react-icons/hi";

const Date = (props) => {
    let date = new window.Date(props.date).toDateString().split(" ");
    date[2] = Number(date[2]).toString();

    return (
        <div className={classes.Date}>
            <div>
                {props.isHighPriority && (
                    <div className={classes.Flag} data-high-priority="1">
                        <IconContext.Provider value={{ size: "1.5em" }}>
                            <HiFlag />
                        </IconContext.Provider>
                    </div>
                )}
                <div className={classes.Icon}>
                    <div className={classes.Day}>{date[0]}</div>
                    <div className={classes.MainDateCon}>
                        <div className={classes.DateNum}>{date[2]}</div>
                        <div className={classes.MainDateConSub}>
                            <div className={classes.Month}>{date[1]}</div>
                            <div className={classes.Year}>{date[3]}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Date;
