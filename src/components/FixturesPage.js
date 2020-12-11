import React, { Component } from 'react';
import $ from 'jquery';
import moment from 'moment';


export default class FixturesPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            footballMatches: [],
            fixtures: [],
        }
    }

    get50Games(matches){
        var scheduledGames = [];
        var countTo50Games = 0;
        for(let i = 0; i < matches.length; i++){
            if(countTo50Games < 50){
                if(matches[i].status === 'SCHEDULED'){
                    scheduledGames.push(i);
                    countTo50Games++;
                }
            }           
        }
            return scheduledGames;
    }

    getDates(matches){
        var dates = [];
        var countTo50Games = 0;
        for(let i = 0; i < matches.length; i++){
            if(countTo50Games < 50){
                if(matches[i].status === 'SCHEDULED' && !dates.includes(matches[i].utcDate.substring(0, 10))){
                    dates.push(matches[i].utcDate.substring(0, 10));
                    countTo50Games++;
                }
            }
        }
        return dates;
    }

    componentDidMount(){
        
        $.ajax({
            headers: { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_DATA_APIKEY },
            url: process.env.REACT_APP_MATCHES_URL,
            dataType: 'json',
            type: 'GET',
            success: (res) => {
                this.setState({footballMatches: res.matches, fixtures: this.get50Games(res.matches)})
            }
          })
    }



    render() {
        console.log(this.state.fixtures)
        console.log(this.state.footballMatches)
        let matches = this.state.footballMatches;
        let dates = this.getDates(matches);
        let count = -1;
        let isA = true;
        return (
            <div>
                <div>
                {this.state.fixtures.map(function(index){
                    isA = false;
                    if(matches[index].utcDate.substring(0, 10) === dates[count+1]){
                        isA = true;
                        count++;
                    }
                    return(
                        <div style={{paddingBottom:"15px"}}>
                            {isA ? <h1 className="result-header">{moment(dates[count]).format('MMMM Do, YYYY')}</h1> : <h1>{}</h1>}
                            
                            <div className="result-container" style={{border: "3px solid black"}}>
                                <div className="fixtures-container">
                                    <div className="fixtures-name">{matches[index].awayTeam.name.split("FC")}</div>
                                    <img style={{maxHeight:"100px", margin:"auto"}} src={process.env.REACT_APP_IMAGE_URL + matches[index].awayTeam.id + ".svg"} alt={matches[index].awayTeam.id}/>
                                </div>
                                <div className="game-time">{matches[index].utcDate.substring(11, 16)}</div>
                                <div className="fixtures-container">
                                    <img style={{maxHeight:"100px", margin:"auto"}} src={process.env.REACT_APP_IMAGE_URL + matches[index].homeTeam.id + ".svg"} alt={matches[index].homeTeam.id}/>
                                    <div className="fixtures-name">{matches[index].homeTeam.name.split("FC")}</div>
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
