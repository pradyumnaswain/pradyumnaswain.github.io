const topics = [
  {
    id: "java",
    name: "Java",
    initial: "J",
    description: "Clean code, backend patterns, JVM thinking, testing, and the details that age well.",
  },
  {
    id: "engineering",
    name: "Engineering",
    initial: "E",
    description: "Architecture, delivery, systems thinking, tradeoffs, and practical software craft.",
  },
  {
    id: "leadership",
    name: "Leadership",
    initial: "P",
    description: "Planning, mentoring, decision-making, influence, and growing teams with care.",
  },
];

const posts = [
  {
    title: "A Small Java Checklist Before Opening a Pull Request",
    topic: "java",
    date: "May 14, 2026",
    readTime: "6 min read",
    excerpt:
      "Naming, null boundaries, tests, logging, and the small decisions that make code easier to trust.",
    url: "posts/java-pr-checklist.html",
  },
  {
    title: "Engineering Decisions Are Usually People Decisions Too",
    topic: "engineering",
    date: "May 7, 2026",
    readTime: "5 min read",
    excerpt:
      "Architecture conversations go better when we name the constraints, incentives, and future readers.",
    url: "posts/engineering-decisions-people-decisions.html",
  },
  {
    title: "Leading Without Having Every Answer",
    topic: "leadership",
    date: "Apr 28, 2026",
    readTime: "5 min read",
    excerpt:
      "The work is not to appear certain. The work is to create enough direction for the team to move.",
    url: "posts/leading-without-every-answer.html",
  },
  {
    title: "The Quiet Value of Boring Code",
    topic: "java",
    date: "Apr 18, 2026",
    readTime: "3 min read",
    excerpt:
      "Boring code is not a lack of ambition. It is a kindness to the person who has to maintain it.",
    url: "posts/boring-code.html",
  },
  {
    title: "How I Think About Technical Debt",
    topic: "engineering",
    date: "Apr 9, 2026",
    readTime: "7 min read",
    excerpt:
      "Debt becomes manageable when it is visible, priced, and connected to a real product decision.",
    url: "posts/technical-debt.html",
  },
];

let activeTopic = "all";

const topicGrid = document.querySelector("#topicGrid");
const filters = document.querySelector("#filters");
const postGrid = document.querySelector("#postGrid");
const searchInput = document.querySelector("#searchInput");
const emptyState = document.querySelector("#emptyState");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

function renderTopics() {
  topicGrid.innerHTML = topics
    .map(
      (topic) => `
        <article class="topic-card">
          <span class="topic-icon" aria-hidden="true">${topic.initial}</span>
          <h3>${topic.name}</h3>
          <p>${topic.description}</p>
        </article>
      `,
    )
    .join("");
}

function renderFilters() {
  const allTopics = [{ id: "all", name: "All" }, ...topics];
  filters.innerHTML = allTopics
    .map(
      (topic) => `
        <button class="filter-button ${topic.id === activeTopic ? "is-active" : ""}" data-topic="${topic.id}">
          ${topic.name}
        </button>
      `,
    )
    .join("");
}

function renderPosts() {
  const query = searchInput.value.trim().toLowerCase();
  const visiblePosts = posts.filter((post) => {
    const matchesTopic = activeTopic === "all" || post.topic === activeTopic;
    const matchesSearch =
      !query ||
      [post.title, post.excerpt, post.topic].some((value) => value.toLowerCase().includes(query));

    return matchesTopic && matchesSearch;
  });

  postGrid.innerHTML = visiblePosts
    .map((post) => {
      const topic = topics.find((item) => item.id === post.topic);

      return `
        <article class="post-card">
          <div class="post-meta">
            <span class="post-tag ${post.topic}">${topic.name}</span>
            <span>${post.date}</span>
            <span>${post.readTime}</span>
          </div>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <a class="post-link" href="${post.url}">Read note</a>
        </article>
      `;
    })
    .join("");

  emptyState.hidden = visiblePosts.length > 0;
}

filters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-topic]");

  if (!button) return;

  activeTopic = button.dataset.topic;
  renderFilters();
  renderPosts();
});

searchInput.addEventListener("input", renderPosts);

renderTopics();
renderFilters();
renderPosts();
