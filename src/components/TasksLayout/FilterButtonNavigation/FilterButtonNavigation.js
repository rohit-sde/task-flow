import React from "react";
import classes from "./FilterButtonNavigation.module.scss";
import { Link } from "react-router-dom";

const FilterButtonNavigation = (props) => {
    const routes = [
        { text: "Recent", filter: "recent", route: "/tasks/recent/page/1" },
        { text: "Upcoming", filter: "upcoming", route: "/" },
        { text: "Pending", filter: "pending", route: "/tasks/pending/page/1" },
        { text: "Done", filter: "done", route: "/tasks/done/page/1" },
        { text: "Expired", filter: "expired", route: "/tasks/expired/page/1" },
    ];

    return (
        <div className={classes.FilterButtonDiv}>
            <div>
                {routes.map((link) => (
                    <Link
                        key={link.filter}
                        to={link.route}
                        className={
                            classes.FilterButton +
                            (props.active === link.filter
                                ? " " + classes.FilterButtonActive
                                : "")
                        }
                    >
                        {link.text}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FilterButtonNavigation;
