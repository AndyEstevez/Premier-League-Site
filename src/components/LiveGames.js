import { imageURL } from '../config';

const matches = (props) => {
    return(
        <div>
            <h2 style={{paddingLeft: "15px"}}>Live Games</h2>
            {props.liveGames.map(function(index) {
                return(
                    <div style={{  border: "3px solid black", display:"inline-block", margin:"10px"}}>

                        <div style={{display: "inline-block", fontSize: "20px", margin:"10px"}}>
                        <img style={{height: "150px", margin:"25px"}} src={imageURL + props.matches[index].awayTeam.id + ".svg"} alt={props.matches[index].awayTeam.name}/>
                        <div style={{backgroundColor: "purple", display:"inline-block", padding: "20px", color:"white", fontSize:"32px"}}>{props.matches[index].score.fullTime.awayTeam}</div>
                        </div>
                        
                        <div style={{display: "inline-block", fontSize: "20px", margin:"10px"}}>
                        <div style={{backgroundColor: "purple", display:"inline-block", padding: "20px", color:"white", fontSize:"32px"}}>{props.matches[index].score.fullTime.homeTeam}</div>
                        <img style={{height: "150px", margin:"25px"}} src={imageURL + props.matches[index].homeTeam.id + ".svg"} alt={props.matches[index].homeTeam.name}/>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default matches;

