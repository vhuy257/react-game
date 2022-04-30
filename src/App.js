import './App.css';
import Navigation from './components/Navigation/Navigation';
import ListGame from './components/ListGame/ListGame';
import { createContext, useReducer, useEffect } from 'react';
import { LoadAllGame, LoadJackPost } from './service/GameService';
import reducer, { initialState } from './store/reducer';
import {
  LoadAllGameAction,
  LoadCurrentJackpots
} from './store/actions';

export const AppContext = createContext(initialState);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async() => {
      const data = await LoadAllGame();
      dispatch(LoadAllGameAction(data.data));
    }

    const fetchJackPost = async() => {
      const dataJackPots = await LoadJackPost();
      dispatch(LoadCurrentJackpots(dataJackPots.data));
    }
    
    fetchData();
    fetchJackPost();

    const interval = setInterval(() => {
      fetchJackPost();
    }, 5000); //Call api after 5s

    return () => clearInterval(interval);
}, [])

  return ( 
    <AppContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <Navigation data={state.ListMenu}/>
      <ListGame data={state.dataGames} searchKeyword={state.searchKeyword}/>
    </AppContext.Provider>
  );
}

export default App;
