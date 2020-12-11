import React from 'react'

const TopNews = (props) => {
    
    // console.log(props.topNews)
    return(
        <div className="topNews" onClick={() => window.open(props.topNews.url, "_blank")}>
            
            <div style={{display:"inline-block", width:"100%", height:"", maxWidth:"1100px", margin:"auto", }}><img style={{width:"100%", maxWidth:"1000px", height:"auto", borderRadius: "5px",}} src={props.topNews.image} alt={props.topNews.title}/></div>
            
            <div style={{backgroundColor:"white", display:"block", width:"100%", margin:"auto", borderRadius: "5px",}}>
            <h2>{props.topNews.title}</h2>
            <div>{props.topNews.description}</div>
            </div>
            
        </div>
    )
}

export default TopNews;
