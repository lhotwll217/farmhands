import {Header, Menu, MenuItem} from "semantic-ui-react";
import Calendar from "react-calendar";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {setFilter, setStartDate} from "../eventActions";

export default function EventFilters({loading}) {
  const dispatch = useDispatch();
  const {filter, startDate} = useSelector((state) => state.event);
  return (
    <>
      <Menu vertical size='large' style={{width: "100%"}}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <MenuItem
          content='All Events'
          active={filter === "all"}
          onClick={() => dispatch(setFilter("all"))}
          disabled={loading}
        />
        <MenuItem
          content='Going'
          active={filter === "isGoing"}
          onClick={() => dispatch(setFilter("isGoing"))}
          disabled={loading}
        />
        <MenuItem
          content='Hosting'
          active={filter === "isHost"}
          onClick={() => dispatch(setFilter("isHost"))}
          disabled={loading}
        />
      </Menu>
      <Header icon='calendar' attached color='teal' content='Select Date' />
      <Calendar
        onChange={(date) => dispatch(setStartDate(date))}
        value={startDate || new Date()}
        tileDisabled={() => loading}
      />
    </>
  );
}
