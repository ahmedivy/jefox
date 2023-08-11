import { AiFillQuestionCircle } from "react-icons/ai";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function PlanFeature({
  name,
  price = null,
  description = "",
  tooltip = true,
  message = null,
}) {
  return (
    <div className="flex justify-between text-md md:text-md">
      <IoCheckmarkDoneCircleSharp className="h-5 w-5 text-green-500 md:w-6 md:h-6" />
      <div className="flex gap-1 md:gap-2 w-full px-4">
        <p className="">{name}</p>
        <p className="">{message ? message : `$ ${price}`}</p>
      </div>
      {tooltip && (
        <Popover className="p-0 m-0">
          <PopoverTrigger>
            <AiFillQuestionCircle className="h-5 w-5 text-muted-foreground" />
          </PopoverTrigger>
          <PopoverContent className="p-2 m-0">
            <p className="text-sm">{description}</p>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

export default PlanFeature;
