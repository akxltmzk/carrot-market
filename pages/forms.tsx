import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
  email: string;
  errors?: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    setValue,
    reset,
    resetField,
  } = useForm<LoginForm>({
    mode: "onChange",
  });
  const onValid = (data: LoginForm) => {
    console.log("im valid bby");
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: "Username is required",
          minLength: {
            message: "The username should be longer than 5 chars.",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      {errors.username?.message}
      <input
        {...register("email", {
          required: "Email is required",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "Gmail is not allowed",
          },
        })}
        type="email"
        placeholder="Email"
      />
      {errors.email?.message}
      <input
        {...register("password", { required: "Password is required" })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
      {errors.errors?.message}
    </form>
  );
}




// import { useState } from "react";

// export default function Forms() {

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [formErrors, setFormErrors] = useState("");
//   const [emailError, setEmailError] = useState("");

//   const onUsernameChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setUsername(value);
//   };

//   const onEmailChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setEmailError("");
//     setEmail(value);
//   };

//   const onPasswordChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setPassword(value);
//   };

//   const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (username === "" || email === "" || password === "") {
//       setFormErrors("All fields are required");
//     }
//     if (!email.includes("@")) {
//       setEmailError("email is required");
//     }
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       <input
//         value={username}
//         onChange={onUsernameChange}
//         type="text"
//         placeholder="Username"
//         required
//         minLength={5}
//       />
//       <input
//         value={email}
//         onChange={onEmailChange}
//         type="email"
//         placeholder="Email"
//         required
//       />
//       {emailError}
//       <input
//         value={password}
//         onChange={onPasswordChange}
//         type="password"
//         placeholder="Password"
//         required
//       />
//       <input type="submit" value="Create Account" />
//     </form>
//   );
// }