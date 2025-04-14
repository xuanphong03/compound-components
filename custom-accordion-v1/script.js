addEventListener("DOMContentLoaded", function () {
  function addStyleToShadowRoot(shadowRoot, cssText) {
    const style = document.createElement("style");
    style.textContent = cssText;
    shadowRoot.append(style);
  }
  class Accordion extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({
        mode: "open",
      });
    }
    connectedCallback() {
      this.render();
      this.loadStyle();
    }
    render() {
      this.shadowRoot.innerHTML = `
      <slot></slot>
    `;
    }
    loadStyle() {
      const style = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            border: 0;
            outline: 0;
        }
        slot {
          display:block;
          position: relative;
        }
      `;
      addStyleToShadowRoot(this.shadowRoot, style);
    }
  }

  class AccordionItem extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({
        mode: "open",
      });
    }
    connectedCallback() {
      this.render();
      this.loadStyle();
      this.addEventToggleAccordion();
    }
    addEventToggleAccordion() {
      const accordionItem = this;
      function getInitialHeight(element) {
        // Store original styles
        const originalStyles = {
          position: element.style.position,
          top: element.style.top,
          left: element.style.left,
          height: element.style.height,
          display: element.style.display,
          overflow: element.style.overflow,
          visibility: element.style.visibility,
          marginTop: element.style.marginTop,
        };

        // Set temporary styles for measurement
        const visibleCSS = {
          position: "absolute",
          top: "-9999px",
          left: "0",
          height: "auto",
          display: "block",
          overflow: "visible",
          visibility: "hidden",
          marginTop: "0",
        };
        // Apply temporary styles to the element
        Object.assign(element.style, visibleCSS);
        const initialElementHeight = element.clientHeight;

        // Apply original styles back to the element
        Object.keys(originalStyles).forEach((key) => {
          if (originalStyles[key]) {
            element.style[key] = originalStyles[key];
          } else {
            element.style[key] = "";
          }
        });
        return initialElementHeight;
      }

      function closeAccordion(accordionItem, accordionContent) {
        if (!accordionItem || !accordionContent) return;
        // Set height to current height before transition
        accordionContent.style.height = accordionContent.scrollHeight + "px";
        // Force browser to recognize style change before animation
        if (accordionContent) {
          window.getComputedStyle(accordionContent).height;
        }
        // Apply new styles to trigger transition
        accordionItem.classList.remove("active");
        accordionContent.style.height = "0px";
      }

      function openAccordion(accordionItem, accordionContent) {
        if (!accordionItem || !accordionContent) return;
        // Close all accordion item
        closeAllAccordionContent();
        const contentHeight = getInitialHeight(accordionContent);
        accordionItem.classList.add("active");
        window.getComputedStyle(accordionContent).height;
        accordionContent.style.height = contentHeight + "px";
      }

      function closeAllAccordionContent() {
        const activeAccordionItem = document.querySelectorAll(
          "custom-accordion-item.active"
        );
        activeAccordionItem.forEach(function (accordionItem) {
          const accordionContent = accordionItem.querySelector(
            "custom-accordion-content"
          );
          accordionItem.classList.remove("active");
          accordionContent.style.height = "0px";
          accordionContent.style.marginTop = "0";
        });
      }

      if (accordionItem) {
        const accordionTrigger = accordionItem.querySelector(
          "custom-accordion-trigger"
        );
        const accordionContent = accordionItem.querySelector(
          "custom-accordion-content"
        );
        if (!accordionTrigger || !accordionContent) return;
        // Add event listener to accordion trigger
        accordionTrigger.addEventListener("click", function (event) {
          event.preventDefault();
          if (!accordionContent) return;
          // Check if the current accordion item is already active
          if (accordionItem.classList.contains("active")) {
            closeAccordion(accordionItem, accordionContent);
          } else {
            openAccordion(accordionItem, accordionContent);
          }
        });
      }
    }

    render() {
      this.shadowRoot.innerHTML = `
      <slot></slot>
    `;
    }
    loadStyle() {
      const style = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            border: 0;
            outline: 0;
        }
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
      this.attachShadow({
        mode: "open",
      });
    }
    connectedCallback() {
      this.render();
      this.loadStyle();
    }

    render() {
      this.shadowRoot.innerHTML = `
      <div class="accordion__trigger-wrapper">
        <slot>
        </slot>
      </div>
     `;
    }
    loadStyle() {
      const style = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            border: 0;
            outline: 0;
        }
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
      this.attachShadow({
        mode: "open",
      });
    }
    connectedCallback() {
      this.render();
      this.loadStyle();
    }

    render() {
      this.shadowRoot.innerHTML = `
      <slot></slot>
    `;
    }
    loadStyle() {
      const style = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            border: 0;
            outline: 0;
        }
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
      this.attachShadow({
        mode: "open",
      });
    }
    connectedCallback() {
      this.render();
      this.loadStyle();
    }

    render() {
      this.shadowRoot.innerHTML = `
      <slot></slot>
    `;
    }
    loadStyle() {
      const style = document.createElement("style");
      style.textContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            border: 0;
            outline: 0;
        }
        slot {
          position: relative;
        }
    `;
      this.shadowRoot.append(style);
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
