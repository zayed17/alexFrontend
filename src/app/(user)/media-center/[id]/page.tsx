import {
  extractYoutubeId,
  getAllMediaItems,
  getMedia,
  getMediaItemById,
} from "@/api/api";
import VideoPage from "../_components/videoDetails";


export const revalidate = 1;


export async function generateStaticParams() {
  const media = await getMedia();

  return media.map((media: any) => ({
    id: media._id,
  }));
}


export default async function Page({ params }: any) {
  const videoDetails = await getMediaItemById(params?.id);

  const videoId = extractYoutubeId(videoDetails.youtubeUrl);

  const allMediaItems = await getAllMediaItems("video");

  const relatedVideosData = allMediaItems
    .filter((item: any) => item._id !== params.id)
    .slice(0, 5);

  return (
    <section>
      <VideoPage
        relatedVideosData={relatedVideosData}
        videoId={videoId}
        videoDetails={videoDetails}
      />
    </section>
  );
}
