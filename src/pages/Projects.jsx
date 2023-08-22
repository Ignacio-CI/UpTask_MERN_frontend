import useProjects from "../hooks/useProjects"
import Preview from '../components/Preview';
import Alert from '../components/Alert';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Projects = () => {

  const { projects, loading, alert } = useProjects(); 

  const { msg } = alert;

  return (
    loading ? 
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box> : (
          <>
            <h1 className="text-4xl font-black">Projects</h1>
      
            {msg && <Alert alert={alert}/>}
      
            <div className="bg-white shadow mt-10 rounded-lg">
              {projects.length ?
                projects.map(project => (
                  <Preview 
                    key={project._id}
                    project={project}
                  />
                )) : <p className="text-center text-gray-600 uppercase p-5">No projects</p> }
            </div>
        </>)
  )
}

export default Projects
