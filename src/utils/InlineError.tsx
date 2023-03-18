interface IEmail {
    email: string;
    setEmailError: (error: string) => void;
}

interface IfullName {
  fullName: string;
  setFullNameError: (error: string) => void;
}

interface IMessage {
  message: string;
  setMessageError: (error: string) => void;
}

const validateEmail = ({ email, setEmailError }: IEmail) => {
  const emailRegular =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return email && !email.match(emailRegular)
    ? setEmailError("Email not valid")
    : setEmailError("");
};

const validateFullName = ({ fullName, setFullNameError }: IfullName) => {
  return fullName && fullName.length < 5
    ? setFullNameError("Full name is too short")
    : fullName && fullName.length > 50
    ? setFullNameError("Try to make short and meanfull")
    : setFullNameError("");
};

const validateMessage = ({ message, setMessageError }: IMessage) => {
  return message && message.length < 5
    ? setMessageError("Message is too short")
    : message && message.length > 50
    ? setMessageError("Try to make short and meanfull")
    : setMessageError("");
};

export { validateEmail, validateFullName, validateMessage };
