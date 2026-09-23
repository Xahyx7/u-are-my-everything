# AAFUU — Interactive 3D Digital Magazine

This is the final ready-to-upload version.

## What is already done
- 12-page interactive magazine / scrapbook layout
- baby-pink lo-fi editorial visual direction
- 3D book depth + page-turn motion
- touch/swipe + keyboard navigation
- interactive photos with depth tilt
- hidden star messages
- audio-reactive motion
- the selected ~30-second section of your uploaded song is already inside `assets/music.mp3`
- photo placeholders are already named `photo01.jpg` to `photo08.jpg`
- no build system, npm, or command line is required

## You only need to replace photos
Open:
`assets/photos/`

Replace these files with your own images, keeping EXACTLY these filenames:
- photo01.jpg
- photo02.jpg
- photo03.jpg
- photo04.jpg
- photo05.jpg
- photo06.jpg
- photo07.jpg
- photo08.jpg

JPG or PNG is fine, but JPG is easiest here.

## Optional: replace the music
The included `assets/music.mp3` is the selected 30-second clip from the audio you uploaded in chat. It is already wired into the site.

To use a different legal audio file, replace it with another MP3 named exactly:
`music.mp3`

## Change your name
In `index.html`, search for:
`[YOUR NAME]`

Replace only that text.

## Put it on GitHub
1. Go to GitHub and create a new repository.
2. Give it a name such as `aafuu-digital-magazine`.
3. Create the repository.
4. Open the repository and choose **Add file → Upload files**.
5. Upload EVERYTHING inside this project folder (not the outer ZIP file).
6. Make sure `index.html` is in the top/root level of the repository.
7. Commit the upload.

## Put it on Vercel
1. Sign in to Vercel.
2. Choose **New Project**.
3. Import your GitHub repository.
4. Leave the project as a static site; no build command is needed.
5. Click **Deploy**.
6. Vercel will give you a live link.

## After deployment
Open the Vercel link on your phone.
Tap **Open the book**.
The selected music section will start after that tap, and the visual timeline will run with it.

## Important
Do not rename the `assets`, `assets/photos`, `index.html`, `style.css`, or `script.js` files.
Do not move the photo files out of `assets/photos/`.

The browser may block automatic audio before a user tap; the **Open the book** button is intentionally the first interaction that starts the experience.
