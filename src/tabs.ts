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

    const tabPanels = mainContainer.querySelectorAll('[role="tabpanel"]');
    hideContent(tabPanels);

    const tabToShow = mainContainer.querySelector(`#${targetPanel}`) as Element;
    showContent(tabToShow);

    const pictures = mainContainer.querySelectorAll("picture");
    hideContent(pictures);

    const pictureToShow = mainContainer.querySelector(`#${image}`) as Element;
    showContent(pictureToShow);
  }
}

function hideContent(nList: NodeListOf<Element>) {
  nList.forEach((el) => {
    el.setAttribute("hidden", "true");
    el.setAttribute("tabindex", "-1");
  });
}

function showContent(el: Element) {
  el.removeAttribute("hidden");
}

function changeTabFocus(e: KeyboardEvent) {
  if (e.key === keydownLeft || e.key === keydownRight) {
    const tab = tabs[tabFocus];
    tab.setAttribute("tabindex", "-1");

    tabFocus =
      e.key == keydownRight
        ? mod(tabFocus + 1, NUM_OF_TABS)
        : mod(tabFocus - 1, NUM_OF_TABS);
  }

  tabs[tabFocus].setAttribute("tabindex", "0");
  tabs[tabFocus].focus();
}

function mod(a: number, b: number) {
  return ((a % b) + b) % b;
}
