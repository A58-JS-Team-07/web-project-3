export const MIN_USERNAME_LENGTH = 3;

export const MAX_USERNAME_LENGTH = 30;

export const MIN_PASSWORD_LENGTH = 8;

export const MAX_PASSWORD_LENGTH = 30;

export const MIN_EVENT_TITLE_LENGTH = 3;

export const MAX_EVENT_TITLE_LENGTH = 30;

export const MIN_EVENT_DESCRIPTION_LENGTH = 10;

export const MAX_EVENT_DESCRIPTION_LENGTH = 500;

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
};

export const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
  return passwordRegex.test(password);
};

export const isValidName = (name) => {
  const nameRegex = /^[a-zA-Z]{1,30}$/;
  return nameRegex.test(name);
};

export const eventStartDate = (event) => {
  return (
    event?.startDateTime?.day +
    "/" +
    event?.startDateTime?.month +
    "/" +
    event?.startDateTime?.year
  );
};

export const eventEndDate = (event) => {
  return (
    event?.endDateTime?.day +
    "/" +
    event?.endDateTime?.month +
    "/" +
    event?.endDateTime?.year
  );
};

export const eventStartTime = (event) => {
  return event?.startDateTime?.hours + ":" + event?.startDateTime?.minutes;
};

export const eventEndTime = (event) => {
  return event?.endDateTime?.hours + ":" + event?.endDateTime?.minutes;
};

export const eventLocation = (event) => {
  return (
    event?.location?.address +
    ", " +
    event?.location?.city +
    ", " +
    event?.location?.country
  );
};
