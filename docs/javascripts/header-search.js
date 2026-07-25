(() => {
  const toggleSelector = "[data-hli-search-toggle]";

  const syncToggle = () => {
    const searchToggle = document.querySelector("#__search");
    const toggle = document.querySelector(toggleSelector);

    if (searchToggle && toggle) {
      toggle.setAttribute("aria-expanded", String(searchToggle.checked));
    }
  };

  document.addEventListener("click", (event) => {
    const toggle = event.target.closest?.(toggleSelector);

    if (!toggle) {
      return;
    }

    const searchToggle = document.querySelector("#__search");
    if (!searchToggle) {
      return;
    }

    searchToggle.checked = !searchToggle.checked;
    searchToggle.dispatchEvent(new Event("change", { bubbles: true }));
    syncToggle();

    if (searchToggle.checked) {
      window.setTimeout(() => {
        document.querySelector("[data-md-component='search-query']")?.focus();
      }, 200);
    }
  });

  document.addEventListener("change", (event) => {
    if (event.target.matches("#__search")) {
      syncToggle();
    }
  });

  document.addEventListener("keydown", (event) => {
    const toggle = event.target.closest?.(toggleSelector);

    if (toggle && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      toggle.click();
      return;
    }

    const searchToggle = document.querySelector("#__search");

    if (event.key !== "Escape" || !searchToggle?.checked) {
      return;
    }

    searchToggle.checked = false;
    searchToggle.dispatchEvent(new Event("change", { bubbles: true }));
    syncToggle();
    document.querySelector(toggleSelector)?.focus();
  });

  syncToggle();
})();
