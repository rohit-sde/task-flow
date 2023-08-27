import React from "react";
import classes from "./Pagination.module.scss";
import { Link } from "react-router-dom";

const Pagination = (props) => {
    let totalPages = Math.floor(props.total / props.perPage);
    if (props.total % props.perPage !== 0) totalPages++;

    let pages = getList(totalPages, props.current).map((v) => {
        let obj = {
            num: v,
            link: `/tasks/${props.filter}/page/${v}`,
        };
        if (v === 1 && props.filter === props.defaultFilter) {
            obj.link = "/";
        }
        return obj;
    });

    return (
        <div className={classes.Pagination}>
            <ul>
                {pages.length === 5 && pages[0].num > 1 && (
                    <li className={classes.SideButton}>
                        <Link
                            to={
                                props.filter === props.defaultFilter
                                    ? "/"
                                    : `/tasks/${props.filter}/page/1`
                            }
                        >
                            {"<<"}
                        </Link>
                    </li>
                )}
                {pages.map((v) => (
                    <li
                        key={v.num}
                        className={
                            v.num === props.current ? " " + classes.Active : ""
                        }
                    >
                        <Link to={v.link}>{v.num}</Link>
                    </li>
                ))}
                {pages.length === 5 && pages[4].num < totalPages && (
                    <li className={classes.SideButton}>
                        <Link to={`/tasks/${props.filter}/page/${totalPages}`}>
                            {">>"}
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};
const getList = (t, c, i = 0, a = []) => {
    // t => total, c => current, a => array, i => ...,-1, 0, 1, ...
    if (t < c) return [];
    if (i === 0) {
        a.push(c);
        return getList(t, c, --i, a);
    } else {
        if (a.length < 5 && a.length < t) {
            if (i > 0) {
                // console.log('p')
                if (c + i <= t) a.push(c + i);
                return getList(t, c, -++i, a);
                // return c - (i+1) >=1 ? getList(t, c, -(++i) , a) : getList(t, c, ++i , a)
            } else {
                // console.log('u')
                if (c + i >= 1) a.unshift(c + i);
                return getList(t, c, Math.abs(i), a);
                // return c + Math.abs(i) <= t ? getList(t, c, Math.abs(i) , a) : getList(t, c, --i , a)
            }
        } else return a;
    }
};

export default Pagination;
