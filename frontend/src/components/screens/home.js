import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as memeService from "../services/meme-service";
import * as userService from "../services/user-service";
import SecureContent from "../contexts/secure-context.js";
import { useProfile } from "../contexts/profile-context.js";

const Home = () => {
  const [topMeme, setTopMeme] = useState();
  const [user, setUser] = useState();
  const [latestLike, setLatestLike] = useState();
  const { checkLoggedIn } = useProfile();

  const fetchTopMeme = async () => {
    const response = await memeService.fetchMemesFromAPI();
    const topMeme = response.data.data.memes[0];
    setTopMeme(topMeme);
  };

  const checkUser = async () => {
    const curSessionUser = await checkLoggedIn();
    const curUser = await userService.fetchUserById(curSessionUser._id);
    setUser(curUser);
    const latestID =
      curUser.data.likedMemes[curUser.data.likedMemes.length - 1];
    const response = await memeService.fetchMemesFromAPI();
    const latest = response.data.data.memes.find(
      (curMeme) => curMeme.id === latestID
    );
    setLatestLike(latest);
    console.log(latest);
    console.log(curUser);
  };

  useEffect(() => {
    fetchTopMeme();
    checkUser();
  }, []);
  return (
    <div>
      <div className="d-flex">
        <h2>
          <i className={`fab fa-magento position-relative me-1`}></i> OMemeDb
        </h2>{" "}
        <p className="mt-4 ms-3">for all your meme addictions</p>
      </div>
      <hr />
      <h3> Top meme of the day:</h3>
      {topMeme && (
        <div className="top-meme rounded">
          <div className="list-group-item text-center pb-3">
            <Link
              to={`/meme-search/details/${topMeme.id}`}
              className="top-meme links"
            >
              <h4 className="links">{topMeme.name}</h4>
            </Link>
            <Link to={`/meme-search/details/${topMeme.id}`}>
              <img src={topMeme.url} height={30} className="top-meme-img" />
            </Link>
          </div>
        </div>
      )}
      <SecureContent
        loggedInContent={
          <div>
            <hr />
            <h3> Latest like:</h3>
            {user &&
              (latestLike ? (
                <div className="rounded">
                  <Link
                    to={`/meme-search/details/${latestLike.id}`}
                    className="list-group-item"
                  >
                    <img
                      src={latestLike.url}
                      height={30}
                      className="latestLike-meme-img me-3"
                    />
                    {latestLike.name}
                  </Link>
                </div>
              ) : (
                "you haven't liked any memes yet"
              ))}
          </div>
        }
      />
    </div>
  );
};

export default Home;
