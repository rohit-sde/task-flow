import React, { useState, useEffect } from "react";
import Navigation from "./Navigation/Navigation";
import classes from "./TasksLayout.module.scss";
import TasksList from "./TasksList/TasksList";
import { Switch, Route, Redirect } from "react-router-dom";
import AddTask from "./AddTask/AddTask";
import FilterButtonNavigation from "./FilterButtonNavigation/FilterButtonNavigation";
import EditTask from "./EditTask/EditTask";
import Profile from "./Profile/Profile";

const TasksLayout = (props) => {
    const [reload, setReload] = useState(0);
    const [perPage] = useState(10);
    const [editTaskState, setEditTaskState] = useState({
        edit: false,
        task: null,
        url: null,
    });
    // console.log('[TasksLayout]')
    // console.log('Reload: '+ reload)

    useEffect(() => {
        if (reload === 1) {
            setReload(2);
        } else if (reload === 2) {
            setReload(0);
        }
    }, [reload]);

    return (
        <div className={classes.TasksLayout}>
            <Navigation />

            <Switch>
                <Route path="/addTask">
                    <AddTask />
                </Route>
                <Route path="/editTask">
                    {editTaskState.edit ? (
                        <EditTask
                            editTaskState={editTaskState}
                            setEditTaskState={setEditTaskState}
                        />
                    ) : (
                        <Redirect to="/" />
                    )}
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
                {reload === 0 && (
                    <Switch>
                        <Route
                            replace
                            path="/:tasks?/:filter?/:page?/:pageNum?"
                            render={(props) => {
                                const params = props.match.params;
                                let pageNum = 1;
                                if (params.page === "page") {
                                    let x = Number(params.pageNum);
                                    pageNum = x < 1 || isNaN(x) ? 1 : x;
                                }
                                const defaultFilter = "upcoming";
                                let filter = defaultFilter;
                                if (params.tasks === "tasks") {
                                    filter = [
                                        "recent",
                                        "upcoming",
                                        "done",
                                        "pending",
                                        "expired",
                                    ].includes(params.filter)
                                        ? params.filter
                                        : filter;
                                }
                                return (
                                    <>
                                        <FilterButtonNavigation
                                            active={filter}
                                        />
                                        <TasksList
                                            info={{
                                                page: pageNum,
                                                filter,
                                                perPage,
                                                defaultFilter,
                                            }}
                                            {...props}
                                            setEditTaskState={setEditTaskState}
                                            refreshTasksLayout={refreshTasksLayout.bind(
                                                null,
                                                setReload
                                            )}
                                        />
                                    </>
                                );
                            }}
                        />
                    </Switch>
                )}
            </Switch>
        </div>
    );
};
// Possible filter values: all, done, pending

const refreshTasksLayout = (setReload) => {
    setReload(1);
};
export default TasksLayout;
