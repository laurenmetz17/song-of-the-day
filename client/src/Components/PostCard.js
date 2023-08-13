import SongCard from "./SongCard";

function PostCard({post, users}) {

    console.log(post)

    const postUser = users.find(user => post.user_id == user.id)
    const postSong = postUser.songs.find(song => post.song_id == song.id)

    return (
        <div className="post_card">
            <h3 className="post_user">{post.user_name}</h3>
            <SongCard song={postSong}/>
            <p className="post_comment">{post.comment}</p>
        </div>
    )
}

export default PostCard;