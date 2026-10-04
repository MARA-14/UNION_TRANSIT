/**
 * Union Transit — avis clients, demandes de devis, reclamations et suivi.
 *
 * Installation : voir README.md > "Avis clients, devis, reclamations et suivi (Google Sheet)".
 * Ce fichier est une copie de reference du script a coller dans
 * Extensions > Apps Script du Google Sheet.
 *
 * Onglets utilises (crees automatiquement au premier envoi s'ils n'existent pas,
 * sauf "Suivi" qui doit etre cree et rempli manuellement) :
 * - "Contacts"     : Dates | Noms | Prenom | Nom d'entreprise | Telephone | Email
 *                    | Type de marchandise | Quantite | Taille | Poids | Notes
 * - "Avis"         : Date | Noms | Note | Commentaires
 * - "Reclamations" : Date | Nom | Prenom | Telephone | Numero de suivi | Type | Description
 * - "Suivi"        : NumeroSuivi | Mode | Trajet | EtapeActuelle | DateMAJ | Conseiller
 *                    | DepartPrevu | ArriveePrevue
 *   - Mode : "aerien" ou "maritime"
 *   - EtapeActuelle : un nombre. Aerien = 1 a 3 (1=Reception, 2=En cours, 3=Arrive).
 *     Maritime = 1 a 10 (1=Reception, 2=En chargement, 3=Depart prevu, 4=A quitte le port,
 *     5=En cours, 6=Arrivee prevue, 7=Arrive, 8=En attente de dedouanement,
 *     9=Dedouanement en cours, 10=Disponible a l'entrepot).
 *
 * A chaque devis, avis ou reclamation, un email de notification est envoye
 * automatiquement a l'adresse ci-dessous. Changez-la si besoin.
 */

var NOTIFY_EMAIL = "contact@uniontransitgroup.com";

function notify(subject, body) {
  try {
    MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
  } catch (err) {
    // Ne bloque jamais l'enregistrement dans le Sheet si l'email echoue
    // (ex. quota d'envoi depasse).
  }
}

var MONTHS_FR = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

// Google Sheets convertit automatiquement un texte qui ressemble a une date
// (ex. "1 octobre 2026") en vraie date. On le reformate ici en texte lisible
// pour ne jamais renvoyer un format technique (ISO) au site.
function formatCell(value) {
  if (Object.prototype.toString.call(value) === "[object Date]") {
    return value.getDate() + " " + MONTHS_FR[value.getMonth()] + " " + value.getFullYear();
  }
  return value;
}

function getOrCreateSheet(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
  }
  return sheet;
}

function doGet(e) {
  var numero = ((e.parameter.numero || "") + "").trim().toUpperCase();
  var output = { found: false };

  if (numero) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Suivi");
    if (sheet) {
      var data = sheet.getDataRange().getValues();
      for (var i = 1; i < data.length; i++) {
        var row = data[i];
        if ((row[0] + "").trim().toUpperCase() === numero) {
          output = {
            found: true,
            numero: formatCell(row[0]),
            mode: formatCell(row[1]),
            trajet: formatCell(row[2]),
            etape: row[3],
            dateMaj: formatCell(row[4]),
            conseiller: formatCell(row[5]),
            departPrevu: formatCell(row[6]),
            arriveePrevue: formatCell(row[7]),
          };
          break;
        }
      }
    }
  }

  return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function isBlank(value) {
  return value === undefined || value === null || (value + "").trim() === "";
}

// Verifications cote serveur (memes regles que le site). L'adresse du script
// est publique : on refuse tout envoi incomplet ou non conforme (aucune ligne
// ajoutee, aucun email envoye).
var NAME_RE = /^[^\d_!@#$%^&*()+=\[\]{}<>\/\\|?~`:;"]{2,50}$/;
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
var TRACKING_RE = /^[A-Za-z0-9-]{4,30}$/;
var CLAIM_TYPES = ["Retard", "Perte", "Problème financier", "Erreur de chargement", "Autre"];

// Numero senegalais : 9 chiffres (70/75/76/77/78 ou 3x + 7 chiffres),
// avec +221 / 00221 / 221 facultatif.
function validPhone(raw) {
  var d = (raw + "").trim().replace(/[\s.\-()]/g, "");
  if (d.charAt(0) === "+") d = d.slice(1);
  else if (d.slice(0, 2) === "00") d = d.slice(2);
  if (!/^\d+$/.test(d)) return false;
  if (d.length === 12 && d.slice(0, 3) === "221") d = d.slice(3);
  return /^(7[05678]|3\d)\d{7}$/.test(d);
}

function okName(v) {
  return !isBlank(v) && NAME_RE.test((v + "").trim());
}

function okText(v, required, min, max) {
  if (isBlank(v)) return !required;
  var len = (v + "").trim().length;
  return len >= min && len <= max;
}

function validate(data) {
  if (data.type === "avis") {
    var rating = Number(data.rating);
    return (
      rating >= 1 && rating <= 5 &&
      okText(data.name, false, 0, 100) &&
      okText(data.comment, false, 0, 1000)
    );
  }
  if (!okName(data.lastName) || !okName(data.firstName) || !validPhone(data.phone || "")) {
    return false;
  }
  if (data.type === "reclamation") {
    return (
      CLAIM_TYPES.indexOf(data.claimType) !== -1 &&
      okText(data.description, true, 10, 2000) &&
      (isBlank(data.trackingNumber) || TRACKING_RE.test((data.trackingNumber + "").trim()))
    );
  }
  return (
    okText(data.goodsType, true, 2, 150) &&
    okText(data.companyName, false, 0, 100) &&
    (isBlank(data.email) || ((data.email + "").length <= 100 && EMAIL_RE.test((data.email + "").trim()))) &&
    okText(data.quantity, false, 0, 100) &&
    okText(data.size, false, 0, 1000) &&
    okText(data.weight, false, 0, 1000) &&
    okText(data.notes, false, 0, 1100)
  );
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function doPost(e) {
  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse({ result: "error", message: "invalid" });
  }
  if (!data || !validate(data)) {
    return jsonResponse({ result: "error", message: "missing_fields" });
  }
  var timestamp = new Date();

  if (data.type === "avis") {
    var avisSheet = getOrCreateSheet("Avis", ["Date", "Noms", "Note", "Commentaires"]);
    avisSheet.appendRow([timestamp, data.name || "", data.rating, data.comment || ""]);

    notify(
      "Nouvel avis client — Union Transit",
      "Nouvel avis recu sur le site.\n\n" +
        "Note : " + data.rating + "/5\n" +
        "Nom : " + (data.name || "(non renseigne)") + "\n" +
        "Commentaire : " + (data.comment || "(aucun)"),
    );
  } else if (data.type === "reclamation") {
    var reclamSheet = getOrCreateSheet("Reclamations", [
      "Date",
      "Nom",
      "Prenom",
      "Telephone",
      "Numero de suivi",
      "Type",
      "Description",
    ]);
    reclamSheet.appendRow([
      timestamp,
      data.lastName || "",
      data.firstName || "",
      data.phone || "",
      data.trackingNumber || "",
      data.claimType || "",
      data.description || "",
    ]);

    notify(
      "Nouvelle reclamation — Union Transit",
      "Nouvelle reclamation recue sur le site.\n\n" +
        "Nom : " + (data.lastName || "") + " " + (data.firstName || "") + "\n" +
        "Telephone : " + (data.phone || "") + "\n" +
        "Numero de suivi : " + (data.trackingNumber || "(non renseigne)") + "\n" +
        "Type : " + (data.claimType || "") + "\n" +
        "Description : " + (data.description || ""),
    );
  } else {
    var contactsSheet = getOrCreateSheet("Contacts", [
      "Dates",
      "Noms",
      "Prenom",
      "Nom d'entreprise",
      "Telephone",
      "Email",
      "Type de marchandise",
      "Quantite",
      "Taille",
      "Poids",
      "Notes",
    ]);
    contactsSheet.appendRow([
      timestamp,
      data.lastName,
      data.firstName,
      data.companyName || "",
      data.phone,
      data.email || "",
      data.goodsType,
      data.quantity || "",
      data.size || "",
      data.weight || "",
      data.notes || "",
    ]);

    notify(
      "Nouvelle demande de devis — Union Transit",
      "Nouvelle demande de devis recue sur le site.\n\n" +
        "Nom : " + (data.lastName || "") + " " + (data.firstName || "") + "\n" +
        "Entreprise : " + (data.companyName || "(non renseigne)") + "\n" +
        "Telephone : " + (data.phone || "") + "\n" +
        "Email : " + (data.email || "(non renseigne)") + "\n" +
        "Type de marchandise / Produit a sourcer : " + (data.goodsType || "") + "\n" +
        "Quantite : " + (data.quantity || "(non renseigne)") + "\n" +
        "Taille / Caracteristiques : " + (data.size || "(non renseigne)") + "\n" +
        "Poids / Attentes : " + (data.weight || "(non renseigne)") + "\n" +
        "Notes : " + (data.notes || "(aucune)"),
    );
  }

  return ContentService.createTextOutput(
    JSON.stringify({ result: "success" }),
  ).setMimeType(ContentService.MimeType.JSON);
}
