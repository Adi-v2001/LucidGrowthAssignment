import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const navigator = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log('signedIn', data)
  };
  return (
    <div
      style={{
        backgroundImage: `url("https://www.freecodecamp.org/news/content/images/size/w2000/2020/05/earth-3866609_1920.jpg")`,
        minHeight: "90.4vh",
      }}
    >
      <div className="flex flex-col items-center w-full justify-center h-[600px]">
        <form
          className="space-y-5 p-10 w-[25%] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-semibold text-2xl text-white">SignUp</h1>
          <div className="space-y-2">
            <Input
              placeholder="Name"
              className="border-white text-white placeholder:text-white"
              {...register("name", { required: "Name is required" })}
            />
            <p className="font-semibold text-xs text-red-600">
              {errors.name?.message}
            </p>
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Email"
              type="email"
              className="border-white text-white placeholder:text-white"
              {...register("email", { required: "Email is required" })}
            />
            <p className="font-semibold text-xs text-red-600">
              {errors.email?.message}
            </p>
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Password"
              type="password"
              className="border-white text-white placeholder:text-white"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 6 characters" },
              })}
            />
            <p className="font-semibold text-xs text-red-600">
              {errors.password?.message}
            </p>
          </div>
          <Button
            className="bg-violet-600 hover:bg-violet-500 w-full border border-white"
            type="submit"
          >
            Register
          </Button>
          <div className="flex space-x-2">
          <p className="text-white">Back to Login? -</p>
          <p className="font-semibold text-yellow-300 underline hover:text-white cursor-pointer" onClick={() => navigator('/')}>Login</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
