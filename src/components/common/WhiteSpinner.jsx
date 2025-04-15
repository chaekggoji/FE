import { BeatLoader } from 'react-spinners';

export default function WhiteSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <BeatLoader color="white" />
    </div>
  );
}
