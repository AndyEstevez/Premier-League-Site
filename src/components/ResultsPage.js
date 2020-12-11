import React, { Component } from 'react';
import $ from 'jquery';
import moment from 'moment';

export default class ResultsPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            footballMatches: [],
            results: [],
        }
    }

    getDates(matches){
        var dates = [];
        for(let i = 0; i < matches.length; i++){
            if(!dates.includes(matches[i].utcDate.substring(0, 10)) && matches[i].status === 'FINISHED'){
                dates.push(matches[i].utcDate.substring(0, 10));
            }
            else if(matches[i].status === 'SCHEDULED'){
                break;
            }
        }
        return dates.reverse();
    }

    reverseGames(matches){
        var finishedGames = [];
            for(let i = 0; i < matches.length; i++){
            if(matches[i].status === 'FINISHED'){
                finishedGames.push(i);
            }
            else if(matches[i].status === 'SCHEDULED'){
                break;
            }
        }
            return finishedGames.reverse(); 
    }

    async componentDidMount(){
        // const response = await fetch(`https://www.scorebat.com/video-api/v1/`);
        // const json = await response.json();
        // this.setState({ footballVids: json })
        // console.log(this.state.footballVids)
        $.ajax({
            headers: { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_DATA_APIKEY },
            url: process.env.REACT_APP_MATCHES_URL,
            dataType: 'json',
            type: 'GET',
            success: (res) => {
                this.setState({footballMatches: res.matches, results: this.reverseGames(res.matches),})
            }
          })
    }
    
    render() {
        // console.log(this.state.matchNames)
        // console.log(this.state.footballMatches)
        // let len = this.state.matchNames.length
        // let getHighlights = this.state.matchNames.slice(len-20, len).reverse();
        // let countHighlights = 0;
        // let videos = this.state.footballVids
        // console.log(getHighlights)
        // let indexOfVideo;

        let matches = this.state.footballMatches;
        let dates = this.getDates(matches);
        let count = -1;
        let isA = true;

        return (
            <div>
                
                <div>
                {this.state.results.map(function(index){
                    isA = false;
                    if(matches[index].utcDate.substring(0, 10) === dates[count+1]){
                        isA = true;
                        count++;
                    }
                    // if(countHighlights < 20)
                    // for(let i = 0; i < videos.length; i++){
                    //     if(getHighlights.includes(videos[i].title)){
                    //         countHighlights++;
                    //         indexOfVideo = i;
                    //         break;
                    //     }
                    // }

                    return(
                        <div style={{paddingBottom:"15px"}}>
                            {isA ? <h1 className="result-header">{moment(dates[count]).format('MMMM Do, YYYY')}</h1> : <h1>{}</h1>}
                            <div className="result-container">
                                <div className="team-container">
                                    <div className="team-name">{matches[index].awayTeam.name.split("FC")}</div>
                                    <img style={{maxHeight:"100px", margin:"auto"}} src={process.env.REACT_APP_IMAGE_URL + matches[index].awayTeam.id + ".svg"} alt={matches[index].awayTeam.id}/>
                                    <div className="result-score">{matches[index].score.fullTime.awayTeam}</div>
                                </div>

                                <div className="team-container">
                                    <div className="result-score" >{matches[index].score.fullTime.homeTeam}</div>
                                    <img style={{maxHeight:"100px", margin:"auto"}} src={process.env.REACT_APP_IMAGE_URL + matches[index].homeTeam.id + ".svg"} alt={matches[index].homeTeam.id}/>
                                    <div className="team-name">{matches[index].homeTeam.name.split("FC")}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>
        )
    }
}


    // checkTeamName(matches){
    //     let edgecaseTeams = ['Leeds United FC', 'Brighton & Hove Albion FC', 'Wolverhampton Wanderers FC']
    //     let fullMatchNames = [];
    //     var matchName = "";
    //     var hometeamIndex;
    //     var awayteamIndex;
    //     for(let i = 0; i < matches.length; i++){
    //         if(matches[i].status === 'SCHEDULED'){
    //             return fullMatchNames;
    //         }
    //         if(edgecaseTeams.includes(matches[i].homeTeam.name)){
    //             hometeamIndex = edgecaseTeams.indexOf(matches[i].homeTeam.name)
    //             if(hometeamIndex === 0){
    //                 matchName = "Leeds - "
    //             }
    //             else if(hometeamIndex === 1){    
    //                 matchName = "Brighton - "
    //             }
    //             else{
    //                 matchName = "Wolves - "
    //             }
    //         }
    //         else{
    //             matchName = "" + matches[i].homeTeam.name.split("FC")[0] + "- ";
    //         }
        
    //         if(edgecaseTeams.includes(matches[i].awayTeam.name)){
    //             awayteamIndex = edgecaseTeams.indexOf(matches[i].awayTeam.name)
        
    //             if(awayteamIndex === 0){
    //                 matchName += ("Leeds")
    //             }
    //             else if(awayteamIndex === 1){    
    //                 matchName += ("Brighton")
    //             }
    //             else{
    //                 matchName += ("Wolves")
    //             }
    //         }
    //         else{
    //             matchName += (matches[i].awayTeam.name.split("FC")[0])
    //         }
    //         fullMatchNames.push(matchName);
    //     }
    //     return fullMatchNames;
    // }