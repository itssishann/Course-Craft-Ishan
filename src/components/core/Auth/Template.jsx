import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Template({ title, description1, image, formType }) {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-richblack-900 px-4 py-10 text-richblack-5">
      {loading ? (
        <div className="spinner" />
      ) : (
        <div className="w-full max-w-5xl bg-richblack-800 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-10 p-6 md:p-10">
          
          {/* Form Section */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <p className="text-base text-richblack-100 mb-6">{description1}</p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>

          {/* Image Section - Hidden on mobile */}
          <div className="w-full md:w-1/2 hidden md:block">
            <img
              src={image}
              alt="Visual"
              className="w-full h-auto rounded-md shadow-md object-cover"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Template;
