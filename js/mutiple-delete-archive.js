let idCategoryArrayForMultipleDeleteArchive = [];

function multipleDeleteArchiveHandler(event) {
  showMultipleMenu();
  const cate = getCategoryMultipleFile(event.target);
  const obj = getObjMultipleFile(event.target.id, cate);
  let tf = checkIfAlreadyPresent(event.target.id);
  if (tf == false) {
    storeObjectInArray(idCategoryArrayForMultipleDeleteArchive, obj);
  } else {
    removeObjectFromArrayMultipleFile(
      idCategoryArrayForMultipleDeleteArchive,
      event.target.id
    );
  }
  if (idCategoryArrayForMultipleDeleteArchive.length == 0) {
    hideMultipleMenu();
  }
}

function removeObjectFromArrayMultipleFile(arr, id) {
  for (let i = 0; i < idCategoryArrayForMultipleDeleteArchive.length; i++) {
    if (idCategoryArrayForMultipleDeleteArchive[i].id == id) {
      arr.splice(i, 1);
    }
  }
}

function checkIfAlreadyPresent(id) {
  for (let i = 0; i < idCategoryArrayForMultipleDeleteArchive.length; i++) {
    if (idCategoryArrayForMultipleDeleteArchive[i].id == id) {
      return true;
    }
  }
  return false;
}

function getObjMultipleFile(id1, cate) {
  return {
    id: id1,
    category: cate,
  };
}

function getCategoryMultipleFile(target) {
  if (
    target.parentElement.parentElement.firstElementChild.nextElementSibling
      .value == "notes"
  ) {
    return "archive";
  } else {
    return "notes";
  }
}

function showMultipleMenu() {
  const div = document.querySelector(".multiple-archive-delete");
  div.style.zIndex = 10;
}

function hideMultipleMenu() {
  const div = document.querySelector(".multiple-archive-delete");
  div.style.zIndex = "";
  unSelectAllCheckbox();
}

function deleteAllCard(event) {
  for (let i = 0; i < idCategoryArrayForMultipleDeleteArchive.length; i++) {
    deleteSingleCardMultipleFile(
      idCategoryArrayForMultipleDeleteArchive[i].id,
      idCategoryArrayForMultipleDeleteArchive[i].category
    );
  }
  idCategoryArrayForMultipleDeleteArchive = [];
  hideMultipleMenu();
}

function deleteSingleCardMultipleFile(id, cate) {
  //   const id = event.currentTarget.parentElement.parentElement.id.substring(10);
  let obj = "";
  if (cate == "notes") {
    obj = removeObjFromGivenArrayAndId(notes, id);
    removeObjFromDivDom("notes", obj[0].id);
  } else {
    obj = removeObjFromGivenArrayAndId(archive, id);
    removeObjFromDivDom("archive", obj[0].id);
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

function archiveAllCard(event) {
  for (let i = 0; i < idCategoryArrayForMultipleDeleteArchive.length; i++) {
    archiveSingleCardMultipleFile(
      idCategoryArrayForMultipleDeleteArchive[i].id,
      idCategoryArrayForMultipleDeleteArchive[i].category
    );
  }
  idCategoryArrayForMultipleDeleteArchive = [];
  hideMultipleMenu();
}

function archiveSingleCardMultipleFile(id, cate) {
  if (cate == "archive") {
    alert("Already in archive");
    unSelectAllCheckbox();
    idCategoryArrayForMultipleDeleteArchive = [];
    hideMultipleMenu();
  }
  // const id = event.currentTarget.parentElement.parentElement.id.substring(10);
  const obj = removeObjFromGivenArrayAndId(notes, id);
  changeObjCategory(obj[0], "archive");
  archive = addObjToGivenArray(archive, obj[0]);
  updateLocalStorageData();
  removeObjFromDivDom("notes", obj[0].id);
  checkIfEmpty(notes);
}

function unSelectAllCheckbox() {
  const checkedBoxList = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  if (checkedBoxList.length == 0) {
    return;
  }
  for (let i = 0; i < checkedBoxList.length; i++) {
    checkedBoxList[i].checked = false;
  }
}
