// systems/imperator/scripts/vehicle-sheet.js
import { ATTRIBUTE_TYPES } from "./constants.js";
import { EntitySheetHelper } from "./helper.js";


export class SimpleVehicleSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["imperator", "sheet", "vehicle"],
      template: "systems/imperator/templates/vehicle-sheet.html",
      width: 1000,
      height: 800,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats" }]
    });
  }
  
  async getData(options) {
    const context = await super.getData(options);
    const baseData = context.data ?? {};
    baseData.system ??= foundry.utils.duplicate(this.actor.system ?? {});
    baseData.img ??= this.actor.img;
    baseData.name ??= this.actor.name;
    context.data = baseData;
    // Log complet des données du système pour le véhicule
    console.log("Données système du véhicule :", baseData.system);
    context.systemData = baseData.system;
    context.dtypes = ATTRIBUTE_TYPES;
    context.descriptionHTML = await TextEditor.enrichHTML(context.systemData.description ?? "", {
      secrets: this.document.isOwner,
      async: true
    });
    return context;
  }
  
  
  activateListeners(html) {
    super.activateListeners(html);
    // Ajoute ici des interactions spécifiques aux véhicules si besoin
  }
  
  _getSubmitData(updateData) {
    console.log("Début de _getSubmitData");
    let formData = super._getSubmitData(updateData);
    console.log("FormData initial:", formData);
  
    // Développe l'objet formData pour voir toutes les valeurs
    const expandedData = foundry.utils.expandObject(formData);
    console.log("FormData après expansion:", expandedData);
  
    // Log de la valeur de system.type si elle existe
    if(expandedData.system && expandedData.system.type !== undefined) {
      console.log("Valeur soumise pour system.type :", expandedData.system.type);
    } else {
      console.warn("Aucune valeur trouvée pour system.type dans les données soumises.");
    }
  
    formData = EntitySheetHelper.updateAttributes(formData, this.object);
    formData = EntitySheetHelper.updateGroups(formData, this.object);
    console.log("FormData final:", formData);
    return formData;
  }
  
}
