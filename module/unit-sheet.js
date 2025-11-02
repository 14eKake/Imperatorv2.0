import { ATTRIBUTE_TYPES } from "./constants.js";

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
    const context = await super.getData(options);
    const baseData = context.data ?? {};
    baseData.system ??= foundry.utils.duplicate(this.actor.system ?? {});
    baseData.img ??= this.actor.img;
    baseData.name ??= this.actor.name;
    context.data = baseData;
    context.system = baseData.system;
    context.dtypes = ATTRIBUTE_TYPES;
    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find(".add-capacity").click(this._onAddCapacity.bind(this));
    html.find(".delete-capacity").click(this._onDeleteCapacity.bind(this));
  }

  _onAddCapacity(event) {
    event.preventDefault();
    const capacites = foundry.utils.duplicate(this.actor.system.unite?.capacites || []);
    capacites.push({ nom: "", description: "" });
    this.actor.update({ "system.unite.capacites": capacites });
  }

  _onDeleteCapacity(event) {
    event.preventDefault();
    const index = Number(event.currentTarget.dataset.index);
    const capacites = foundry.utils.duplicate(this.actor.system.unite?.capacites || []);
    if (!Number.isInteger(index) || index < 0) return;
    capacites.splice(index, 1);
    this.actor.update({ "system.unite.capacites": capacites });
  }

  _getSubmitData(updateData) {
    const formData = super._getSubmitData(updateData);
    const expanded = foundry.utils.expandObject(foundry.utils.duplicate(formData));
    console.log("Données envoyées à update():", expanded);
    return formData;
  }
}
