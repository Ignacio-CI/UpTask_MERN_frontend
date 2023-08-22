import { formatDate } from '../helpers/formatDate';
import useProjects from '../hooks/useProjects'
import useAdmin from '../hooks/useAdmin'

const Task = ({ task }) => {

    const { handleModalEditTask, handleModalDeleteTask, completeTask } = useProjects();

    const { description, name, priority, deadline, state, _id } = task;

    const admin = useAdmin();

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className='flex flex-col items-start gap-1'>
        <p className="text-xl">{name}</p>
        <p className="text-sm uppercase text-gray-500">{description}</p>
        <p className="text-sm">{formatDate(deadline)}</p>
        <p className="text-sm text-gray-600">Priority: {priority}</p>
        {state && (
          <p className='text-xs bg-emerald-500 text-white uppercase rounded-lg p-1'>Completed by: {task.completed.name}</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-2">

        {admin && (
          <button 
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalEditTask(task)}
          >Edit</button>
        )}
        
        <button 
          className={`${state ? 'bg-sky-600 hover:bg-sky-700' : 'bg-gray-600 hover:bg-gray-700'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
          onClick={() => completeTask(_id)}
        >{state ? 'Done' : 'To Do'}</button>
        
        {admin && (
          <button 
            className="bg-red-600 hover:bg-red-700 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={ () => handleModalDeleteTask(task) }
          >Delete</button>
        )}
      </div>
    </div>
  )
}

export default Task
