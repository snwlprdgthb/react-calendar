import moment from "moment";

export default [
  {
    allDay: true,
    start: new Date(),
    end: new Date(moment().add(0, "days")),
    title: "Some title"
  }
];
