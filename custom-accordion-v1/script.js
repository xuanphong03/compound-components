// Bước 1: Khởi tạo class kế thừa từ HTML Element
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
      <div class="accordion-wrapper">
        <slot></slot>
      </div>
    `;
  }
  loadStyle() {
    var style = document.createElement("style");
    style.textContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            border: 0;
            outline: 0;
        }
        .accordion-wrapper {
          position: relative;
          width: 100%;
        }
    `;
    this.shadowRoot.append(style);
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
    const accordionItemList = document.querySelectorAll(
      "custom-accordion-item"
    );

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

    if (accordionItemList && accordionItemList.length) {
      accordionItemList.forEach(function (accordionItem) {
        const accordionTrigger = accordionItem.querySelector(
          "custom-accordion-trigger"
        );
        const accordionContent = accordionItem.querySelector(
          "custom-accordion-content"
        );
        if (!accordionTrigger || !accordionContent) return;

        // Set initial height for accordion content
        const initialAccordionContentStyle = {
          height: "0px",
          display: "block",
          overflow: "hidden",
          transition: "all 0.3s ease",
        };
        Object.assign(accordionContent.style, initialAccordionContentStyle);

        accordionTrigger.addEventListener("click", function (event) {
          event.preventDefault();
          if (!accordionContent) return;
          if (accordionItem.classList.contains("active")) {
            // Set height to current height before transition
            accordionContent.style.height =
              accordionContent.scrollHeight + "px";
            // Force browser to recognize style change before animation
            if (accordionContent) {
              window.getComputedStyle(accordionContent).height;
            }
            // Apply new styles to trigger transition
            accordionItem.classList.remove("active");
            accordionContent.style.height = "0px";
          } else {
            // Close all accordion item
            closeAllAccordionContent();
            const contentHeight = getInitialHeight(accordionContent);
            accordionItem.classList.add("active");
            window.getComputedStyle(accordionContent).height;
            accordionContent.style.height = contentHeight + "px";
          }
        });
      });
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <div class="accordion-item">
        <slot></slot>
      </div>
    `;
  }
  loadStyle() {
    var style = document.createElement("style");
    style.textContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            border: 0;
            outline: 0;
        }
        slot {
          align-self: stretch;
          display: block;
          width: 100%;
        }
        .accordion-item {
          border: var(--stroke-weight-1, 1px) solid var(--stroke, #dfe1f5);
          box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
          border-radius: 1rem;
          backdrop-filter: blur(3px);
          display: flex;
          padding: 1.5625rem 1.8125rem 1.5625rem 2.0625rem;
          flex-direction: column;
          align-items: flex-start;
          align-self: stretch;
        }
    `;
    this.shadowRoot.append(style);
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
      <div class="accordion__trigger">
        <slot></slot>
        <div class="accordion__trigger-btn">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M12 4.5V20.5M20 12.5H4"
                stroke="#7584D6"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    `;
  }
  loadStyle() {
    var style = document.createElement("style");
    style.textContent = `
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
        .accordion__trigger {
          color: var(--text-title, #004b88);
          text-align: center;
          font-family: "Averta Std CY";
          font-size: 1.125rem;
          font-style: normal;
          font-weight: 600;
          line-height: 150%; 
          cursor: pointer;
          align-self: stretch;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .accordion__trigger .accordion__trigger-btn {
          position: relative;
          width: 1.5rem;
          height: 1.5rem;
        }
        .accordion__trigger .accordion__trigger-btn button {
          background: none;
          cursor: pointer;
          display: inline-block;
          width: 100%;
          height: 100%;
          background: none;
        }
        .accordion__trigger .accordion__trigger-btn button svg {
          width: 100%;
          height: 100%;
        }
    `;
    this.shadowRoot.append(style);
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
    var style = document.createElement("style");
    style.textContent = `
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
    this.shadowRoot.append(style);
  }
}

customElements.define("custom-accordion", Accordion);
customElements.define("custom-accordion-item", AccordionItem);
customElements.define("custom-accordion-trigger", AccordionTrigger);
customElements.define("custom-accordion-content", AccordionContent);
