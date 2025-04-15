// Common styles that are reused across components
const COMMON_STYLES = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: 0;
    outline: 0;
  }
`;

addEventListener("DOMContentLoaded", function () {
  function addStyleToShadowRoot(shadowRoot, cssText) {
    const style = document.createElement("style");
    style.textContent = cssText;
    shadowRoot.append(style);
  }

  class Accordion extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.render();
      this.loadStyle();
    }

    render() {
      this.shadowRoot.innerHTML = `<slot></slot>`;
    }

    loadStyle() {
      const style = `
        ${COMMON_STYLES}
        slot {
          display: block;
          position: relative;
        }
      `;
      addStyleToShadowRoot(this.shadowRoot, style);
    }
  }

  class AccordionItem extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.handleClick = this.handleClick.bind(this);
    }

    connectedCallback() {
      this.render();
      this.loadStyle();
      this.addEventToggleAccordion();
    }

    disconnectedCallback() {
      const trigger = this.querySelector("custom-accordion-trigger");
      if (trigger) {
        trigger.removeEventListener("click", this.handleClick);
      }
    }

    handleClick(event) {
      event.preventDefault();
      const content = this.querySelector("custom-accordion-content");
      if (!content) return;

      if (this.classList.contains("active")) {
        this.closeAccordion(content);
      } else {
        this.openAccordion(content);
      }
    }

    getInitialHeight(element) {
      const originalDisplay = element.style.display;
      const originalVisibility = element.style.visibility;
      const originalHeight = element.style.height;

      element.style.display = "block";
      element.style.visibility = "hidden";
      element.style.height = "auto";

      const height = element.scrollHeight;

      element.style.display = originalDisplay;
      element.style.visibility = originalVisibility;
      element.style.height = originalHeight;

      return height;
    }

    closeAccordion(content) {
      if (!content) return;
      content.style.height = content.scrollHeight + "px";
      requestAnimationFrame(() => {
        this.classList.remove("active");
        content.style.height = "0px";
      });
    }

    openAccordion(content) {
      if (!content) return;
      this.closeAllAccordionContent();
      const contentHeight = this.getInitialHeight(content);
      this.classList.add("active");
      requestAnimationFrame(() => {
        content.style.height = contentHeight + "px";
      });
    }

    closeAllAccordionContent() {
      const activeItems = document.querySelectorAll(
        "custom-accordion-item.active"
      );
      activeItems.forEach((item) => {
        const content = item.querySelector("custom-accordion-content");
        if (content) {
          item.classList.remove("active");
          content.style.height = "0px";
          content.style.marginTop = "0";
        }
      });
    }

    addEventToggleAccordion() {
      const trigger = this.querySelector("custom-accordion-trigger");
      if (trigger) {
        trigger.addEventListener("click", this.handleClick);
      }
    }

    render() {
      this.shadowRoot.innerHTML = `<slot></slot>`;
    }

    loadStyle() {
      const style = `
        ${COMMON_STYLES}
        slot {
          display: block;
        }
      `;
      addStyleToShadowRoot(this.shadowRoot, style);
    }
  }

  class AccordionTrigger extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

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
        slot {
          display: flex;
          justify-content: space-between;
          cursor: pointer;
        }
      `;
      addStyleToShadowRoot(this.shadowRoot, style);
    }
  }

  class AccordionContent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.render();
      this.loadStyle();
    }

    render() {
      this.shadowRoot.innerHTML = `<slot></slot>`;
    }

    loadStyle() {
      const style = `
        ${COMMON_STYLES}
        slot {
          display: block;
          width: 100%;
        }
      `;
      addStyleToShadowRoot(this.shadowRoot, style);
    }
  }

  class AccordionToggleButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.render();
      this.loadStyle();
    }

    render() {
      this.shadowRoot.innerHTML = `<slot></slot>`;
    }

    loadStyle() {
      const style = `
        ${COMMON_STYLES}
        slot {
          position: relative;
        }
      `;
      addStyleToShadowRoot(this.shadowRoot, style);
    }
  }

  customElements.define("custom-accordion", Accordion);
  customElements.define("custom-accordion-item", AccordionItem);
  customElements.define("custom-accordion-trigger", AccordionTrigger);
  customElements.define("custom-accordion-content", AccordionContent);
  customElements.define(
    "custom-accordion-toggle-button",
    AccordionToggleButton
  );
});
