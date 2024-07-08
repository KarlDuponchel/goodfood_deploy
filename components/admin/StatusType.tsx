type StatusTypeProps = {
  myStatus: string;
};

export const StatusType = ({ myStatus }: StatusTypeProps) => {
  const color = myStatus === "En cours" ? "bg-yellow-300" : "bg-green-300";
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold text-white ${color}`}
    >
      {myStatus}
    </span>
  );
};
