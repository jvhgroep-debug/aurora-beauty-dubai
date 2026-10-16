# Aurora — blogpublicatie 16 oktober 2026

- Productiebron: `jvhgroep-debug/aurora-beauty-dubai` main; bestaande Cloudflare Pages. Geen Sites-kopie of domeinwijziging.
- Website: `https://aurorasalondubai.com`.
- Oorspronkelijke geplande datum: `2026-10-16T12:00:00+04:00`.
- Titel: Your first beauty salon visit in Azizi Riviera: a booking checklist.
- Artikel: `/blog/first-beauty-salon-visit-azizi-riviera-checklist/`.
- Nieuwe herbruikbare blogdata, datumafgeschermde routes, overzicht en homepageverwijzing; bestaande layout, foto, boekingslink en WhatsApp-component behouden.
- Validatie: nieuwe blog/H1/canonical/BlogPosting/afbeelding/interne links/sitemap worden vóór push gecontroleerd. Build gebruikt het bestaande generate-script. De oudere verify-homepage/verify-expansion scripts bevatten vaste oude pagina-aantallen; verify-faq-og bevat verouderde canonicals/social-originverwachtingen. Baselinevergelijking onderscheidt bestaande testproblemen van dit artikel.
- Status: content geactiveerd; bevestig Cloudflare-deployment en publieke artikel-URL afzonderlijk voordat live wordt gemeld. Bij herstart geen tweede artikel voor dezelfde geplande datum maken.


## Bevestigde build en deployment

- Build: 183 pagina’s (181 bestaande + blogoverzicht en één artikel). Baselinevergelijking bevestigt behoud van alle bestaande URL’s, titles, H1’s, canonicals, WhatsApp-links/venster en niet-homepage hoofdinhoud. Nieuwe artikelafbeelding, boekingslinks, BlogPosting en sitemap gecontroleerd. Gegenereerde service-/wijkdata zijn niet meegecommit.
- Productiecommit: `6ad7aba6e6423a25c6841d8b617384bb68501dae`. Cloudflare Pages bevestigt succesvolle deployment `5b41fb48-6125-4e37-9f07-391c97996d75`.
- Publiek adres: `https://aurorasalondubai.com/blog/first-beauty-salon-visit-azizi-riviera-checklist/`. Rechtstreekse HTTP-controle vanuit deze uitvoeromgeving is geblokkeerd; dit is geen bevestigde interactieve live browsercontrole.
- Oorspronkelijke planning blijft `2026-10-16T12:00:00+04:00`; published-vlag voorkomt een tweede blog voor deze datum. Geen formulieren ingestuurd of berichten verzonden.
