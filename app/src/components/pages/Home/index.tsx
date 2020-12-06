import { Navbar } from "../../organisms/PublicNavbar";

export const Home = () => {
    return (
        <Navbar
            color="transparent"
            dropdownMenuLabel="Reis Haleem"
            userLoggedIn={false}
        />
    );
};
