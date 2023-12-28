import React, {  useCallback, useEffect, useRef, useState } from 'react'
import { IComments, initialComments } from '../../interfaces/IComments'
import axios from 'axios'
import Card from '../Card'


const CardsContainer :React.FC = () => {
    const [comments, setComments] = useState<IComments>(initialComments)
    const [commentsToSkip, setCommentsToSkip] = useState<number>(0)
    const containerRef = useRef<HTMLDivElement>(null)
    
    const fetchComments = useCallback(() =>{
        const baseUrl : string = 'https://dummyjson.com/comments?limit=10&skip=' + commentsToSkip 
        axios.get(baseUrl)
            .then(response => setComments(response.data.comments)
            )
    }, [commentsToSkip])

    const handleScroll = useCallback(() =>{
        if(containerRef.current){
            if (window.scrollY + window.screen.height < containerRef.current?.clientHeight){
                console.log('speroDiNonVederti'); 
                return
            }
            setCommentsToSkip((prev) => prev + 1)
            console.log(commentsToSkip);
            
        }
    },[])

    useEffect(() => {
        fetchComments();

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    },[fetchComments, handleScroll])

    return (
        <>
            <h1 className='my-4'>Infinite Scroll of Comments</h1>
                <div className='cards-container' ref={containerRef}>
                    {
                        comments.map((comment) => (
                            <Card comment={comment} key={comment.id} />
                        ))
                    }
                </div>
        </>
    )
}

export default CardsContainer