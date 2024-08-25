"use client";
import { Priority } from "@prisma/client";
import { Star } from "lucide-react";

const PriorityBadgeForm = ({ priority }: { priority: string }) => {
  return (
    <span className="flex items-center">
      {priority == Priority.LOW ? (
        <>
          <Star fill="gray" color="gray" size={15} />
          <Star color="gray" size={15} />
          <Star color="gray" size={15} />
          <span className="ml-1">
            ({priority[0]}
            {priority.substring(1).toLowerCase()})
          </span>
        </>
      ) : priority == Priority.MEDIUM ? (
        <>
          <Star fill="gray" color="gray" size={15} />
          <Star fill="gray" color="gray" size={15} />
          <Star color="gray" size={15} />
          <span className="ml-1">
            ({priority[0]}
            {priority.substring(1).toLowerCase()})
          </span>
        </>
      ) : priority == Priority.HIGH ? (
        <>
          <Star fill="gray" color="gray" size={15} />
          <Star fill="gray" color="gray" size={15} />
          <Star fill="gray" color="gray" size={15} />
          <span className="ml-1">
            ({priority[0]}
            {priority.substring(1).toLowerCase()})
          </span>
        </>
      ) : (
        <></>
      )}
    </span>
  );
};
export default PriorityBadgeForm;
