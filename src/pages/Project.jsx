import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import useProjects from '../hooks/useProjects';
import useAdmin from '../hooks/useAdmin';
import ModalTaskForm from '../components/ModalTaskForm';
import ModalDeleteTask from '../components/ModalDeleteTask';
import ModalDeleteCollaborator from '../components/ModalDeleteCollaborator';
import Task from '../components/Task';
import Collaborator from '../components/Collaborator';
import Alert from '../components/Alert';
import io from 'socket.io-client';

let socket;

const Project = () => {
    const { id } = useParams();
    const { getProject, project, handleModalTask, loading, alert, submitProjectTasks, deleteProjectTask, updateProjectTask, updateCompletedTask } = useProjects();
    
    const { name, description } = project;

    const admin = useAdmin();

    useEffect(() => {
        getProject(id);
    }, []);

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL);
        socket.emit('open project', id);
    }, []);

    useEffect(() => {
        socket.on('task added', newTask => {
            if(newTask.project === project._id) {
                submitProjectTasks(newTask);
            }
        });

        socket.on('task deleted', deletedTask => {
          if(deletedTask.project === project._id) {
            deleteProjectTask(deletedTask);
          }
        });

        socket.on('task updated', updatedTask => {
          if(updatedTask.project._id === project._id) {
            updateProjectTask(updatedTask);
          }
        });

        socket.on('new state', newTaskState => {
            if(newTaskState.project._id === project._id) {
                updateCompletedTask(newTaskState);
            }
        });
    });
    
    const { msg } = alert;

  return (
    loading ? 
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box> : (
        <>
            <div className='flex justify-between'>
                <h1 className='font-black text-4xl'>{name}</h1>

                {admin && (
                    <div className='flex items-center gap-2 text-gray-400 hover:text-black transition-colors'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>

                        <Link
                            to={`/projects/editar/${id}`}
                            className='uppercase font-bold'
                        >Edit</Link>
                    </div>
                )}
            </div>

            <div className="bg-white shadow rounded-lg mt-5">
                <p className='p-4'>{description}</p>
            </div>

            {admin && (
                <button
                    onClick={handleModalTask}
                    type='button'
                    className='text-sm px-5 py-3 w-full lg:w-1/4 rounded-lg uppercase font-bold bg-sky-400 hover:bg-sky-500 transition-colors text-white text-center mt-5 flex items-center justify-center gap-2'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    New Task
                </button>
            )}
            <p className='font-bold text-xl mt-10'>Project Tasks</p>

            <div className='flex justify-center'>
                <div className='md:w-1/2 lg:w-1/4'>
                    { msg && <Alert alert={alert}/> }
                </div>
            </div>

            <div className='bg-white shadow mt-10 p-10 rounded-lg'>
                {project.tasks?.length ? project.tasks?.map( task => (
                    <Task 
                        key={task._id}
                        task={task}
                    />
                )) : <p className='text-center my-10 rounded-lg'>No tasks in this project.</p>}
            </div>
            
            {admin && (
                <>
                    <div className='flex items-center justify-between mt-10'>
                        <p className='font-bold text-xl'>Collaborators</p>
                        <Link
                            to={`/projects/new-collaborator/${project._id}`}
                            className='text-gray-400 uppercase font-bold hover:text-black transition-colors'
                        >
                            <div className='flex justify-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                </svg>
                                Add
                            </div>
                        </Link>
                    </div>

                    <div className='bg-white shadow mt-10 p-10 rounded-lg'>
                        {project.collaborators?.length ? project.collaborators?.map( collaborator => (
                            <Collaborator 
                                key={collaborator._id}
                                collaborator={collaborator}
                            />
                        )) : <p className='text-center my-10 rounded-lg'>No collaborators in this project.</p>}
                    </div>
                </>
            )}

            <ModalTaskForm />
            <ModalDeleteTask />
            <ModalDeleteCollaborator />
        </>
    )
  )
}

export default Project
