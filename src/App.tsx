import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { validateEmail, validateFullName, validateMessage } from "./utils/InlineError";
import Toast from "./components/Toast";
import InlineError from "./utils/validation";
import { SendEmail } from "./api";

const App = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [fullNameError, setFullNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [messageError, setMessageError] = useState<string>("");
  const [send, setSend] = useState<string>("");

  useEffect(() => {
    validateFullName({ fullName, setFullNameError });
    validateEmail({ email, setEmailError });
    validateMessage({ message, setMessageError });

    if (send) {
      toast.success(send.msg);
      setFullName("");
      setEmail("");
      setMessage("");
      setSend("");
    }
  }, [fullName, email, message, send]);

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!fullNameError && !emailError && !messageError) {
      SendEmail({ fullName, email, message, setSend });
    }
  };

  return (
    <>
      <Toast />
      <div className="relative h-4/5 w-full max-w-[1440px] mx-auto font-manrope ">
        <div className="w-10/12 mx-auto grid grid-cols-1 space-y-4 md:grid-cols-2 md:space-x-4  h-4/5 py-10 my-20 overflow-hidden bg-primary-color rounded-2xl">
          <motion.div
            initial={{
              opacity: 0,
            }}
            transition={{ duration: 1.2 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center item-center space-y-8 ss:mt-8 md:mt-0 px-10"
          >
            <h2 className="text-4xl font-bold text-white">
              Get started <br /> with us
            </h2>
            <p className="text-white">
              Don't bother to get started us, we are ready to help you 24/7.
              Please fill in the column on the right to get started.
            </p>
          </motion.div>
          <div className="bg-circles bg-no-repeat bg-cover bg-center w-full font-manrope">
            <form
              onSubmit={submitHandler}
              className="flex flex-col space-y-4 px-4 py-10 w-4/5 mx-auto bg-white rounded-xl"
            >
              <div>
                <p className="text-xl font-semibold text-secondary-color pb-4">
                  Ask a question
                </p>
              </div>
              <div>
                <input
                  className="bg-gray-200 w-full py-3 rounded-md px-3"
                  type="text"
                  required
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {fullNameError && <InlineError error={fullNameError} />}
              </div>
              <div>
                <input
                  className="bg-gray-200 w-full py-3 rounded-md px-3"
                  type="text"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <InlineError error={emailError} />}
              </div>
              <div>
                <textarea
                  className="bg-gray-200 w-full pt-3 pb-12 rounded-md px-3"
                  required
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                {messageError && <InlineError error={messageError} />}
              </div>
              <button
                type="submit"
                className=" bg-gray-800 text-white rounded-full px-8 py-3 text-sm xl:text-base "
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
