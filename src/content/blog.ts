// Articles du blog (en français uniquement). Chaque section : un titre H2, des paragraphes et, au besoin, une liste.
export type BlogSection = { heading: string; paragraphs: string[]; list?: string[] };

export type BlogArticle = {
  slug: string;
  title: string;
  description: string;
  date: string; // AAAA-MM-JJ
  intro: string;
  sections: BlogSection[];
};

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "choisir-un-transitaire-chine-senegal-fiable",
    title: "Transitaire Chine Sénégal : comment choisir un transitaire fiable",
    description:
      "Comment reconnaître un transitaire Chine-Sénégal fiable : les vérifications à faire, les questions à poser avant de confier votre marchandise, et les signaux d'alerte à ne pas ignorer.",
    date: "2026-11-09",
    intro:
      "Votre transitaire a votre marchandise, et souvent votre argent, entre les mains pendant des semaines. Un bon transitaire Chine-Sénégal vous fait gagner du temps et de l'argent ; un mauvais peut vous faire tout perdre. Voici comment faire le bon choix avant d'envoyer votre premier colis.",
    sections: [
      {
        heading: "1. Vérifiez que l'entreprise existe vraiment",
        paragraphs: [
          "Un transitaire sérieux a un nom d'entreprise, une adresse physique au Sénégal et des contacts joignables. Demandez où se trouvent ses bureaux, et n'hésitez pas à y passer. Méfiez-vous de ceux qui n'existent que sur un numéro WhatsApp, sans adresse ni site internet.",
        ],
      },
      {
        heading: "2. Exigez une présence en Chine",
        paragraphs: [
          "Pour réceptionner, contrôler et regrouper vos colis, il faut une équipe ou un entrepôt sur place, idéalement près des grands marchés comme Guangzhou et Yiwu. Demandez l'adresse de réception en Chine et un contact sur place. Un transitaire qui sous-traite tout sans rien voir ne peut pas vous garantir l'état de votre marchandise.",
        ],
      },
      {
        heading: "3. Demandez un devis clair et écrit",
        paragraphs: [
          "Le devis doit indiquer le mode de transport, le mode de calcul (au kilo, au volume ou au conteneur), le délai annoncé et ce qui est inclus : dédouanement, livraison, assurance. Un prix très bas qui ne précise rien cache souvent des frais qui apparaîtront à l'arrivée.",
        ],
      },
      {
        heading: "4. Posez les bonnes questions avant d'envoyer",
        paragraphs: ["Un transitaire fiable répond clairement à ces questions :"],
        list: [
          "Quels sont vos délais réels en aérien et en maritime ?",
          "Comment suivez-vous mon envoi, et qui me tient informé ?",
          "Que se passe-t-il si un colis est abîmé ou perdu ?",
          "Pouvez-vous regrouper des achats venant de plusieurs fournisseurs ?",
          "Contrôlez-vous la marchandise à la réception en Chine ?",
          "Les frais de dédouanement sont-ils compris dans le prix ?",
        ],
      },
      {
        heading: "5. Choisissez plusieurs modes de transport",
        paragraphs: [
          "Vos besoins changent : un échantillon urgent, une commande régulière, un gros stock. Un bon transitaire propose l'aérien express, l'aérien normal, le groupage maritime et le conteneur complet, et vous conseille le plus adapté à votre volume plutôt que le plus cher.",
        ],
      },
      {
        heading: "6. Les signaux d'alerte",
        paragraphs: ["Prenez le temps de réfléchir si vous constatez :"],
        list: [
          "un prix nettement plus bas que tous les autres, sans explication ;",
          "aucune adresse au Sénégal ni en Chine ;",
          "un paiement demandé sur un compte personnel qui change d'une fois à l'autre ;",
          "aucun numéro de suivi, ou des réponses floues sur la position de votre envoi ;",
          "aucun client à qui vous pouvez demander son avis.",
        ],
      },
      {
        heading: "7. Commencez petit",
        paragraphs: [
          "Pour un premier envoi avec un nouveau transitaire, testez avec une petite quantité. Vous verrez la qualité du suivi, le respect des délais et l'état de la marchandise à l'arrivée, avant de confier des volumes plus importants.",
        ],
      },
      {
        heading: "Union Transit, votre transitaire Chine-Sénégal",
        paragraphs: [
          "Union Transit est présent en Chine (Guangzhou, Yiwu) et au Sénégal, avec son siège à Kaolack. Nous réceptionnons, contrôlons et regroupons gratuitement vos achats, payons vos fournisseurs si besoin, et les expédions par avion express (1 à 3 jours), avion normal (7 à 10 jours), groupage maritime ou conteneur complet. Demandez votre devis : réponse sous 48 h, sur WhatsApp ou via notre formulaire.",
        ],
      },
    ],
  },
  {
    slug: "comment-importer-de-chine-au-senegal",
    title: "Comment importer de Chine au Sénégal : le guide étape par étape",
    description:
      "Trouver un fournisseur, payer en sécurité, choisir entre cargo aérien et maritime, préparer le dédouanement à Dakar : toutes les étapes pour importer de Chine au Sénégal sans mauvaise surprise.",
    date: "2026-10-20",
    intro:
      "Importer de Chine au Sénégal est à la portée de tous, du particulier qui commande quelques articles au commerçant qui remplit un conteneur. Mais entre le choix du fournisseur, le paiement, le transport et la douane, chaque étape cache des pièges. Voici comment s'y prendre, dans l'ordre.",
    sections: [
      {
        heading: "1. Définir précisément ce que vous voulez importer",
        paragraphs: [
          "Avant de contacter qui que ce soit, notez le produit exact, la quantité, la qualité attendue et votre budget par pièce. Plus votre besoin est précis, plus les devis seront comparables et moins vous aurez de surprises à l'arrivée.",
          "Pensez aussi au poids et au volume de votre commande : ce sont eux qui détermineront le mode de transport et une grande partie du coût final.",
        ],
      },
      {
        heading: "2. Trouver un fournisseur fiable",
        paragraphs: [
          "La plupart des importateurs passent par Alibaba, 1688 ou les marchés de gros de Guangzhou et Yiwu. Le prix affiché n'est qu'un point de départ : vérifiez l'ancienneté du vendeur, ses avis, et demandez des photos ou vidéos réelles du produit.",
          "Si vous commandez pour la première fois ou en volume, commandez d'abord un échantillon. Un service de sourcing peut aussi chercher et vérifier les fournisseurs à votre place.",
        ],
      },
      {
        heading: "3. Payer sans prendre de risque",
        paragraphs: [
          "C'est l'étape où l'on perd le plus d'argent. Évitez d'envoyer la totalité du paiement à un fournisseur inconnu à l'étranger : en cas de problème, il est presque impossible de récupérer votre argent.",
          "Passer par un intermédiaire présent en Chine, qui paie le fournisseur (Alipay, WeChat, virement) et vérifie la marchandise à la réception, réduit fortement ce risque.",
        ],
      },
      {
        heading: "4. Choisir le bon mode de transport",
        paragraphs: ["Le choix dépend de l'urgence, du poids et du volume :"],
        list: [
          "Aérien express (1 à 3 jours) : échantillons, urgences, petits colis de valeur.",
          "Aérien normal (7 à 10 jours) : commandes régulières de petits volumes.",
          "Groupage maritime (LCL) : volumes moyens, vous ne payez que l'espace utilisé.",
          "Conteneur complet 20 ou 40 pieds (FCL, 40 à 60 jours) : gros volumes.",
        ],
      },
      {
        heading: "5. Regrouper vos achats",
        paragraphs: [
          "Si vous achetez chez plusieurs fournisseurs, faites tout livrer à la même adresse en Chine. Votre transitaire regroupe les colis en un seul envoi : vous payez un seul transport au lieu de plusieurs.",
        ],
      },
      {
        heading: "6. Anticiper le dédouanement au Sénégal",
        paragraphs: [
          "À l'arrivée à Dakar, la marchandise doit être dédouanée : droits de douane selon le type de produit, TVA (18 % au Sénégal) et frais annexes. Gardez vos factures et la liste détaillée de vos produits, et demandez à votre transitaire d'inclure ces frais dans son devis pour connaître votre coût réel.",
        ],
      },
      {
        heading: "7. Suivre votre envoi jusqu'au bout",
        paragraphs: [
          "Exigez un numéro de suivi et un interlocuteur joignable. Un bon transitaire vous informe des grandes étapes (chargement, départ, arrivée, dédouanement, mise à disposition) sans que vous ayez à relancer.",
        ],
      },
      {
        heading: "Importer de Chine avec Union Transit",
        paragraphs: [
          "Union Transit vous accompagne à chaque étape : sourcing, paiement des fournisseurs, contrôle qualité, regroupement gratuit, cargo aérien ou maritime depuis Guangzhou et Yiwu, et suivi jusqu'à Dakar. Demandez votre devis : réponse sous 48 h.",
        ],
      },
    ],
  },
  {
    slug: "comment-acheter-en-chine-depuis-le-senegal",
    title: "Comment acheter en Chine depuis le Sénégal (Alibaba, 1688, Taobao)",
    description:
      "Alibaba, 1688 ou Taobao : où acheter en Chine depuis le Sénégal, comment choisir le vendeur, commander, payer et faire livrer vos achats jusqu'à Dakar.",
    date: "2026-10-20",
    intro:
      "Les plateformes chinoises proposent des millions de produits à prix d'usine. Mais elles ne livrent pas toujours au Sénégal, la plupart sont en chinois et le paiement depuis l'Afrique n'est pas toujours simple. Voici comment acheter en Chine depuis le Sénégal, sans vous déplacer.",
    sections: [
      {
        heading: "Alibaba, 1688, Taobao : quelle plateforme choisir ?",
        paragraphs: ["Chaque plateforme a son usage :"],
        list: [
          "Alibaba : la plateforme internationale, en anglais, pensée pour les achats en gros auprès d'usines et de grossistes.",
          "1688 : la version chinoise d'Alibaba, souvent moins chère, mais en chinois et réservée aux paiements locaux.",
          "Taobao : plutôt du détail, idéal pour de petites quantités ou des articles variés.",
        ],
      },
      {
        heading: "Bien choisir le vendeur",
        paragraphs: [
          "Regardez l'ancienneté de la boutique, le nombre de ventes et les avis. Méfiez-vous des prix nettement plus bas que la moyenne. Demandez des photos réelles, et pour une commande importante, un échantillon.",
        ],
      },
      {
        heading: "Commander et payer",
        paragraphs: [
          "Sur 1688 et Taobao, il faut généralement un moyen de paiement chinois (Alipay, WeChat). Un agent d'achat en Chine peut passer commande et payer pour vous, puis vérifier la marchandise à sa réception avant expédition.",
        ],
      },
      {
        heading: "Faire livrer vos achats au Sénégal",
        paragraphs: [
          "Le vendeur livre en Chine, à l'adresse de votre transitaire. Celui-ci réceptionne vos colis, les regroupe et les expédie vers Dakar par avion ou par bateau selon votre urgence et votre volume.",
        ],
      },
      {
        heading: "Shopping en Chine avec Union Transit",
        paragraphs: [
          "Envoyez-nous simplement les liens de vos articles : nous commandons, payons, contrôlons, regroupons gratuitement vos achats et les expédions jusqu'au Sénégal. Devis sous 48 h, sur WhatsApp ou via notre formulaire.",
        ],
      },
    ],
  },
  {
    slug: "avant-d-envoyer-votre-argent-a-un-fournisseur-chinois",
    title: "Avant d'envoyer votre argent à un fournisseur chinois : 7 vérifications",
    description:
      "Arnaques, produit non conforme, fournisseur qui disparaît : les vérifications à faire avant de payer un fournisseur en Chine depuis le Sénégal, et comment sécuriser votre paiement.",
    date: "2026-10-20",
    intro:
      "Chaque année, des importateurs sénégalais perdent de l'argent en payant un fournisseur chinois qui ne livre pas, ou qui livre autre chose que ce qui était prévu. Avant de payer, prenez quelques minutes pour faire ces vérifications.",
    sections: [
      {
        heading: "1. Vérifiez l'existence réelle du fournisseur",
        paragraphs: [
          "Demandez le nom complet de la société, son adresse et sa licence commerciale. Sur Alibaba, regardez l'ancienneté du compte et les badges de vérification. Un fournisseur sérieux n'a aucune difficulté à fournir ces informations.",
        ],
      },
      {
        heading: "2. Demandez des photos et vidéos réelles",
        paragraphs: [
          "Les photos du catalogue peuvent être copiées ailleurs. Demandez une vidéo du produit, avec votre nom ou la date écrite sur un papier à côté : c'est la preuve qu'il est réellement en stock.",
        ],
      },
      {
        heading: "3. Commandez un échantillon",
        paragraphs: [
          "Pour une commande importante, un échantillon envoyé en aérien express vous permet de juger la qualité avant d'engager une grosse somme.",
        ],
      },
      {
        heading: "4. Mettez tout par écrit",
        paragraphs: [
          "Quantité, couleur, taille, matière, emballage, prix unitaire, délai de production : tout doit être écrit et validé par le fournisseur. En cas de litige, c'est votre seule preuve.",
        ],
      },
      {
        heading: "5. Ne payez jamais 100 % d'avance à un inconnu",
        paragraphs: [
          "Privilégiez un acompte, avec le solde après contrôle de la marchandise. Méfiez-vous des fournisseurs qui changent de compte bancaire au dernier moment ou qui demandent un paiement sur un compte personnel.",
        ],
      },
      {
        heading: "6. Faites contrôler la marchandise avant le départ",
        paragraphs: [
          "Une fois la marchandise partie de Chine, il est trop tard pour la refuser. Un contrôle à la réception en Chine (quantité, état, conformité) évite les mauvaises surprises à Dakar.",
        ],
      },
      {
        heading: "7. Passez par un intermédiaire de confiance sur place",
        paragraphs: [
          "Le moyen le plus sûr est de confier le paiement à un intermédiaire présent en Chine, qui règle le fournisseur et vérifie la marchandise pour vous.",
        ],
      },
      {
        heading: "Payer vos fournisseurs chinois avec Union Transit",
        paragraphs: [
          "Union Transit paie vos fournisseurs pour votre compte (Alipay, WeChat ou virement bancaire), contrôle vos produits avant l'expédition et les achemine jusqu'au Sénégal. Vous n'envoyez plus votre argent à l'aveugle.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}
