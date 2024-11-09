import { Button, Input } from "@nextui-org/react";
import { FC, FormEventHandler, useState } from "react";
import SignUpImage from "../assets/magic-fairy-tale-book-illustration-with-astronaut-exploring-planet.png";
import client from "../api/client";
import { RiMailCheckLine } from "react-icons/ri";

interface Props {}

const emailRegex = new RegExp(
  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
);

const SignUp: FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [invalidForm, setInvalidForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [showSuccessResponse, setShowSuccessResponse] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) return setInvalidForm(true);
    setInvalidForm(false);
    setBusy(true);

    try {
      await client.post("/auth/generate-link", {
        email,
      });

      setShowSuccessResponse(true);
    } catch (error) {
      console.log(error);
    } finally {
      setBusy(false);
    }
  };

  if (showSuccessResponse)
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <RiMailCheckLine size={80} className="animate-bounce" />
        <p className=" text-lg font-semibold">
          Please check your email we just sent you a magic link.
        </p>
      </div>
    );
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-96 border-2 p-5 rounded-md">
        <img src={SignUpImage} alt="Book heaven image" />
        <h1 className=" text-center text-xl font-semibold">
          Books are gateways to new worlds. Sign up and open one and explore.
        </h1>

        <form className=" w-full space-y-6 mt-6" onSubmit={handleSubmit}>
          <Input
            label="Email"
            placeholder="ava@email.com"
            variant="bordered"
            isInvalid={invalidForm}
            errorMessage="Invalid email!"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button isLoading={busy} type="submit" className="w-full">
            Send Me The Link
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
