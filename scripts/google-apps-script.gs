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
 */

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
            numero: row[0],
            mode: row[1],
            trajet: row[2],
            etape: row[3],
            dateMaj: row[4],
            conseiller: row[5],
            departPrevu: row[6],
            arriveePrevue: row[7],
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

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var timestamp = new Date();

  if (data.type === "avis") {
    var avisSheet = getOrCreateSheet("Avis", ["Date", "Noms", "Note", "Commentaires"]);
    avisSheet.appendRow([timestamp, data.name || "", data.rating, data.comment || ""]);
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
  }

  return ContentService.createTextOutput(
    JSON.stringify({ result: "success" }),
  ).setMimeType(ContentService.MimeType.JSON);
}
