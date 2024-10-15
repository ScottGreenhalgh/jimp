import ImageComponent from "@/components/ImageComponent";

export default function MyPage() {
  const imageUrl = "/shrek.png";

  return (
    <div>
      <ImageComponent imageUrl={imageUrl} />
    </div>
  );
}
