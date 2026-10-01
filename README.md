# Union Transit — Site web

Site vitrine bilingue (FR/EN) d'Union Transit, société de logistique (Kaolack, Sénégal) spécialisée dans le fret entre la Chine (Guangzhou, Yiwu) et Dakar.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [next-intl](https://next-intl.dev/) pour l'internationalisation (routes `/fr/...` et `/en/...`, avec des URLs traduites : ex. `/fr/a-propos` ↔ `/en/about`)
- Polices [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (titres) et [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) (texte courant), chargées via `next/font/google`
- Aucune base de données : les formulaires (devis, avis, réclamation) construisent un message et ouvrent WhatsApp (`wa.me`) dans un nouvel onglet. Une copie de chaque soumission est en plus envoyée à un Google Sheet via un Google Apps Script (voir plus bas), qui sert aussi à alimenter la page Suivi — sans backend à héberger.

## Lancer le projet en local

**Prérequis : Node.js 20+**

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Le site est disponible sur [http://localhost:3000](http://localhost:3000) (redirige automatiquement vers `/fr`).

## Variables d'environnement

Voir `.env.local.example` :

- `NEXT_PUBLIC_WHATSAPP_SN` — numéro WhatsApp Sénégal, utilisé pour tous les boutons/liens WhatsApp destinés aux clients.
- `NEXT_PUBLIC_WHATSAPP_CN` — numéro WhatsApp Chine (Guangzhou), affiché uniquement dans les coordonnées de contact.
- `NEXT_PUBLIC_WHATSAPP_CLAIMS` — numéro WhatsApp dédié aux réclamations (page `/reclamation`), distinct du numéro de demande de devis.
- `NEXT_PUBLIC_SHEETS_WEBHOOK_URL` — URL du Google Apps Script qui enregistre les avis, devis et réclamations dans un Google Sheet, et qui sert aussi à rechercher un numéro de suivi (voir section suivante). Laissée vide, les formulaires continuent de fonctionner normalement (WhatsApp), seules la copie dans le tableau et la recherche de suivi sont ignorées.

## Avis, devis, réclamations et suivi (Google Sheet)

Les formulaires d'avis (accueil), de devis (Contact) et de réclamation (`/reclamation`) envoient chacun une copie de leurs données à un Google Sheet, en plus de WhatsApp. La page Suivi (`/suivi`) interroge ce même Sheet pour afficher l'état réel d'un envoi à partir de son numéro de suivi.

**Le Google Sheet doit avoir ces onglets.** `Contacts`, `Avis` et `Reclamations` sont créés automatiquement par le script à la première soumission s'ils n'existent pas encore ; `Suivi` doit être créé et rempli **manuellement** par vous (c'est le seul onglet qui ne vient pas d'un formulaire du site) :

- **`Contacts`** : `Dates` | `Noms` | `Prénom` | `Nom d'entreprise` | `Téléphone` | `Email` | `Type de marchandise` | `Quantité` | `Taille` | `Poids` | `Notes`
- **`Avis`** : `Date` | `Noms` | `Note` | `Commentaires`
- **`Reclamations`** : `Date` | `Nom` | `Prenom` | `Telephone` | `Numero de suivi` | `Type` | `Description`
- **`Suivi`** (à créer vous-même, une ligne par envoi) : `NumeroSuivi` | `Mode` | `Trajet` | `EtapeActuelle` | `DateMAJ` | `Conseiller` | `DepartPrevu` | `ArriveePrevue`
  - `NumeroSuivi` : le numéro que vous communiquez au client (ex. `UT-2026-00123`).
  - `Mode` : `aerien` ou `maritime`.
  - `Trajet` : texte libre, ex. `Guangzhou → Dakar`.
  - `EtapeActuelle` : un nombre qui correspond à l'étape en cours :
    - **Aérien (1 à 3)** : 1 = Réception, 2 = En cours, 3 = Arrivé.
    - **Maritime (1 à 10)** : 1 = Réception, 2 = En chargement, 3 = Départ prévu, 4 = A quitté le port, 5 = En cours, 6 = Arrivée prévue, 7 = Arrivé, 8 = En attente de dédouanement, 9 = Dédouanement en cours, 10 = Disponible à l'entrepôt.
  - `DateMAJ` : date affichée comme « dernière mise à jour » (texte libre, ex. `12 septembre 2026`).
  - `Conseiller` : nom affiché au client.
  - `DepartPrevu` / `ArriveePrevue` : dates affichées dans les étapes « Départ prévu le... » / « Arrivée prévue le... » (maritime uniquement — texte libre).

**Mise en place (une seule fois) :**

1. Dans votre Google Sheet : menu **Extensions > Apps Script**.
2. Supprimez le code existant et collez le contenu de [`scripts/google-apps-script.gs`](scripts/google-apps-script.gs).
3. Enregistrez le projet.
4. **Déployer > Gérer les déploiements** → crayon sur le déploiement existant → **Nouvelle version** → **Déployer** (si c'est votre premier déploiement : **Déployer > Nouveau déploiement**, type **Application Web**, exécuter en tant que **Moi**, accès **Tout le monde**).
5. Copiez l'**URL de l'application Web** (elle se termine par `/exec`) dans `.env.local` :
   ```
   NEXT_PUBLIC_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXXXXXXXXXXX/exec
   ```
6. Créez manuellement l'onglet **`Suivi`** avec les colonnes ci-dessus, et ajoutez-y une ligne par envoi en cours.
7. Redémarrez `npm run dev`.

Si l'URL n'est pas renseignée, ou si Google Sheets est indisponible, les formulaires continuent de fonctionner normalement (l'envoi WhatsApp n'est jamais bloqué) et la page Suivi affiche simplement « numéro introuvable ».

## Construire pour la production

```bash
npm run build
npm run start
```

## Structure du contenu

- `messages/fr.json` et `messages/en.json` contiennent tous les textes du site (aucun texte n'est codé en dur dans les composants).
- `src/i18n/routing.ts` définit les langues, la langue par défaut (français) et les URLs traduites par page (`pathnames`).
- `src/app/[locale]/` contient les pages. Le groupe `(site)` inclut l'en-tête et le pied de page communs ; `coming-soon` et `not-found` restent en dehors de ce groupe pour garder une page minimale (logo + sélecteur de langue seulement).

## Points à brancher plus tard (V2)

- **Page Suivi (`/suivi`, `/tracking`)** : fonctionne avec de vraies données, lues depuis l'onglet `Suivi` du Google Sheet (voir ci-dessus) — mais ce suivi reste **manuel** : il faut que vous mettiez à jour la ligne correspondante dans le Sheet à chaque changement de statut. Une évolution semi-automatique (connectée à un transporteur) reste possible en V2.
- **Formulaires (devis, avis, réclamation)** : les données transitent uniquement par WhatsApp et par le Google Sheet configuré via `NEXT_PUBLIC_SHEETS_WEBHOOK_URL` (voir section dédiée ci-dessus) — aucune base de données propre au site.
- **Informations légales** : RCCM, NINEA, adresse complète, email et hébergeur sont des placeholders entre crochets dans `messages/fr.json` / `messages/en.json` (clés `legal.company.*` et `contact.sidebar.*`) — à compléter avant mise en ligne.
- **Numéro WhatsApp réclamations** (`NEXT_PUBLIC_WHATSAPP_CLAIMS`) : actuellement un numéro personnel temporaire (+212 6 02 44 74 94), à remplacer par le numéro chinois définitif quand il sera disponible (sur Vercel et dans `.env.local`).
