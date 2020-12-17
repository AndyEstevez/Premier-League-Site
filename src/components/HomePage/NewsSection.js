import React from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const NewsSection = (props) => {
    // console.log(props.news)
    // console.log(props.topNews)
    return(
        <div style={{}}>
            <h2 className="news-header">Latest News</h2>
            <Grid container className="card-container" style={{margin:"auto", padding:"0px 5px", backgroundColor:"white", display:"flex", maxWidth:"1800px" }}>
                {props.news.map(function(index){
                    return(
                    <Grid xs={12} sm={6} md={4} style={{ padding:"15px 0px", margin:"auto"}} onClick={() => window.open(index.url, "_blank")}>
                        <Card style={{margin: "20px 120px", width:"5%", minWidth:"300px",  boxShadow:"0px 0px 10px 5px", position:'relative',}} >
                            <CardActionArea>
                            <CardMedia style={{padding:"0px 0px", display:"flex"}}>
                                <img style={{ display:"flex", height:"170px", margin:"auto"}} src={index.image} alt={index.title}/>
                            </CardMedia>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" style={{textAlign:"center", fontSize:"1.25em"}}>
                                {index.title}
                                </Typography>
                                <Typography noWrap variant="body2" color="textPrimary"  style={{textAlign:"center"}}>
                                {index.description}
                                </Typography>
                            </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}
export default NewsSection;

