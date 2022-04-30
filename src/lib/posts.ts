import GhostContentApi from "@tryghost/content-api";

const api = new GhostContentApi({
  url: process.env.API_URL,
  key: process.env.CONTENT_API_KEY,
  version: "v4",
});

export async function getPosts() {
  return await api.posts
    .browse({
      limit: "all",
    })
    .catch((err) => {
      console.error(err);
    });
}

export async function getPost(slug) {
  return await api.posts
    .read({
      slug,
    })
    .catch((err) => {
      console.error(err);
    });
}
