import React from 'react';
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import App from './App';
import "./index.css"


ReactDOM.render(
    
    <Router >
        <div className = "pageStyle">
        <App />
        </div>
    </Router>,
    document.getElementById('root')
);
