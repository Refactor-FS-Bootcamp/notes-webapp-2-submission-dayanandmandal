function deleteNote(event) {
  const id = event.currentTarget.parentElement.parentElement.id.substring(10);
  let obj = "";
  if (event.currentTarget.previousElementSibling.value == "notes") {
    obj = removeObjFromGivenArrayAndId(archive, id);
    removeObjFromDivDom("archive", obj[0].id);
  } else {
    obj = removeObjFromGivenArrayAndId(notes, id);
    removeObjFromDivDom("notes", obj[0].id);
  }
  updateLocalStorageData();

  if (obj[0].category == "notes") {
    checkIfEmpty(notes);
  } else if (obj[0].category == "archive") {
    checkIfEmpty(archive);
  } else {
    if (!checkIfEmpty(notes) || !checkIfEmpty(archive)) {
      checkIfEmpty([1, 2]); //just random array
    }
  }
}
