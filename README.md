# FL MATES — Original Static Website

This package is a fresh implementation inspired by the structure and visual direction of the supplied reference image.

## No copied image
The supplied reference image is NOT used, cropped, traced, or embedded in this package.
All hero/card artwork in `assets/` is original SVG artwork created specifically for this website.

## Stack
- HTML5
- CSS3
- Vanilla JavaScript
- SVG artwork
- localStorage for the static admin demo
- No PHP
- No Python
- No Django
- No MySQL

## Pages
- index.html
- guild-test.html
- esports.html
- announcements.html
- social.html
- contact.html
- admin-login.html
- admin.html

## Admin
Open `admin-login.html`

Username: `admin`
Password: `admin123`

Admin features:
- Add/edit/delete announcements
- Add/edit/delete tournaments
- View registrations
- View contact messages
- Update website name and social links

## Important static-site limitation
Because this is intentionally HTML/CSS/JS only, the admin panel stores changes in browser localStorage. It is not a server-side CMS and changes are not shared between different devices/browsers.

For a real public multi-user admin CMS, a backend/database is required.

## Deployment
You can upload the entire folder to any static host. Keep the `assets` folder beside the HTML files.
