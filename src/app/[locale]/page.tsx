import { api, HydrateClient } from "@/trpc/server";
import { Resume } from "@/components/modules/Resume/Resume";
import { cookies } from "next/headers";
import HomePagination from "@/components/modules/Pagination/Home/HomePagination";

import styles from "./Page.module.scss";

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const resume = await api.resume.getAllData();
  const currentResume = resume?.[0];

  if (!currentResume) {
    // TODO: make start page
    return <div>Данные не найдены</div>;
  }

  return (
    <HydrateClient>
      {token && <HomePagination className={styles.pagination} />}
      <Resume resume={currentResume} />
    </HydrateClient>
  );
}
