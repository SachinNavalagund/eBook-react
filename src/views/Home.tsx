import { FC } from "react";
import useAuth from "../hooks/useAuth";
import HeroSection from "../components/HeroSection";
import BookByGenre from "../components/BookByGenre";

interface Props {}

const Home: FC<Props> = () => {
  const authStatus = useAuth();
  console.log(authStatus);

  return (
    <div className=" space-y-10 px-5 lg:p-0">
      <HeroSection />
      <BookByGenre genre="Horror" />
      <BookByGenre genre="Thriller" />
      <BookByGenre genre="Adventure" />
      <BookByGenre genre="Romance" />
      <BookByGenre genre="Travel" />
      <BookByGenre genre="Historical Fiction" />
      <BookByGenre genre="Mystery" />
    </div>
  );
};

export default Home;
