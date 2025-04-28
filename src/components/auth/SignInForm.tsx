import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- important
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

export default function SignInForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const dummyUsers = [
    {
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    },
    {
      email: "superadmin@example.com",
      password: "superadmin123",
      role: "superadmin",
    },
  ];
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  
    const user = dummyUsers.find((u) => u.email === email && u.password === password);
  
    if (user) {
      localStorage.setItem("role", user.role);
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "superadmin") {
        navigate("/superadmin/dashboard");
      }
    } else {
      setErrorMsg("Invalid email or password.");
    }
  };
  
  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto" />

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="space-y-6">
              <div>
                <Label>
                  Email <span className="text-error-500">*</span>
                </Label>
                <Input
                  placeholder="info@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label=""
                />
              </div>

              <div>
                <Label>
                  Password <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label=""
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-0 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
              </div>

              {errorMsg && (
                <div className="text-sm text-error-500">{errorMsg}</div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                 
                </div>

                <a
                  href="/reset-password"
                  className="text-sm text-green-600 hover:text-green-500 dark:text-green-500"
                >
                  Forgot password?
                </a>
              </div>
              <div>
              <Button className="w-full group" size="sm">
                  <svg
                   xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24"
                   width="24"
                   height="24"
                   className="mr-2 transition-transform duration-300 group-hover:rotate-50"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z">
                    </path>
                  </svg>
                Sign in
              </Button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
