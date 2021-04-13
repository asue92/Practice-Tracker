import React, { useState } from "react";
import { Paper, Box } from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, Calendar } from "@material-ui/pickers";

function MyCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box border={1} padding={4}>
        <Paper style={{ overflow: "hidden" }}>
          <Calendar date={selectedDate} onChange={handleDateChange} />
        </Paper>
      </Box>
    </MuiPickersUtilsProvider>
  );
}

export default MyCalendar;
