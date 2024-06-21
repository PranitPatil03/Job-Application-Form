import InterviewDate from "./InterviewDate";
import InterviewTime from "./InterviewTime";

const TimeDate = () => {
  return (
    <>
      <div className="pt-2 border-gray-200 flex flex-row space-x-2">
        <InterviewDate></InterviewDate>
        <InterviewTime></InterviewTime>
      </div>
    </>
  );
};

export default TimeDate;
