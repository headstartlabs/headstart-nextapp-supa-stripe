import Image from "next/image";
import Link from "next/link";

import PageLayout from "../../components/layouts/page-layout";

export default function Home() {
  return (
    <PageLayout>
      <div>
        <Link href="/" className="inline-block">
          <button className="group text-primary font-semibold text-md border-b text-blue-500 hover:bg-blue-500 hover:text-blue-50 focus:outline-none focus:ring focus:ring-blue-300 backdrop-blur-2xl w-auto rounded-md border border-blue-500 px-4 py-1">
            back
          </button>
        </Link>
      </div>
      <h2 className={`mb-3 text-2xl font-semibold`}>About</h2>
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert rounded-xl"
        src="/about.svg"
        alt="About Image"
        width={900}
        height={110}
        priority
      />
      <div className="flex items-center">
        <p className="text-7xl">🦄</p>
        <div className="ml-4">
          <h1 className="font-bold text-2xl text-left">John Smith</h1>
          <h3 className="font-semibold italic text-md text-left">
            Full Stack Developer.
          </h3>
        </div>
      </div>

      <p>
        Howdy! I'm John Smith, a passionate individual navigating the dynamic
        world of technology with a fervor for Full Stack Development. As a
        seasoned developer, I revel in the fusion of front-end finesse and
        back-end wizardry, exploring the realms of web development with genuine
        enthusiasm. Whether I'm architecting robust APIs, crafting seamless user
        interfaces, or delving into the intricacies of databases, my mission is
        to build innovative and scalable digital solutions. Join me on this
        coding journey where ideas transform into lines of code, projects take
        flight, and meaningful connections are forged.
      </p>

      <div className="flex justify-center flex-wrap space-x-2 mx-auto">
        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          Next.js
        </span>
        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          TypeScript
        </span>
        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          App Router
        </span>
        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          TailwindCSS
        </span>
        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          ESLint
        </span>
        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          Server Actions
        </span>
      </div>
    </PageLayout>
  );
}
