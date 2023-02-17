function globalClickEvent(event) {
  const newNote = document.querySelector(".header-new-notes");
  if (newNote.contains(event.target)) {
    return;
  }

  const formNote = document.querySelector(".main-form-add-notes");
  if (formNote.contains(event.target)) {
    return;
  }

  const divShowHide = document.querySelector(".header-new-notes");
  if (divShowHide.dataset.formDisplay == "show") {
    divShowHide.dataset.formDisplay = "hide";
    hideForm();
    allowScrolling();
    unBlurBackground();
  }
}
