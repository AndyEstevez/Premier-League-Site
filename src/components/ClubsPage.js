import React, { Component } from 'react'
import { football_data_APIKEY, teamsURL, imageURL } from '../config'
import $ from 'jquery'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


export default class ClubsPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            teams: [],

        }
    }

    componentDidMount(){
        
        $.ajax({
            headers: { 'X-Auth-Token': football_data_APIKEY },
            url: teamsURL,
            dataType: 'json',
            type: 'GET',
            success: (res) => {
                this.setState({teams: res.teams})
            }
          })
    }
 

    render() {
        console.log(this.state.teams)
        return (
            <div>
                <Grid container >
                {this.state.teams.map(function(index){

                    return(
                    <Grid item xs={8} sm={8} md={4} style={{width:"80%", paddingBottom:"15px"}}>
                        <Card  style={{margin: "auto", width:"15%", minWidth:"400px"}} >
                            <CardActionArea>
                            <CardMedia style={{padding:"0px 50px", background: `linear-gradient(${index.clubColors.split(" ")[0]}, ${index.clubColors.split(" ")[2]})`}}>
                                <img style={{ display:"block", height:"200px", margin:"auto"}} src={index.crestUrl} alt={index.shortName}/>
                            </CardMedia>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" style={{textAlign:"center"}}>
                                {index.shortName}
                                </Typography>
                                <Typography variant="body2" color="textPrimary"  style={{textAlign:"center"}}>
                                {index.venue}
                                </Typography>
                            </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button style={{margin:"auto", fontSize:"1.5em"}} size="small" color="primary" onClick={event => window.location.href=`/Clubs/${index.id}`}>
                                Club Page
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    )
                })}
                </Grid>
            </div>
        )
    }
}
