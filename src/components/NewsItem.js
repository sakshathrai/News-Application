import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,decription,imgurl,newsUrl,author,date,source}= this.props;
    return (
      <div className="my-3">
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill" style={{backgroundColor:'black',color:'white'}}>
   {source}
    <span className="visually-hidden"></span>
  </span>

  <img src={imgurl?imgurl:"https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"} style={{height:"215px"}}className="card-img-top" alt="..."/>
  <div className="card-body" >
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{decription}...</p>
    <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} <br/>on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} target="_blank" className="btn btn-sm  btn-dark">Read More</a>
  </div>
</div>
      </div>
    ) 
  }
}

export default NewsItem
