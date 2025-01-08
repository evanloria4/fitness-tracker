import React, { useMemo, useState, useCallback } from 'react';
import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid2';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import Navigation from '../components/navigation/Navigation.jsx';
import EventDetails from '../components/calendar/EventDetails.jsx';
import CreateEventDialog from '../components/calendar/CreateEventDialog.jsx';

const djLocalizer = dayjsLocalizer(dayjs);

const startEvents = [
  {
    id: 1,
    title: 'Breakfast',
    start: dayjs(new Date(2025, 0, 5, 7, 30)).$d,
    end: dayjs(new Date(2025, 0, 5, 8)).$d,
    allDay: false,
    desc: 'Two banana pancakes & a cup of coffee.',
    category: 'Breakfast',
  }
];

function CalendarView({ handleThemeChange }) {
  const [events, setEvents] = useState(startEvents);
  const [dateSlot, setDateSlot] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectSlot = useCallback((event) => {
    setDateSlot(event);
  }, [setDateSlot]);

  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
  }, [setSelectedEvent]);

  const { defaultDate, scrollToTime } = useMemo(() => ({
    defaultDate: dayjs(Date.now()).$d,
    scrollToTime: dayjs(new Date(1970, 1, 1, 6)).$d,
  }), []);

  const handleCloseDialog = () => {
    setDateSlot({});
  };

  const handleSelectEventClose = () => {
    setSelectedEvent(null);
  };

  return (
    <div id="root-app">
      <Navigation handleThemeChange={handleThemeChange} />
      <br></br>
      <Grid container spacing={2}>
        <Grid size={4}>
          {
            selectedEvent
              ? (
                <Box>
                  <EventDetails selectedEvent={selectedEvent}/>
                  <Button
                    onClick={handleSelectEventClose}
                  >
                    Clear
                  </Button>
                </Box>
              ) : (
                <div>No event selected</div>
              )
          }
        </Grid>
        <Grid size={8}>
          <Calendar
            defaultDate={defaultDate}
            defaultView={Views.MONTH}
            events={events}
            localizer={djLocalizer}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable
            scrollToTime={scrollToTime}
            style={{
              // Must set a minHeight for the calendar events to be visible
              minHeight: 550,
            }}
          />
        </Grid>
      </Grid>
      <CreateEventDialog
        dateSlot={dateSlot}
        handleCloseDialog={handleCloseDialog}
      />
    </div>
  );
}

export default CalendarView;
