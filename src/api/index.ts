import axios from "axios";

interface IContact {
    fullName: string;
    email: string;
    message: string;
    setSend: (data: string) => void;
}

export const SendEmail = async ({ fullName, email, message, setSend }: IContact) => {
  try {
    const datas = { fullName, email, message };
    let res = await axios.post(`http://localhost:5000/send`, datas);
    if (res) {
      setSend(res.data);
    }
  } catch (error) {
    alert(error.response.data.message);
  }
};
