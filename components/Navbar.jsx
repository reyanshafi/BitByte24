import useRegistrationModel from "../hooks/useRegistrationForm";
import Image from "next/image";
const Navbar = () => {
  const RegisterModel = useRegistrationModel();
  const onClick = () => {
    return RegisterModel.onOpen();
    //handle click
  };

  return (
    <nav className="bg-transparent backdrop-blur-md dark:bg-gray-900 fixed w-full z-50 top-0 start-0 border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 "
            width={30}
            height={30}
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
            BITBYTE
            <sup className="text-xs ml-1 font-normal align-super tracking-wide">
              2024
            </sup>
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="text-white bg-blue-500 hover:bg-blue-700 hover:shadow-lg  shadow-md font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer z-50"
            style={{ pointerEvents: "auto" }}
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
