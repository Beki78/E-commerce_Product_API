// DropDown.tsx
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Alert from "./Dailog";
import { MyContext } from "../context/state";
import { useContext } from "react";

const DropDown = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("DropDown must be used within a ContextProvider");
  }

  const { setOpen, triggerSellModal } = context;
  const menuItems = [
    { name: "My Market", href: "/my_market" },
  ];
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          John
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
      >
        <div className="p-1">
          {menuItems.map((item) => (
            <MenuItem key={item.name}>
              <a
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900"
              >
                {item.name}
              </a>
            </MenuItem>
          ))}
          <button
            onClick={triggerSellModal}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 w-full text-start rounded-sm"
          >
            Sell
          </button>
          <MenuItem>
            <button
              onClick={() => setOpen(true)}
              className="block w-full px-4 py-2 text-left text-sm text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
            >
              Sign out
            </button>
          </MenuItem>
        </div>
      </MenuItems>
      <Alert />
    </Menu>
  );
};

export default DropDown;
