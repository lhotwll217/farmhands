import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { DECREMENT_COUNTER, INCREMENT_COUNTER } from "./testReducer";

export default function Sandbox() {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();
  return (
    <>
      <h1> Testing 123</h1>
      <h3>The data is: {data} </h3>
      <Button
        onClick={() => dispatch({ type: INCREMENT_COUNTER })}
        content='Increment'
        color='green'
      />
      <Button
        onClick={() => dispatch({ type: DECREMENT_COUNTER })}
        content='Decrement'
        color='red'
      />
    </>
  );
}
