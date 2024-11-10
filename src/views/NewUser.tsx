import { Avatar, Button, Input } from "@nextui-org/react";
import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import client from "../api/client";
import { parserError } from "../utils/helper";

interface Props {}

type NewUserInfo = { name: string; avatar?: File };

const NewUser: FC<Props> = () => {
  const [userInfo, setUserInfo] = useState<NewUserInfo>({ name: "" });
  const [localAvatar, setLocalAvatar] = useState("");
  const [invalidFrom, setInvalidFrom] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value, files } = target;

    if (name === "name") {
      setUserInfo({ ...userInfo, name: value });
    }
    if (name === "avatar" && files) {
      const file = files[0];
      setUserInfo({ ...userInfo, avatar: file });
      setLocalAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setBusy(true);
    const formData = new FormData();

    if (userInfo.name.trim().length < 3) {
      return setInvalidFrom(true);
    }

    formData.append("name", userInfo.name);
    if (userInfo.avatar?.type.startsWith("image")) {
      formData.append("avatar", userInfo.avatar);
    } else {
      setInvalidFrom(false);
    }

    try {
      const response = await client.put("/auth/profile", formData);
      console.log(response.data);
    } catch (error) {
      parserError(error);
    } finally {
      setInvalidFrom(false);
      setBusy(false);
    }
  };

  return (
    <div className=" flex-1 flex items-center justify-center">
      <div className=" w-96 border-2 p-5 rounded-md flex flex-col items-center justify-center">
        <h1 className="text-center text-xl font-semibold">
          You are almost there, Please fill out the form below
        </h1>

        <form onSubmit={handleSubmit} className=" w-full space-y-6 mt-6">
          <label
            className=" cursor-pointer flex items-center justify-center"
            htmlFor="avatar">
            <Avatar
              src={localAvatar}
              isBordered
              radius="sm"
              name={userInfo.name}
            />
            <input
              hidden
              accept="image/*"
              type="file"
              name="avatar"
              id="avatar"
              onChange={handleChange}
            />
          </label>

          <Input
            type="text"
            name="name"
            label="Full Name"
            placeholder="John lauren"
            variant="bordered"
            value={userInfo.name}
            onChange={handleChange}
            isInvalid={invalidFrom}
            errorMessage="Name must be 3 characters long!"
          />

          <Button type="submit" isLoading={busy} className="w-full">
            Sign Me Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
