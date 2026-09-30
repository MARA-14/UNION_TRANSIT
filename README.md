# Union Transit — Site web

Site vitrine bilingue (FR/EN) d'Union Transit, société de logistique (Kaolack, Sénégal) spécialisée dans le fret entre la Chine (Guangzhou, Yiwu) et Dakar.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [next-intl](https://next-intl.dev/) pour l'internationalisation (routes `/fr/...` et `/en/...`, avec des URLs traduites : ex. `/fr/a-propos` ↔ `/en/about`)
- Polices [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (titres) et [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) (texte courant), chargées via `next/font/google`
- Aucune base de données : le formulaire de contact construit un message et ouvre WhatsApp (`wa.me`) dans un nouvel onglet. Une copie de chaque demande de devis et de chaque avis client est en plus envoyée à un Google Sheet via un Google Apps Script (voir plus bas), sans backend à héberger.

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
- `NEXT_PUBLIC_SHEETS_WEBHOOK_URL` — URL du Google Apps Script qui enregistre les avis et les devis dans un Google Sheet (voir section suivante). Laissée vide, les formulaires continuent de fonctionner normalement (WhatsApp), seule la copie dans le tableau est ignorée.

## Avis clients et demandes de devis (Google Sheet)

Le formulaire d'avis (page d'accueil) et le formulaire de devis (page Contact) envoient chacun une copie de leurs données à un Google Sheet, en plus de WhatsApp. Cela sert de tableau de suivi commercial, sans base de données à gérer.

**Le Google Sheet doit avoir deux onglets, avec ces noms et ces colonnes exacts (ligne 1) :**

- Onglet **`Contacts`** : `Dates` | `Noms` | `Prénom` | `Nom d'entreprise` | `Téléphone` | `Email` | `Type de marchandise` | `Quantité` | `Taille` | `Poids` | `Notes`
- Onglet **`Avis`** : `Date` | `Noms` | `Note` | `Commentaires`

**Mise en place (une seule fois) :**

1. Dans votre Google Sheet (avec les deux onglets ci-dessus déjà créés) : menu **Extensions > Apps Script**.
2. Supprimez le code d'exemple et collez le contenu de [`scripts/google-apps-script.gs`](scripts/google-apps-script.gs).
3. Enregistrez le projet (nommez-le comme vous voulez).
4. Cliquez sur **Déployer > Nouveau déploiement**.
5. Type : **Application Web**. Exécuter en tant que : **Moi**. Qui a accès : **Tout le monde**.
6. Cliquez sur **Déployer**, puis autorisez l'accès (Google affiche un avertissement pour les scripts non vérifiés : c'est normal pour votre propre script — cliquez sur **Paramètres avancés > Accéder au projet**).
7. Copiez l'**URL de l'application Web** (elle se termine par `/exec`).
8. Collez-la dans `.env.local` :
   ```
   NEXT_PUBLIC_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXXXXXXXXXXX/exec
   ```
9. Redémarrez `npm run dev`.

Si vous modifiez l'ordre ou le nom des colonnes dans le Sheet, mettez à jour `scripts/google-apps-script.gs` (et republiez un nouveau déploiement) en conséquence.

Si l'URL n'est pas renseignée, ou si Google Sheets est indisponible, les formulaires continuent de fonctionner normalement (l'envoi WhatsApp n'est jamais bloqué).

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

- **Page Suivi (`/suivi`, `/tracking`)** : la recherche est simulée avec des données de démonstration en dur (`UT-2026-00123`). Aucune requête n'est faite vers un service externe. À connecter à un vrai système de suivi (mis à jour manuellement par l'équipe, ou semi-automatique) dans une prochaine version. Voir `src/app/[locale]/(site)/tracking/page.tsx`.
- **Formulaire de contact et avis** : les données transitent uniquement par WhatsApp et par le Google Sheet configuré via `NEXT_PUBLIC_SHEETS_WEBHOOK_URL` (voir section dédiée ci-dessus) — aucune base de données propre au site.
- **Informations légales** : RCCM, NINEA, adresse complète, email et hébergeur sont des placeholders entre crochets dans `messages/fr.json` / `messages/en.json` (clés `legal.company.*` et `contact.sidebar.*`) — à compléter avant mise en ligne.
