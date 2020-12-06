import { Navbar } from "../../organisms/PublicNavbar";

export const Home = () => {
    const userName = "Reis Haleem";
    const loggedIn = true;
    return (
        <Navbar
            color="transparent"
            dropdownMenuLabel={userName}
            userLoggedIn={loggedIn}
        />
    );
};
