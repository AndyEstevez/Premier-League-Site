import moment from 'moment';

// if less than or equal to 45 return time
// if greater than or equal to 60 & less than 105 return time
// if between 45 & 60 return 45

function getTime(startTime, lastUpdate){
    startTime = startTime.substring(11, 19)
    lastUpdate = lastUpdate.substring(11, 19)
    let timeDiff = moment.utc(moment(lastUpdate,"HH:mm:ss").diff(moment(startTime,"HH:mm:ss"))).format("HH:mm:ss")
    
    let splitTime = timeDiff.split(':');
    var minutes = (+splitTime[0]) * 60 + (+splitTime[1]);

    if(minutes <= 45){
        return minutes + "'";
    }
    else if(minutes >= 60 && minutes <= 105){
        minutes = minutes - 20;
        return minutes + "'";
    }
    else{
        return "Half Time";
    }
}


const matches = (props) => {
    console.log(props.liveGames)
    console.log(props.matches[props.liveGames])
    return(
        <div style={{display:"inline-block"}}>
            <h2 className="header-live">Live Games</h2>
            {props.liveGames.map(function(index) {
                return(
                    <div className="container-livegame">
                        <p className="game-timer">{getTime(props.matches[index].utcDate, props.matches[index].lastUpdated)}</p>

                        <div style={{display: "inline-block", fontSize: "20px", margin:"20px"}}>
                        <img style={{margin:"25px", maxHeight:"80px", paddingBottom: "15px"}} 
                            src={process.env.REACT_APP_IMAGE_URL + props.matches[index].awayTeam.id + ".svg"} 
                            alt={props.matches[index].awayTeam.name}/>
                        <div className="team-score">{props.matches[index].score.fullTime.awayTeam}</div>
                        </div>

                        <div style={{display: "inline-block", fontSize: "20px", margin:"20px"}}>
                        <div className="team-score">{props.matches[index].score.fullTime.homeTeam}</div>

                        <img style={{ margin:"25px", maxHeight:"80px", paddingBottom: "15px"}} 
                            src={process.env.REACT_APP_IMAGE_URL + props.matches[index].homeTeam.id + ".svg"} 
                            alt={props.matches[index].homeTeam.name}/>

                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default matches;

