export const MIN_USERNAME_LENGTH = 3;

export const MAX_USERNAME_LENGTH = 30;

export const MIN_PASSWORD_LENGTH = 8;

export const MAX_PASSWORD_LENGTH = 30;

export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
};

export const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/;
    return passwordRegex.test(password);
}

export const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z]{1,30}$/;
    return nameRegex.test(name);
}