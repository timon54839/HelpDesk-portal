# Helpdesk Portal

Webová aplikace pro ticketovací a inventární systém. Umožňuje správu osob, místností, zařízení a tiketů.

## Spuštění projektu

### Prerekvizity
- Node.js 20+
- npm nebo yarn

### Instalace

```bash
npm install
```

### Konfigurace prostředí

Vytvořte soubor `.env.local` (zkopírujte z `.env.example`):

```bash
cp .env.example .env.local
```

Nastavte proměnné:

```env
API_URL=https://zmrd.ondrejpetera.cz/api/v1
API_KEY=vas-api-klic-zde
ADMIN_PASSWORD=admin123
```

> **Důležité:** `.env.local` nikdy necommitujte do Gitu. Soubor je v `.gitignore`.

### Spuštění vývojového serveru

```bash
npm run dev
```

Aplikace běží na [http://localhost:3000](http://localhost:3000).

### Build pro produkci

```bash
npm run build
npm start
```

---

## Admin login

Administrace je dostupná na `/admin`.

- Přihlašovací heslo se nastaví v proměnné `ADMIN_PASSWORD` v `.env.local`
- Výchozí heslo: `admin123`
- API klíč je uložen pouze na serveru (v env proměnné `API_KEY`), **nikdy není zasílán prohlížeči**
- Přihlášení je simulované (fake) – po zadání hesla se nastaví `httpOnly` cookie `admin_session`
- Přihlášení trvá 8 hodin, poté je nutné se přihlásit znovu

---

## Rendering strategie stránek

### SSG (Static Site Generation)

| Stránka | Důvod |
|---------|-------|
| `/` (landing page) | Statický obsah + agregace dat. Cachuje se na serveru, revaliduje se přes `revalidateTag('landing')` po admin akcích. |

Landing page používá `export const dynamic = 'force-static'` + `use cache` funkci `getLandingStats()` s dlouhou `cacheLife`.

### ISR (Incremental Static Regeneration)

| Stránka | Revalidace | Důvod |
|---------|------------|-------|
| `/persons` | 60 s | Osoby se mění méně často |
| `/rooms` | 120 s | Místnosti jsou stabilní data |
| `/devices` | 60 s | Zařízení se přidávají pravidelně |
| `/tickets` | 60 s | Tikety se mění nejčastěji |

ISR stránky používají `export const revalidate = N` + cachované datové funkce s `use cache`.
Po admin akcích se cache okamžitě invaliduje přes `revalidateTag(...)`.

### SSR (Server-Side Rendering)

| Stránky | Důvod |
|---------|-------|
| `/persons/[id]`, `/rooms/[id]`, `/devices/[id]`, `/tickets/[id]` | Detail záznamu – vždy čerstvá data |
| Všechny `/admin/*` stránky | Admin potřebuje aktuální data, nelze cachovat |

Detail stránky používají `export const dynamic = 'force-dynamic'`.
Admin stránky jsou SSR + kontrola admin session cookie.

### CSR (výjimky – Client Components)

Použito pouze tam, kde je interaktivita nutná:

- `SearchFilter.tsx` – vyhledávací pole (URL parametry, Enter trigger)
- `TypeFilter.tsx` – filtr typu zařízení (select)
- `TicketFilters.tsx` – filtr stavu a priority tiketů
- `DeleteButton.tsx` – potvrzení smazání
- `PersonForm.tsx`, `RoomForm.tsx`, `DeviceForm.tsx`, `TicketForm.tsx` – formuláře s validací

Všechny CSR komponenty jsou označeny `'use client'`. Filtrování dat probíhá server-side (data se načtou na serveru, client pouze přidá URL parametry pro znovu-render).

---

## Next.js Caching (`use cache`, `cacheLife`, `cacheTag`, `revalidateTag`)

### A) `use cache` + `cacheLife` + `cacheTag`

Implementováno v `lib/cache.ts`. Cachované datové funkce:

| Funkce | Tag(y) | cacheLife |
|--------|--------|-----------|
| `getPersons()` | `persons` | revalidate: 300s |
| `getRooms()` | `rooms` | revalidate: 300s |
| `getDevices()` | `devices` | revalidate: 300s |
| `getTickets()` | `tickets` | revalidate: 120s |
| `getPerson(id)` | `persons`, `person-{id}` | revalidate: 60s |
| `getRoom(id)` | `rooms`, `room-{id}` | revalidate: 60s |
| `getDevice(id)` | `devices`, `device-{id}` | revalidate: 60s |
| `getTicket(id)` | `tickets`, `ticket-{id}` | revalidate: 60s |
| `getLandingStats()` | `persons`, `rooms`, `devices`, `tickets`, `landing` | revalidate: 600s |

Každá funkce obsahuje direktivu `'use cache'` + volání `cacheTag(...)` a `cacheLife(...)`.

Vyžaduje `experimental.dynamicIO: true` v `next.config.ts`.

### B) `revalidateTag` po admin akcích

Implementováno v `lib/actions.ts` (Server Actions):

| Akce | Revalidované tagy |
|------|-------------------|
| `createPerson` / `deletePerson` | `persons`, `landing` |
| `updatePerson` | `persons`, `person-{id}` |
| `createRoom` / `deleteRoom` | `rooms`, `landing` |
| `updateRoom` | `rooms`, `room-{id}` |
| `createDevice` / `deleteDevice` | `devices`, `landing` |
| `updateDevice` | `devices`, `device-{id}` |
| `createTicket` / `deleteTicket` | `tickets`, `landing` |
| `updateTicket` | `tickets`, `ticket-{id}` |

Po každé mutaci se okamžitě invaliduje příslušný cache tag → veřejné stránky zobrazí nová data.

---

## SEO

- Každá veřejná stránka má vlastní `metadata` objekt (`title`, `description`)
- Kořenový layout definuje výchozí metadata (OpenGraph, robots, keywords)
- `app/sitemap.ts` – statická sitemap se seznamem veřejných stránek
- `app/robots.ts` – robots.txt (blokuje `/admin`, povoluje veřejné části)

---

## Technologie

- **Next.js 15** (App Router, Server Components, Server Actions)
- **TypeScript**
- **Tailwind CSS**
- API: `https://zmrd.ondrejpetera.cz/api/v1`
