import {createContext, ReactElement, useContext, useEffect, useState} from "react";
import Organization from "@/constants/Organization.ts";
import {useLocation} from "react-router";

type OrganizationContextType = {
    organization: Organization;
    changeOrganization: (organization: Organization) => void;
}

const OrganizationContext = createContext<OrganizationContextType | null>(null);

function OrganizationContextProvider({children}: { children: ReactElement }) {
    const location = useLocation();
    const [organization, setOrganization] = useState<Organization>(Organization.NONE);
    const changeOrganization = (o: Organization) => setOrganization(o);

    useEffect(() => {
        if (location.pathname.split("/").at(1) === "school" || location.pathname.split("/").at(1) === "SCHOOL") {
            changeOrganization(Organization.SCHOOL);
        } else {
            changeOrganization(Organization.COLLEGE);
        }
    }, [location]);

    return (
        <OrganizationContext.Provider value={{organization, changeOrganization }}>{children}</OrganizationContext.Provider>
    );
}

function useOrganization() {
    const context = useContext(OrganizationContext);
    if (!context) {
        throw new Error("An Organization Provider is needed.");
    }

    return context;
}

export {OrganizationContextProvider, useOrganization};