const cardList = document.querySelector(".grid-galery");

const popupTypeEditButtonOpen = document.querySelector(".profile__edit-button");
const popupTypeImageAddPhotoButton = document.querySelector(".profile__add-button");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const formElementPopupTypeEdit = popupTypeEdit.querySelector(".form");
const nameInput = popupTypeEdit.querySelector(".form__user-info_user_name");
const jobInput = popupTypeEdit.querySelector(".form__user-info_user_job");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const formElementNewCard = popupTypeNewCard.querySelector(".form");

const buttonOpenPopupUserAvatar = document.querySelector(".profile__avatar");
const popupNewAvatar = document.querySelector(".popup_type_avatar");
const formElementPopupNewAvatar = popupNewAvatar.querySelector(".form");

const formArray = {
    formSelector: ".form",
    inputSelector: ".form__user-info",
    submitButtonSelector: ".form__save-button",
    inactiveButtonClass: "form__save-button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "form__error_visible"
};

export { 
    formArray,
    cardList, 
    popupTypeEditButtonOpen, 
    popupTypeImageAddPhotoButton, 
    formElementPopupTypeEdit, 
    nameInput, 
    jobInput, 
    formElementNewCard,
    buttonOpenPopupUserAvatar,
    formElementPopupNewAvatar
};
