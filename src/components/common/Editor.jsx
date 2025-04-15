import PropTypes from 'prop-types';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useMemo } from 'react';

if (typeof window !== 'undefined' && window.Quill) {
  window.Quill = Quill;
}

// 에디터에서 사용할 기능을 제한
const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'indent',
  'link',
  'color',
];

const Editor = ({ value, onChange, placeholder, height }) => {
  // 에디터에 표시할 기능
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'bullet' },
            { list: 'ordered' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          [{ color: [] }],
          ['link'],
          ['clean'],
        ],
      },
    };
  }, []);

  return (
    <div
      style={{ height: `${height + 43.05}px` }}
      className="w-full font-ownglyph"
    >
      <ReactQuill
        theme="snow"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        style={{ height }}
      />
    </div>
  );
};

Editor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  height: PropTypes.number,
  placeholder: PropTypes.string,
};

export default Editor;
