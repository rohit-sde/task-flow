import * as constants from "./constants";

export const updateWaitLoader = (payload) => {
    return {
        type: constants.UPDATE_WAITLOADER,
        payload,
    };
};
