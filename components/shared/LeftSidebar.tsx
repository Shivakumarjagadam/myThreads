// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { sidebarLinks } from "@/constants";
// import { useRouter, usePathname } from "next/navigation";
// import { SignedIn, SignOutButton, useClerk ,useAuth} from "@clerk/nextjs";



// function LeftSidebar() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { signOut } = useClerk();
//   const { userId } = useAuth();


//   return (
//     <section className="custom-scrollbar leftsidebar">
//       <div className="flex width-full flex-1 flex-col gap-6 px-6">
//         {sidebarLinks.map((link) => {
//           const isActive =
//             (pathname && pathname.includes(link.route) && link.route.length > 1) ||
//             pathname === link.route;

//             if(link.route==="/profile") link.route = `${link.route}/${userId}`;

//           return (
//             <Link
//               href={link.route}
//               key={link.label}
//               className={`leftsidebar_link  ${isActive ? "bg-primary-500" : ""} `}
//             >
//               <Image src={link.imgURL}
//                alt={link.label} 
//                width={24}
//                 height={24} />
//               <p className="text-light-1 max-lg:hidden">{link.label}</p>
//             </Link>
//           );
//         })}
//       </div>



//       <div className="mt-10 px-6">
//         <SignedIn>
//           <SignOutButton>
//             <div className="flex cursor-pointer gap-4 p-4" 
//               onClick={() => {
//                 signOut().then(() => router.push("/sign-in"));
//               }}
//             >
//               <Image
//                 src="/assets/logout.svg"
//                 alt="logout"
//                 width={24}
//                 height={24}
//               />
//               <p className="text-light-2 max-lg:hidden">Logout</p>
//             </div>
//           </SignOutButton>
//         </SignedIn>
//       </div>
//     </section>
//   );
// }

// export default LeftSidebar;






"use client";

import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { useRouter, usePathname } from "next/navigation";
import { SignedIn, SignOutButton, useClerk, useAuth } from "@clerk/nextjs";

function LeftSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { userId } = useAuth();

  // you ensure that clicking the profile link navigates to the correct URL (/profile/userId). The handleNavigation function checks the route and uses router.push to navigate to the appropriate page.
  const handleNavigation = (route: string) => {
    if (route === '/profile') {
      router.push(`/profile/${userId}`);
    } else {
      router.push(route);
    }
  };

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex width-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname && pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <div
              key={link.label}
              className={`leftsidebar_link ${isActive ? "bg-primary-500" : ""}`}
              onClick={() => handleNavigation(link.route)}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton>
            <div
              className="flex cursor-pointer gap-4 p-4"
              onClick={() => {
                signOut().then(() => router.push("/sign-in"));
              }}
            >
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              <p className="text-light-2 max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}

export default LeftSidebar;