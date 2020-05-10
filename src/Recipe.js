import React from 'react'

function Recipe({info}){
    return(
        <div className='recipe'>
            <h1>{info.label}</h1>
            <a href={info.url} target='_blank' rel='noopener noreferrer'><img src={info.image} alt=''/></a>
            <p>Calories: {Math.floor(info.calories)}</p>
            <ul>
                {info.ingredients.map((item, index) => (
                    <li key={index}>{item.text}</li>
                ))}
            </ul>
        </div>
    )
}

export default Recipe