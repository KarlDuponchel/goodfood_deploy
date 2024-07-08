export const convertDateToFr = (date: string) => {
  // Crée un objet Date à partir de la chaîne
  var dateObj = new Date(date);

  // Récupère le jour, le mois et l'année
  var day = String(dateObj.getDate()).padStart(2, "0"); // Ajoute un zéro si nécessaire
  var month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Mois commence à 0
  var year = dateObj.getFullYear();

  // Formate la date en JJ/MM/AAAA
  return day + "/" + month + "/" + year;
};

export const getDay = (date: string) => {
  // Crée un objet Date à partir de la chaîne
  var dateObj = new Date(date);

  var month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Mois commence à 0
  var year = dateObj.getFullYear();

  // Formate la date en JJ/MM/AAAA
  return month + "/" + year;
};

export function dateAvant(duree: string): string {
  // Obtenir la date actuelle
  var dateActuelle = new Date();

  // Soustraire la durée spécifiée (en jours, semaines, mois ou années)
  switch (duree) {
    case "jour":
      dateActuelle.setDate(dateActuelle.getDate() - 1);
      break;
    case "semaine":
      dateActuelle.setDate(dateActuelle.getDate() - 7);
      break;
    case "mois":
      dateActuelle.setMonth(dateActuelle.getMonth() - 1);
      break;
    case "an":
      dateActuelle.setFullYear(dateActuelle.getFullYear() - 1);
      break;
    default:
      return "Erreur : durée non reconnue";
  }
  // Formatter la date au format YYYY-MM-DD
  var annee = dateActuelle.getFullYear();
  var mois = ("0" + (dateActuelle.getMonth() + 1)).slice(-2);
  var jour = ("0" + dateActuelle.getDate()).slice(-2);

  return annee + "-" + mois + "-" + jour;
}
