const scrollToElement = async (elementId: string) => {
  setTimeout(() => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, 100);
};

export default scrollToElement;
