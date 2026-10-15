# SV Audio Pvt (Ltd) showcase

Single-page React + Vite website for SV Audio. The site is intentionally frontend-only; product enquiries and contact form submissions open WhatsApp with a pre-filled message.

## Editing the site content

All editable catalogue and branch details are in `src/data/siteData.js`.

### Add or change a product

Add an object to the `products` array with a unique `id`, `brand`, `name`, `description` and a `category` that matches one of the labels in `categories`. A product can optionally include a `price`; without it, the card displays “Price on request”. To use a real product photo, add its public image path as `image` (for example, `image: "/images/products/mw4000.webp"`). If no image is set, the card shows a CSS equipment illustration.

### Update numbers and branches

Change the `phone` export to update the WhatsApp number (international format, without `+`) and `whatsappDisplay` to update its visible local number. Edit `contactPhones` for the call numbers and `branches` for branch names, addresses, branch phone numbers, opening hours and Google Maps URLs. The same contact number list is used in the contact section and footer.

### Offer bar

Set `offer.enabled` to `false` to hide the announcement bar, or update its `text` and `detail`.

## Run

From this directory use `npm run dev` for the local development server or `npm run build` for a production build.
