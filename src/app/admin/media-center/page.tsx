import MediaList from "./_components/mediaCenterList";
import { getMedia } from "@/api/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function PropertyTypePage() {
  const media = await getMedia();

  return (
    <>
      <div className="flex justify-end">
        <Link href="/admin/media-center/add-media-center" passHref>
          <Button variant="default" size="sm" className="text-white" asChild>
            <span className="flex items-center gap-2">
              <Plus size={16} />
              Add Media
            </span>
          </Button>
        </Link>
      </div>
      <MediaList data={media} />
    </>
  );
}
