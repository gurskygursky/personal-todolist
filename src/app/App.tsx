import React from 'react';
import './App.css';
import {Todolists} from "../features/todolists/Todolists";

export const App = React.memo(() => {
    return (
        <div className="App">
            <div>
                <button>
                    Login
                </button>
            </div>
            <div>
                <Todolists/>
            </div>
        </div>
    );
});