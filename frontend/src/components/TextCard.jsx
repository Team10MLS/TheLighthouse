import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { XMarkIcon, EllipsisVerticalIcon, PencilIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TextCard({ avatarUrl, username, title, body, children, organizationName, postId, handleDelete }) {
  return (
    <div className="bg-white px-4 py-5 sm:px-6">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          {/* <img
            className="h-10 w-10 rounded-full"
            src={avatarUrl || ""}
            alt=""
          /> */}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900">
            <a href="#" className="hover:underline">
              {username}
            </a>
          </p>
          {organizationName && <p className="text-sm text-gray-500">{organizationName}</p>}
          {title && <p className="text-sm text-gray-500">{title}</p>}
          {body && <p className="text-sm text-gray-500">{body}</p>}
        </div>
        <div className="flex flex-shrink-0 self-center">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
            </div>
            {children}

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "flex px-4 py-2 text-sm"
                        )}
                      >
                        <PencilIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span>Edit</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        onClick={() => handleDelete(postId)}
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "flex px-4 py-2 text-sm"
                        )}
                      >
                        <XMarkIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span>Delete</span>
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}
