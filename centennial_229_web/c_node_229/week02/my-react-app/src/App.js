import React from 'react';
//import ReactDOM from 'react-dom';
function IngredientsList({ items }) {
return React.createElement(
"ul",
{ className: "ingredients" },
items.map((ingredient, i) =>
React.createElement("li", { key: i }, ingredient)
)
);
}
export default IngredientsList;

