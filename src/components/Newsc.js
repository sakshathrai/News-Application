import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

class Newsc extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  
   capitalizeFirstLetter=(string)=> {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      totalResults: 0,
      loading: true,
      page: 1,
      pageSize: this.props.pageSize || 20,
      country: this.props.country,
      category: this.props.category,
      error: null,
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)} - Axiom News `;
  }

  async componentDidMount() {
    await this.fetchNews();
  }

  fetchNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5b775d0e735d4e888579cf95c854b6cb&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    if (!data.ok) {
      this.setState({ loading: false, error: 'Failed to fetch data. Please try again later.' });
      return;
    }
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
      error: null,
    });
  };

  handlePrevClick = async () => {
    if (this.state.page > 1) {
      await this.setState({ page: this.state.page - 1, loading: true });
      await this.fetchNews();
    }
  };

  handleNextClick = async () => {
    if (this.state.page < Math.ceil(this.state.totalResults / this.state.pageSize)) {
      await this.setState({ page: this.state.page + 1, loading: true });
      await this.fetchNews();
    }
  };

  render() {
    return (
      <div>
        <div className="container my-3">
          <h1 className="text-center" style={{margin:'35px 0px'}}>Axiom News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
          <hr />
          {this.state.loading && <Spinner />}
          <div className="row my-3">
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ''}
                      decription={element.description?element.description.slice(0,88):" "} 
                      imgurl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
          <div className="container my-5 d-flex justify-content-between">
            <button
              className="btn btn-primary btn-lg active"
              disabled={this.state.page <= 1}
              onClick={this.handlePrevClick}
            >
              &larr; Previous
            </button>
            <button
              className="btn btn-secondary btn-lg active mx-3"
              disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)}
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
    
  }
}
export default Newsc;

// import React, { Component } from 'react'
// import NewsItem from './NewsItem'

// export class Newsc extends Component {
//   articles =  [
//     {
//       "source": {
//         "id": "usa-today",
//         "name": "USA Today"
//       },
//       "author": "Sara Chernikoff",
//       "title": "How much do UAW workers make? A look at hourly wages across US states - USA TODAY",
//       "description": "UAW workers are striking for better pay, among other benefits. Here's a look at how UAW hourly wages compare with other workers in striking states.",
//       "url": "https://www.usatoday.com/story/money/cars/2023/10/14/how-much -uaw-workers-earn-comparison/71159764007/",
//       "urlToImage": "https://www.usatoday.com/gcdn/authoring/authoring-images/2023/10/13/USAT/71168320007-gty-1719490817.jpg?crop=3997,2249,x0,y266&width=3200&height=1801&format=pjpg&auto=webp",
//       "publishedAt": "2023-10-15T10:08:02Z",
//       "content": "With no slowdown in sight, thousands of members of the United Auto Workers Union are entering their fifth week of striking against the Detroit Three automakers.  \r\nMost recently, 8,700 workers at For… [+4081 chars]"
//     }]

//   constructor(){
//     super();
//     this.state={
//       articles:this.articles,
//       loading:false,
//       page:1
//     } 
// } 
// async componentDidMount(){
//   let url="https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=5b775d0e735d4e888579cf95c854b6cb&page=1&pageSize=20";
//   let data=await fetch(url);
//   let parsedData=await data.json()
//   console.log(parsedData);
//   this.setState({articles: parsedData.articles,totalResults: parsedData.totalResults })
// }
//  handlePrevClick= async()=>{
//   if(this.state.page+1>Math.ceil(this.state. totalResults/20)){

//   }
//   else{ 
//         let url=`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=5b775d0e735d4e888579cf95c854b6cb&page=${this.state.page-1}&pageSize=20`;
//         let data=await fetch(url);
//         let parsedData=await data.json()
//         console.log(parsedData); 
//         this.setState({
//         page: this.state.page- 1,
//         articles: parsedData.articles
//         })
//       }
// }
//  handleNextClick= async()=>{
//   let url=`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=5b775d0e735d4e888579cf95c854b6cb&page=${this.state.page+1}&pageSize=20 `;
//   let data=await fetch(url);
//   let parsedData=await data.json()
//   console.log(parsedData); 
//     this.setState({
//       page: this.state.page+1,
//       articles: parsedData.articles
//     })
// }
//   render() {
//     return (
//       <div>
//         <div className="container my-3 ">
//           <h2>Top Headlines</h2>
//         <div className="row my-3   ">
//         {this.state.articles.map((element)=>{
//           return <div className="col-md-4"key={element.url} >
//           <NewsItem  title={element.title?element.title.slice(0,45):""} decription={element.description?element.description.slice(0,88):" "} imgurl={element.urlToImage} newsUrl={element.url} />
//           </div>
//         })}
//         </div>
//         <div className="container my-5 d-flex justify-content-between">
// <button className="btn btn-primary btn-lg active" disabled={this.state.page<=1} type="button" onClick={this.handlePrevClick} > &larr; Previous</button>
// <button className="btn btn-secondary btn-lg active mx-3" type="button" onClick={this.handleNextClick} >Next &rarr;</button>
// </div>
//         </div>   
//       </div>
//     )
//   }
// }

// export default Newsc

