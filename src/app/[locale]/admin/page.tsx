import AdminPagination from "@/components/modules/Pagination/Admin/AdminPagination";
import ResumeForms from "@/components/modules/Forms/ResumeForms/ResumeForms";

export default async function AdminPage() {
  return (
    <div className="pb-5 pt-5">
      <AdminPagination />
      <ResumeForms />
    </div>
  );
}
