import Organization from "@/constants/Organization.ts";

type Docs = {
    _id?: string;
    title: string,
    uploadedAt?: string,
    path?: string,
    organization: Organization
}

export default Docs;