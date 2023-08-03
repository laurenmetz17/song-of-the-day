
function SongOfTheDayCard() {

    const date = new Date()

    return (
        <p>Today is {date.toDateString().substring(4,10)}, {date.getFullYear()}</p>
    )
}

export default SongOfTheDayCard;