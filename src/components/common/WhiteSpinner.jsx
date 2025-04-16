import { PulseLoader } from 'react-spinners';

export default function WhiteSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <PulseLoader color="white" />
    </div>
  );
}
