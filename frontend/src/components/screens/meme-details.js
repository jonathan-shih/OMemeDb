import React, { useEffect, useState, useRef } from "react";
import { useParams, NavLink, Link } from "react-router-dom";
import SecureContent from "../contexts/secure-context.js";
import * as memeService from "../services/meme-service.js";
import * as userService from "../services/user-service.js";
import * as commentService from "../services/comment-service.js";
import { useProfile } from "../contexts/profile-context.js";

const MemeDetails = () => {
  const [meme, setMeme] = useState({});
  const [ourMeme, setOurMeme] = useState({});
  const [liked, setLiked] = useState();
  const [fav, setFav] = useState();
  const [disliked, setDisliked] = useState();
  const [comments, setComments] = useState([]);
  const { memeID } = useParams();
  const { checkLoggedIn } = useProfile();
  const commentRef = useRef();

  const fetchMemeByID = async () => {
    const response = await memeService.fetchMemesFromAPI();
    setMeme(response.data.data.memes.find((curMeme) => curMeme.id === memeID));
  };

  const fetchMemeByIDfromDatabase = async () => {
    const response = await memeService.fetchMemeById(memeID);
    setOurMeme(response.data);
  };

  const checkLiked = async () => {
    const curSessionUser = await checkLoggedIn();
    const curUser = await userService.fetchUserById(curSessionUser._id);
    const curLiked = curUser.data.likedMemes.includes(memeID);
    setLiked(curLiked);
    const curDisliked = curUser.data.dislikedMemes.includes(memeID);
    setDisliked(curDisliked);
  };

  const checkFav = async () => {
    const curSessionUser = await checkLoggedIn();
    const curUser = await userService.fetchUserById(curSessionUser._id);
    const curFav = curUser.data.favoriteMeme === memeID;
    setFav(curFav);
  };

  const findComments = async () => {
    const comments = await commentService.findCommentsByMemeID(memeID);
    setComments(comments);
  };

  const handleUserActions = async (action) => {
    const curSessionUser = await checkLoggedIn();
    const curUser = await userService.fetchUserById(curSessionUser._id);
    switch (action) {
      case "like":
        await userService.likeMeme(curUser.data, memeID);
        break;
      case "unlike":
        await userService.unlikeMeme(curUser.data, memeID);
        break;
      case "dislike":
        await userService.dislikeMeme(curUser.data, memeID);
        break;
      case "undislike":
        await userService.undislikeMeme(curUser.data, memeID);
        break;
      case "fav":
        await userService.favoriteMeme(curUser.data, memeID);
        break;
      case "unfav":
        await userService.unfavoriteMeme(curUser.data);
        break;
      default:
        return;
    }
  };

  const handleMemeActions = async (action) => {
    const curMeme = {
      name: meme.name,
      memeID: meme.id,
      url: meme.url,
    };
    let response;
    switch (action) {
      case "like":
        response = await memeService.likeMeme(curMeme);
        break;
      case "unlike":
        response = await memeService.unlikeMeme(curMeme);
        break;
      default:
        return;
    }
    setOurMeme(response.data);
  };

  const handleComment = async () => {
    const curSessionUser = await checkLoggedIn();
    const actualComment = await commentService.postComment(
      curSessionUser._id,
      meme.id,
      {
        comment: commentRef.current.value,
        commenter: curSessionUser._id,
        username: curSessionUser.username,
        memeName: meme.name,
      }
    );
    console.log(meme);
    setComments([...comments, actualComment]);
  };

  useEffect(() => {
    fetchMemeByID();
    fetchMemeByIDfromDatabase();
    checkLiked();
    checkFav();
    findComments();
  }, []);

  return (
    <div>
      <div className="center-text bg-light meme-detail">
        <h2>{meme.name}</h2>
        <div className={"meme-div"}>
          <img src={meme.url} className={"meme-image"} />
          <SecureContent
            loggedInContent={
              <div className="user-actions left-text d-flex">
                {" "}
                <i
                  className={`p-2 ps-0 ${
                    liked ? "fas fa-thumbs-up text-danger" : "fas fa-thumbs-up"
                  }`}
                  onClick={async () => {
                    if (liked) {
                      handleMemeActions("unlike");
                      handleUserActions("unlike");
                      setLiked(false);
                    } else if (!liked && disliked) {
                      await handleMemeActions("like");
                      await handleUserActions("undislike");
                      await handleMemeActions("like");
                      await handleUserActions("like");
                      setLiked(true);
                      setDisliked(false);
                    } else {
                      handleMemeActions("like");
                      handleUserActions("like");
                      setLiked(true);
                    }
                  }}
                ></i>
                <p className="p-1">{(ourMeme && ourMeme.likes) || 0}</p>
                <i
                  className={`p-2 ${
                    disliked
                      ? "fas fa-thumbs-down text-primary"
                      : "fas fa-thumbs-down"
                  }`}
                  onClick={async () => {
                    if (disliked) {
                      handleMemeActions("like");
                      handleUserActions("undislike");
                      setDisliked(false);
                    } else if (liked && !disliked) {
                      await handleMemeActions("unlike");
                      await handleUserActions("unlike");
                      await handleMemeActions("unlike");
                      await handleUserActions("dislike");
                      setDisliked(true);
                      setLiked(false);
                    } else {
                      handleMemeActions("unlike");
                      handleUserActions("dislike");
                      setDisliked(true);
                    }
                  }}
                ></i>
                <i
                  className={`ms-auto p-2 pe-0 ${
                    fav ? "fas fa-bookmark text-danger" : "fas fa-bookmark"
                  }`}
                  onClick={async () => {
                    if (fav) {
                      handleUserActions("unfav");
                      setFav(false);
                    } else {
                      handleUserActions("fav");
                      setFav(true);
                    }
                  }}
                ></i>
              </div>
            }
            nonloggedInContent={
              <div className="user-actions d-flex">
                <i
                  className={`p-2 ps-0 ${
                    liked ? "fas fa-thumbs-up text-danger" : "fas fa-thumbs-up"
                  }`}
                ></i>
                <p className="p-1">{(ourMeme && ourMeme.likes) || 0}</p>
                <i
                  className={`p-2 ${
                    disliked
                      ? "fas fa-thumbs-down text-primary"
                      : "fas fa-thumbs-down"
                  }`}
                ></i>
                <i className={"ms-auto p-2 pe-0 fas fa-bookmark ml-auto"}></i>
              </div>
            }
          />
        </div>
      </div>
      <hr />
      <SecureContent
        loggedInContent={
          <div className="caption-div left-text position-relative">
            <h4>Caption the meme</h4>
            <textarea
              ref={commentRef}
              placeholder="Add your own caption to the meme!"
              className="form-control bg-light"
            ></textarea>
            <button
              onClick={handleComment}
              className="btn btn-primary position-absolute bottom-0 end-0"
            >
              Post
            </button>
          </div>
        }
        nonloggedInContent={
          <div className="d-flex pt-1">
            <h6> please </h6>{" "}
            <NavLink to="/profile/login" className="ps-1 pe-1 navLink">
              login
            </NavLink>{" "}
            <h6> to like, favorite or comment </h6>
          </div>
        }
      />
      <hr />
      Captions:
      <ul className="list-group pt-1 mb-4">
        {comments.length === 0 && "Be the first one to caption the meme!"}
        {comments.map((comment) => (
          <li className="list-group-item comment-item">
            <Link to={`/profile/${comment.commenter}`} className="links">
              {comment && comment.username}:
            </Link>
            <p className="comment">{comment && comment.comment}</p>
          </li>
        ))}{" "}
      </ul>
    </div>
  );
};

export default MemeDetails;
