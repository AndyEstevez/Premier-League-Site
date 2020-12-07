import React, { Component } from 'react';
import { football_data_APIKEY, matchesURL, imageURL } from '../config';
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

    componentDidMount(){
        
        $.ajax({
            headers: { 'X-Auth-Token': football_data_APIKEY },
            url: matchesURL,
            dataType: 'json',
            type: 'GET',
            success: (res) => {
                this.setState({footballMatches: res.matches, results: this.reverseGames(res.matches)})
            }
          }).done(function(response){
            // do something with the response, e.g. isolate the id of a linked resource   
          });
    }
        

    render() {
        // console.log(this.state.results)
        console.log(this.state.footballMatches)
        let matches = this.state.footballMatches;
        let dates = this.getDates(matches);
        let count = -1;
        let isA = true;
        console.log(dates[count])
        
        return (
            <div>
                <div>
                {this.state.results.map(function(index){
                    isA = false;
                    if(matches[index].utcDate.substring(0, 10) === dates[count+1]){
                        isA = true;
                        count++;
                    }

                    return(
                        <div style={{paddingBottom:"15px"}}>
                            {isA ? <h1 className="result-header">{moment(dates[count]).format('MMMM Do, YYYY')}</h1> : <h1>{}</h1>}
                            
                            <div className="result-container">
                                <div className="team-container">
                                    <div className="team-name">{matches[index].awayTeam.name.split("FC")}</div>
                                    <img style={{maxHeight:"100px"}} src={imageURL + matches[index].awayTeam.id + ".svg"} alt={matches[index].awayTeam.id}/>
                                    <div className="result-score">{matches[index].score.fullTime.awayTeam}</div>
                                </div>

                                <div className="team-container">
                                    <div className="result-score" >{matches[index].score.fullTime.homeTeam}</div>
                                    <img style={{maxHeight:"100px"}} src={imageURL + matches[index].homeTeam.id + ".svg"} alt={matches[index].homeTeam.id}/>
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