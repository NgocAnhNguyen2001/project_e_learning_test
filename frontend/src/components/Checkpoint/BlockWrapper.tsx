import { XYCoord } from "dnd-core";
import React, { FC, useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { HiOutlineTrash, HiDotsHorizontal } from "react-icons/hi";

import { ItemTypes } from "@/types/ItemTypes";

export interface BlockDNDWrapperProps {
  id: any;
  index: number;
  moveBlockDNDWrapper: (dragIndex: number, hoverIndex: number) => void;
  children?: React.ReactNode;
  onDelete?: () => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const BlockDNDWrapper: FC<BlockDNDWrapperProps> = ({
  id,
  children,
  index,
  moveBlockDNDWrapper,
  onDelete,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveBlockDNDWrapper(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (children as any)[0] ? (
    <div
      className="flex items-center relative w-full"
      key={id}
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}
    >
      <div className="flex flex-row absolute top-0 right-0 z-[1]">
        <HiOutlineTrash
          className="mr-5 cursor-pointer navigator_tour_38"
          size={20}
          color="#FF4B4B"
          onClick={onDelete}
        />
        <HiDotsHorizontal
          size={20}
          color="#A4A4A4"
          className="cursor-pointer navigator_tour_39"
        />
      </div>
      {children}
    </div>
  ) : (
    <></>
  );
};
