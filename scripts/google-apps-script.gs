/**
 * Union Transit — enregistrement des avis clients et des demandes de devis
 * dans ce Google Sheet (onglets "Contacts" et "Avis").
 *
 * Installation : voir README.md > "Avis clients et demandes de devis (Google Sheet)".
 * Ce fichier est une copie de reference du script a coller dans
 * Extensions > Apps Script du Google Sheet.
 *
 * Colonnes attendues (dans cet ordre, ligne 1 deja en place) :
 * - Onglet "Contacts" : Dates | Noms | Prenom | Nom d'entreprise | Telephone
 *   | Email | Type de marchandise | Quantite | Taille | Poids | Notes
 * - Onglet "Avis"     : Date | Noms | Note | Commentaires
 */

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var timestamp = new Date();

  if (data.type === "avis") {
    var avisSheet = ss.getSheetByName("Avis");
    avisSheet.appendRow([timestamp, data.name || "", data.rating, data.comment || ""]);
  } else {
    var contactsSheet = ss.getSheetByName("Contacts");
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
