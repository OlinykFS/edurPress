export default function Overview() {
  return (
    <div className="bg-[#111928] p-6 min-h-full text-white">
      <h1 className="mb-6 font-bold text-3xl">Overview</h1>
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        
        <div className="flex flex-col items-center space-y-2 bg-gray-700 p-4 rounded-lg">
          <h2 className="font-semibold text-lg">Total Users</h2>
          <p className="text-2xl">1,234</p>
        </div>
        <div className="flex flex-col items-center space-y-2 bg-gray-700 p-4 rounded-lg">
          <h2 className="font-semibold text-lg">Total Courses</h2>
          <p className="text-2xl">456</p>
        </div>
        <div className="flex flex-col items-center space-y-2 bg-gray-700 p-4 rounded-lg">
          <h2 className="font-semibold text-lg">Total Categories</h2>
          <p className="text-2xl">78</p>
        </div>
        <div className="flex flex-col items-center space-y-2 bg-gray-700 p-4 rounded-lg">
          <h2 className="font-semibold text-lg">Total Instructors</h2>
          <p className="text-2xl">234</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="mb-4 font-bold text-2xl">Top Categories</h2>
        <div className="bg-gray-700 p-4 rounded-lg">
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <p className="text-lg">Programming</p>
              <p className="text-lg">256 Courses</p>
            </li>
            <li className="flex justify-between items-center">
              <p className="text-lg">Design</p>
              <p className="text-lg">180 Courses</p>
            </li>
            <li className="flex justify-between items-center">
              <p className="text-lg">Business</p>
              <p className="text-lg">120 Courses</p>
            </li>
            <li className="flex justify-between items-center">
              <p className="text-lg">Science</p>
              <p className="text-lg">90 Courses</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="mb-4 font-bold text-2xl">Popular Courses</h2>
        <div className="bg-gray-700 p-4 rounded-lg">
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <p className="text-lg">Introduction to JavaScript</p>
              <p className="text-lg">5,000 Students</p>
            </li>
            <li className="flex justify-between items-center">
              <p className="text-lg">Design Principles</p>
              <p className="text-lg">4,500 Students</p>
            </li>
            <li className="flex justify-between items-center">
              <p className="text-lg">Business Management</p>
              <p className="text-lg">4,000 Students</p>
            </li>
            <li className="flex justify-between items-center">
              <p className="text-lg">Physics Fundamentals</p>
              <p className="text-lg">3,500 Students</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};