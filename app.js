const DEFAULT_DATA = {
  hero: { eyebrow: "WE ARE", title: "MATES|ESPORTS" },
  teams: [
    { id: 1, name: "MATES LEGENDS", rank: 1, image: "team-legends.jpg" },
    { id: 2, name: "MATES WARRIORS", rank: 2, image: "team-warriors.jpg" },
    { id: 3, name: "MATES PHOENIX", rank: 3, image: "team-phoenix.jpg" },
    { id: 4, name: "MATES HUNTERS", rank: 4, image: "team-hunters.jpg" },
    { id: 5, name: "MATES TITANS", rank: 5, image: "team-legends.jpg" },
    { id: 6, name: "MATES REBELS", rank: 6, image: "team-warriors.jpg" },
    { id: 7, name: "MATES ELITE", rank: 7, image: "team-phoenix.jpg" },
    { id: 8, name: "MATES RAVENS", rank: 8, image: "team-hunters.jpg" },
  ],
  matches: [
    {
      id: 1,
      date: "24 MAY 2024 • 18:00",
      a: "MATES LEGENDS",
      b: "NOVA FORCE",
      status: "upcoming",
      event: "Free Fire League",
    },
    {
      id: 2,
      date: "25 MAY 2024 • 20:00",
      a: "MATES WARRIORS",
      b: "VORTEX",
      status: "upcoming",
      event: "Mates Championship",
    },
    {
      id: 3,
      date: "26 MAY 2024 • 19:30",
      a: "MATES PHOENIX",
      b: "RED DRAGONS",
      status: "live",
      event: "Regional Finals",
    },
    {
      id: 4,
      date: "20 MAY 2024 • FINAL",
      a: "MATES HUNTERS",
      b: "NOVA FORCE",
      status: "completed",
      event: "Open Cup",
    },
    {
      id: 5,
      date: "28 MAY 2024 • 17:00",
      a: "MATES LEGENDS",
      b: "TITAN GAMING",
      status: "upcoming",
      event: "Pro Series",
    },
    {
      id: 6,
      date: "29 MAY 2024 • 21:00",
      a: "MATES WARRIORS",
      b: "BLACKOUT",
      status: "upcoming",
      event: "Pro Series",
    },
  ],
  tournaments: [
    {
      id: 1,
      name: "MATES CHAMPIONSHIP — SEASON 1",
      date: "25 MAY 2024",
      prize: "₹50,000",
      squad: "48/48",
      desc: "The flagship Mates tournament. Fight through the bracket and play for glory.",
    },
    {
      id: 2,
      name: "MATES OPEN CUP",
      date: "02 JUN 2024",
      prize: "₹25,000",
      squad: "32/48",
      desc: "An open competitive cup for hungry squads looking for their breakthrough.",
    },
    {
      id: 3,
      name: "REGIONAL FINALS",
      date: "15 JUN 2024",
      prize: "₹1,00,000",
      squad: "16/16",
      desc: "The best regional teams collide in a high-pressure championship.",
    },
  ],
  news: [
    {
      id: 1,
      title: "MATES ESPORTS WIN REGIONAL FINALS",
      date: "20 MAY 2024",
      image: "news-finals.jpg",
    },
    {
      id: 2,
      title: "NEW ROSTER ANNOUNCEMENT — MATES LEGENDS",
      date: "18 MAY 2024",
      image: "news-roster.jpg",
    },
    {
      id: 3,
      title: "MATES CHAMPIONSHIP REGISTRATIONS OPEN",
      date: "15 MAY 2024",
      image: "news-championship.jpg",
    },
    {
      id: 4,
      title: "MATES WARRIORS ADVANCE TO GRAND FINAL",
      date: "12 MAY 2024",
      image: "news-finals.jpg",
    },
    {
      id: 5,
      title: "SEASON 1 BOOTCAMP BEGINS",
      date: "08 MAY 2024",
      image: "news-roster.jpg",
    },
    {
      id: 6,
      title: "MATES ESPORTS ANNOUNCE NEW PARTNERSHIP",
      date: "01 MAY 2024",
      image: "news-championship.jpg",
    },
  ],
  stats: { matches: 128, teams: 12, tournaments: 24, news: 36 },
};

let data = loadData();
let currentFilter = "all";

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem("matesEsportsData"));
    return saved ? merge(DEFAULT_DATA, saved) : structuredClone(DEFAULT_DATA);
  } catch (e) {
    return structuredClone(DEFAULT_DATA);
  }
}
function merge(base, saved) {
  return {
    ...base,
    ...saved,
    hero: { ...base.hero, ...(saved.hero || {}) },
    stats: { ...base.stats, ...(saved.stats || {}) },
  };
}
function saveData() {
  localStorage.setItem("matesEsportsData", JSON.stringify(data));
  renderAll();
}
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2200);
}

function renderAll() {
  document.getElementById("heroEyebrow").textContent = data.hero.eyebrow;
  document.getElementById("heroTitle").innerHTML = (
    data.hero.title || "MATES|ESPORTS"
  )
    .split("|")
    .map((x, i) => (i ? `<em>${x}</em>` : x))
    .join("<br>");
  document.getElementById("statMatches").textContent = data.stats.matches;
  document.getElementById("statTeams").textContent = data.stats.teams;
  document.getElementById("statTournaments").textContent =
    data.stats.tournaments;
  document.getElementById("statNews").textContent = data.stats.news;
  document.getElementById("year").textContent = new Date().getFullYear();
  renderTeams();
  renderFeatured();
  renderNews();
  renderMatches();
  renderTournaments();
}
function renderTeams() {
  document.getElementById("topTeams").innerHTML = data.teams
    .slice(0, 4)
    .map((t) => teamCard(t))
    .join("");
  document.getElementById("allTeamGrid").innerHTML = data.teams
    .map(
      (t) =>
        `<div class="big-team"><img src="${t.image}" alt="${t.name}"><div><h3>${t.name}</h3><span>RANK #${t.rank}</span></div></div>`,
    )
    .join("");
}
function teamCard(t) {
  return `<article class="team-card" onclick="openTeam(${t.id})"><img src="${t.image}" alt="${t.name}"><div class="team-info"><h3>${t.name}</h3><span>RANK</span><b>#${t.rank}</b></div></article>`;
}
function openTeam(id) {
  const t = data.teams.find((x) => x.id === id);
  if (t) toast(`${t.name} selected — Rank #${t.rank}`);
}
function renderFeatured() {
  const t = data.tournaments[0];
  document.getElementById("featuredTournament").innerHTML =
    `<div class="tournament-art"></div><div class="tour-meta"><div><small>DATE</small><b>${t.date}</b></div><div><small>PRIZE POOL</small><b>${t.prize}</b></div><div><small>SQUAD</small><b>${t.squad}</b></div></div><button class="btn btn-gold" onclick="registerTournament(${t.id})">VIEW TOURNAMENT →</button>`;
}
function registerTournament(id) {
  const t = data.tournaments.find((x) => x.id === id);
  toast(`${t?.name || "Tournament"} opened`);
}
function renderNews() {
  document.getElementById("latestNews").innerHTML = data.news
    .slice(0, 3)
    .map((n) => newsRow(n))
    .join("");
  document.getElementById("allNewsGrid").innerHTML = data.news
    .map(
      (n) =>
        `<article class="news-box" onclick="openNews(${n.id})"><img src="${n.image}" alt=""><div class="body"><h3>${n.title}</h3><time>${n.date}</time></div></article>`,
    )
    .join("");
}
function newsRow(n) {
  return `<article class="news-item" onclick="openNews(${n.id})"><img src="${n.image}" alt=""><div><b>${n.title}</b><time>${n.date}</time></div></article>`;
}
function openNews(id) {
  const n = data.news.find((x) => x.id === id);
  if (n) toast(n.title);
}
function renderMatches() {
  const list =
    currentFilter === "all"
      ? data.matches
      : data.matches.filter((m) => m.status === currentFilter);
  document.getElementById("matchGrid").innerHTML =
    list
      .map(
        (m) =>
          `<article class="match-card"><span class="match-status">${m.status.toUpperCase()}</span><div class="match-date">${m.date}</div><div class="match-teams"><div class="match-team"><strong>${m.a}</strong><small>${m.event}</small></div><div class="versus">VS</div><div class="match-team"><strong>${m.b}</strong><small>OPPONENT</small></div></div><button class="outline-btn" onclick="matchAction(${m.id})">${m.status === "completed" ? "VIEW RESULT" : "MATCH DETAILS →"}</button></article>`,
      )
      .join("") || `<p style="color:#888">No matches in this filter.</p>`;
}
function matchAction(id) {
  const m = data.matches.find((x) => x.id === id);
  toast(`${m.a} vs ${m.b} — ${m.event}`);
}
function renderTournaments() {
  document.getElementById("tournamentGrid").innerHTML = data.tournaments
    .map(
      (t) =>
        `<article class="tour-box"><div class="art"></div><div class="body"><h3>${t.name}</h3><p>${t.desc}</p><div class="tour-row"><span>${t.date}</span><b>${t.prize}</b><span>${t.squad}</span></div><button class="outline-btn" onclick="registerTournament(${t.id})">VIEW TOURNAMENT →</button></div></article>`,
    )
    .join("");
}

document
  .querySelectorAll("#mainNav a")
  .forEach((a) =>
    a.addEventListener("click", () =>
      document.getElementById("mainNav").classList.remove("open"),
    ),
  );
document
  .getElementById("menuToggle")
  .addEventListener("click", () =>
    document.getElementById("mainNav").classList.toggle("open"),
  );
document.querySelectorAll(".filter").forEach((btn) =>
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter")
      .forEach((x) => x.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderMatches();
  }),
);
document
  .querySelectorAll("[data-scroll]")
  .forEach((b) =>
    b.addEventListener("click", () =>
      document
        .querySelector(b.dataset.scroll)
        .scrollIntoView({ behavior: "smooth" }),
    ),
  );
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.reset();
  toast("Message sent successfully!");
});

const modal = document.getElementById("adminModal");
document.getElementById("adminOpen").addEventListener("click", () => {
  modal.classList.add("open");
  document.getElementById("adminPassword").focus();
});
document
  .getElementById("adminClose")
  .addEventListener("click", () => modal.classList.remove("open"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("open");
});
document.getElementById("adminLoginBtn").addEventListener("click", loginAdmin);
document.getElementById("adminPassword").addEventListener("keydown", (e) => {
  if (e.key === "Enter") loginAdmin();
});
function loginAdmin() {
  if (document.getElementById("adminPassword").value === "admin123") {
    document.getElementById("adminLogin").classList.add("hidden");
    document.getElementById("adminDashboard").classList.remove("hidden");
    renderAdmin("dashboard");
  } else toast("Incorrect password");
}
document.querySelectorAll(".admin-tab").forEach((b) =>
  b.addEventListener("click", () => {
    document
      .querySelectorAll(".admin-tab")
      .forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    renderAdmin(b.dataset.tab);
  }),
);
document.getElementById("logoutAdmin").addEventListener("click", () => {
  document.getElementById("adminDashboard").classList.add("hidden");
  document.getElementById("adminLogin").classList.remove("hidden");
  document.getElementById("adminPassword").value = "";
});

function renderAdmin(tab) {
  const el = document.getElementById("adminContent");
  if (tab === "dashboard") {
    el.innerHTML = `<h2>DASHBOARD</h2><div class="dash-cards"><div class="dash-card"><b>MATCHES</b><strong>${data.stats.matches}</strong></div><div class="dash-card"><b>TEAMS</b><strong>${data.stats.teams}</strong></div><div class="dash-card"><b>TOURNAMENTS</b><strong>${data.stats.tournaments}</strong></div><div class="dash-card"><b>NEWS</b><strong>${data.stats.news}</strong></div></div><p style="color:#888">All content is stored in your browser using localStorage. Changes persist after refresh.</p>`;
  } else if (tab === "hero") {
    el.innerHTML = `<h2>HERO SECTION</h2><form class="admin-form" id="heroForm"><input name="eyebrow" value="${esc(data.hero.eyebrow)}" placeholder="Eyebrow"><input name="title" value="${esc(data.hero.title)}" placeholder="Title, use | for line break"><button class="btn btn-gold">SAVE HERO →</button></form>`;
    document.getElementById("heroForm").onsubmit = (e) => {
      e.preventDefault();
      data.hero = {
        eyebrow: e.target.eyebrow.value,
        title: e.target.title.value,
      };
      saveData();
      toast("Hero updated");
      renderAdmin(tab);
    };
  } else if (tab === "social") {
    el.innerHTML = `<h2>SOCIAL LINKS</h2><form class="admin-form" onsubmit="event.preventDefault();toast('Social links saved')"><input placeholder="Facebook URL" value="#"><input placeholder="YouTube URL" value="#"><input placeholder="Instagram URL" value="#"><input placeholder="Discord URL" value="#"><button class="btn btn-gold">SAVE LINKS →</button></form>`;
  } else if (tab === "matches")
    renderAdminList(
      el,
      "MATCHES",
      data.matches,
      ["a", "b", "event", "date"],
      "matches",
    );
  else if (tab === "teams")
    renderAdminList(el, "TEAMS", data.teams, ["name", "rank"], "teams");
  else if (tab === "tournaments")
    renderAdminList(
      el,
      "TOURNAMENTS",
      data.tournaments,
      ["name", "date", "prize"],
      "tournaments",
    );
  else if (tab === "news")
    renderAdminList(el, "NEWS", data.news, ["title", "date"], "news");
}
function renderAdminList(el, title, list, fields, key) {
  el.innerHTML = `<h2>${title}</h2><button class="btn btn-gold" onclick="addItem('${key}')">+ ADD NEW</button><div style="margin-top:15px">${list.map((item) => `<div class="admin-row"><span>${esc(item[fields[0]])} ${fields[1] ? `<small style="color:#777">• ${esc(item[fields[1]])}</small>` : ""}</span><span class="admin-row-actions"><button class="mini" onclick="editItem('${key}',${item.id})">EDIT</button><button class="mini danger" onclick="deleteItem('${key}',${item.id})">DELETE</button></span></div>`).join("")}</div>`;
}
function addItem(key) {
  const prompts = {
    teams: ["Team name", "Rank"],
    matches: ["Team A", "Team B"],
    tournaments: ["Tournament name", "Date"],
    news: ["News title", "Date"],
  };
  const p = prompts[key];
  if (!p) return;
  const first = prompt(p[0]);
  if (!first) return;
  const second = prompt(p[1] || "Value") || "";
  const id = Date.now();
  if (key === "teams")
    data.teams.push({
      id,
      name: first,
      rank: Number(second) || data.teams.length + 1,
      image: "assets/team-legends.jpg",
    });
  if (key === "matches")
    data.matches.push({
      id,
      a: first,
      b: second,
      status: "upcoming",
      date: "TBA",
      event: "Mates Esports",
    });
  if (key === "tournaments")
    data.tournaments.push({
      id,
      name: first,
      date: second,
      prize: "₹0",
      squad: "0/48",
      desc: "New tournament",
    });
  if (key === "news")
    data.news.push({
      id,
      title: first,
      date: second,
      image: "assets/news-finals.jpg",
    });
  saveData();
  renderAdmin(key);
  toast("Item added");
}
function editItem(key, id) {
  const item = data[key].find((x) => x.id === id);
  if (!item) return;
  if (key === "teams") {
    item.name = prompt("Team name", item.name) || item.name;
    item.rank = Number(prompt("Rank", item.rank)) || item.rank;
  }
  if (key === "matches") {
    item.a = prompt("Team A", item.a) || item.a;
    item.b = prompt("Team B", item.b) || item.b;
    item.status =
      prompt("Status: upcoming / live / completed", item.status) || item.status;
  }
  if (key === "tournaments") {
    item.name = prompt("Tournament name", item.name) || item.name;
    item.date = prompt("Date", item.date) || item.date;
    item.prize = prompt("Prize", item.prize) || item.prize;
  }
  if (key === "news") {
    item.title = prompt("News title", item.title) || item.title;
    item.date = prompt("Date", item.date) || item.date;
  }
  saveData();
  renderAdmin(key);
  toast("Item updated");
}
function deleteItem(key, id) {
  if (!confirm("Delete this item?")) return;
  data[key] = data[key].filter((x) => x.id !== id);
  saveData();
  renderAdmin(key);
  toast("Item deleted");
}
function esc(v) {
  return String(v ?? "").replace(
    /[&<>"']/g,
    (m) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[m],
  );
}

renderAll();
