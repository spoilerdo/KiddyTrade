export default function(state = null, action) {
    switch (action.type) {
        case "SKIN":
            return action.payload;
    }

    return state;
}