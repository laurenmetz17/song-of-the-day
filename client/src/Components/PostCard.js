

function PostCard({post, users}) {

    //imprement songcard

    const postUser = users.find(user => post.user_id == user.id)
    const postSong = postUser.songs.find(song => post.song_id == song.id)

    return (
        <div className="post_card">
            <h3>{post.user_name}</h3>
            <img src={postSong.art} alt="album cover"></img>
            <p>{postSong.title}</p>
            <p>{postSong.artist}</p>
            <p>{post.comment}</p>
        </div>
    )
}

export default PostCard;