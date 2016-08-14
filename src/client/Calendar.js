import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const modal = document.getElementById('myModal');
const span = document.getElementsByClassName("close")[0];

class Calendar extends React.Component {
  constructor(props){
    super(props);
    this.events = [
      {
        'title': 'Birthday Party',
        'start':new Date(2016, 7, 13, 7, 0, 0),
        'end': new Date(2016, 7, 13, 10, 30, 0)
      }
    ];
  }
  createEvent(slotInfo){
    var title = prompt('Name of event:');
    var startDate = slotInfo.start;
    var endDate = slotInfo.end;
    this.setState({
      events: this.events.push(
        {
        'title': title,
        'start':new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes(), 0),
        'end': new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endDate.getHours(), endDate.getMinutes() + 30, 0),
        desc: 'important stuff'
        }
      )
    })
  }
  render(){
    return (
      <div {...this.props}>
        <h3 className="callout">
          Click an event to see more info, or
          drag the mouse over the calendar to select a date/time range.
        </h3>
        <BigCalendar
          selectable
          events={this.events}
          defaultView='week'
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2016, 7, 14, 6)}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={(slotInfo) => this.createEvent(slotInfo)}
        />
      </div>
    )
  }
}

export default Calendar;