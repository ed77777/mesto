export class Section {
  constructor({ data, renderer }, templateSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(templateSelector);
  }

  renderItems() {
    // this.clear();
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item, pos = "start") {
    // this._container.prepend(item);
    if (pos === "start") {
      this._container.prepend(item);
    } else {
      this._container.append(item);
    }
  }
}
