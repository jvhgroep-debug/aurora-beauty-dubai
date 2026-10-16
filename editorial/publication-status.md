# Aurora — blogpublicatie 16 oktober 2026

- Productiebron: `jvhgroep-debug/aurora-beauty-dubai` main; bestaande Cloudflare Pages. Geen Sites-kopie of domeinwijziging.
- Website: `https://aurorasalondubai.com`.
- Oorspronkelijke geplande datum: `2026-10-16T12:00:00+04:00`.
- Titel: Your first beauty salon visit in Azizi Riviera: a booking checklist.
- Artikel: `/blog/first-beauty-salon-visit-azizi-riviera-checklist/`.
- Nieuwe herbruikbare blogdata, datumafgeschermde routes, overzicht en homepageverwijzing; bestaande layout, foto, boekingslink en WhatsApp-component behouden.
- Validatie: nieuwe blog/H1/canonical/BlogPosting/afbeelding/interne links/sitemap worden vóór push gecontroleerd. Build gebruikt het bestaande generate-script. De oudere verify-homepage/verify-expansion scripts bevatten vaste oude pagina-aantallen; verify-faq-og bevat verouderde canonicals/social-originverwachtingen. Baselinevergelijking onderscheidt bestaande testproblemen van dit artikel.
- Status: content geactiveerd; bevestig Cloudflare-deployment en publieke artikel-URL afzonderlijk voordat live wordt gemeld. Bij herstart geen tweede artikel voor dezelfde geplande datum maken.
