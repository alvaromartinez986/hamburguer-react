import React from 'react'
import './Burguer.css';
import BurguerIngredient from "./BurguerIngredient/BurguerIngredient";

const Burguer = props => {
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurguerIngredient key={igKey + i} type={igKey} />
        })
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start to add ingredients</p>;
    }

    return (
        <div className="Burguer">
            <BurguerIngredient type="bread-top" />
            {transformedIngredients}
            <BurguerIngredient type="bread-bottom" />
        </div>
    )
}



export default Burguer; 
