import useProjects from "../hooks/useProjects"

const Collaborator = ({ collaborator }) => {
    const { handleModalDeleteCollaborator } = useProjects();
    const { name, email } = collaborator;

    return (
        <div className="boder-b p-5 flex justify-between items-center">
            <div>
                <p>{name}</p>
                <p className="text-sm text-gray-700">{email}</p>
            </div>

            <button 
                type="button"
                className="bg-red-600 hover:bg-red-700 px-4 py-3 text-white font-bold uppercase text-sm rounded-lg"
                onClick={ () => handleModalDeleteCollaborator(collaborator) }
            >
                Delete
            </button>
        </div>
    )
}

export default Collaborator
