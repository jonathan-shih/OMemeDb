import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import * as memeService from "../services/meme-service.js";

const MemesSearch = () => {
  const titleRef = useRef();
  const { memeSearch } = useParams();
  const navigate = useNavigate();
  const [memes, setMemes] = useState([]);

  const fetchMemes = async () => {
    const searchString = titleRef.current.value || memeSearch;
    const response = await memeService.fetchMemesFromAPI();
    if (searchString === undefined || searchString === " ") {
      const first10 = response.data.data.memes
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
      setMemes(first10);
      navigate(`/meme-search/`);
    } else {
      setMemes(
        response.data.data.memes.filter((meme) =>
          meme.name.toLowerCase().includes(searchString)
        )
      );
      titleRef.current.value = searchString;
      navigate(`/meme-search/${searchString}`);
    }
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  return (
    <div className="left-text">
      <h2>Search Memes</h2>
      <ul className="list-group meme-list">
        <div className="search-div list-group-item">
          <i className="fa fa-search"></i>
          <input
            ref={titleRef}
            className="form-control search-bar top_search"
          />
          <button onClick={fetchMemes} className="btn btn-primary float-end ">
            Search
          </button>
        </div>
        <div className="left-text search search-bar">
          {memes.map((meme) => (
            <Link to={`details/${meme.id}`} className="list-group-item">
              <img src={meme.url} height={30} className="me-2 meme-search" />
              {meme.name}
            </Link>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default MemesSearch;
