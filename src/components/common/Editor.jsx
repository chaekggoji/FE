import PropTypes from 'prop-types';
import ReactQuill from 'react-quill-new'; //import1
import 'react-quill-new/dist/quill.snow.css'; //import2

const Editor = ({ value, onChange, height }) => {
  // 에디터에 표시할 기능
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

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
    'image',
  ];

  return (
    <div style={{ height: `${height + 43.05}px` }} className="w-full">
      <ReactQuill
        theme="snow"
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
};

export default Editor;
