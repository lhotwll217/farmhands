import ModalWrapper from "./ModalWrapper";

export default function TestModal({ data }) {
  return (
    <ModalWrapper size='mini' header='Test Modal'>
      <div> The data is: {data}</div>
    </ModalWrapper>
  );
}
