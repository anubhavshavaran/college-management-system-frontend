import {Sidebar, SidebarContent, SidebarGroup, SidebarHeader} from "@/components/ui/sidebar.tsx";
import SidebarButton from "@/components/dashboard/SidebarButton.tsx";
import {LuLayoutDashboard} from "react-icons/lu";
import {PiStudentBold} from "react-icons/pi";
import {IoDocumentAttachOutline, IoReceiptOutline} from "react-icons/io5";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import {FaUsers} from "react-icons/fa6";
import {useUser} from "@/contexts/UserContextProvider.tsx";
import {LiaMoneyCheckAltSolid} from "react-icons/lia";
import {RiLogoutBoxLine} from "react-icons/ri";
import Organization from "@/constants/Organization.ts";
import {useNavigate} from "react-router";

function DashSidebar() {
    const {organization} = useOrganization();
    const navigate = useNavigate();
    const {user} = useUser();

    function switchOrganization() {
        if (organization === Organization.SCHOOL) {
            navigate("/college");
        } else {
            navigate("/school");
        }
    }

    return (
        <Sidebar>
            <SidebarHeader className="w-full p-4 flex flex-row justify-start items-center">
                <img
                    src="/Logo.png"
                    alt="Logo"
                    className="w-12"
                />
                <div className="flex flex-col items-center">
                    <p className="text-sm font-normal">S.M.E SOCIETY's</p>
                    <p className="text-sm font-bold uppercase">abdulkalam {organization}</p>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="pr-0">
                    <SidebarButton title="dashboard" path="dash" icon={<LuLayoutDashboard/>}/>
                    <SidebarButton title="students" path="students" icon={<PiStudentBold/>}/>
                    <SidebarButton title="fees" path="fees" icon={<LiaMoneyCheckAltSolid/>}/>

                    {user?.role === "CHAIRMAN" && (
                        <SidebarButton title="users" path="users" icon={<FaUsers/>}/>
                    )}

                    <SidebarButton title={`${organization} docs`} path="docs" icon={<IoDocumentAttachOutline/>}/>
                    <SidebarButton title="vouchers" path="vouchers" icon={<IoReceiptOutline/>}/>

                    {user?.role === "CHAIRMAN" && (
                        <div
                            onClick={() => switchOrganization()}
                            className="bg-transparent flex justify-start items-center gap-3 p-2 pr-0 hover:bg-gray-200 rounded-lg">
                            <RiLogoutBoxLine size={20} color="red"/>
                            <p className="text-lg font-medium capitalize">
                                go to
                                {organization === Organization.SCHOOL ? ' college' : ' school'}
                            </p>
                        </div>
                    )}

                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

export default DashSidebar;