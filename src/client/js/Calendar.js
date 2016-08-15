import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import $ from 'jquery';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.events = [
      {
        title: 'Birthday Party',
        start: new Date(2016, 7, 13, 7, 0, 0),
        end: new Date(2016, 7, 13, 10, 30, 0),
        id: 0,
      },
    ];
    this.numEvents = 1;
    this.startDate = new Date(2016, 7, 13, 7, 0, 0);
    this.endDate = new Date(2016, 7, 13, 10, 30, 0);
  }
  createEvent(slotInfo) {
    this.startDate = slotInfo.start;
    this.endDate = slotInfo.end;
    $('#createEvent').css('display', 'block');
  }
  confirmEvent() {
    const title = $('#title').val();
    const desc = $('#desc').val();
    const duration = $('#duration').val();
    const newEvent = $('#id').val() === '';
    let id;
    if (newEvent) {
      id = this.events.length;
      this.setState({
        events: this.events.push(
          {
            title,
            start: new Date(this.startDate.getFullYear(), this.startDate.getMonth(),
              this.startDate.getDate(), this.startDate.getHours(), this.startDate.getMinutes(), 0),
            end: new Date(this.endDate.getFullYear(), this.endDate.getMonth(),
              this.endDate.getDate(), this.endDate.getHours(),
              this.endDate.getMinutes() + 30, 0),
            desc,
            id,
            duration,
          }),
        numEvents: this.numEvents + 1,
      });
    } else {
      id = $('#id').val();
      const events = this.events;
      events[id] = {
        title,
        start: new Date(this.startDate.getFullYear(), this.startDate.getMonth(),
          this.startDate.getDate(), this.startDate.getHours(), this.startDate.getMinutes(), 0),
        end: new Date(this.endDate.getFullYear(), this.endDate.getMonth(),
          this.endDate.getDate(), this.endDate.getHours(),
          this.endDate.getMinutes() + 30, 0),
        desc,
        id,
        duration,
      };
      this.setState({
        events,
      });
    }
    this.closeCreateEvent();
  }
  editEvent(eventInfo) {
    this.startDate = eventInfo.start;
    this.endDate = eventInfo.end;
    $('#title').val(eventInfo.title);
    $('#desc').val(eventInfo.desc);
    $('#id').val(eventInfo.id);
    $('#duration').val(eventInfo.duration);
    $('#createEvent').css('display', 'block');
  }
  closeCreateEvent() {
    $('#createEvent').css('display', 'none');
    $('#title').val('');
    $('#desc').val('');
    $('#id').val('');
    $('#duration').val('');
  }
  deleteEvent() {
    const events = this.events;
    const id = $('#id').val();
    events[id] = null;
    this.setState({
      events,
    });
    this.closeCreateEvent();
  }
  render() {
    return (
      <div {...this.props}>
        <div id="createEvent" className="hi">
          <div className="modal-content">
            <h3>Event Information</h3>
            <div className="modalElement">Start Date: {JSON.stringify(this.startDate)}</div>
            <input id="id" readOnly />
            <div className="modalElement">Title:<input id="title" /></div>
            <div className="modalElement">Description:<input id="desc" /></div>
            <div className="modalElement">
              <button onClick={() => this.closeCreateEvent()}>Cancel</button>
              <button onClick={() => this.deleteEvent()}>Delete Event</button>
              <button onClick={() => this.confirmEvent()}>Confirm</button>
            </div>
          </div>
        </div>
        <BigCalendar
          selectable
          events={this.events}
          defaultView="week"
          popup
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2016, 7, 14, 6)}
          onSelectEvent={event => this.editEvent(event)}
          onSelectSlot={(slotInfo) => this.createEvent(slotInfo)}
        />
      </div>
    );
  }
}

export default Calendar;
