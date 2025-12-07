export function Dice (props) {
    let styles = {
        backgroundColor: props.isHeld ? "#59E391" : "transparent"
    }

    return (
        <>
            <button 
                className="dice-elem" 
                style={styles} 
                onClick={props.onClick}
                aria-pressed={props.isHeld}
                aria-label={`Diew with value of ${props.value} and ${props.isHeld ? "Held" : "Not Held"} `}>
                {props.value}
            </button>
        </>
    )
}