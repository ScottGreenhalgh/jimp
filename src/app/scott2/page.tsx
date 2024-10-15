import ImagePlusButtons from "@/components/ImagePlusButtons";

export default function MyPage() {
  const imageUrl = "/shrek.png";

  return (
    <div>
      <ImagePlusButtons imageUrl={imageUrl} />
    </div>
  );
}
