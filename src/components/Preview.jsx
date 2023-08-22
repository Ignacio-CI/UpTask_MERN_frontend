import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const Preview = ({ project }) => {
    const { auth } = useAuth();
    
    const { name, _id, client, creator} = project;
  return (
    <div className='border-b p-5 flex flex-col gap-2 md:flex-row md:justify-between'>
        <div className='flex items-center gap-2 justify-between'>
            <p>
                {name}
                <span className='text-gray-500 text-sm uppercase'>
                    {''} {client}
                </span>
            </p>

            {auth._id !== creator && (
                <p className='p-1 text-xs text-white bg-emerald-500 rounded-lg uppercase font-bold'>Collaborator</p>
            )}
        </div>

        <Link
            to={`${_id}`}
            className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold'
        >Show Project</Link>
    </div>
  )
}

export default Preview
