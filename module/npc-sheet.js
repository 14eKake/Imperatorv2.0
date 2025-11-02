// systems/imperator/scripts/npc-sheet.js

export class SimpleNpcSheet extends ActorSheet {
  /** Définit les options par défaut pour la fiche PNJ */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["imperator", "sheet", "npc"],
      template: "systems/imperator/templates/npc-sheet.html",
      width: 400,
      height: 300
    });
  }

  /** Prépare les données à transmettre au template PNJ */
  async getData(options) {
    const data = await super.getData(options);
    const baseData = data.data ?? {};
    baseData.system ??= foundry.utils.duplicate(this.actor.system ?? {});
    baseData.img ??= this.actor.img;
    baseData.name ??= this.actor.name;
    data.data = baseData;
    data.systemData = baseData.system;
    return data;
  }

  /** Active les écouteurs (optionnel pour le moment, on peut laisser vide) */
  activateListeners(html) {
    super.activateListeners(html);
    // Pas d'interactions particulières pour le PNJ pour le moment
  }
}
  
