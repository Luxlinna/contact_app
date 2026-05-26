import {
  LayoutDashboard,
  Users,
  Star,
  Clock3,
  Settings,
} from 'lucide-react';

function Sidebar() {

  const menu = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard size={18} />,
      active: true,
    },
    {
      label: 'All Contacts',
      icon: <Users size={18} />,
    },
    {
      label: 'Favorites',
      icon: <Star size={18} />,
    },
    {
      label: 'Recent',
      icon: <Clock3 size={18} />,
    },
    {
      label: 'Settings',
      icon: <Settings size={18} />,
    },
  ];

  return (
    <aside className="
      hidden lg:flex
      flex-col
      w-64
      bg-white
      dark:bg-gray-800
      border-r
      dark:border-gray-700
      sticky
      top-0
      h-screen
    ">

      {/* LOGO */}
      <div className="px-7 py-6 border-b dark:border-gray-700">

        <h1 className="text-2xl font-bold text-indigo-600">
          ContactPro
        </h1>

      </div>

      {/* MENU */}
      <nav className="p-4 flex flex-col gap-2">

        {menu.map((item, index) => (
          <button
            key={index}
            className={`
              flex items-center gap-3
              px-4 py-3
              rounded-xl
              transition-all
              text-sm font-medium

              ${
                item.active
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
          >

            {item.icon}

            {item.label}

          </button>
        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;









// import {
//     LayoutDashboard,
//     Users,
//     Star,
//     Settings
// } from 'lucide-react';

// function Sidebar() {
//     return (
//         <aside className="hidden md:flex w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex-col">

//             <div className="p-6">

//                 <h1 className="text-2xl font-bold text-indigo-600">
//                 ContactPro
//                 </h1>

//             </div>

//             <nav className="flex flex-col gap-2 px-4">

//                 <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-100 text-indigo-600 font-medium">
//                 <LayoutDashboard size={20} />
//                 Dashboard
//                 </button>

//                 <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
//                 <Users size={20} />
//                 Contacts
//                 </button>

//                 <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
//                 <Star size={20} />
//                 Favorites
//                 </button>

//                 <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
//                 <Settings size={20} />
//                 Settings
//                 </button>

//             </nav>

//         </aside>
  
//     );
// }

// export default Sidebar;