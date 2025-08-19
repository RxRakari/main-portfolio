export default function Heading ({ heading, paragraph, className }: any) {
    return(
        <div className={`text-center mb-16 ${className}`}>
          <h2 className="text-3xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            {heading}
          </h2>
          <p className="md:text-lg text-[0.9rem] text-gray-400 md:max-w-3xl max-w-2xl mx-auto">
            {paragraph}
          </p>
        </div>
    )
}