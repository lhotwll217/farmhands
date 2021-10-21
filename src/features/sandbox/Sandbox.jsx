import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../../app/common/form/modals/modalReducer";
import TestMap from "./TestMap";
import TestPlaceInput from "./TestPlaceInput";
import { decrement, increment } from "./testReducer";

export default function Sandbox() {
  const data = useSelector((state) => state.test.data);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.async);
  const [mapInput, setMapInput] = useState({
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 16,
  });

  return (
    <>
      <h1> Testing 123</h1>
      <h3>The data is: {data} </h3>
      <Button
        loading={loading}
        onClick={() => dispatch(increment(20))}
        content='Increment'
        color='green'
      />
      <Button
        loading={loading}
        onClick={() => dispatch(decrement(10))}
        content='Decrement'
        color='red'
      />
      <Button
        onClick={() =>
          dispatch(openModal({ modalType: "TestModal", modalProps: { data } }))
        }
        content='Open Modal'
        color='teal'
      />
      <div style={{ marginTop: 15 }}>
        <TestPlaceInput mapInput={mapInput} setMapInput={setMapInput} />
        <TestMap mapInput={mapInput} />
      </div>
    </>
  );
}
