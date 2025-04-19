import imageUploadIcon from '@assets/icons/icon_plus_white_24.svg';
import PropTypes from 'prop-types';

const ImageUploadBox = ({ previewImages, onImageUpload, onImageDelete }) => {
  return (
    <div className="w-full border-3 border-slate-300 rounded-2xl flex p-2 md:mt-0 mt-6">
      {/* 이미지 추가 버튼 */}
      <label
        htmlFor="image-upload"
        className="cursor-pointer w-20 h-20 bg-primary-200 rounded-xl flex justify-center items-center mr-2 hover:bg-primary-300"
      >
        <img src={imageUploadIcon} className="size-8" />
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={onImageUpload}
      />
      {/* 프리뷰 이미지 표시 */}
      {previewImages.length > 0 && (
        <div className="flex gap-2">
          {previewImages.map((src, index) => {
            return (
              <div key={index} className="relative group">
                <img
                  src={src}
                  className="size-20 rounded-xl cursor-pointer object-cover"
                />
                <div className="absolute inset-0 bg-slate-800 opacity-0 group-hover:opacity-40 rounded-xl"></div>
                <div
                  className="absolute inset-0 flex justify-center items-center text-xl text-white opacity-0 group-hover:opacity-100 cursor-pointer"
                  onClick={() => onImageDelete(index)}
                >
                  삭제
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

ImageUploadBox.propTypes = {
  previewImages: PropTypes.array.isRequired,
  onImageUpload: PropTypes.func.isRequired,
  onImageDelete: PropTypes.func.isRequired,
};

export default ImageUploadBox;
