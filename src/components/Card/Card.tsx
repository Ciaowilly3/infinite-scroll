import React from 'react'
import { IComment } from '../../interfaces/IComments'

const Card :React.FC<{comment : IComment}> = (prop) => {
    const {id, body, postId, user} = prop.comment
    return (
        <div className="card my-4" style={{width: '320px'}}>
            <img className="card-img-top" src={`https://picsum.photos/id/${id + user.id}/320/200`} alt="Card image cap"></img>
            <div className="card-body">
                <h5 className="card-title">comment id: {id}</h5>
                <h6 className="card-subtitle mb-2 text-muted">user: {user.username}</h6>
                <p className="card-text">{body}</p>
                <p className="d-block my-0">user id: {user.id}</p>
                <p className="d-block my-0">post id: {postId}</p>
            </div>
        </div>

    )
}

export default Card