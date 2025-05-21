import React from 'react';
import { Link } from 'react-router-dom';

const Hero2 = () => {
  return (
    <section className="py-20 bg-pure-greys-5 relative z-10">
      <h2 className="text-4xl font-bold text-center mb-12">
        Discover the perfect platform to boost your
        <span className="bg-gradient-to-b from-[#864135] to-[#F09819] text-transparent bg-clip-text font-bold"> learning journey</span>
      </h2>

      {/* Students & Professionals */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
        {/* Students Card */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center w-full max-w-sm flex flex-col justify-between">
          <img
            className="mx-auto mb-4 h-40 object-contain"
            src="https://blob.sololearn.com/assets/home-perfect-platform-1-rebranding.svg"
            alt="Students learning"
            loading="lazy"
          />
          <div>
            <div className="text-xl font-semibold mb-2">Students</div>
            <p className="text-gray-600 mb-6">
              Master the skills you need for exams, projects, and interviews. Build a solid foundation for your future.
            </p>
          </div>
          <Link
            to="/signup"
            className="mt-auto inline-block text-center text-sm sm:text-base px-6 py-3 rounded-md font-bold bg-blue-500 text-white shadow-md hover:shadow-none hover:scale-95 transition-all duration-200"
          >
            Start Learning
          </Link>
        </div>

        {/* Professionals Card */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center w-full max-w-sm flex flex-col justify-between">
          <img
            className="mx-auto mb-4 h-40 object-contain"
            src="https://assets.sololearn.com/home-perfect-platform-2.svg"
            alt="Professionals upgrading skills"
            loading="lazy"
          />
          <div>
            <div className="text-xl font-semibold mb-2">Professionals</div>
            <p className="text-gray-600 mb-6">
              Keep up with industry trends, sharpen your skills, and stay competitive in a rapidly changing tech landscape.
            </p>
          </div>
          <Link
            to="/signup"
            className="mt-auto inline-block text-center text-sm sm:text-base px-6 py-3 rounded-md font-bold bg-blue-500 text-white shadow-md hover:shadow-none hover:scale-95 transition-all duration-200"
          >
            Upskill Now
          </Link>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12 z-20 relative">
        <Link
          to="/signup"
          className="text-center text-sm sm:text-base px-6 py-3 rounded-md font-bold bg-blue-500 text-white shadow-md hover:shadow-none hover:scale-95 transition-all duration-200"
        >
          Join the Learning Journey
        </Link>
      </div>

      {/* Decorative border */}
      <div className="absolute w-full h-0 border-t-[110px] border-transparent border-r-[160vw] border-r-gray-25 transform rotate-2 -mt-10 -ml-40 -mb-24 z-0"></div>
    </section>
  );
};

export default Hero2;
