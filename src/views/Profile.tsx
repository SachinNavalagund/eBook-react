import { FC } from "react";
import useAuth from "../hooks/useAuth";
import { Avatar, Button } from "@nextui-org/react";
import { Navigate, useNavigate } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";

interface Props {}

const Profile: FC<Props> = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  if (!profile) return <Navigate to="/sign-up" />;

  return (
    <div className="flex-1 flex flex-col w-full  items-center ">
      <div className="flex min-w-96">
        <Avatar
          src={profile.avatar}
          name={profile?.name}
          className=" w-20 h-20"
          radius="sm"
        />
        <div className=" pl-4">
          <p className=" text-xl font-semibold">{profile.name}</p>
          <p className="">{profile.email}</p>
          <p className="">
            Role :{" "}
            <span className=" italic text-sm">
              {" "}
              {profile.role.toUpperCase()}
            </span>
          </p>
        </div>
        <Button
          isIconOnly
          variant="flat"
          className=" ml-auto"
          onClick={() => navigate("/update-profile")}>
          <FaPencil size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Profile;
