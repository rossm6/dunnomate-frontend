export default function reducerFactory (actions) {

    return (state, action) => {
        if (action.type in actions) return actions[action.type](state, action.payload);
        throw new Error();
    };

}