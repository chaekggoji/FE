import { PulseLoader } from 'react-spinners';

export default function PrimarySpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      {/* primary-200: #afc8ad vs primary-300: #8ca08a */}
      <PulseLoader color="#afc8ad" />
    </div>
  );
}
