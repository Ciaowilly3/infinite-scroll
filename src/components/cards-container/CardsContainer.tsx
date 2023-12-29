import React, {  useCallback, useEffect, useRef, useState } from 'react'
import { IComments, initialComments } from '../../interfaces/IComments'
import Card from '../Card'
import { retrieveComments } from '../../services/api'


const CardsContainer :React.FC = () => {
    const [comments, setComments] = useState<IComments>(initialComments)
    const [commentsToSkip, setCommentsToSkip] = useState<number>(0)
    const isRetrieving = useRef<boolean>(true)
    const isCallEmpty = useRef<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null)
    
    const fetchComments = useCallback( () =>{
            if(!isRetrieving.current)return;
            if(isCallEmpty.current)return;
            retrieveComments(commentsToSkip)
            .then(response => {
                const newComments : IComments = response.data.comments
                if (newComments.length === 0) isCallEmpty.current = true
                setComments(prevComments => [...prevComments, ...newComments])
            })
            .finally(() => {
                isRetrieving.current = false;
            });
    }, [commentsToSkip])

    const handleScroll = useCallback(() =>{
        if(containerRef.current && !isRetrieving.current){
            if (window.scrollY + window.screen.height < containerRef.current?.clientHeight) return

            setCommentsToSkip((prev) => prev + 10)
            isRetrieving.current = true
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
                <div className='cards-container d-flex flex-column align-items-center' ref={containerRef}>
                    {
                        comments.map((comment) => (
                            <Card comment={comment} key={comment.id} />
                        ))
                        
                    }
    	            {
                        (isCallEmpty && 
                        <h2 className='text-center'>You've already explored anything in your feed</h2>    
                        )
                    }
                </div>
        </>
    )
}

export default CardsContainer