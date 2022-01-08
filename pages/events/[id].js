import { useRouter } from "next/router";

function EventDetailPage() {
  const router = useRouter();
  const id = router.query.id;
  console.log(id);
  return (
    <div>
      <h1>Event Detail Page</h1>
    </div>
  );
}

export default EventDetailPage;
