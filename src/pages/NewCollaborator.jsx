import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import CollaboratorForm from '../components/CollaboratorForm'
import useProjects from '../hooks/useProjects'
import { Alert } from '@mui/material';

const NewCollaborator = () => {
  const { getProject, project, loading, collaborator, addCollaborator, alert } = useProjects();
  const params = useParams();

  useEffect(() => {
    getProject(params.id);
  }, []);

  if(!project._id) return <Alert alert={alert}/>

  return (
    <>
      <h1 className="text-4xl font-black">Add Collaborator to: {project.name}</h1>

      <div className="mt-10 flex justify-center">
        <CollaboratorForm />
      </div>

      {loading ? 
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box> : collaborator?._id && (
          <div className='flex justify-center mt-10'>
            <div className='bg-white py-10 px-5 w-full lg:w-1/2 rounded-lg shadow'>
              <h2 className='text-center mb-10 text-2xl font-bold'>Result:</h2>

              <div className='flex justify-between items-center'>
                <p className='text-2xl'>{collaborator.name}</p>

                <button
                  type='button'
                  className='bg-slate-500 hover:bg-slate-600 transition-colors px-5 py-2 rounded-lg uppercase text-white font-bold text-sm'
                  onClick={() => addCollaborator({ email: collaborator.email })}
                >
                  Add to Project
                </button>
              </div>
            </div>
          </div>
        )}  
    </>
  )
}

export default NewCollaborator
