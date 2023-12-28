import React, { useEffect, useState } from 'react'
import { IComments, initialComments } from '../../interfaces/IComments'


const CardsContainer = () => {
    const [comments, setComments] = useState<IComments>(initialComments) 

    useEffect(() =>{
        console.log("abda")
    })
    

    return (
        <div>CardsContainer</div>
    )
}

export default CardsContainer