import React, {  useCallback, useEffect, useState } from 'react'
import { IComments, initialComments } from '../../interfaces/IComments'
import axios from 'axios'


const CardsContainer :React.FC = () => {
    const [comments, setComments] = useState<IComments>(initialComments) 

    useEffect(() => fetchComments,[])

    
    const fetchComments = useCallback(() =>{
        const baseUrl : string = 'https://dummyjson.com/comments' 
        axios.get(baseUrl)
            .then(response => setComments(response.data.comments)
            )
            console.log(comments)
    }, [])
    return (
        <div>
            comments
            {
                comments.map((comment, index) => (
                    <div key={index}>commento id: {comment.id}</div>
                ))
            }
        </div>
    )
}

export default CardsContainer