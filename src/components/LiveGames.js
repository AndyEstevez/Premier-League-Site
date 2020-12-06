import { imageURL } from '../config';

const matches = (props) => {
    console.log(props.liveGames)
    console.log(props.matches[props.liveGames])
    return(
        <div>
            <h2 className="header-live">Live Games</h2>
            {props.liveGames.map(function(index) {
                return(
                    <div style={{ maxHeight:"140px", width:"30%", minWidth:"400px", maxWidth:"400px", border: "3px solid black", display:"inline-block", margin:"10px"}}>

                        <div style={{display: "inline-block", fontSize: "20px", margin:"10px"}}>
                        <img style={{margin:"25px", maxHeight:"80px", paddingBottom: "15px"}} src={imageURL + props.matches[index].awayTeam.id + ".svg"} alt={props.matches[index].awayTeam.name}/>
                        <div style={{backgroundColor: "purple", display:"inline-block", padding: "20px", color:"white", fontSize:"32px"}}>{props.matches[index].score.fullTime.awayTeam}</div>
                        </div>
                        
                        <div style={{display: "inline-block", fontSize: "20px", margin:"10px"}}>
                        <div style={{backgroundColor: "purple", display:"inline-block", padding: "20px", color:"white", fontSize:"32px"}}>{props.matches[index].score.fullTime.homeTeam}</div>
                        <img style={{ margin:"25px", maxHeight:"80px", paddingBottom: "15px"}} src={imageURL + props.matches[index].homeTeam.id + ".svg"} alt={props.matches[index].homeTeam.name}/>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default matches;

