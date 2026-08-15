# WhatsMyWhatsApp

### ~ 3 Words to Represent Your WhatsApp Contact Info ~

WhatsMyWhatsApp is a web app that makes it possible to easily and simply share your WhatsApp contact info over audio-only channels such as radio shows, telephone calls or verbal-only communications.

It does this by allowing users to register three easily remembered words and associate them with their WhatsApp contact info.

Receivers of this info can then use those 3 words to look up the provider's contact information in the directory. They are served the provider's phone number and a QR code which opens a WhatsApp chat directly.

## Status: Functional ✅

The original non-functional HTML & CSS mock-up (see git history) has been rebuilt as a fullstack app:

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Hono + tRPC (end-to-end type safety)
- **Database**: MySQL via Drizzle ORM
- **QR codes**: `qrcode.react` (encodes a `wa.me` chat link)

## Development

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL etc.
npm run db:push        # create/sync database tables
npm run dev            # http://localhost:3000
```

## Production

```bash
npm run build
npm start
```

Or with Docker:

```bash
docker build -t whatsmywhatsapp .
docker run -p 3000:3000 --env-file .env whatsmywhatsapp
```

## Project layout

| Path | Purpose |
|------|---------|
| `src/pages/` | Home, GetWords (register), Lookup |
| `api/words-router.ts` | tRPC router: `words.register`, `words.lookup` |
| `api/queries/` | Database queries (Drizzle) |
| `db/schema.ts` | `entries` table definition |

= END =
