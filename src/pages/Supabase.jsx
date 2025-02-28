import { useEffect, useState } from 'react';
import supabase from '../libs/supabase.js';

const fetchData = async () => {
  const { data, error } = await supabase.from('studies').select('*');
  if (error) {
    console.error('Error fetching data:', error);
    return [];
  }

  return data;
};

const Supabase = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result);
    };

    getData();
  }, []);

  return (
    <div>
      <h1>Studies</h1>
      {data && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Supabase;
