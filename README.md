# Scalable Engineering

A personal blogging site for essays on Java, scalable engineering, and leadership. It is built as a static site so it can be deployed directly with GitHub Pages.

## Local preview

Open `index.html` in a browser, or run a tiny local server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Add or edit posts

Edit the `posts` array in `script.js`.

Each post supports:

```js
{
  title: "Post title",
  topic: "java",
  date: "May 26, 2026",
  readTime: "5 min read",
  excerpt: "Short summary for the post card.",
  url: "#"
}
```

Use one of these topic values: `java`, `engineering`, `leadership`.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository.
2. In GitHub, open repository Settings.
3. Go to Pages.
4. Select GitHub Actions as the source.
5. Push to the `main` branch.

The included workflow publishes the site automatically.
