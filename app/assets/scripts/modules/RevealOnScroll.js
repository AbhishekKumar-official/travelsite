import throttle from "lodash/throttle";

class RevealOnScroll {
  constructor(els, thresholdPercent) {
    // this.itemsToReveal = document.querySelectorAll(".feature-item");
    this.thresholdPercent = thresholdPercent;
    this.itemsToReveal = els;
    this.hideInitialy();
    this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
    this.events();
  }

  events() {
    window.addEventListener("scroll", this.scrollThrottle);
  }

  calcCaller() {
    this.itemsToReveal.forEach((el) => {
      if (el.isRevealed == false) {
        this.calculateIfScrolledTo(el);
      }
    });
  }
  calculateIfScrolledTo(el) {
    let scrollPercent =
      (el.getBoundingClientRect().y / window.innerHeight) * 100;

    if (scrollPercent < this.thresholdPercent) {
      el.classList.add("reveal-item--is-visible");
      el.isRevealed = true;
      if (el.isLastItem) {
        window.removeEventListener("scroll", this.scrollThrottle);
      }
    }
  }
  hideInitialy() {
    this.itemsToReveal.forEach((el) => {
      el.classList.add("reveal-item");
      el.isRevealed = false;
    });
    this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
  }
}
export default RevealOnScroll;
