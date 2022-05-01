import React, { useRef, useEffect, useState } from "react";
import * as service from "../services/auth-service";
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/profile-context.js";
import * as userService from "../services/user-service.js";
import * as memeService from "../services/meme-service.js";
import * as commentService from "../services/comment-service.js";

export default function ProfileDisplay(userID) {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const [likedMemes, setLikedMemes] = useState([]);
  const [favMeme, setFavMeme] = useState();
  const [comments, setComments] = useState([]);
  const [commentedMemes, setCommentedMemes] = useState([]);

  const checkUser = async () => {
    const curUser = await userService.fetchUserById(userID);
    setUser(curUser);
  };

  const loadLikedMemes = async () => {
    const response = await memeService.fetchMemesFromAPI();
    const curUser = await userService.fetchUserById(userID);
    const memeArr = [];
    curUser.data.likedMemes.map(async (memeid) => {
      const curMeme = response.data.data.memes.find(
        (curMeme) => curMeme.id === memeid
      );
      if (curMeme) {
        return memeArr.push(curMeme);
      }
    });
    setLikedMemes(memeArr);
  };

  const fetchFavMeme = async () => {
    const response = await memeService.fetchMemesFromAPI();
    const curUser = await userService.fetchUserById(userID);
    const memeID = curUser.data.favoriteMeme;
    setFavMeme(
      response.data.data.memes.find((curMeme) => curMeme.id === memeID)
    );
  };

  const fetchCommentedMemes = async () => {
    const response = await commentService.findCommentsByUserId(userID);
    const updatedComments = [];
    response.map(async (curMeme) => {
      const curMemeFromApi = await memeService.fetchMemesFromAPI();
      const existing = curMemeFromApi.data.data.memes.find(
        (curMemeFromAPI) => curMemeFromAPI.id === curMeme.memeID
      );
      if (existing) {
        updatedComments.push(curMeme);
      }
    });
    setComments(updatedComments);
  };

  useEffect(() => {
    checkUser();
    loadLikedMemes();
    fetchFavMeme();
    fetchCommentedMemes();
  }, [setUser, setFavMeme, setComments, setCommentedMemes]);

  return user ? (
    <div className="wrapper">
      {favMeme && (
        <div>
          <hr />
          <h5>Favorite Meme:</h5>
          <div className="meme-display fav">
            <Link
              to={`/meme-search/details/${favMeme.id}`}
              className="list-group-item"
            >
              <img
                src={favMeme.url}
                height={30}
                className="me-2 meme-image-display"
              />
              {favMeme.name}
            </Link>
          </div>
        </div>
      )}
      {user.data.likedMemes.length !== 0 && (
        <div>
          <hr />
          <h5>Liked Memes:</h5>
          <div className="meme-display liked-memes">
            {likedMemes.map((meme) => (
              <Link
                to={`/meme-search/details/${meme.id}`}
                className="list-group-item"
              >
                <img
                  src={meme.url}
                  height={30}
                  className="me-2 meme-image-display"
                />
                {meme.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {comments.length !== 0 && (
        <div>
          <hr />
          <h5>Captions:</h5>
          <div className="meme-display captions">
            {comments.map((comment) => {
              const data = (
                <li className="list-group-item comment-item">
                  {comment && comment.username} on{" "}
                  <Link to={`/meme-search/details/${comment.memeID}`}>
                    {comment.memeName}
                  </Link>
                  :<p className="comment">{comment && comment.comment}</p>
                </li>
              );
              return data;
            })}
          </div>
        </div>
      )}
    </div>
  ) : (
    ""
  );
}
