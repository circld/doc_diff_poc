import React, { useContext, useReducer } from 'react';

export const StateContext = React.createContext();

export const StateProvider = props => (
  <StateContext.Provider value={useReducer(props.reducer, props.initialState)}>
    {props.children}
  </StateContext.Provider>
);

export const useStateStore = () => useContext(StateContext);
