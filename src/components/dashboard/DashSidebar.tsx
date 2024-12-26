import {Sidebar, SidebarContent, SidebarGroup, SidebarHeader} from "@/components/ui/sidebar.tsx";
import SidebarButton from "@/components/dashboard/SidebarButton.tsx";
import {LuLayoutDashboard} from "react-icons/lu";
import {PiStudentBold} from "react-icons/pi";
import {IoReceiptOutline} from "react-icons/io5";
import {GrDocumentText} from "react-icons/gr";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import {FaUsers} from "react-icons/fa6";

function DashSidebar() {
    const {organization} = useOrganization();
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
                    <SidebarButton title="fees" path="fees" icon={<IoReceiptOutline/>}/>
                    <SidebarButton title="users" path="users" icon={<FaUsers />}/>
                    <SidebarButton title={`${organization} docs`} path="docs" icon={<GrDocumentText/>}/>
                    <SidebarButton title="vouchers" path="vouchers" icon={<GrDocumentText/>}/>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

export default DashSidebar;