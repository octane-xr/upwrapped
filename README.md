# UPWrapped

Academic year summary in Spotify Wrapped style for Universidad de Palermo students.

## Disclaimer

This project is NOT affiliated with Universidad de Palermo. Credentials are not stored or persisted. Use at your own risk. Data is obtained directly from MyUP in real-time.

## Features

- Secure login with MyUP credentials
- Automatic extraction of academic data
- Visualization in Wrapped-style cards
- PDF download
- Year selection
- Rate limiting and security
- No sensitive data persistence

## Technology Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

### Backend
- Node.js + Express
- TypeScript
- Undici (HTTP client)
- Cheerio (HTML parsing)
- PDFKit (PDF generation)
- Zod (validation)

## Setup

### Requirements
- Node.js >= 18.0.0
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repo-url>
cd UpWrapped
```

2. Install dependencies
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

3. Configure environment variables

Create `.env` file in project root:
```env
PORT_BACKEND=4000
FRONTEND_ORIGIN=http://localhost:3000
REQUEST_TIMEOUT_MS=15000
NODE_ENV=development
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=10
```

Create `.env.local` file in `/frontend`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

4. Run in development mode
```bash
npm run dev
```

This will start:
- Backend on `http://localhost:4000`
- Frontend on `http://localhost:3000`

## Project Structure

```
UpWrapped/
├── backend/
│   ├── src/
│   │   ├── server.ts
│   │   ├── types.ts
│   │   ├── routes/
│   │   │   └── wrapped.ts
│   │   └── services/
│   │       ├── myupClient.ts
│   │       ├── wrappedService.ts
│   │       ├── pdfService.ts
│   │       └── parsers/
│   │           ├── homeParser.ts
│   │           ├── calificacionesParser.ts
│   │           └── __tests__/
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── components/
│   │   └── services/
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── next.config.js
├── package.json
└── README.md
```

## Security

### Implemented measures:

1. No credential persistence
2. Input sanitization with Zod
3. Rate limiting (10 requests per 15 minutes per IP)
4. Request timeouts (15 seconds max)
5. CORS configured for frontend origin only
6. Helmet for HTTP security headers
7. HTTPS recommended for production

## Testing

Run backend tests:
```bash
cd backend
npm test
```

Tests cover:
- Home page parser
- Calificaciones parser
- Data extraction for finales and cursadas

## API Endpoints

### `POST /api/wrapped`
Generate wrapped for a student.

**Request:**
```json
{
  "username": "your_username",
  "password": "your_password",
  "year": 2024
}
```

### `POST /api/wrapped/pdf`
Generate and download wrapped as PDF.

### `GET /health`
Server health check.

## Available Commands

```bash
npm run dev              # Run backend + frontend
npm run dev:backend      # Backend only
npm run dev:frontend     # Frontend only
npm run build            # Build everything
npm run build:backend    # Build backend
npm run build:frontend   # Build frontend
npm test                 # Run backend tests
```

## Production Deployment

### Recommended: Vercel + Render (Free)

1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/upwrapped.git
git push -u origin main
```

2. Deploy Backend on Render (https://render.com)
   - New Web Service
   - Connect repo
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Plan: Free

3. Deploy Frontend on Vercel (https://vercel.com)
   - Import repo
   - Root Directory: `frontend`
   - Environment Variable: `NEXT_PUBLIC_API_URL` = Your Render backend URL
   - Deploy

## Troubleshooting

### "MyUP is not available"
- MyUP site may be down or under maintenance
- Check internet connectivity
- Try again later

### "Incorrect credentials"
- Verify username and password
- Ensure using same credentials as MyUP

### "Could not connect to server"
- Verify backend is running on port 4000
- Check CORS and FRONTEND_ORIGIN in .env

### Parsers not extracting data
- MyUP HTML may have changed
- Review parsers in `backend/src/services/parsers/`
- Add debug logging

### Slow backend in production (Render Free)
- Free tier sleeps service after 15 min of inactivity
- First request after sleep takes ~30 seconds (cold start)
- This is normal and expected on free tier

## License

Open source project. See LICENSE for more information.

## Author

Created for the Universidad de Palermo student community.

## Legal Disclaimer

This project is NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with Universidad de Palermo, or any of its subsidiaries or affiliates.

The names Universidad de Palermo, MyUP, as well as related names, marks, emblems and images are registered trademarks of their respective owners.

Use at your own risk.
