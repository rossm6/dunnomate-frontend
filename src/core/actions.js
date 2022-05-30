const DEFAULT_GAME_ACTIONS  = {
    beginPractice: (state, payload) => {
        return { ...state, view: "practiceMode" }
    },
    handleMainMenuPlayButtonClick: (state, payload) => {
        return { ...state, view: "game" };
    },
    setView: (state, payload) => {
        return {
            ...state,
            view: payload
        };
    }
};

export default DEFAULT_GAME_ACTIONS;