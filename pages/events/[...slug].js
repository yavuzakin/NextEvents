import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";

function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return <p>Loading...</p>;
  }
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
    return <p>Invalid filter. Please adjust your values!</p>;
  }

  const filteredEvents = getFilteredEvents(filterObj);

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for the chosen filter!</p>;
  }

  return <EventList events={filteredEvents} />;
}

export default FilteredEventsPage;
