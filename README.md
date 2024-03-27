# Local development

## Environment variables
Create a `.env` in `/frontend` and `/backend`
```
cd frontend
touch .env
```
Add `REACT_APP_GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY`

Add `REACT_APP_API_URL=YOUR_BACKEND_URL`

Add `<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_API_KEY&libraries=places"></script>` into index.html

Backend URL is `http://localhost:1337` by default

```
cd backend
touch.env
```
Add `WEATHER_API_KEY=YOUR_OPEN_WEATHER_API_KEY`

## Running the backend
```
cd backend
npm i
npm run dev
```

## Running the frontend
````
cd frontend
npm i
npm run start