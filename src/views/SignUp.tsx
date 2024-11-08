import { Button, Input } from "@nextui-org/react";
import { FC } from "react";
import SignupImage from "../assets/magic-fairy-tale-book-illustration-with-astronaut-exploring-planet.png";

interface Props {}

const SignUp: FC<Props> = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-96 border-2 p-5 rounded-md">
        <img src={SignupImage} alt="Book heaven image" />
        <h1 className=" text-center text-xl font-semibold">
          Books are gateways to new worlds. Sign up and open one and explore.
        </h1>

        <form className=" w-full space-y-6 mt-6">
          <Input
            type="email"
            label="Email"
            placeholder="ava@email.com"
            variant="bordered"
          />
          <Button type="submit" className="w-full">
            Send Me The Link
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
