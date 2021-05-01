/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from "react";
import { Link } from "gatsby";
import { Popover, Transition } from "@headlessui/react";
import {
  BookOpenIcon,
  CollectionIcon,
  ExclamationCircleIcon,
  MenuIcon,
  MusicNoteIcon,
  PlusCircleIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import SearchBox from "./SearchBox";
import logo from "../images/logo_100x100.png";

const solutions = [
  {
    name: "All Songs",
    description: "View all songs",
    href: "/all-songs",
    icon: MusicNoteIcon,
  },
  {
    name: "Song Book",
    description: "Download a PDF with all song sheets",
    href: "/songbook",
    icon: BookOpenIcon,
  },
  {
    name: "Collections",
    description: "View curated collections",
    href: "/collections",
    icon: CollectionIcon,
  },
];

const callsToAction = [
  { name: "Request", href: "/request-submit", icon: QuestionMarkCircleIcon },
  { name: "Submit", href: "/request-submit", icon: PlusCircleIcon },
  { name: "Report", href: "/contact", icon: ExclamationCircleIcon },
];

const recentPosts = [
  { id: 1, name: "Your Favorites", href: "/collection/your-favorites" },
  {
    id: 2,
    name: "For Children",
    href: "/collection/for-children",
  },
  {
    id: 3,
    name: "The Centenary of the Ascension of ‘Abdu’l-Bahá",
    href: "/collection/centenary-ascension-abdul-baha",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <Popover className="relative z-10">
      {({ open }) => (
        <>
          {/* Normal Menu */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
              <div className="flex justify-start">
                <Link to="/">
                  <span className="sr-only">bahá&apos;í song project</span>
                  <img className="h-8 w-auto sm:h-10" src={logo} alt="" />
                </Link>
              </div>
              <div className={`flex ml-6 mr-4 max-w-48 flex-1`}>
                <SearchBox />
              </div>
              <div className="-mr-2 -my-2 md:hidden">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-10">
                <Popover.Group as="nav" className="hidden md:flex space-x-10">
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            open ? "text-gray-900" : "text-gray-500",
                            "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          )}
                        >
                          <span>Discover</span>
                          <ChevronDownIcon
                            className={classNames(
                              open ? "text-gray-600" : "text-gray-400",
                              "ml-2 h-5 w-5 group-hover:text-gray-500"
                            )}
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel
                            static
                            className="absolute z-10 mt-3 transform px-2 w-screen max-w-md sm:px-0 ml-0 left-1/2 -translate-x-1/2"
                          >
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                              <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                {solutions.map((item) => (
                                  <Link
                                    key={item.name}
                                    to={item.href}
                                    className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                  >
                                    <item.icon
                                      className="flex-shrink-0 h-6 w-6 text-indigo-600"
                                      aria-hidden="true"
                                    />
                                    <div className="ml-4">
                                      <p className="text-base font-medium text-gray-900">
                                        {item.name}
                                      </p>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {item.description}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                              <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                                <div>
                                  <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">
                                    Featured Collections
                                  </h3>
                                  <ul className="mt-4 space-y-4">
                                    {recentPosts.map((post) => (
                                      <li
                                        key={post.id}
                                        className="text-base truncate"
                                      >
                                        <Link
                                          to={post.href}
                                          className="font-medium text-gray-900 hover:text-gray-700"
                                        >
                                          {post.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="mt-5 text-sm">
                                  <Link
                                    to="/collections"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    {" "}
                                    View all collections{" "}
                                    <span aria-hidden="true">&rarr;</span>
                                  </Link>
                                </div>
                              </div>
                              <div className="px-5 pt-5 text-center bg-white sm:px-8">
                                Song missing or wrong?
                              </div>
                              <div className="px-5 py-5 bg-white space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                                {callsToAction.map((item) => (
                                  <div key={item.name} className="flow-root">
                                    <Link
                                      to={item.href}
                                      className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                                    >
                                      <item.icon
                                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                                        aria-hidden="true"
                                      />
                                      <span className="ml-3">{item.name}</span>
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </Popover.Group>
                <Link
                  to="/contact"
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Contact
                </Link>
                <Link
                  to="/contribute"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Contribute
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Transition
            show={open}
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              static
              className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src={logo}
                        alt="bahá'í song project"
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-8">
                      {solutions.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                        >
                          <item.icon
                            className="flex-shrink-0 h-6 w-6 text-indigo-600"
                            aria-hidden="true"
                          />
                          <span className="ml-3 text-base font-medium text-gray-900">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
                <div className="py-6 px-5 space-y-6">
                  <div>
                    <Link
                      to="/contribute"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Contribute
                    </Link>
                    <p className="mt-6 text-center text-base font-medium text-gray-500">
                      <Link
                        to="/contact"
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        Contact
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
