import { useEffect, useState, useRef } from 'react';
import { Limiter } from '@/components/common/Limiter';
import { UserInFollowContextCard } from '@/components/UserInFollowContextCard';
import { IoSearch } from "react-icons/io5";
import { User } from '@/types/user';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Popup } from '@/components/common/Popup';
import { useUser } from '@/context/currentUserContext';
import { Button } from '@/components/common/Button';
import { toast } from 'react-toastify';
import { FaPen, FaTimes } from 'react-icons/fa';
import { getUsers } from '@/api/users/getUsers';
import { createUser } from '@/api/users/createUser';
import { uploadProfileImage } from '@/api/users/uploadProfileImage';

export const FollowersBody = () => {
    const { currentUser } = useUser(); // Use o contexto do usuário
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [followers, setFollowers] = useState<User[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userBirthday, setUserBirthday] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isImageSelected, setIsImageSelected] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsers();
            setFollowers(users);
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        // Limpar URL temporária quando o componente for desmontado
        return () => {
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    const filteredFollowers = followers.filter(follower =>
        follower.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!followers) return <LoadingSpinner />;

    const handleAddUserClick = () => {
        setIsPopupOpen(true);
    };

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (userPassword !== confirmPassword) {
            toast.error('As senhas não coincidem!');
            return;
        }

        try {
            const newUser = {
                userName,
                userEmail,
                userPhone,
                userBirthday,
                userPassword,
                userHasImage: !!profileImage
            };

            const response = await createUser(newUser);

            if (response.success) {
                let imageUploadSuccess = true;

                if (profileImage) {
                    imageUploadSuccess = await uploadProfileImage(response.userId, profileImage);
                }

                if (!imageUploadSuccess) {
                    toast.error('Falha ao adicionar a foto do perfil!');
                    return;
                }

                toast.success('Usuário adicionado com sucesso!');
                setIsPopupOpen(false);
            } else {
                toast.error('Falha ao adicionar usuário!');
            }
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
            toast.error('Erro ao adicionar usuário!');
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setProfileImage(event.target.files[0]);
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setIsImageSelected(true);
        }
    };

    const handleEditClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleClearImage = () => {
        setProfileImage(null);
        setPreviewImage(null);
        setIsImageSelected(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Limpa o valor do input file
        }
    };

    return (
        <div className='bg-black w-full flex justify-center px-4'>
            <Limiter>
                <div className='bg-black mt-12'>
                    <div className="flex gap-4 items-center">
                        <div className='flex border border-neutral-500 focus:border-neutral-200 text-white items-center gap-2 w-64 p-2'>
                            <IoSearch className='text-yellow-seu-treino text-lg' />
                            <input
                                className='bg-transparent outline-none w-full'
                                type='text'
                                placeholder='Procurar'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        {currentUser?.userRole === 'admin' && (
                            <Button className='bg-orange-seu-treino text-white items-center' onClick={handleAddUserClick}>
                                + Usuário
                            </Button>
                        )}
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8'>
                        {!filteredFollowers && <LoadingSpinner />}
                        {filteredFollowers.length > 0 && filteredFollowers.map((follower: User, i: number) => (
                            <UserInFollowContextCard key={i} user={follower} />
                        ))}
                        {filteredFollowers.length === 0 && <span className='text-white'>Nenhum resultado encontrado.</span>}
                    </div>
                </div>
            </Limiter>
            <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                <form onSubmit={handleFormSubmit} className='p-4 text-white'>
                    <div className='flex flex-col gap-4'>
                        <input type="file" ref={fileInputRef} accept=".jpg" style={{ display: 'none' }} onChange={handleImageChange} />
                        {previewImage ? (
                            <div className='relative'>
                                <img src={previewImage} alt="Profile Preview" className="w-32 h-32 object-cover rounded-full" />
                                <button type="button" onClick={handleClearImage} className='absolute top-0 right-0 p-1 bg-black rounded-full'>
                                    <FaTimes className='text-white' />
                                </button>
                            </div>
                        ) : (
                            <div className='flex items-center justify-center w-32 h-32 bg-neutral-700 rounded-full'>
                                <button type="button" onClick={handleEditClick} className='text-white'>
                                    <FaPen />
                                </button>
                            </div>
                        )}
                        <input className='bg-neutral-700 p-2 rounded-lg' type='text' placeholder='Nome' required value={userName} onChange={(e) => setUserName(e.target.value)} />
                        <input className='bg-neutral-700 p-2 rounded-lg' type='email' placeholder='Email' required value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                        <input className='bg-neutral-700 p-2 rounded-lg' type='tel' placeholder='Telefone' required value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
                        <input className='bg-neutral-700 p-2 rounded-lg' type='date' required value={userBirthday} onChange={(e) => setUserBirthday(e.target.value)} />
                        <input className='bg-neutral-700 p-2 rounded-lg' type='password' placeholder='Senha' required value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                        <input className='bg-neutral-700 p-2 rounded-lg' type='password' placeholder='Confirmar Senha' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className='flex justify-end mt-4'>
                        <button type='submit' className='bg-orange-seu-treino text-white font-bold px-4 py-2 rounded-lg'>
                            Adicionar
                        </button>
                    </div>
                </form>
            </Popup>
        </div>
    );
};
