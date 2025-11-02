import { ATTRIBUTE_TYPES } from "./constants.js";
import { EntitySheetHelper } from "./helper.js";

export class SimpleUnitSheet extends ActorSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["imperator", "sheet", "unit"],
      template: "systems/imperator/templates/actors/unit-sheet.hbs",
      width: 1000,
      height: 800,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats" }]
    });
  }

    async getData(options) {
    const ctx = await super.getData(options);

    ctx.system = ctx.data.system;   // ← ajoute cette ligne
    ctx.dtypes = ATTRIBUTE_TYPES;

    return ctx;
    }


  activateListeners(html) {
    super.activateListeners(html);
    // Tu peux ici gérer l’ajout/suppression de capacités par exemple :
    html.find(".add-capacity").click(this._onAddCapacity.bind(this));
    html.find(".delete-capacity").click(this._onDeleteCapacity.bind(this));
  }

  _onAddCapacity(event) {
    event.preventDefault();
    const capacites = foundry.utils.duplicate(this.actor.system.unite.capacites || []);
    capacites.push({ nom: "", description: "" });
    this.actor.update({ "system.unite.capacites": capacites });
  }

  _onDeleteCapacity(event) {
    event.preventDefault();
    const index = parseInt(event.currentTarget.dataset.index);
    const capacites = foundry.utils.duplicate(this.actor.system.unite.capacites || []);
    if (index >= 0) {
      capacites.splice(index, 1);
      this.actor.update({ "system.unite.capacites": capacites });
    }
  }
_getSubmitData(updateData) {
  const formData = super._getSubmitData(updateData);
  const expanded = foundry.utils.expandObject(formData);
  console.log("➡️ Données envoyées à update() :", expanded);
  return expanded;
}


}
