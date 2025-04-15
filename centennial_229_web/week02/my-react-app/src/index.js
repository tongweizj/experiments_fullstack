import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
const items = [
"1 cup unsalted butter",
"1 cup crunchy peanut butter",
"1 cup brown sugar",
"1 cup white sugar",
"2 eggs",
"2.5 cups all purpose flour",
"1 teaspoon baking powder",
"0.5 teaspoon salt"
];
root.render(
 <React.StrictMode>
 <App items={items} />
 </React.StrictMode>
);
