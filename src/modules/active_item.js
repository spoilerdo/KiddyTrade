//Actions
export const selectItem = (item) => {
    return {
        type: "SKIN",
        payload: item,
    }
}

//Reducers
export default (state = null, action) => {
    switch(action.type) {
        case "SKIN":
            return action.payload;
        default:
            return state;
    }
}