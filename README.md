# Cineva

Cineva is a video discovery application that integrates with the Dailymotion API to provide a seamless browsing and watching experience. Built using SvelteKit, the project focuses on efficient data fetching, robust error handling, and a clean server-side integration for sensitive operations.

## Key Functionalities

### 1. Data Aggregation & API Integration
- **Dailymotion API Service**: A centralized service (`src/lib/services/dailymotion.ts`) handles all communications with Dailymotion. It fetches trending videos, performs global searches, and retrieves specific video metadata (descriptions, view counts, and owner info).
- **Custom Embed System**: Generates optimized embed URLs with specific parameters (autoplay off, mute off, no queue) to ensure a controlled playback environment.

### 2. Advanced Search Logic
- **Debounced Search**: The search bar implementation prevents API spam by using a 400ms debounce timer. Navigation to the search page only triggers after the user stops typing.
- **Dynamic Routing**: Utilizes SvelteKit's reactive routing to update search results in real-time based on URL query parameters.

### 3. Contact Form & Server Actions
- **Backend Email Delivery**: Unlike traditional client-side mailto links, Cineva uses SvelteKit **Server Actions**. This allows the contact form to process data in the background using the **Resend API**.
- **Security**: Sensitive API keys and contact details are kept strictly server-side through private environment variables.
- **Validation**: Manual server-side and client-side validation ensures data integrity before submission.

### 4. Stability & Resilience
- **Fetch Timeout Management**: All API requests are wrapped in a custom timeout handler (10 seconds) using `AbortController` to prevent hanging requests on poor connections.
- **Real-time Offline Detection**: Monitoring `navigator.onLine` to display an instant connection status banner, ensuring the user is aware of their network state.
- **Custom Error Boundary**: A root-level error handler (`+error.svelte`) provides specific feedback for 404s, 500s, and network timeout issues, bypassing the global layout for a focused recovery experience.

## Technical Setup

### Environment Variables
Create a `.env` file in the root directory:
```env
PUBLIC_CONTACT_EMAIL="your-email@example.com"
RESEND_API_KEY="re_your_api_key"
```

### Installation
```bash
npm install
npm run dev
```

## Tech Stack
- **Framework**: SvelteKit (Svelte 5)
- **Email**: Resend API
- **Styling**: Tailwind CSS
- **Icons**: Lucide Svelte
