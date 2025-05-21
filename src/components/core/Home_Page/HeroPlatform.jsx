import React from 'react';

const platformStats = [
  {
    count: '1000+',
    label: 'Happy Students',
    bgColor: 'bg-yellow-100',
    imgSrc: "https://cdn3d.iconscout.com/3d/premium/thumb/student-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--boy-young-profession-pack-professionals-illustrations-4403850.png?f=webp",
    imgAlt: 'Happy Students',
    imgBottom: '6px',
  },
  {
    count: '100+',
    label: 'Instructors',
    bgColor: 'bg-pink-100',
    imgSrc: 'https://cdn3d.iconscout.com/3d/premium/thumb/teacher-3d-icon-download-in-png-blend-fbx-gltf-file-formats--maths-female-professor-teaching-mathematics-pack-school-education-icons-5999906.png?f=webp',
    imgAlt: 'Instructors',
    imgBottom: '-56px',
  },
  {
    count: '140+',
    label: 'Video Lectures',
    bgColor: 'bg-blue-100',
    imgSrc: 'https://cdn3d.iconscout.com/3d/premium/thumb/online-class-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--course-education-distance-learning-conference-pack-network-communication-illustrations-6043523.png?f=webp',
    imgAlt: 'Video Lectures',
    imgBottom: '-66px',
  },
];

export default function HeroPlatform() {
  return (
    <section className="text-center py-16 text-black bg-white">
      <h2 className="text-4xl font-bold mb-2">A Platform Trusted by Students Worldwide</h2>
      <p className="mb-12">
        Don't Just Take Our Word for It. Delve into the Numbers and Witness the Excellence for Yourself!
      </p>

      <div className="flex flex-col lg:flex-row justify-center items-center space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex flex-row justify-center space-x-4">
          {platformStats.slice(0, 2).map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
        <div className="flex flex-row justify-center space-x-4">
          {platformStats.slice(2).map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>

      <div className="relative w-full h-0 border-t-[150px] border-transparent border-r-[160vw] border-r-white transform rotate-2 -mt-10 -ml-32 -mb-24" />
    </section>
  );
}

function StatCard({ count, label, bgColor, imgSrc, imgAlt }) {
  return (
    <div
      className={`relative flex flex-col justify-center items-center w-[200px] sm:w-[250px] h-[280px] rounded-lg ${bgColor} group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300`}
    >
      <div className="text-center transition-all duration-300 group-hover:scale-105">
        <div className="text-5xl font-bold">{count}</div>
        <div className="text-gray-600">{label}</div>
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 flex justify-center items-center transform scale-75 group-hover:scale-100 group-hover:translate-y-[-20%] transition-all duration-500 ease-out`}
      >
        <img src={imgSrc} alt={imgAlt} className="w-[130px]" />
      </div>
    </div>
  );
}
