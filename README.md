# MATES ESPORTS Website

A responsive, self-contained front-end recreation inspired by the supplied MATES ESPORTS reference image.

## Run
Open `index.html` in a modern browser.

## Included functionality
- Responsive navigation + mobile menu
- Hero section and CTAs
- Dynamic team, match, tournament and news data
- Match filters (All / Upcoming / Live / Completed)
- Tournament and news interaction
- Contact form feedback
- Admin dashboard with browser-local persistence
- Add / edit / delete teams, matches, tournaments and news
- Hero text editing
- Data persists via localStorage

## Demo admin
Password: `admin123`

This is intentionally a front-end/static build. For production deployment, connect the forms and admin actions to a real backend/database and replace the demo password with secure authentication.

## Visual assets
The `assets` folder contains cropped visual references derived from the image supplied with the request, plus the original reference image.


## Hero overlap fix
The hero background now uses a clean artwork crop without the reference image's baked-in headline, so the live HTML headline/buttons no longer overlap or duplicate the background text.
