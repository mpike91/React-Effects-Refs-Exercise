
const DrawCardsForm = ({ deck, draw, shuffle }) => {
    let remaining;
    try {
        remaining = deck.data.remaining;
    } catch (e) {
        remaining = 52;
    }
    return (
        <div>
            {`${remaining} Cards In Deck`} <br></br>
            <button onClick={draw} style={{ marginBottom: "2em", marginRight: "1em" }}>Draw!</button>
            <button onClick={shuffle} style={{ marginBottom: "2em" }}>Shuffle</button>
        </div>
    )
}

export default DrawCardsForm;