/* =====================================================================
   RESUME SITE — render logic (de-identified build, no PII)
   ===================================================================== */
(function () {
  "use strict";

  const R = (typeof RESUME !== "undefined" && RESUME) ? RESUME : (window.RESUME || {});
  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  /* ---- Footer year ---- */
  const yearEl = $("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Identity / hero ---- */
  if (R.name) {
    const n = $("name");
    if (n) n.textContent = R.name;
    document.title = R.name + (R.eyebrow ? " — " + R.eyebrow : "");
  }
  if (R.eyebrow) { const e = $("eyebrow"); if (e) e.textContent = R.eyebrow; }
  if (R.tagline) { const t = $("tagline"); if (t) t.textContent = R.tagline; }
  if (R.initials) {
    const a = $("avatarInitials");
    if (a) a.textContent = R.initials;
  }
  if (R.photoUrl) {
    const av = $("avatar");
    if (av) {
      av.style.backgroundImage = "url('" + esc(R.photoUrl) + "')";
      av.style.backgroundSize = "cover";
      av.style.backgroundPosition = "center";
      const ini = $("avatarInitials");
      if (ini) ini.style.display = "none";
    }
  }

  /* ---- Hero meta chips ---- */
  const metaWrap = $("heroMeta");
  if (metaWrap && Array.isArray(R.heroMeta)) {
    metaWrap.innerHTML = R.heroMeta
      .map(
        (m) =>
          '<span class="chip"><span class="chip__label">' +
          esc(m.label) +
          '</span><span class="chip__value">' +
          esc(m.value) +
          "</span></span>"
      )
      .join("");
  }

  /* ---- Primary CTA (LinkedIn link removed for PII safety) ---- */

  /* ---- About ---- */
  if (R.about) { const a = $("aboutText"); if (a) a.textContent = R.about; }

  /* ---- Core Competencies ---- */
  const compWrap = $("competencyList");
  if (compWrap && Array.isArray(R.competencies)) {
    compWrap.innerHTML = R.competencies
      .map(
        (g) =>
          '<div class="competency">' +
          '<h3 class="competency__group">' + esc(g.group) + "</h3>" +
          '<ul class="competency__items">' +
          (Array.isArray(g.items) ? g.items.map((i) => "<li>" + esc(i) + "</li>").join("") : "") +
          "</ul></div>"
      )
      .join("");
  }

  /* ---- Experience timeline ---- */
  const expWrap = $("experienceList");
  if (expWrap && Array.isArray(R.experience)) {
    expWrap.innerHTML = R.experience
      .map(
        (x) =>
          '<div class="timeline__item">' +
          '<div class="timeline__dot" aria-hidden="true"></div>' +
          '<div class="timeline__body">' +
          '<h3 class="timeline__title">' + esc(x.title) + "</h3>" +
          '<p class="timeline__org">' + esc(x.org) +
          (x.period ? ' <span class="timeline__period">· ' + esc(x.period) + "</span>" : "") +
          "</p>" +
          (x.summary ? '<p class="timeline__summary">' + esc(x.summary) + "</p>" : "") +
          "</div></div>"
      )
      .join("");
  }

  /* ---- Personal Projects (cards) ---- */
  const projWrap = $("projectList");
  if (projWrap && Array.isArray(R.projects)) {
    projWrap.innerHTML = R.projects
      .map(
        (p) =>
          '<div class="card">' +
          '<div class="card__icon" aria-hidden="true">⚙</div>' +
          '<h3 class="card__title">' + esc(p.title) + "</h3>" +
          (p.detail ? '<p class="card__note">' + esc(p.detail) + "</p>" : "") +
          (p.link
            ? '<a class="card__link" href="' + esc(p.link) + '" target="_blank" rel="noopener">Learn more →</a>'
            : "") +
          "</div>"
      )
      .join("");
  }

  /* ---- Home Lab Diagram (dynamic, responsive SVG) ---- */
  const diaWrap = $("homelabDiagram");
  if (diaWrap && R.homelab) {
    const H = R.homelab;
    const byId = {};
    (H.nodes || []).forEach((n) => { byId[n.id] = n; });

    // Compute bounds from BOTH zones and nodes so nothing clips;
    // expand viewBox by a margin so labels/notes never touch the edge.
    const PAD = 24;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const acc = (x, y, w, h) => {
      minX = Math.min(minX, x); minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + w); maxY = Math.max(maxY, y + h);
    };
    // Build zones by unioning the bounding boxes of their member nodes
    // (so node boxes always sit neatly INSIDE the dashed container).
    const ZPAD = 18, ZPAD_TOP = 34;
    const zoneRects = (H.zones || []).map((z) => {
      const members = (H.nodes || []).filter((n) => {
        const nx = n.x; // node center x
        return nx >= z.x && nx <= z.x + z.w && n.y >= z.y && n.y <= z.y + z.h;
      });
      if (!members.length) return { label: z.label, x: z.x, y: z.y, w: z.w, h: z.h };
      let mnx = Infinity, mny = Infinity, mxx = -Infinity, mxy = -Infinity;
      members.forEach((n) => {
        mnx = Math.min(mnx, n.x - 90); mny = Math.min(mny, n.y - 34 - 8);
        mxx = Math.max(mxx, n.x + 90); mxy = Math.max(mxy, n.y + 34 + (n.note ? 30 : 0));
      });
      return {
        label: z.label,
        x: Math.round(mnx - ZPAD), y: Math.round(mny - ZPAD_TOP),
        w: Math.round(mxx - mnx + ZPAD * 2), h: Math.round(mxy - mny + ZPAD_TOP + ZPAD),
      };
    });
    (zoneRects || []).forEach((z) => acc(z.x, z.y, z.w, z.h));
    (H.nodes || []).forEach((n) => acc(n.x - 90, n.y - 34, 180, 68 + (n.note ? 30 : 0)));
    const W = Math.max(10, maxX - minX + PAD * 2);
    const Hh = Math.max(10, maxY - minY + PAD * 2);
    const OX = minX - PAD, OY = minY - PAD; // origin offset

    function renderDiagram() {
      const links = (H.links || [])
        .map(([a, b]) => {
          const na = byId[a], nb = byId[b];
          if (!na || !nb) return "";
          return '<line class="link-line" x1="' + (na.x - OX) + '" y1="' + (na.y - OY) + '" x2="' + (nb.x - OX) + '" y2="' + (nb.y - OY) + '" />';
        })
        .join("");
      const zones = (zoneRects || [])
        .map(
          (z) =>
            '<rect class="zone-box" x="' + (z.x - OX) + '" y="' + (z.y - OY) + '" width="' + z.w + '" height="' + z.h + '" rx="14" />' +
            '<text class="zone-label" x="' + (z.x - OX + 10) + '" y="' + (z.y - OY + 18) + '">' + esc(z.label) + "</text>"
        )
        .join("");
      const nodes = (H.nodes || [])
        .map((n) => {
          const cls = "node node--" + (n.kind || "node");
          const lines = Array.isArray(n.label) ? n.label : [n.label];
          const t = lines
            .map(
              (ln, i) =>
                '<tspan x="' + (n.x - OX) + '" dy="' + (i === 0 ? -((lines.length - 1) * 11) + 2 : 13) + '">' +
                (i === 0 ? esc(ln) : '<tspan class="node-sub">' + esc(ln) + "</tspan>") +
                "</tspan>"
            )
            .join("");
          // Note sits clearly BELOW the box (box half-height = 34, +15 gap) so it never overlaps.
          const note = n.note
            ? '<text class="node-note" x="' + (n.x - OX) + '" y="' + (n.y - OY + 34 + 15) + '" text-anchor="middle">' + esc(n.note) + "</text>"
            : "";
          return (
            '<g class="' + cls + '">' +
            '<rect class="node-box" x="' + (n.x - OX - 90) + '" y="' + (n.y - OY - 34) + '" width="180" height="68" rx="12" />' +
            '<text class="node-label" x="' + (n.x - OX) + '" y="' + (n.y - OY - 6) + '" text-anchor="middle">' + t + "</text>" +
            note +
            "</g>"
          );
        })
        .join("");
      const legend = (H.legend || [])
        .map(
          (l) =>
            '<span class="legend__item"><span class="legend__swatch legend--' +
            esc(l.kind) + '"></span>' + esc(l.label) + "</span>"
        )
        .join("");
      diaWrap.innerHTML =
        '<svg class="diagram__svg" viewBox="0 0 ' + W + " " + Hh + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' +
        esc(H.title || "Home lab topology") + '">' +
        zones + links + nodes +
        "</svg>" +
        (legend ? '<div class="legend">' + legend + "</div>" : "") +
        (H.caption ? '<p class="diagram__caption">' + esc(H.caption) + "</p>" : "");
    }

    renderDiagram();
    // Re-render is static once drawn, but keep it resilient to container resizes
    // (viewBox + preserveAspectRatio already make it fluid; this guards reflow).
    let rz;
    window.addEventListener("resize", function () {
      clearTimeout(rz);
      rz = setTimeout(renderDiagram, 150);
    });
  }

  /* ---- Certifications (cards) ---- */
  const certWrap = $("certList");
  if (certWrap && Array.isArray(R.certifications)) {
    certWrap.innerHTML = R.certifications
      .map(
        (c) =>
          '<div class="card">' +
          '<div class="card__icon" aria-hidden="true">🛡</div>' +
          '<h3 class="card__title">' + esc(c.name) + "</h3>" +
          '<p class="card__sub">' + esc(c.issuer) +
          (c.date ? " · " + esc(c.date) : "") + "</p>" +
          (c.note ? '<p class="card__note">' + esc(c.note) + "</p>" : "") +
          "</div>"
      )
      .join("");
  }

  /* ---- Skills (bars) ---- */
  const skillWrap = $("skillList");
  if (skillWrap && Array.isArray(R.skills)) {
    skillWrap.innerHTML = R.skills
      .map(
        (s) =>
          '<div class="skill">' +
          '<div class="skill__head"><span class="skill__name">' + esc(s.name) + '</span>' +
          '<span class="skill__pct">' + (s.level || 0) + "%</span></div>" +
          '<div class="skill__track"><div class="skill__fill" style="width:0%" data-level="' +
          (s.level || 0) + '"></div></div>' +
          "</div>"
      )
      .join("");
  }

  /* ---- Education & Military (cards) ---- */
  const eduWrap = $("educationList");
  if (eduWrap && Array.isArray(R.education)) {
    eduWrap.innerHTML = R.education
      .map(
        (e) =>
          '<div class="card">' +
          '<div class="card__icon" aria-hidden="true">' +
          (e.type && /military/i.test(e.type) ? "★" : "🎓") +
          "</div>" +
          '<h3 class="card__title">' + esc(e.name) +
          (e.type ? ' <span class="card__tag">' + esc(e.type) + "</span>" : "") +
          "</h3>" +
          (e.detail ? '<p class="card__note">' + esc(e.detail) + "</p>" : "") +
          "</div>"
      )
      .join("");
  }

  /* ---- Memberships / recognition (cards) ---- */
  const memWrap = $("membershipList");
  if (memWrap && Array.isArray(R.memberships)) {
    memWrap.innerHTML = R.memberships
      .map(
        (m) =>
          '<div class="card">' +
          '<div class="card__icon" aria-hidden="true">' +
          (m.type === "Award" ? "🏆" : "🤝") +
          "</div>" +
          '<h3 class="card__title">' + esc(m.name) +
          (m.type ? ' <span class="card__tag">' + esc(m.type) + "</span>" : "") +
          "</h3>" +
          (m.detail ? '<p class="card__note">' + esc(m.detail) + "</p>" : "") +
          "</div>"
      )
      .join("");
  }

  /* ---- Footer ---- */
  if (R.footer) {
    const f = $("footerText");
    if (f) f.innerHTML = "© " + new Date().getFullYear() + " · " + esc(R.footer);
  }
  if (R.motto) {
    const fm = document.createElement("p");
    fm.className = "footer__motto";
    fm.textContent = R.motto;
    const foot = document.querySelector(".footer");
    if (foot) foot.insertBefore(fm, foot.querySelector(".footer__top"));
  }

  /* ---- Social profile links ---- */
  if (R.links && typeof R.links === "object") {
    const host = $("socialLinks");
    if (host) {
      const ICONS = {
        linkedin:
          '<svg class="social__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
        github:
          '<svg class="social__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 .1.8 1.7 2.6 1.2.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.7 18 5 18 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>',
      };
      const LABELS = { linkedin: "LinkedIn", github: "GitHub" };
      host.innerHTML = Object.keys(R.links)
        .filter((k) => R.links[k])
        .map((k) => {
          const url = esc(R.links[k]);
          const label = LABELS[k] || k;
          return (
            '<a class="social__link" href="' +
            url +
            '" target="_blank" rel="noopener noreferrer" aria-label="' +
            esc(label) +
            '">' +
            (ICONS[k] || "") +
            "<span>" +
            esc(label) +
            "</span></a>"
          );
        })
        .join("");
    }
  }

  /* ---- Contact form ---- */
  if (R.contact) {
    const note = $("contactNote");
    if (note && R.contact.note) note.textContent = R.contact.note;
    const avail = $("contactAvailability");
    if (avail && R.contact.availability) avail.textContent = R.contact.availability;

    const form = $("contactForm");
    if (form) {
      const status = $("cfStatus");
      const submit = $("cfSubmit");
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        if (status) { status.textContent = ""; status.className = "contact__status"; }
        // honeypot
        const hp = form.querySelector('input[name="company"]');
        if (hp && hp.value) return; // bot
        const name = (form.querySelector("#cfName") || {}).value || "";
        const email = (form.querySelector("#cfEmail") || {}).value || "";
        const subject = (form.querySelector("#cfSubject") || {}).value || "";
        const message = (form.querySelector("#cfMessage") || {}).value || "";
        if (!name || !email || !subject || !message) {
          if (status) { status.textContent = "Please fill in every field."; status.className = "contact__status is-err"; }
          return;
        }
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
          if (status) { status.textContent = "That email doesn't look right."; status.className = "contact__status is-err"; }
          return;
        }
        if (submit) submit.disabled = true;
        if (status) status.textContent = "Sending…";
        const payload = { name: name, email: email, subject: subject, message: message };
        fetch(R.contact.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(payload),
        })
          .then(function (r) { return r.json().catch(function () { return { ok: r.ok }; }); })
          .then(function (d) {
            if (d && (d.ok || d.success)) {
              form.reset();
              if (status) { status.textContent = "Thanks — message sent!"; status.className = "contact__status is-ok"; }
            } else {
              if (status) { status.textContent = (d && d.error) || "Something went wrong. Try again?"; status.className = "contact__status is-err"; }
            }
          })
          .catch(function () {
            if (status) { status.textContent = "Network error — please try again."; status.className = "contact__status is-err"; }
          })
          .finally(function () { if (submit) submit.disabled = false; });
      });
    }
  }

  /* ---- Theme toggle ---- */
  const root = document.documentElement;
  const saved = (function () {
    try { return localStorage.getItem("ra-theme"); } catch (e) { return null; }
  })();
  if (saved === "light") root.setAttribute("data-theme", "light");
  const toggle = $("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      const isLight = root.getAttribute("data-theme") === "light";
      if (isLight) { root.removeAttribute("data-theme"); try { localStorage.setItem("ra-theme", "dark"); } catch (e) {} }
      else { root.setAttribute("data-theme", "light"); try { localStorage.setItem("ra-theme", "light"); } catch (e) {} }
    });
  }

  /* ---- Nav shadow on scroll ---- */
  const nav = $("nav");
  if (nav) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 12) nav.classList.add("nav--scrolled");
      else nav.classList.remove("nav--scrolled");
    });
  }

  /* ---- Reveal on scroll ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const ro = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-visible"); ro.unobserve(e.target); }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => ro.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---- Animate skill bars when in view ---- */
  function fillSkills() {
    document.querySelectorAll(".skill__fill").forEach(function (el) {
      el.style.width = (el.getAttribute("data-level") || "0") + "%";
    });
  }
  if ("IntersectionObserver" in window && skillWrap) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { fillSkills(); io.disconnect(); }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(skillWrap);
  } else {
    fillSkills();
  }

  /* ---- SOC background "liveness": clock + event ticker + threat counter ---- */
  (function socAmbient() {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // live UTC clock in the top rail
    var clock = document.getElementById("railClock");
    function tick() {
      if (clock) {
        var d = new Date();
        var p = function (n) { return String(n).padStart(2, "0"); };
        clock.textContent = p(d.getUTCHours()) + ":" + p(d.getUTCMinutes()) + ":" + p(d.getUTCSeconds());
      }
    }
    tick(); setInterval(tick, 1000);

    // THREATS = real count of malicious-source IPs in the live FireHOL feed
    // (same real data as the globe + bottom ticker — no fabricated numbers)
    var threats = document.getElementById("railThreats");
    function refreshThreats() {
      if (!threats || reduce) return;
      fetch("attack-feed.json?t=" + Date.now())
        .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
        .then(function (j) {
          var n = (j && j.count) ? j.count : 0;
          threats.textContent = String(n);
        })
        .catch(function () { /* leave last value if feed unavailable */ });
    }
    refreshThreats();
    // re-sync whenever the backend refreshes the feed (cron every 6h); poll hourly as backstop
    setInterval(refreshThreats, 60 * 60 * 1000);

    // NODES + UPTIME = real Tailscale tailnet devices + real BigDeborah host uptime
    var nodesEl = document.getElementById("railNodes");
    var uptimeEl = document.getElementById("railUptime");
    function refreshStatus() {
      if (reduce) return;
      fetch("status.json?t=" + Date.now())
        .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
        .then(function (s) {
          if (nodesEl && s.tailnetDevices != null) {
            nodesEl.textContent = s.tailnetOnline + "/" + s.tailnetDevices;
          }
          if (uptimeEl && s.hostUptimeHuman) {
            uptimeEl.textContent = s.hostUptimeHuman.replace(/\s/g, "");
          }
          window.__labStatus = s; // cache for drawers
        })
        .catch(function () { /* leave last value if unavailable */ });
    }
    refreshStatus();
    // status.json is regenerated every 5 min by cron; poll every 5 min as backstop
    setInterval(refreshStatus, 5 * 60 * 1000);

    /* ---- rail hover/focus drawers (replaces native title tooltips) ---- */
    (function () {
      if (reduce) return;
      var drawer = document.getElementById("railDrawer");
      var dTitle = document.getElementById("drawerTitle");
      var dBody = document.getElementById("drawerBody");
      if (!drawer) return;
      var hideTimer = null;

      function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
      }); }

      function content(key) {
        var s = window.__labStatus || {};
        if (key === "live") {
          return { title: "Connection", body:
            '<div class="kv"><span class="k">Mode</span><span class="v">LIVE (timer)</span></div>' +
            '<div class="kv"><span class="k">Background</span><span class="v">running</span></div>' +
            '<div class="src">Static presence indicator — page is served and scripts refresh on a timer.</div>' };
        }
        if (key === "soc") {
          return { title: "Status", body:
            '<div class="kv"><span class="k">State</span><span class="v">OPERATIONAL</span></div>' +
            '<div class="kv"><span class="k">Site</span><span class="v">served</span></div>' +
            '<div class="src">Static label. Real health lives in the NODES / UPTIME / THREATS drawers.</div>' };
        }
        if (key === "threats") {
          var n = (document.getElementById("railThreats") || {}).textContent || "0";
          return { title: "Threat Feed", body:
            '<div class="kv"><span class="k">Malicious IPs</span><span class="v">' + esc(n) + '</span></div>' +
            '<div class="kv"><span class="k">Source</span><span class="v">FireHOL L1 + abusers_30d</span></div>' +
            '<div class="kv"><span class="k">Refresh</span><span class="v">hourly / 6h cron</span></div>' +
            '<div class="src">Real count of known-bad source IPs in the live blocklist. NOT attacks on this instance.</div>' };
        }
        if (key === "nodes") {
          var devs = s.tailnetNodes || [];
          var rows = devs.map(function (d) {
            return '<div class="kv"><span class="k"><span class="dot ' + (d.online ? "on" : "off") + '"></span>' +
              esc(d.name) + (d.exitNode ? " [exit]" : "") + '</span><span class="v">' +
              (d.online ? "online" : "offline") + '</span></div>';
          }).join("");
          return { title: "Tailnet (" + (s.tailnetOnline || 0) + "/" + (s.tailnetDevices || 0) + ")", body:
            (rows || '<div class="kv"><span class="k">devices</span><span class="v">loading</span></div>') +
            '<div class="src">Real Tailscale mesh (tailscale status --json). [exit] = VPS exit node. Offline counted.</div>' };
        }
        if (key === "uptime") {
          return { title: "Host Uptime", body:
            '<div class="kv"><span class="k">BigDeborah</span><span class="v">' + esc(s.hostUptimeHuman || "—") + '</span></div>' +
            '<div class="kv"><span class="k">Availability</span><span class="v">' + esc(s.availabilityPct || "—") + '%</span></div>' +
            '<div class="src">Real host uptime from /proc/uptime. Regenerated every 5 min.</div>' };
        }
        if (key === "clock") {
          return { title: "Clock", body:
            '<div class="kv"><span class="k">Timezone</span><span class="v">UTC</span></div>' +
            '<div class="kv"><span class="k">Source</span><span class="v">client-side</span></div>' +
            '<div class="src">Live UTC clock, ticking every second. No server call.</div>' };
        }
        return { title: key, body: "" };
      }

      function show(el) {
        if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
        var key = el.getAttribute("data-drawer");
        var c = content(key);
        dTitle.innerHTML = esc(c.title);
        dBody.innerHTML = c.body;
        var r = el.getBoundingClientRect();
        var left = Math.min(r.left, window.innerWidth - 350);
        drawer.style.left = Math.max(8, left) + "px";
        drawer.classList.add("show");
        drawer.setAttribute("aria-hidden", "false");
      }
      var pinnedEl = null;
      function setPinnedClass() {
        items.forEach(function (it) { it.classList.toggle("pinned", it === pinnedEl); });
      }
      function hide() {
        if (pinnedEl) return; // don't auto-hide while a drawer is pinned
        hideTimer = setTimeout(function () {
          drawer.classList.remove("show");
          drawer.setAttribute("aria-hidden", "true");
        }, 120);
      }
      function pin(el) {
        if (pinnedEl === el) { // toggle off
          pinnedEl = null;
          setPinnedClass();
          hide();
          return;
        }
        pinnedEl = el;
        setPinnedClass();
        show(el);
      }

      var items = document.querySelectorAll(".rail-item");
      items.forEach(function (it) {
        it.addEventListener("mouseenter", function () { if (!pinnedEl) show(it); });
        it.addEventListener("mouseleave", hide);
        it.addEventListener("focus", function () { if (!pinnedEl) show(it); });
        it.addEventListener("blur", hide);
        it.addEventListener("click", function (e) { e.stopPropagation(); pin(it); });
      });
      // click anywhere else unpins
      document.addEventListener("click", function () {
        if (pinnedEl) { pinnedEl = null; setPinnedClass(); hide(); }
      });
      drawer.addEventListener("mouseenter", function () { if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; } });
      drawer.addEventListener("mouseleave", hide);
      drawer.addEventListener("click", function (e) { e.stopPropagation(); }); // clicks inside drawer don't unpin
    })();

  })();
})();
