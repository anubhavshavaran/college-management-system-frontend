import {cloneElement, ReactElement} from "react";
import {NavLink} from "react-router";

type SidebarButtonProps = {
    icon: ReactElement;
    title: string;
    path: string;
}

function SidebarButton({icon, path, title}: SidebarButtonProps) {
    return (
        <NavLink to={path} className="flex justify-between items-center p-2 pr-0 hover:bg-gray-200 rounded-lg">
            {({isActive}) => (
                <>
                    <div className="flex justify-start items-center gap-3">
                        {isActive ? cloneElement(icon, {size: 20, color: '#f7b696'}) : cloneElement(icon, {size: 20})}
                        <p className="text-lg font-medium capitalize">{title}</p>
                    </div>
                    {isActive && (
                        <div className="h-full w-1.5 rounded-l-md rounded-bl-md bg-defaultBlue"/>
                    )}
                </>
            )}
        </NavLink>
    );
}

export default SidebarButton;