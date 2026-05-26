import { Search, Bell, Moon } from 'lucide-react';

function Navbar() {

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="
      sticky
      top-0
      z-40
      bg-white/90
      dark:bg-gray-900/90
      backdrop-blur
      border-b
      dark:border-gray-700
      px-7
      py-4
      flex
      items-center
      justify-between
    ">

      {/* SEARCH */}
      <div className="relative w-full max-w-md">

        <Search
          size={18}
          className="absolute left-4 top-4 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search contacts..."
          className="
            w-full
            pl-12
            pr-4
            py-3
            rounded-xl
            border
            border-gray-200
            dark:border-gray-700
            dark:bg-gray-800
            dark:text-white
            bg-gray-50
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
        />

      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-4 ml-6">

        <button className="
          w-11 h-11
          rounded-xl
          bg-gray-100
          dark:bg-gray-800
          flex items-center justify-center
        ">
          <Bell size={18} />
        </button>

        <button
          onClick={toggleDarkMode}
          className="
            w-11 h-11
            rounded-xl
            bg-gray-100
            dark:bg-gray-800
            flex items-center justify-center
          "
        >
          <Moon size={18} />
        </button>

        {/* USER */}
        <div className="
          w-11 h-11
          rounded-full
          bg-indigo-600
          text-white
          flex items-center justify-center
          font-semibold
        ">
          LY
        </div>

      </div>

    </header>
  );
}

export default Navbar;










// import { Moon, Search } from 'lucide-react';

// function Navbar() {
//   const toggleDarkMode = () => {
//     document.documentElement.classList.toggle('dark');
//   };

//   return (
//     <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-4 flex items-center justify-between">

//       <div className="relative w-full max-w-md">

//         <Search
//           size={18}
//           className="absolute left-3 top-3 text-gray-400"
//         />

//         <input
//           type="text"
//           placeholder="Search contacts..."
//           className="w-full pl-10 pr-4 py-2 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//         />

//       </div>

//       <div className="flex items-center gap-4">

//         <button
//           onClick={toggleDarkMode}
//           className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700"
//         >
//           <Moon size={20} />
//         </button>

//         <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
//           LY
//         </div>

//       </div>

//     </header>
//   );
// }

// export default Navbar;