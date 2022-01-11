import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";

function FeaturedEventsPage(props) {
  return (
    <div>
      <EventList events={props.events} />
    </div>
  );
}

export default FeaturedEventsPage;

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
