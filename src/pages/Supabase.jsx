import { useEffect, useState } from 'react';
import supabase from '../libs/supabase.js'; // Supabase 클라이언트 import

const Supabase = () => {
  const [studies, setStudies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('studies').select('*');
      if (!error) {
        setStudies(data);
      }
    };

    fetchData();
  }, []); // ✅ 빈 배열을 넣어 처음 한 번만 실행

  return (
    <div>
      <h1>Studies</h1>
      <ul>
        {studies.map((study) => (
          <li key={study.id}>{study.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Supabase;
