import loginImg from "../assets/Images/login.png"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <Template
      title="Welcome Back to Course Craft"
      description1="Access your personalized dashboard and continue your learning journey."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login
