"use client";

type Props = {
  email: string | null;
  joinedAt: string | null;
  onLogout: () => void;
};

export default function LoggedInProfile({ email, joinedAt, onLogout }: Props) {
  return (
    <>
      {/* Profile Image */}
      <div className="mt-6 flex justify-center">
        <div className="h-28 w-28 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-4xl">
          👤
        </div>
      </div>

      {/* User Info */}
      <p className="mt-6 italic text-gray-700 dark:text-gray-400 text-center">
        Logged in as <strong>{email}</strong>
      </p>

      <p className="mt-2 italic text-gray-700 dark:text-gray-400 text-center">
        Joined on{" "}
        <span className="font-semibold text-black dark:text-white">
          {joinedAt ? new Date(joinedAt).toDateString() : ""}
        </span>
      </p>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-center">
          <p className="text-sm italic text-gray-700 dark:text-gray-400">
            Total Tasks
          </p>
          <p className="text-2xl font-bold text-black dark:text-white">12</p>
        </div>

        <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-center">
          <p className="text-sm italic text-gray-700 dark:text-gray-400">
            Completed
          </p>
          <p className="text-2xl font-bold text-black dark:text-white">5</p>
        </div>
      </div>

      {/* Logout */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={onLogout}
          className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white cursor-pointer"
        >
          Logout
        </button>
      </div>
    </>
  );
}
