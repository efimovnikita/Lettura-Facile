# Tech Stack

## Core Language and Frameworks
- **Language:** TypeScript
- **Frontend Framework:** React 19
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4

## AI and Linguistics
- **AI Primary Engine:** Mistral AI (`@mistralai/mistralai`)
- **Linguistics:** Snowball-stemmers (for word analysis/stemming)

## Testing
- **Test Runner:** Vitest
- **Testing Library:** React Testing Library, JSDOM

## Data and Persistence
- **Storage:** Browser Local Storage (for application state, imported texts, and user preferences)
- **API/Server (Dev):** Express (used for local development/handling requests if necessary)

## UI and UX
- **Icons:** Lucide-React
- **Animations:** Motion
- **Deployment Strategy:** Progressive Web App (PWA) with `vite-plugin-pwa`

## Rationale
- **TypeScript:** Ensuring type safety for complex text processing.
- **Mistral AI:** Selected as the primary and only AI engine for text simplification and sentiment analysis.
- **Local Storage:** Chosen for its simplicity and offline-ready nature, ideal for a PWA approach without needing a centralized database.
- **Tailwind CSS 4:** Modern, efficient styling to support the "Clean and Focused" branding.
