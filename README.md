# NIVARA — Everyday elegance, thoughtfully styled

A responsive React + Vite demonstration store for a fictional Indian women's fashion label. Browse a sample collection, choose sizes, save a cart locally, and complete a COD demo order. Checkout and contact/newsletter actions are instrumented for optional Meta Pixel and Google Ads / GA4 tagging.

## Run locally

1. Install Node.js 20 or newer.
2. From this folder, run `npm install`.
3. Copy `.env.example` to `.env` and add the IDs you use (details below).
4. Run `npm run dev` and open the local URL Vite prints.

## Tracking configuration

Set values in `.env` before starting/rebuilding. Vite exposes only variables prefixed with `VITE_`.

- `VITE_META_PIXEL_ID`: Meta Pixel ID. Sends PageView on navigation and ViewContent, AddToCart, InitiateCheckout, Lead, Purchase on relevant actions.
- `VITE_GOOGLE_TAG_ID`: Google tag ID (for example, a Google tag / GA4 ID).
- `VITE_GOOGLE_ADS_LEAD_CONVERSION_ID`
- `VITE_GOOGLE_ADS_CART_CONVERSION_ID`
- `VITE_GOOGLE_ADS_CHECKOUT_CONVERSION_ID`
- `VITE_GOOGLE_ADS_PURCHASE_CONVERSION_ID`

The Google Ads variables should be the complete `send_to` values supplied by Google Ads (typically `AW-.../...`). The app also sends GA4-style `generate_lead`, `add_to_cart`, `begin_checkout`, and `purchase` events through the Google tag. Add IDs only to the private deployment environment; never commit real IDs in source control. Tracking is a browser demo and consent requirements should be handled for the markets where you deploy.

Action events are only called by their associated UI actions. The lightweight in-session event guard prevents accidental duplicate view/action calls within a page session. Purchase gets a unique demo order ID; confirmation reload does not send a purchase event again. Meta Pixel browser events alone are not deduplicated against a server/CAPI source.

## Store behavior

- 12 sample products with individual photography URLs and INR pricing
- Category filter, sort by price, product details, gallery image selection, size selection, quantity, add-to-bag and buy-now
- Cart in `localStorage` (`nivara-cart`), quantity editing, removal, shipping estimate and subtotal/total
- Checkout details validation and Cash on Delivery demonstration; successful orders open an order confirmation page
- Contact form and newsletter form demonstrate lead tracking without sending data to a backend
- Contact/WhatsApp/email destinations are demo details and should be replaced before a live campaign

## Build and deploy

- `npm run build` creates the static production site in `dist/`.
- `npm run preview` serves the production build locally.
- Deploy the `dist/` folder to any static host that supports SPA fallback routing (for example Netlify, Vercel, or Cloudflare Pages). Configure the `VITE_*` variables in the host's build environment and set the rewrite/fallback so deep routes such as `/product/gulmohar-kurta` serve `index.html`.

Product photography is loaded from Unsplash image URLs, so visitors need an internet connection for those images. Replace with licensed, owned assets before public advertising.
