import useRegistrationModel from "../hooks/useRegistrationForm";
import Image from "next/image";

const Navbar = () => {
  const RegisterModel = useRegistrationModel();
  const onClick = () => {
    return RegisterModel.onOpen();
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full h-20 z-50 top-0 left-0 shadow-md border-b border-gray-200 dark:border-gray-600 backdrop-blur-lg bg-opacity-80">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-6 h-full">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse h-full">
          {/* Logo and Text */}
          <div className="flex items-center space-x-3 h-full">
            <Image
              src="/assets/newlogo.svg" // Path to your logo
              width={50} // Adjust width to increase size
              height={50} // Adjust height to increase size
              alt="BitByte Logo"
              className="object-contain h-10 w-auto" // Ensure logo stays within the navbar
            />
            <span className="self-center text-3xl font-bold tracking-wide text-gray-900 dark:text-white">
              BITBYTE
              <sup className="text-sm ml-1 font-normal align-super tracking-wider">
                2024
              </sup>
            </span>
          </div>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg shadow-md font-medium rounded-full text-sm px-6 py-2 text-center transition duration-300 ease-in-out dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={onClick}
          >
            Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
