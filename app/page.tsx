import ChatBox from "@/app/components/chatBox"
import PlaceDetailsCard from "./components/placeDetailsCard";

export default function page() {
  return (
    <>
      <h1>Hello World!</h1>
      <div className="fixed bottom-4 right-4 z-50">
        <PlaceDetailsCard/>
      </div>
    </>
  );
}