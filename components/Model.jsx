import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

const Model = ({ isOpen, onChange, title, children, description, type }) => {
  const modalClasses =
    type === "about"
      ? "fixed border border-gray-200 top-[6.25%] shadow-lg left-[10.5%] w-[80%] h-[90%] bg-white p-[25px] focus:outline-none custom-scrollbar overflow-auto rounded-md z-50"
      : "fixed border border-gray-200 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-[25px] focus:outline-none custom-scrollbar overflow-auto z-50";

  return (
    <Dialog.Root open={isOpen} onOpenChange={onChange} defaultOpen={isOpen}>
      <Dialog.Portal>
        {/* Apply blur only to the overlay */}
        <Dialog.Overlay className="bg-neutral-900/30 backdrop-blur-sm fixed inset-0" />

        {/* Make sure modal content remains sharp */}
        <Dialog.Content className={modalClasses}>
          <Dialog.Title className="text-xl text-center font-bold mb-4 text-gray-800">
            {title}
          </Dialog.Title>
          <Dialog.Description className="mt-1 text-l leading-6 text-gray-600 text-center">
            {description}
          </Dialog.Description>
          {/* Child content */}
          <div className="text-gray-700">{children}</div>

          <Dialog.Close asChild>
            <button className="text-neutral-500 hover:text-gray-900 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none">
              <IoMdClose size={24} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Model;
