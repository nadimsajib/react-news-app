import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import { useSelector } from "react-redux";
import NewsTab from './NewsTab';

const Home = () => {

  const { user: currentUser } = useSelector((state) => state.auth);
  const [content, setContent] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabs = [
    {
      title: 'News Api',
      endpoint: 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a54a0cba10ae440f89b32f9867d3322b',
    },
    {
      title: 'New York Times',
      endpoint: 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=3V9IRVIuKAG6Rr5xoEWWWoVQ0TuPIDjm',
    },
    {
      title: 'Gurdians',
      endpoint: 'https://content.guardianapis.com/search?sections=latest&show-fields=thumbnail&show-blocks=body&api-key=fa4716ae-85a5-4ae7-90dd-5aa6a4a39599',
    },
    // Add more tabs with their respective API endpoints
  ];

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        console.log("hell",response.data)
        setContent(response.data.articles);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
          console.log("error",_content)

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      {currentUser ? (
      <header className="jumbotron">
        <h3>News Feeds</h3>
        <div class="row">

        <div>
          <ul className="nav nav-tabs">
            {tabs.map((tab, index) => (
              <li
                key={index}
                className={`nav-item ${activeTab === index ? 'active' : ''}`}
                onClick={() => handleTabClick(index)}
              >
                <span className="nav-link">{tab.title}</span>
              </li>
            ))}
          </ul>
          <div className="tab-content">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`tab-pane ${activeTab === index ? 'active' : ''}`}
              >
                <NewsTab apiEndpoint={tab.endpoint} apiEndPointName={tab.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
      </header>
      ) : (
        <header className="jumbotron">
        <h3>Welcome to News app. For show news you need to login first</h3>
      </header>
        )}
    </div>
  );
};

export default Home;