import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import {
  ChevronDownIcon,
  HomeIcon,
  SearchIcon,
  MenuIcon,
} from "@heroicons/react/solid";
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";

const Header: FC = () => {
  const { data: session } = useSession();

  return (
    <header className="flex bg-white px-4 py-2 shadow-sm sticky top-0 items-center z-50">
      <Link href="/">
        <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer mr-0 sm:mr-3">
          <Image
            objectFit="contain"
            src="https://links.papareact.com/fqy"
            layout="fill"
          />
        </div>
      </Link>

      <div className="hidden items-center mx-7 xl:min-w-[300px] lg:flex">
        <HomeIcon className="h-5 w-5" />
        <p className="flex-1 ml-2 hidden lg:inline">Home</p>
      </div>

      {/**Search */}
      <form
        className="hidden flex-1 items-center space-x-2 border border-gray-200
        rounded-sm bg-gray-100 p-3 py-1 md:flex"
      >
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Search Reddit"
        />
        <button type="submit" hidden />
      </form>

      {/**Icons */}
      <div className="mx-5 items-center hidden space-x-2 text-gray-500 sm:inline-flex sm:space-x-6">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>

      {/**Sign In and Out */}
      {session ? (
        <div
          onClick={() => signOut()}
          className="items-center flex space-x-2 ml-12
          border border-gray-100 p-2 cursor-pointer sm:ml-0"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              objectFit="contain"
              src="https://links.papareact.com/23l"
              alt=""
              layout="fill"
            />
          </div>
          <div className="flex-1 text-xs">
            <p className="truncate">{session?.user?.name}</p>
            <p className="text-gray-400">Sign Out</p>
          </div>

          <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="items-center flex space-x-2 ml-12 
          border border-gray-100 p-2 cursor-pointer sm:ml-0"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              objectFit="contain"
              src="https://links.papareact.com/23l"
              alt=""
              layout="fill"
            />
          </div>
          <p className="text-gray-400">Sign In</p>
        </div>
      )}
    </header>
  );
};

export default Header;
