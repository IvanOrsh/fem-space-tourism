const NUM_OF_TABS = 4;
let tabFocus = 0;

const tabList = document.querySelector('[role="tablist"]') as HTMLDivElement;
const tabs = tabList.querySelectorAll(
  '[role="tab"]'
) as NodeListOf<HTMLButtonElement>;

const keydownLeft = "ArrowLeft";
const keydownRight = "ArrowRight";

tabList.addEventListener("keydown", changeTabFocus);

tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPanel);
});

function changeTabPanel(e: MouseEvent) {
  tabs.forEach((tab) => {
    tab.setAttribute("aria-selected", "false");
  });

  const targetTab = e.target as HTMLElement;
  targetTab.setAttribute("aria-selected", "true");

  if (targetTab) {
    const targetPanel = targetTab.getAttribute("aria-controls") as string;
    const image = targetTab.getAttribute("data-image") as string;

    const tabContainer = targetTab.parentElement;
    const mainContainer = tabContainer!.parentElement as HTMLElement;

    mainContainer.querySelectorAll('[role="tabpanel"]').forEach((panel) => {
      panel.setAttribute("hidden", "true");
      panel.setAttribute("tabindex", "-1");
    });
    mainContainer.querySelector(`#${targetPanel}`)?.removeAttribute("hidden");

    mainContainer.querySelectorAll("picture").forEach((picture) => {
      picture.setAttribute("hidden", "true");
    });
    mainContainer.querySelector(`#${image}`)?.removeAttribute("hidden");
  }
}

function changeTabFocus(e: KeyboardEvent) {
  if (e.key === keydownLeft || e.key === keydownRight) {
    const tab = tabs[tabFocus];
    tab.setAttribute("tabindex", "-1");
  }

  if (e.key === keydownRight) {
    tabFocus = mod(tabFocus + 1, NUM_OF_TABS);
  }

  if (e.key === keydownLeft) {
    tabFocus = mod(tabFocus - 1, NUM_OF_TABS);
  }

  tabs[tabFocus].setAttribute("tabindex", "0");
  tabs[tabFocus].focus();
}

function mod(a: number, b: number) {
  return ((a % b) + b) % b;
}
