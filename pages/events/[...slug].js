import { Fragment } from "react";
import Head from "next/head";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";

function FilteredEventsPage(props) {
  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = props.filteredEvents;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.filterObj.year, props.filterObj.month - 1);

  return (
    <Fragment>
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`All events on ${props.filterObj.month}/${props.filterObj.year}`}
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;

export async function getServerSideProps(context) {
  const filterData = context.params.slug;

  const filterObj = {
    year: filterData[0] * 1,
    month: filterData[1] * 1,
  };

  if (
    isNaN(filterObj.year) ||
    isNaN(filterObj.month) ||
    filterObj.year > 2030 ||
    filterObj.year < 2021 ||
    filterObj.month > 12 ||
    filterObj.month < 1
  ) {
    return {
      props: {
        hasError: true,
      },
      // notFound: true,
      // redirect: {
      //   destination: '/error'
      // }
    };
  }

  const filteredEvents = await getFilteredEvents(filterObj);
  return {
    props: {
      filteredEvents,
      filterObj,
    },
  };
}
