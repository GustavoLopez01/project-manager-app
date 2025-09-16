"use client"
import { useEffect, useMemo, useState } from 'react';
import { Task } from '@/src/generated/prisma';
import TableListTask from './TableListTask';
import Pagination from '../pagination/Pagination';
import ItemsPerPage from '../pagination/ItemsPerPage';
import {
  DEFAULT_NUMBER_PAGE,
  FILTERS_ITEMS_PER_PAGE
} from '@/src/utils/constants';

type UserTasksProps = {
  tasks: Task[]
}

export default function UserTasks({
  tasks
}: UserTasksProps) {
  const [currentPage, setCurrentPage] = useState(DEFAULT_NUMBER_PAGE);
  const [itemsPage, setItemsPage] = useState(FILTERS_ITEMS_PER_PAGE[0].value);

  const items = useMemo(() => {
    const finalItems: number[] = [];
    const totalItems = Math.ceil(tasks.length / itemsPage);
    for (let index = 0; index < totalItems; index++) {
      finalItems.push(index + 1);
    }
    return finalItems;
  }, [tasks.length, itemsPage]);

  const tasksByPage = useMemo(() => {
    const end = currentPage * itemsPage;
    const start = end - itemsPage;
    return tasks.slice(start, end);
  }, [tasks, currentPage, itemsPage]);

  useEffect(() => {
    if (items.length === DEFAULT_NUMBER_PAGE)
      setCurrentPage(DEFAULT_NUMBER_PAGE);
  }, [items]);

  return (
    <>
      <div className="flex justify-end py-3">
        <ItemsPerPage
          setItems={setItemsPage}
        />
      </div>

      <TableListTask
        setCurrentTask={() => { }}
        setIsOpen={() => { }}
        setIsOpenDelete={() => { }}
        tasks={tasksByPage}
      />

      <div className="mt-5">
        <Pagination
          items={items}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  )
}
