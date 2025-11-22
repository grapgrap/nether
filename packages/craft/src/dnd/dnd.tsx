import {
  DndContext,
  closestCenter,
  getFirstCollision,
  pointerWithin,
  rectIntersection,
  type CollisionDetection,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useRef, useState, type HTMLAttributes, type ReactNode } from "react";

const meta: Meta = {
  title: "DnD",
};

export default meta;

interface Item {
  id: string;
}
interface List {
  id: string;
  items: Item[];
}

const _lists = [
  {
    id: "A",
    items: [{ id: "1" }, { id: "2" }, { id: "3" }],
  },
  {
    id: "B",
    items: [{ id: "4" }, { id: "5" }, { id: "6" }],
  },
  {
    id: "C",
    items: [{ id: "7" }, { id: "8" }, { id: "9" }],
  },
  {
    id: "D",
    items: [{ id: "10" }, { id: "11" }, { id: "12" }],
  },
  { id: "E", items: [] },
] satisfies List[];

const TestBed = () => {
  const [lists, setLists] = useState(_lists);

  const backupState = useRef<List[]>();

  const isContainer = (id: UniqueIdentifier) => {
    return lists.some((list) => list.id === id);
  };

  const findContainerByContainerId = (id: UniqueIdentifier) => {
    return lists.find((list) => list.id === id);
  };

  const findContainerByItemId = (id: UniqueIdentifier) => {
    if (isContainer(id)) {
      return;
    }
    return lists.find((list) => list.items.some((item) => item.id === id));
  };

  const collisionDetection: CollisionDetection = (params) => {
    if (isContainer(params.active.id)) {
      return closestCenter({
        ...params,
        droppableContainers: params.droppableContainers.filter((container) =>
          isContainer(container.id)
        ),
      });
    }

    const pointerCollisions = pointerWithin(params);
    const collisions =
      pointerCollisions.length > 0
        ? pointerCollisions
        : rectIntersection(params);

    const over = getFirstCollision(collisions);

    if (over) {
      if (!isContainer(over.id)) {
        return [over];
      }

      const overContainer = findContainerByContainerId(over.id);
      if (!overContainer || overContainer.items.length === 0) {
        return [over];
      }

      return closestCenter({
        ...params,
        droppableContainers: params.droppableContainers.filter((container) => {
          return (
            container.id !== over.id &&
            overContainer.items.some((item) => item.id === container.id)
          );
        }),
      });
    }

    
    return [];

  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "50%",
        margin: "auto",
      }}
    >
      <DndContext
        collisionDetection={collisionDetection}
        onDragStart={() => {
          backupState.current = structuredClone(lists);
        }}
        onDragCancel={() => {
          if (backupState.current) {
            setLists(backupState.current);
          }

          backupState.current = undefined;
        }}
        onDragOver={({ active, over }) => {
          if (!over) return;
          if (isContainer(active.id)) return;

          const activeContainer = findContainerByItemId(active.id);
          const overContainer = isContainer(over.id)
            ? findContainerByContainerId(over.id)
            : findContainerByItemId(over.id);

          if (!activeContainer || !overContainer) return;
          if (activeContainer.id === overContainer.id) return;

          setLists((lists) => {
            const newLists = structuredClone(lists);

            const activeContainerIndex = newLists.findIndex(
              (list) => list.id === activeContainer.id
            );
            const overContainerIndex = newLists.findIndex(
              (list) => list.id === overContainer.id
            );

            const activeItem = activeContainer.items.find(
              (item) => item.id === active.id
            )!;

            if (isContainer(over.id)) {
              newLists[activeContainerIndex].items =
                activeContainer.items.filter((item) => item.id !== active.id);
              newLists[overContainerIndex].items.push(activeItem);
            } else {
              const activeTop = active.rect.current.translated?.top ?? Infinity;
              const overBottom = over.rect.top + over.rect.height;

              const isActiveBelowThenOver = activeTop > overBottom;
              const overIndex = overContainer.items.findIndex(
                (item) => item.id === over.id
              );

              newLists[activeContainerIndex].items =
                activeContainer.items.filter((item) => item.id !== active.id);

              newLists[overContainerIndex].items.splice(
                isActiveBelowThenOver ? overIndex + 1 : overIndex,
                0,
                activeItem
              );
            }

            return newLists;
          });
        }}
        onDragEnd={({ active, over }) => {
          if (!over) return;

          const activeContainer = isContainer(active.id)
            ? findContainerByContainerId(active.id)
            : findContainerByItemId(active.id);

          const overContainer = isContainer(over.id)
            ? findContainerByContainerId(over.id)
            : findContainerByItemId(over.id);

          if (!activeContainer || !overContainer) return;

          if (activeContainer.id === overContainer.id) {
            setLists((lists) => {
              const newLists = structuredClone(lists);

              const activeContainerIndex = newLists.findIndex(
                (list) => list.id === activeContainer.id
              );

              newLists[activeContainerIndex].items = arrayMove(
                activeContainer.items,
                activeContainer.items.findIndex(
                  (item) => item.id === active.id
                ),
                overContainer.items.findIndex((item) => item.id === over.id)
              );

              return newLists;
            });
          }

          setLists((lists) => {
            const activeContainerIndex = lists.findIndex(
              (list) => list.id === activeContainer.id
            );
            const overContainerIndex = lists.findIndex(
              (list) => list.id === overContainer.id
            );

            const newLists = arrayMove(
              lists,
              activeContainerIndex,
              overContainerIndex
            );

            return newLists;
          });
        }}
      >
        <SortableContext
          items={lists.map((list) => list.id)}
          strategy={verticalListSortingStrategy}
        >
          {lists.map((list) => (
            <Container key={list.id} id={list.id}>
              <SortableContext
                items={list.items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                {list.items.map((item) => (
                  <Item key={item.id} id={item.id}>
                    {item.id}
                  </Item>
                ))}
              </SortableContext>
            </Container>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  id: string;
}

const Container = (props: ContainerProps) => {
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({ id: props.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#F9F9F9",
        border: "1px solid rgba(0, 0, 0, 0.05)",
        borderRadius: 4,
        padding: 16,
        rowGap: 16,
        transform: CSS.Translate.toString(transform),
        transition: transition,
      }}
      {...attributes}
      {...listeners}
    >
      {props.children}
    </div>
  );
};

interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  id: string;
}

const Item = (props: ItemProps) => {
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({ id: props.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#E9E9E9",
        border: "1px solid rgba(0, 0, 0, 0.05)",
        borderRadius: 4,
        padding: 16,
        rowGap: 16,
        transform: CSS.Translate.toString(transform),
        transition: transition,
      }}
      {...attributes}
      {...listeners}
    >
      {props.children}
    </div>
  );
};

export const TestBedStory: StoryObj = {
  render: () => <TestBed />,
};
