import { useState, useEffect, useContext } from 'react';
import { useUser } from '@/context/currentUserContext';
import { Limiter } from '@/components/common/Limiter';
import React from 'react';
import { getUserRoutines } from '@/api/routines/getuserRoutines';
import Login from '@/pages/Login';
import { Routines } from '@/types/routines';
import { formatRoutineDate } from '@/utils/formatRoutineDate';



export const TrainRoutineBody = () => {
  const {currentUser} = useUser()
  if(!currentUser) return <Login/>
  const [routines, setRoutines] = useState<Routines[]>([]);

  useEffect(() => {
    const fetchRoutines = async () => {
      if (currentUser) {
        const fetchedRoutines = await getUserRoutines(currentUser.userId);
        setRoutines(fetchedRoutines);
      }
    };

    fetchRoutines();
  }, [currentUser]);


  return (
    <div className='bg-black min-h-fit w-full flex justify-center pb-4 xl:px-0 px-4'>
      <Limiter>
        <div className='flex flex-col gap-4 pt-4'>
          <table className='min-w-full bg-gray-800 border border-gray-700 rounded-lg'>
            <thead>
              <tr className='bg-gray-700'>
                <th className='px-6 py-3 text-left text-white'>Descrição</th>
                <th className='px-6 py-3 text-left text-white'>Data para Executar</th>
                <th className='px-6 py-3 text-left text-white'>Data de Criação</th>
              </tr>
            </thead>
            <tbody>
              {routines.length > 0 ? (
                routines.map(routine => (
                  <tr key={routine.routineId} className='border-b border-gray-600'>
                    <td className='px-6 py-4 text-gray-300'>{routine.routineDescription}</td>
                    <td className='px-6 py-4 text-gray-300'>{formatRoutineDate(routine.routineDateToExecute)}</td>
                    <td className='px-6 py-4 text-gray-300'>{formatRoutineDate(routine.routineDateOfCreation)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className='px-6 py-4 text-center text-gray-400'>
                    Nenhuma rotina encontrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Limiter>
    </div>
  );
};
