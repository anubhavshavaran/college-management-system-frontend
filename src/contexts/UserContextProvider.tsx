import {createContext, ReactNode, useContext, useState} from "react";
import User from "@/constants/User.ts";

type UserContextType = {
    user: User | null;
    changeUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | null>(null);

function UserContextProvider({children}: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const changeUser = (u: User) => setUser(u);

    return (
        <UserContext.Provider value={{user, changeUser}}>
            {children}
        </UserContext.Provider>
    );
}

function useUser() {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within the context");
    return context;
}

export {UserContextProvider, useUser};