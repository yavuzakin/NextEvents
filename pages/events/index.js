import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import NewsletterRegistration from "../../components/input/newsletter-registration";

function AllEventsPage(props) {
  const { events } = props;
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
      </Head>
      {/* <EventsSearch onSearch={findEventsHandler} /> */}
      <NewsletterRegistration />
      <EventList events={events} />;
    </Fragment>
  );
}

export default AllEventsPage;

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}
