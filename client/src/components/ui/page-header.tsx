import { ReactNode } from "react";
import { doodle } from "../../assets";

interface PageHeaderProps {
  heading: ReactNode;
  paragraph?: ReactNode;
}

export const PageHeader = ({ heading, paragraph }: PageHeaderProps) => {
  return (
    <div
      className="w-full pt-[150px] px-4 md:px-10 flex flex-col items-start justify-start text-left mb-12 h-[40vh]"
      style={{
        backgroundImage: `url(${doodle})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(0,0,0,0.88)", 
        backgroundBlendMode: "darken",
      }}
    >
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
        {heading}
      </h1>
      {paragraph && (
        <p className="text-lg md:text-xl text-gray-200 drop-shadow">
          {paragraph}
        </p>
      )}
    </div>
  );
};