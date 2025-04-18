// Common styles that are reused across components
const COMMON_STYLES = `
  * {
    box-sizing: border-box;
    border: 0;
    outline: 0;
  }
`;

// Base class for all custom elements
class BaseElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  addStyleToShadowRoot(cssText) {
    const style = document.createElement("style");
    style.textContent = cssText;
    this.shadowRoot.append(style);
  }

  render() {
    this.shadowRoot.innerHTML = `<slot></slot>`;
  }
}

addEventListener("DOMContentLoaded", function () {
  class Accordion extends BaseElement {
    connectedCallback() {
      this.render();
      this.loadStyle();
    }

    loadStyle() {
      const style = `
        ${COMMON_STYLES}
        slot {
          margin: 0;
          padding: 0;
          display: block;
          position: relative;
        }
      `;
      this.addStyleToShadowRoot(style);
    }
  }

  class AccordionItem extends BaseElement {
    constructor() {
      super();
      this.handleClick = this.handleClick.bind(this);
      this._content = null;
      this._trigger = null;
    }

    connectedCallback() {
      this.render();
      this.loadStyle();
      this.initializeElements();
      this.addEventListeners();
    }

    disconnectedCallback() {
      this.removeEventListeners();
    }

    initializeElements() {
      this._content = this.querySelector("custom-accordion-content");
      this._trigger = this.querySelector("custom-accordion-trigger");
    }

    addEventListeners() {
      if (this._trigger) {
        this._trigger.addEventListener("click", this.handleClick);
      }
    }

    removeEventListeners() {
      if (this._trigger) {
        this._trigger.removeEventListener("click", this.handleClick);
      }
    }

    handleClick(event) {
      event.preventDefault();
      if (!this._content) return;

      if (this.classList.contains("active")) {
        this.closeAccordion();
      } else {
        this.openAccordion();
      }
    }

    getInitialHeight() {
      if (!this._content) return 0;

      const originalDisplay = this._content.style.display;
      const originalVisibility = this._content.style.visibility;
      const originalHeight = this._content.style.height;

      this._content.style.display = "block";
      this._content.style.visibility = "hidden";
      this._content.style.height = "auto";

      const height = this._content.scrollHeight;

      this._content.style.display = originalDisplay;
      this._content.style.visibility = originalVisibility;
      this._content.style.height = originalHeight;

      return height;
    }

    closeAccordion() {
      if (!this._content) return;

      this._content.style.height = this._content.scrollHeight + "px";
      requestAnimationFrame(() => {
        this.classList.remove("active");
        this._content.style.height = "0px";
      });
    }

    openAccordion() {
      if (!this._content) return;

      this.closeAllAccordionContent();
      const contentHeight = this.getInitialHeight();
      this.classList.add("active");
      requestAnimationFrame(() => {
        this._content.style.height = contentHeight + "px";
      });
    }

    closeAllAccordionContent() {
      const activeItems = document.querySelectorAll(
        "custom-accordion-item.active"
      );
      activeItems.forEach((item) => {
        if (item !== this) {
          const content = item.querySelector("custom-accordion-content");
          if (content) {
            item.classList.remove("active");
            content.style.height = "0px";
            content.style.marginTop = "0";
          }
        }
      });
    }

    loadStyle() {
      const style = `
        ${COMMON_STYLES}
        slot {
          margin: 0;
          padding: 0;
          display: block;
        }
      `;
      this.addStyleToShadowRoot(style);
    }
  }

  class AccordionTrigger extends BaseElement {
    connectedCallback() {
      this.render();
      this.loadStyle();
    }

    render() {
      this.shadowRoot.innerHTML = `
        <div class="accordion__trigger-wrapper">
          <slot></slot>
        </div>
      `;
    }

    loadStyle() {
      const style = `
        ${COMMON_STYLES}
        .accordion__trigger-wrapper {
          width: 100%;
        }
        slot {
          display: flex;
          justify-content: space-between;
          cursor: pointer;
        }
      `;
      this.addStyleToShadowRoot(style);
    }
  }

  class AccordionContent extends BaseElement {
    connectedCallback() {
      this.render();
      this.loadStyle();
    }

    loadStyle() {
      const style = `
        ${COMMON_STYLES}
        slot {
          display: block;
          width: 100%;
        }
      `;
      this.addStyleToShadowRoot(style);
    }
  }

  class AccordionToggleButton extends BaseElement {
    connectedCallback() {
      this.render();
      this.loadStyle();
    }

    loadStyle() {
      const style = `
        ${COMMON_STYLES}
        slot {
          position: relative;
        }
      `;
      this.addStyleToShadowRoot(style);
    }
  }

  // Register custom elements
  customElements.define("custom-accordion", Accordion);
  customElements.define("custom-accordion-item", AccordionItem);
  customElements.define("custom-accordion-trigger", AccordionTrigger);
  customElements.define("custom-accordion-content", AccordionContent);
  customElements.define(
    "custom-accordion-toggle-button",
    AccordionToggleButton
  );
});
