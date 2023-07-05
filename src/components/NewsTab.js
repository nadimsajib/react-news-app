import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsTab = ({ apiEndpoint,apiEndPointName }) => {
    const [newsData, setNewsData] = useState([]);
  
    useEffect(() => {
      const fetchNews = async () => {
        try {
          const response = await axios.get(apiEndpoint);
          if(apiEndPointName === 'News Api'){
            setNewsData(response.data.articles);
          } else if(apiEndPointName === 'New York Times'){
            setNewsData(response.data.results);
          } else{
            setNewsData(response.data.response.results);
          }
          
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchNews();
    }, [apiEndpoint]);
  
    return (
      <div>
        <h2>News</h2>
        {apiEndPointName === 'News Api' ? (
        newsData.map((news) => (
            <div class="col-md-6">
              <div class="card mb-4">
                <img src={news.urlToImage} class="card-img-top" alt="News Image"/>
                <div class="card-body">
                  <h5 class="card-title">{news.title}</h5>
                  <p class="card-text">{news.description}</p>
                </div>
              </div>
            </div>
          ))
      ) : apiEndPointName === 'New York Times' ? (
        newsData.map((news) => (
            <div class="col-md-6">
              <div class="card mb-4">
                <img src={news.multimedia[0].url} class="card-img-top" alt="News Image"/>
                <div class="card-body">
                  <h5 class="card-title">{news.title}</h5>
                  <p class="card-text">{news.abstract}</p>
                </div>
              </div>
            </div>
          ))
        ) :  (
            newsData.map((news) => (
                <div class="col-md-6">
                  <div class="card mb-4">
                    <img src={news.fields?.thumbnail} class="card-img-top" alt="News Image"/>
                    <div class="card-body">
                      <h5 class="card-title">{news.webTitle}</h5>
                      <p class="card-text">{news.blocks?.body[0]?.bodyTextSummary}</p>
                    </div>
                  </div>
                </div>
              ))
      )}
        {/* {newsData.map((news) => (
          <div key={news.url}>
            <h3>{news.title}</h3>
            <p>{news.description}</p>
          </div>
        ))} */}
      </div>
    );
  };

  export default NewsTab;