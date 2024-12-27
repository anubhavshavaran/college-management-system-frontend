import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import {deleteDocsApi, getDocsApi} from "@/services/docsApi.ts";

function useDocs() {
    const {organization} = useOrganization();
    const {data, isPending, error} = useQuery({
        queryKey: [organization, 'docs'],
        queryFn: () => getDocsApi(organization)
    });

    return {
        docs: data?.data?.docs,
        isPending,
        error,
    }
}

function useDeleteDocs() {
    const {organization} = useOrganization();
    const queryClient = useQueryClient();
    const {mutate: deleteDocs, isPending: isDeletingDocs} = useMutation({
        mutationFn: (id: string) => deleteDocsApi(organization, id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [organization, 'docs']
            }, {
                throwOnError: true
            });
        }
    });

    return {deleteDocs, isDeletingDocs};
}

export {useDocs, useDeleteDocs};