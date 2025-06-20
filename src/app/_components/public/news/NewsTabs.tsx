import { Tabs } from "@/components/ui/tabs";
import NewsByCategory from "@/src/app/_components/public/news/NewsByCategory";
import NewsTabLists from "@/src/app/_components/public/news/NewsTabLists";
import NewsSkeleton from "@/src/app/_components/skeletons/news-skeleton";
import { getArticlesCategory } from "@/src/app/_lib/data-service/homepage/articles";
import { QueryType } from "@/src/app/_utils/types";
import { Suspense } from "react";

export default async function NewsTabs({ query }: QueryType) {
  const articleCategories = await getArticlesCategory();
  const suspenseKey = `${query?.category} -${query?.page}`;

  return (
    <div className="">
      <Tabs defaultValue={query?.category ?? "all"}>
        <div className="no-scrollbar w-full overflow-auto rounded-lg">
          <NewsTabLists articleCategories={articleCategories} />
        </div>

        <Suspense fallback={<NewsSkeleton />} key={suspenseKey}>
          <NewsByCategory query={query} />
        </Suspense>
      </Tabs>
    </div>
  );
}
