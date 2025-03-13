export default function StudyItem({ category, imgUrl, title, participants, maxParticipants, startDate, endDate }) {
  return (
    <div className="relative border rounded-lg shadow-md overflow-hidden w-60">
      <div className="absolute top-2 left-2 bg-primary-200 text-white text-sm font-semibold px-2 py-1 rounded-md">
        {category}
      </div>
      <div className="h-50 bg-cover bg-center" style={{ backgroundImage: `url(${imgUrl})` }} />
      <div className="p-4 bg-white">
        <p className="font-bold text-md">{title}</p>
        <p className="text-sm">참여 인원: {participants} / {maxParticipants} 명</p>
        <p className="text-sm">참여 기간: {startDate} ~ {endDate}</p>
      </div>
    </div>
  );
}
