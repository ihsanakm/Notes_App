import { createStore,applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension'; // Correct import statement
import { reducer } from './redux/userReducer';
import {thunk} from 'redux-thunk'

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
