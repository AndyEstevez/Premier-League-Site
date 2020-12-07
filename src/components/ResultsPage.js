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
        var dates = [];
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
        //console.log(dates)
        console.log(dates[count])
        //console.log(dates)
        
        return (
            <div>
                <div>
                {this.state.results.map(function(index){
                    isA = false;
                    if(matches[index].utcDate.substring(0, 10) == dates[count+1]){
                        isA = true;
                        count++;
                        

                    }

                    return(
                        <div>
                            {isA ? <h1 style={{margin:"auto", padding:"0px 0px", width:"35%", textAlign:"center"}}>{dates[count]}</h1> : <h1></h1>}
                        <div className="result-container" style={{marginBottom: "20px", width:"100%", maxHeight: "250px"}}>    
                                <div className="awayTeam-name" style={{ padding:"65px 20px", fontWeight:"bold", width:'30%', maxWidth:"150px", textAlign: "left", border: "3px solid black"}}>{matches[index].awayTeam.name.split("FC")}</div>

                                <div style={{display: "inline-block",  padding:"0px 55px"}}>
                                    <img style={{border: "3px solid black", margin:"40px", maxHeight:"100px", paddingBottom: "15px"}} src={imageURL + matches[index].awayTeam.id + ".svg"} />
                                </div>

                                <div style={{display: "flex", width:"20%", paddingTop:"70px", fontSize:"24px"}}>
                                    <div style={{display: "flex", marginRight:"35px"}}>{matches[index].score.fullTime.awayTeam}</div>
                                    <div style={{display: "flex", marginLeft:"100px"}}>{matches[index].score.fullTime.homeTeam}</div>
                                </div>

                                <div style={{display: "inline-block", width:"10%"}}>
                                    <img style={{margin:"40px", maxHeight:"100px", paddingBottom: "15px",   border: "3px solid black"}} src={imageURL + matches[index].homeTeam.id + ".svg"} />
                                </div>
                                
                                <span className="homeTeam-name" style={{margin: "auto", padding:"65px 10px", fontWeight:"bold", width:'25%', maxWidth:"150px", minWidth:"10px", textAlign: "right", border: "3px solid black"}}>{matches[index].homeTeam.name.split("FC")}</span>
                        </div>
                        </div>
                    )
                })}
                </div>
            </div>
        )
    }
}
