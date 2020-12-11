import React, { Component } from 'react';
import $ from 'jquery'; 
import LiveGames from './LiveGames'
import Matchweek from './Matchweek';
import TopNews from './TopNews';
import NewsSection from './NewsSection';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// edge cases for embedding highlights:
// All other teams = remove FC from Club name
// Leeds United FC = Leeds
// Brighton & Hove Albion FC = Brighton
// Wolverhampton Wanderers FC = Wolves



export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            footballMatches: [],
            liveMatches: [], 
            topNews: [],
            news: [],
        }
    }

    async componentDidMount(){
        console.log(process.env.REACT_APP_SEARCHQUERY_URL)
        try {
            const response = await fetch(process.env.REACT_APP_SEARCH_QUERY_URL);
            const json = await response.json();
            this.setState({ topNews: json.articles[0], news: json.articles.slice(3, 6)});
          } catch (error) {
            console.log(error);
        }
       
        // console.log(this.state.news)
        // console.log(this.state.topNews)

        $.ajax({
            headers: { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_DATA_APIKEY },
            url: process.env.REACT_APP_MATCHES_URL,
            dataType: 'json',
            type: 'GET',
            success: (res) => {
                this.setState({footballMatches: res.matches})
            }
          })
    }

    render() {
        console.log(process.env.REACT_APP_SEARCH_QUERY_URL)
        console.log(process.env.REACT_APP_FOOTBALL_DATA_APIKEY)
        console.log(this.state.footballMatches)

        var findLiveGames = [];
        for(var i = 0; i < this.state.footballMatches.length; i++){
            if( this.state.footballMatches[i].status === 'PAUSED' || this.state.footballMatches[i].status === 'IN_PLAY'){
                findLiveGames.push(i);
            }
            else if(this.state.footballMatches[i].status === 'SCHEDULED'){
                break;
            }
        }

        let matchWeek = [];
        let count = 0;
        let matchDay;
        for(let i = 0; i < this.state.footballMatches.length; i++){
            if(this.state.footballMatches[i].status === 'SCHEDULED'){
                matchDay = this.state.footballMatches[i].matchday
                if(count < 10 && this.state.footballMatches[i].matchday === matchDay){
                    matchWeek.push(i)
                    count++;
                }
                else{
                    break;
                }
            }
        }
        // console.log(findLiveGames)
      
        
        return (
            <div style={{ display:"inline-block"}}>
                {findLiveGames.length > 0 ? 
                <LiveGames style={{display:"inline-block"}} liveGames={findLiveGames} matches={this.state.footballMatches} />
                : <div></div>
                }
                <div style={{display:'flex', margin:"auto"}}>
                <Matchweek style={{ width:"50%", margin:"auto"}} matches={this.state.footballMatches} weekMatches={matchWeek} matchDay={matchDay}/>
                
                
                <TopNews style={{ width:"50%", }} topNews={this.state.topNews}/>
                </div>
                <NewsSection style={{display:"block"}} news={this.state.news} topNews={this.state.topNews}/>
            </div>
        )
    }
}
