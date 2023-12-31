import { useState } from "react"
import useProjects from "../hooks/useProjects";
import Alert from '../components/Alert'

const CollaboratorForm = () => {
    const [email, setEmail] = useState('');
    
    const { alert, showAlert, submitCollaborator } = useProjects();

    const handleSubmit = e => {
      e.preventDefault();

      if(email === '') {
        showAlert({
            msg: 'The email is required',
            error: true
        })
        return;
      }

      submitCollaborator(email);
    }
    
    const { msg } = alert;

  return (
    <form
        className="bg-white py-10 px-5 w-full lg:w-1/2 rounded-lg shadow"
        onSubmit={handleSubmit}
    >
        { msg && <Alert alert={alert}/> }
        <div className='mb-5'>
            <label 
                htmlFor='email'
                className='text-gray-700 uppercase font-bold text-sm'
            >Collaborator Email</label>
            <input 
                type="email" 
                name='email'
                placeholder='User email'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>

        <input 
            type="submit" 
            className='bg-sky-600 hover:bg-sky-700 w-full p-3 uppercase font-bold text-white cursor-pointer transition-colors rounded'
            value={'Search Collaborator'}
        />
    </form>
  )
}

export default CollaboratorForm
