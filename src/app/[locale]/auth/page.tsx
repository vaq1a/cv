import AuthSignIn from "@/components/modules/Auth/AuthSignIn/AuthSignIn";
import AuthTitle from "@/components/modules/Auth/AuthTitle/AuthTitle";
import AuthPagination from "@/components/modules/Pagination/Auth/AuthPagination";

export default async function AuthPage() {
  return (
    <div className="pb-5 pt-5">
      <AuthPagination />
      <AuthTitle />
      <AuthSignIn />
    </div>
  );
}
