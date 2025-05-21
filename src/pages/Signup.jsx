import signupImg from "../assets/Images/signup.png"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Welcome to Course Craft"
      description1="Sign up to start your learning journey."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup
