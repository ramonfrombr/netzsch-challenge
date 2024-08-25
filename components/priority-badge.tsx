"use client";
import { Priority } from "@prisma/client";
import { Star } from "lucide-react";

const PriorityBadge = ({ priority }: { priority: string }) => {
  return (
    <span className="flex">
      {priority == Priority.LOW ? (
        <>
          <Star fill="gray" color="gray" size={15} />
          <Star color="gray" size={15} />
          <Star color="gray" size={15} />
        </>
      ) : priority == Priority.MEDIUM ? (
        <>
          <Star fill="gray" color="gray" size={15} />
          <Star fill="gray" color="gray" size={15} />
          <Star color="gray" size={15} />
        </>
      ) : priority == Priority.HIGH ? (
        <>
          <Star fill="gray" color="gray" size={15} />
          <Star fill="gray" color="gray" size={15} />
          <Star fill="gray" color="gray" size={15} />
        </>
      ) : (
        <></>
      )}
    </span>
  );
};
export default PriorityBadge;
