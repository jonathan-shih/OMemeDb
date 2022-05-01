import memesModel from "./meme-model.js";

const likeMeme = async (meme) => {
  let existingMeme = await memesModel.findOne({ memeID: meme.memeID });
  if (existingMeme) {
    await memesModel.updateOne(
      { memeID: meme.memeID },
      {
        $set: { likes: existingMeme.likes + 1 },
      }
    );
    existingMeme.likes++;
  } else {
    try {
      existingMeme = await memesModel.create({
        ...meme,
        likes: 1,
      });
    } catch (e) {
      console.log(e);
    }
  }
  return existingMeme;
};

const unlikeMeme = async (meme) => {
  let existingMeme = await memesModel.findOne({ memeID: meme.memeID });
  if (existingMeme) {
    await memesModel.updateOne(
      { memeID: meme.memeID },
      {
        $set: { likes: existingMeme.likes - 1 },
      }
    );
    existingMeme.likes--;
  } else {
    try {
      existingMeme = await memesModel.create({
        ...meme,
        likes: -1,
      });
    } catch (e) {
      console.log(e);
    }
  }
  return existingMeme;
};

const unlikeDislikeMeme = async (meme) => {
  let existingMeme = await memesModel.findOne({ memeID: meme.memeID });
  if (existingMeme) {
    await memesModel.updateOne(
      { memeID: meme.memeID },
      {
        $set: { likes: existingMeme.likes - 2 },
      }
    );
    existingMeme.likes--;
    existingMeme.likes--;
  }
  return existingMeme;
};

const unDislikeLikeMeme = async (meme) => {
  let existingMeme = await memesModel.findOne({ memeID: meme.memeID });
  if (existingMeme) {
    await memesModel.updateOne(
      { memeID: meme.memeID },
      {
        $set: { likes: existingMeme.likes + 2 },
      }
    );
    existingMeme.likes++;
    existingMeme.likes++;
  } else {
    console.log("404 no meme found");
  }
  return existingMeme;
};

const findMemeByID = async (memeID) => {
  const meme = await memesModel.findOne({ memeID });
  return meme;
};

export default {
  likeMeme,
  unlikeMeme,
  unlikeDislikeMeme,
  unDislikeLikeMeme,
  findMemeByID,
};
